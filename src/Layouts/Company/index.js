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
  const [idCompany, setIdCompany] = useState(null)
  const [dataAlert, setDataAlert] = useState({
    open: false,
    message: '',
    severity: 'warning'
  });
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'companyName',
    sortType: 'asc',
    search: ''
  })
  const navigate = useNavigate();

  const handleClickOpen = (id) => {
    setOpen(true)
    setIdCompany(id)
  };

  const onDelete = async () => {
    const res = await client.requestAPI({
      method: 'DELETE',
      endpoint: `/company/${idCompany}`
    })
    console.log('res: ', res)
    if (res.meta.message) {
      setDataAlert({
        ...dataAlert,
        open: true,
        message: res.meta.message
      })
      handleClose();
    }
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
    setFilter({
      page: 0,
      size: 10,
      sortName: 'companyName',
      sortType: 'asc',
      search: ''
    })
  };

  const handleCloseAlert = () => {
    setDataAlert({
      ...dataAlert,
      open: false
    })
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
          severity={dataAlert.severity}
          message={dataAlert.message}
          open={dataAlert.open}
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
