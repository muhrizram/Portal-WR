import React, { useState, useEffect, useContext } from "react";
import SideBar from "../../Component/Sidebar";
import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import Header from "../../Component/Header";
import DataTable from "../../Component/DataTable";
import dataJson from "./initData.json";
import { useNavigate } from "react-router-dom";
import client from "../../global/client";
import { AlertContext } from "../../context";
import DeleteDialog from "../../Component/DialogDelete";

export default function Project() {
  const columns = [
    {
      field: "no",
      headerName: "No",
      flex: 1,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      flex: 1,
    },
    {
      field: "clientName",
      headerName: "Client Name",
      flex: 1,
    },
    {
      field: "projectType",
      headerName: "Project Type",
      flex: 1,
    },
  ];
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { setDataAlert } = useContext(AlertContext);
  const [dataId, setDataId] = useState();
  const [data,setData] = useState([])
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: "projectName",
    sortType: "asc",
    search: "",
  });

  const onFilter = (dataFilter) => {
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName:
        dataFilter.sorting.field !== ""
          ? dataFilter.sorting[0].field
          : "projectName",
      sortType:
        dataFilter.sorting.sort !== "" ? dataFilter.sorting[0].sort : "asc",
      search: filter.search,
    });
  };

  const handleChangeSearch = (event) => {    
    setFilter({
      ...filter,
      search: event.target.value
    });
  }

  useEffect(() => {
    getData()    
  }, [filter])


  const getData = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/project?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}&search=${filter.search}`
    })
    if(!res.isError){      
      rebuildData(res)          
    }else {      
      setDataAlert({
        severity: 'error',
        message: res.error.meta.message,
        open: true
      })
    }    
  }

  const rebuildData = (resData) => {
    let temp = []
    let number = filter.page * filter.size
    temp = resData.data.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.id,        
        projectName: value.attributes.projectName,
        projectType: value.attributes.projectType,
        clientName: value.attributes.clientName,  
      }
    })    
    setData([...temp])    
  }  

  const handleAdd = () => {
    navigate("/master-project/create");
  };

  const handleDelete = async (id) => {    
    setDataId(id);
    setOpen(true);
    console.log("Deleted Data ?")
  };

  const handleClose = () => {    
    setOpen(false);
  };

  const redirectDetail = (id) => {
    localStorage.setItem("projectId", id);
    navigate("/master-project/detail");
  };

  return (
    <SideBar>
      <DataTable
        title="Project"
        data={data}
        columns={columns}
        placeSearch="Project Name"
        searchTitle="Search By"
        onButtonClick={() => console.log("on click")}
        handleChangeSearch={handleChangeSearch}
        onDetail={(id) => redirectDetail(id)}
        onFilter={(dataFilter => onFilter(dataFilter))}
        onAdd={() => handleAdd()}
        onDelete={(id) => handleDelete(id)}
      />
      <DeleteDialog dialogOpen={open} handleClose={handleClose} deleteData={handleDelete} id={dataId} />
    </SideBar>
  );
}
