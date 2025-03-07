import React, { useContext, useEffect, useState } from "react";
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
import SideBar from "../../Component/Sidebar";
import { useNavigate } from "react-router";
import client from "../../global/client";
import { AlertContext } from "../../context";
const MasterCompany = () => {
  const columns = [
    {
      field: "no",
      headerName: 'No',
      sortable: false,
      flex: 0.4,
    },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 1,
      minWidth: 250,
      renderCell: (params) => {
        const urlMinio = params.row.companyProfile ? `${process.env.REACT_APP_BASE_API}/${params.row.companyProfile}` : ''
        const maxCharacters = 20
        let truncatedCompanyName
        if(params.row.companyName) {
          truncatedCompanyName = params.row.companyName.length > maxCharacters
          ? params.row.companyName.substring(0, maxCharacters - 3) + "..."
          : params.row.companyName
        }

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                className="img-master-employee"
                alt="Profile Image"
                src={urlMinio}
              />
            <div style={{ marginLeft: "0.5rem" }}>
              <span className="text-name" >
                  {truncatedCompanyName}
              </span>
            </div>
          </div>
        )
      }
    },
    {
      field: "companyEmail",
      headerName: "Company Email",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "npwp",
      headerName: "Company NPWP",
      flex: 1,
      minWidth: 210,
    }
  ];
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState()
  const [open, setOpen] = useState(false);
  const [idCompany, setIdCompany] = useState(null)
  const { setDataAlert } = useContext(AlertContext)
  const [loading, setLoading] = useState(false)
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
    if (!res.isError) {
      setDataAlert({
        severity: 'warning',
        open: true,
        message: res.meta.message
      })
      handleClose();
    } else {
      setDataAlert({
        severity: 'error',
        message: res.error.detail,
        open: true
      })
      setOpen(false)
    }
  };

  useEffect(() => {
    localStorage.removeItem('companyId')
    getData()
  }, [filter])

  const getData = async () => {
    setLoading(true)
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/company?page=${filter.page}&sort=${filter.sortName},${filter.sortType}&search=${filter.search}&size=${filter.size}`
    })
    if (!res.isError) {
      rebuildData(res)
    } else {
      setDataAlert({
        severity: 'error',
        message: res.error.detail,
        open: true
      })
    }
    setLoading(false)
  }

  const rebuildData = (resData) => {
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

  const handleChangeSearch = (event) => {
    setFilter({
      ...filter,
      page: event.target.value != "" ? 0 : filter.page,
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
        <DataTable
          title="Company"
          data={data}
          loading={loading}
          totalData={totalData}
          columns={columns}
          onFilter={(dataFilter => onFilter(dataFilter))}
          placeSearch="Company name, etc"
          searchTitle="Search By"
          onAdd={() => handleAdd()}
          handleChangeSearch={handleChangeSearch}
          onDetail={(id) => redirectDetail(id)}
          onDelete={(id) => handleClickOpen(id)}
          filter={filter}
        />
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
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
