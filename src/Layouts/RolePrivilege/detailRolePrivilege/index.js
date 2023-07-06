import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import SideBar from "../../../Component/Sidebar";
import TextField from "@mui/material/TextField";
import Divider from '@mui/material/Divider';
import Autocomplete from "@mui/material/Autocomplete";

//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//timeline
import Timeline from "@mui/lab/Timeline";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

//form
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const DetailPrivilege = () => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [role,setRole] = useState(["Working Report","Job Group"])
  const [open1, setOpen1] = React.useState(false);
  const Role = [
    "Employee",
  ];

  const dataBread = [
    {
      href: "/dashboard",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masterroleprivilege",
      title: "Master Role Privilege",
      current: false,
    },
    {
      href: "/",
      title: "Detail Privilege",
      current: true,
    },
  ];

  const dataBread2 = [
    {
      href: "/dashboard",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masterroleprivilege",
      title: "Master Role Privilege",
      current: false,
    },
    {
      href: "/",
      title: "Edit Role Privilege",
      current: true,
    },
  ];

  const clickEdit = () => {
    setIsEdit(true);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
    console.log(open);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseOpenCancelData = () => {
    setOpen1(false);
    setIsEdit(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const SubmitSave = () => {
    setOpen(false);
    setIsEdit(false);
  };

  return (
    <>
      <SideBar>
        {isEdit ? (
          <>
            <Breadcrumbs breadcrumbs={dataBread2} />
            <Grid container rowSpacing={2.5}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={9.9}>
                    <Header judul="Edit Role Privilege" />
                  </Grid>
                  <Grid item />                 
                </Grid>

                <Grid container className="HeaderDetail">
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs container direction="column" spacing={2}>                                              
                        <Grid style={{ padding: "30px" }}>                          
                        <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={Role}
                                fullWidth
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Role"
                                    placeholder="Select User"
                                  />
                                )}
                              />
                        </Grid>  
                        <Divider sx={{marginLeft:"20px", marginBottom:"30px"}}/>   
                        <Typography
                              sx={{marginLeft:"20px", fontSize: "18px", fontWeight:"bold" }}
                            >
                              Role
                            </Typography>
                            <Grid container direction="row" sx={{marginLeft:'30px'}}>
                              <Grid item xs={6}>
                            <FormGroup>
                              <FormControlLabel control={<Checkbox defaultChecked />} label="Working Report" />
                              <FormControlLabel control={<Checkbox  />} label="Employee" />
                              <FormControlLabel control={<Checkbox />} label="Project" />
                              <FormControlLabel control={<Checkbox />} label="Holiday" />
                              <FormControlLabel control={<Checkbox />} label="Role Privilege" />
                            </FormGroup>
                            </Grid>
                            <Grid item xs={6}>
                            <FormGroup>
                              <FormControlLabel control={<Checkbox defaultChecked />} label="Job Group" />
                              <FormControlLabel control={<Checkbox  />} label="Company" />
                              <FormControlLabel control={<Checkbox  />} label="Backlog" />
                              <FormControlLabel control={<Checkbox  />} label="User Role" />
                              <FormControlLabel control={<Checkbox  />} label="Inaccessible" />
                            </FormGroup>
                            </Grid>
                            </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                  item
                  xs={12}
                  alignSelf="center"
                  textAlign="right"                  
                >
                  <Button
                    onClick={handleClickOpen1}
                    variant="outlined"
                    style={{ marginRight: "10px" }}
                    color="error"
                  >
                    Cancel Data
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    style={{ marginRight: "10px" }}
                  >
                    Save Data
                  </Button>
                </Grid>
                <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="dialog-delete"
              >
                <DialogTitle
                  sx={{
                    alignSelf: "center",
                    fontSize: "30px",
                    fontStyle: "Poppins",
                  }}
                  id="alert-dialog-title"
                >
                  {"Save Data"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Save your progress: Don't forget to save your data before
                    leaving
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant="outlined" onClick={handleClose}>
                    Back
                  </Button>
                  <Button variant="contained" onClick={SubmitSave} autoFocus>
                    Save Data
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="dialog-delete"
                  >
                    <DialogTitle
                      sx={{
                        alignSelf: "center",
                        fontSize: "30px",
                        fontStyle: "Poppins",
                      }}
                      id="alert-dialog-title"
                    >
                      {"Cancel Save Data"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Warning: canceling with result in data loss without
                        saving!
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="outlined"
                        onClick={handleCloseOpenCancelData}
                      >
                        Cancel Without Saving
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleClose1}
                        autoFocus
                      >
                        Back
                      </Button>
                    </DialogActions>
                  </Dialog>
                  </>
                </Grid>
              </Grid>
            </Grid>            
          </>
        ) : (
          <>
            <Breadcrumbs breadcrumbs={dataBread} />
            <Grid container rowSpacing={2.5}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={9.9}>
                    <Header judul="Detail Privilege" />
                  </Grid>

                  <Grid item />

                  <Grid item xs={2} alignSelf="center" textAlign="right">
                    <Button
                      variant="outlined"
                      startIcon={<CreateIcon />}
                      style={{ marginRight: "10px", padding: "4px 10px"}}
                      onClick={clickEdit}
                    >
                      Edit Data Role Privilege
                    </Button>
                  </Grid>
                </Grid>

                <Grid container className="HeaderDetail">
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs container direction="column" spacing={2}>                                              
                        <Grid
                          container
                          direction="row"
                          style={{ padding: "30px" }}
                        >
                          <Grid item xs={4}>
                            <Typography
                              sx={{ color: "text.secondary", fontSize: "12px" }}
                            >
                              Role
                            </Typography>
                            <Typography  sx={{fontSize: "16px" }} >
                              Employee
                            </Typography>
                          </Grid>                                                   
                        </Grid>  
                        <Divider sx={{marginLeft:"20px", marginBottom:"30px"}}/>   
                        <Typography
                              sx={{marginLeft:"20px", fontSize: "18px", fontWeight:"bold" }}
                            >
                              Role
                            </Typography>
                            <Timeline>
                              {role.map((item,index) => (
                              <Grid key={index} sx={{ display: "flex", alignItems: "center",marginLeft:'7px' }}>
                                <TimelineDot color="primary" />
                                <TimelineContent>{item}</TimelineContent>
                              </Grid>
                              ))}          
                            </Timeline>
                      </Grid>
                    </Grid>
                  </>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </SideBar>
    </>
  );
};

export default DetailPrivilege;
