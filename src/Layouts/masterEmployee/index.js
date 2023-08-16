import React, { useState, useEffect, useContext } from "react";
import client from "../../global/client";
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button,
} from "@mui/material";
import DataTable from "../../Component/DataTable";
import SideBar from "../../Component/Sidebar";
import { AlertContext } from "../../context";

const Employee = () => {
  const [open, setOpen] = useState(false);
  const { setDataAlert } = useContext(AlertContext)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [synchronise, setSynchronise] = useState(false);
  const [syncData, setSyncData] = useState([]);
  const [totalData, setTotalData] = useState();
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'name',
    sortType: 'desc',
    search: ''
  })

  const columns = [
    {
      field: "no",
      headerName: "No",
      sortable: false,
    },
    {
      field: "nip",
      headerName: "NIP",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      flex: 1,
      renderCell: (params) => {
        const urlMinio = params.row.image ? `${process.env.REACT_APP_BASE_API}/${params.row.image}` : "";
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={urlMinio}
              className="img-master-employee"
              alt="Profile Image"
            />
            <div style={{ marginLeft: "0.5rem" }}>
              <span className="text-name">{params.row.name}</span>
              <span className="text-position">{params.row.position}</span>
            </div>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Work Email",
      flex: 1,
    },
    {
      field: "departement",
      headerName: "Departement",
      flex: 1,
    },
    {
      field: "division",
      headerName: "Division Group",
      flex: 1,
    },
  ];

  useEffect(() => {
    getData();
  }, [filter])

  const getData = async () => {
    setLoading(true);
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/users?page=${filter.page}&size=${filter.size}&search=${filter.search}&sort=${filter.sortName},${filter.sortType}`
    });
    if (!res.isError) {
      rebuildData(res);
    }
    else {
      setDataAlert({
        severity: "error",
        message: res.error.detail,
        open: true
      });
    }
    setLoading(false);
  }

  const rebuildData = (resData) => {
    let temp = []
    let number = filter.page * filter.size
    temp = resData.data.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.id,
        nip: value.attributes.nip,
        name: value.attributes.fullName,
        position: value.attributes.position,
        image: value.attributes.photoProfile,
        email: value.attributes.email,
        departement: value.attributes.department,
        division: value.attributes.divisionGroup
      }
    })
    setData([...temp]);
    setTotalData(resData.meta.page.totalElements);
  }

  const handleClickModalButton = () => {
    setOpen(false);

    // For future integration with synchronize employee API
    // getData()
  }

  const handleChangeSearch = (event) => {
    setFilter({
      ...filter,
      search: event.target.value
    });
  };

  const onSync = async () => {
    // This code below is for future integration with synchronize employee API

    // const res = await client.requestAPI({
    //   method: "POST",
    //   endpoint: "/syncWithOdoo"
    // })
    // if (!res.isError) {
    //   setOpen(true);
    // }
    // else {
    //   console.error(res)
    // }

    setOpen(true);
  }

  const onFilter = (dataFilter) => {
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'name',
      sortType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'asc',
      search: filter.search
    })
  }


  return (
    <div>
      <SideBar>
        <DataTable
          title="Employee"
          data={synchronise ? syncData : data}
          columns={columns}
          placeSearch="Name, NIP, etc"
          searchTitle="Search By"
          onEmployee={() => onSync()}
          onFilter={(dataFilter => onFilter(dataFilter))}
          handleChangeSearch={handleChangeSearch}
          totalData={totalData}
          loading={loading}
        />
      </SideBar>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="dialog-info"
      >
        {/* Note: on close hit API getListEmployees */}
        <DialogTitle
          id="alert-dialog-info"
          className="dialog-info-header"
        >
          Data Synchronise
        </DialogTitle>
        <React.Fragment>
          <DialogContent
            className="dialog-info-content"
          >
            <DialogContentText
              id="alert-dialog-text"
              className="dialog-info-text-content"
            >
              Synchronization Successful!
            </DialogContentText>
            <DialogContentText>
              {/* Note: Change below sentence with syncwithodoo API meta response */}
              Data synchronization has been completed successfully. 10 items have been synchronized and 15 missing items.
            </DialogContentText>
          </DialogContent>
          <DialogActions
            className="dialog-info-actions"
          >
            <Button
              variant="outlined"
              className="button-text"
              onClick={handleClickModalButton}
              aria-labelledby="alert-dialog-info"
            >
              OK
            </Button>
          </DialogActions>
        </React.Fragment>
      </Dialog>
    </div >
  );
};

export default Employee;
