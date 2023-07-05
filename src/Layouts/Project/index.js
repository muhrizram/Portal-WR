import React from "react";
import SideBar from "../../Component/Sidebar";
import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import Header from "../../Component/Header";
import DataTable from "../../Component/DataTable";
import dataJson from "./initData.json";

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

  const data = dataJson.content;

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
        onDetail={(id) => console.log("on detail: ", id)}
        onDelete={(id) => {}}
      />
    </SideBar>
  );
}
