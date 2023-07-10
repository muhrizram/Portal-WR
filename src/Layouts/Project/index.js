import React, { useState } from "react";
import SideBar from "../../Component/Sidebar";
import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import Header from "../../Component/Header";
import DataTable from "../../Component/DataTable";
import dataJson from "./initData.json";
import { useNavigate } from "react-router-dom";

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

  const data = dataJson.content;
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

  const handleAdd = () => {
    navigate("/master-project/create");
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
        handleChangeSearch={() => console.log("handle search")}
        onDetail={(id) => redirectDetail(id)}
        onFilter={(dataFilter) => onFilter(dataFilter)}
        onAdd={() => handleAdd()}
        onDelete={(id) => {}}
      />
    </SideBar>
  );
}
