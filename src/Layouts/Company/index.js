import React, { useEffect, useState } from "react";
import DataTable from "../../Component/DataTable";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  Avatar,
} from "@mui/material";
import CustomAlert from "../../Component/Alert";
import SideBar from "../../Component/Sidebar";
import { useNavigate } from "react-router";
import client from "../../global/client";
const MasterCompany = () => {
  const columns = [
    {
      field: "no",
      headerName: 'No',
      // flex: 1,
    },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 1,
      renderCell: (params) => {
        const urlMinio = params.row.companyProfile ? `${process.env.REACT_APP_BASE_API}/${params.row.companyProfile}` : ''
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={urlMinio}
                className="img-master-employee"
                alt="Profile Image"
              />
            <div style={{ marginLeft: "0.5rem" }}>
              <span className="text-name">{params.row.companyName}</span>
            </div>
          </div>
        )
      }
    },
    {
      field: "companyEmail",
      headerName: "Company Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "npwp",
      headerName: "Company NPWP",
      flex: 1,
    }
  ];
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState()
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'companyName',
    sortType: 'asc',
    search: ''
  })
  const navigate = useNavigate();

  const handleClickOpen = async (id) => {
    setOpen(true);
  };

  const onDelete = () => {
    setOpenAlert(true);
    handleClose();
  };

  useEffect(() => {
    localStorage.removeItem('companyId')
    getData()
  }, [filter])

  const getData = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/company?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}&search=${filter.search}`
    })
    rebuildData(res)
  }

  const rebuildData = (resData) => {
    console.log('data: ', resData)
    let temp = []
    let number = filter.page * filter.size
    temp = resData.data.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.id,
        companyName: value.attributes.companyName,
        companyProfile: value.attributes.companyProfile,
        address: value.attributes.address,
        companyEmail: value.attributes.companyEmail,
        npwp: value.attributes.npwp
      }
    })
    setData([...temp])
    setTotalData(resData.meta.page.totalElements)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleChangeSearch = (event) => {
    setFilter({
      ...filter,
      search: event.target.value
    })
  };

  const handleAdd = () => {
    navigate("/master-company/create");
  };

  const redirectDetail = (id) => {
    localStorage.setItem('companyId', id)
    navigate('/master-company/detail')
  }

  const onFilter = (dataFilter) => {
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'companyName',
      sortType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'asc',
      search: filter.search
    })
  }
  return (
    <div>
      <SideBar>
        <CustomAlert
          severity="warning"
          message="This is a waring message!"
          open={openAlert}
          onClose={handleCloseAlert}
        />
        <DataTable
          title="Company"
          data={data}
          totalData={totalData}
          columns={columns}
          onFilter={(dataFilter => onFilter(dataFilter))}
          placeSearch="company"
          searchTitle="Search By"
          onAdd={() => handleAdd()}
          handleChangeSearch={handleChangeSearch}
          onDetail={(id) => redirectDetail(id)}
          onDelete={(id) => handleClickOpen(id)}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
        >
          <DialogTitle id="alert-dialog-title" className="dialog-delete-header">
            {"Delete Data"}
          </DialogTitle>
          <DialogContent className="dialog-delete-content">
            <DialogContentText
              className="dialog-delete-text-content"
              id="alert-dialog-description"
            >
              Warning: Deleting this data is irreversible. Are you sure you want to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions">
            <Button
              onClick={handleClose}
              variant="outlined"
              className="button-text"
            >
              Cancel
            </Button>
            <Button onClick={onDelete} className="delete-button button-text">
              Delete Data
            </Button>
          </DialogActions>
        </Dialog>
      </SideBar>
    </div>
  );
};

export default MasterCompany;
