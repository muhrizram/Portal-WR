import React, { useState, useEffect, useContext } from "react";
import client from "../../global/client";
import {
  Avatar,
} from "@mui/material";
import DataTable from "../../Component/DataTable";
import SideBar from "../../Component/Sidebar";
import { AlertContext } from "../../context";

const Employee = () => {
  const [synchronise, setSynchronise] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { setDataAlert } = useContext(AlertContext)
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
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={params.row.image}
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

  const onSync = async () => {
    // const res = await client.requestAPI({
    //   method: "POST",
    //   endpoint: "/syncWithOdoo"
    // })
    // if (!res.isError) {
    //   rebuildData(res);
    // }
    // else {
    //   console.error(res)
    // }
    setOpen(true);
    // setSynchronise(true)
    // const res = await client.requestAPI({
    //   method: 'POST',
    //   endpoint: `/syncWithOdoo`,
    // })
    // listDataSync(res)
    // getData(syncData)
    // setData([...res.data])
    // console.log("DATA SYNC", res)
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
    console.log("res", temp);
    setData([...temp]);
    setTotalData(resData.meta.page.totalElements);
  }

  const listDataSync = (resData) => {
    if (resData.data && Array.isArray(resData.data)) {
      // setData([...resData.data])
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
          department: value.attributes.department,
          division: value.attributes.divisionGroup
        }
      })
      setSyncData([...temp])
    }
  }

  const handleChangeSearch = (event) => {
    setFilter({
      ...filter,
      search: event.target.value
    });
  };

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
    </div >
  );
};

export default Employee;
