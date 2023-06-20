import React from "react";
import Grid from "@mui/material/Grid";
import { Typography, Button } from "@mui/material";
import FileDownload from "@mui/icons-material/FileDownload";
import Settings from "@mui/icons-material/Settings";
import SearchBar from "../../Component/Searchbar";
import { DataGrid } from "@mui/x-data-grid";
import datatemp from "./initjson.json";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import logo from "../../assets/avatar.png";
import DatePickerComp from "../../Component/Datepicker";
import Calendar from "../../Component/Calendar";


const Jobgroup = () => {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "",
      width: 200,
      renderCell: () => {
        return (
          <div>
            <DriveFileRenameOutlineOutlinedIcon className="iconTable" />
            <DeleteOutlineOutlinedIcon className="iconTable" />
          </div>
        );
      },
    },
  ];
  const data = datatemp.datatemp;

  const handleChangeSearch = (event) => {
    console.log("value search: ", event.target.value);
  };
  return (
    <>    
    <Grid container rowSpacing={2.5}>
      <Grid item xs={12}>
        <Grid container className="containerHeader">
          <div className="dividerHeader" />
          <Grid item xs={9.9}>
            <Typography variant="headerCardMenu">Working Report</Typography>
          </Grid>
          <Grid item />

          <Grid item xs={2} alignSelf="center" textAlign="right">
            
              <div className="buttonContainer">
                <Button variant="contained" startIcon={<FileDownload />}>
                  Download
                </Button>
                <Button variant="outlined" startIcon={<Settings />}>
                  Settings
                </Button>
              </div>
            
          </Grid>
          <img src={logo} alt="logo" className="fotoprofile" />
          <h1>Employee Details</h1>
          <div className="containeremployee">
            <p className="name">Name</p>
            <p className="name">Role</p>
            <p className="name">Email</p>
          </div>
          <div className="containeremployeevalue">
            <strong className="namevalue">Diaz</strong>
            <strong className="namevalue">FrontEnd</strong>
            <strong className="namevalue">diazazhari32@gmail.com</strong>
          </div>
        </Grid>
      </Grid>
      {/* <DatePickerComp/> */}
      {/* <Grid item xs={12}>
        <Typography variant="searchTitleText">Search by group name</Typography>
      </Grid>
      <Grid item xs={12}>
        <SearchBar placeholder="project" onChange={handleChangeSearch} />
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick
          hideFooter
        />
      </Grid> */}
    </Grid>
      <Calendar/>
    </>
  );
};

export default Jobgroup;
