import React, { useState, useEffect } from "react";
import client from "../../global/client";
import {
  Avatar,
} from "@mui/material";
import DataTable from "../../Component/DataTable";
import SideBar from "../../Component/Sidebar";
import { useNavigate } from "react-router";

const Employee = () => {
  const [synchronise, setSynchronise] = useState(true)
  // const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState()
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
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "division",
      headerName: "Division Group",
      flex: 1,
    },
  ];

  useEffect(() => {
    getData()
  }, [filter])

  const getData = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/users?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}&search=${filter.search}`
    })
    rebuildData(res)
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
        department: value.attributes.department,
        division: value.attributes.divisionGroup
      }
    })
    setData([...temp])
    setTotalData(resData.meta.page.totalElements)
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
      sortType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'desc',
      search: filter.search
    })
  }

  const onSync = async () => { 
    
    const res = await client.requestAPI({
      method: 'POST',
      endpoint: `/syncWithOdoo`,
      data
    })

    // if(!res.isError){
    //   setDataAlert({
    //     severity: 'success',
    //     open: true,
    //     message: res.data.meta.message
    //   }) 

    //   setTimeout(() => {
    //     navigate('/masteremployee');
    //   }, 3000);
    // }
    // else {          
    //   setDataAlert({
    //     severity: 'error',
    //     message: res.error.detail,
    //     open: true
    //   })
    // }
    // closeTask(false)
    // navigate("/masteremployee/create");
  }

  return (
    <div>
      <SideBar>
        <DataTable
          title="Employee"
          data={data}
          columns={columns}
          placeSearch="Name, NIP, etc"
          searchTitle="Search By"
          // onEmployee={synchronise}
          onEmployee={() => onSync()}
          onFilter={(dataFilter => onFilter(dataFilter))}
          handleChangeSearch={handleChangeSearch}
          totalData={totalData}
        />
      </SideBar>
    </div>
  );
};

export default Employee;
