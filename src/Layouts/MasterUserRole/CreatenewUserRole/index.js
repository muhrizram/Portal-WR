import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import SideBar from "../../../Component/Sidebar";
import TextField from "@mui/material/TextField";
import Divider from '@mui/material/Divider';
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";

//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//form
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const CreateUserRole = () => {
  const [open, setOpen] = React.useState(false);  
  const [open1, setOpen1] = React.useState(false);
  const navigate = useNavigate();
  const UserName = [
    "02/01/03/23 - Fahreja Abdullah", 
  ];
  const dataBread = [
    {
      href: "/dashboard",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masteruserrole",
      title: "Master User Role",
      current: false,
    },
    {
      href: "/",
      title: "Create User Role",
      current: true,
    },
  ];


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
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const SubmitSave = () => {
    navigate("/masteruserrole");
    localStorage.setItem("isCreate", true);
    setOpen(false);    
  };

  return (
    <>
      <SideBar>
            <Breadcrumbs breadcrumbs={dataBread} />
            <Grid container rowSpacing={2.5}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={9.9}>
                    <Header judul="Create User Role" />
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
                                options={UserName}
                                sx={{ width: "100%" }}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="User Name"
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
                              <FormControlLabel control={<Checkbox  />} label="Administrator" />
                              <FormControlLabel control={<Checkbox  />} label="HRD" />
                              <FormControlLabel control={<Checkbox  />} label="Team Lead of Project" />
                            </FormGroup>
                            </Grid>
                            <Grid item xs={6}>
                            <FormGroup>
                              <FormControlLabel control={<Checkbox  />} label="Employee" />
                              <FormControlLabel control={<Checkbox  />} label="Finance" />
                              <FormControlLabel control={<Checkbox  />} label="Talent Off" />
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
          
      </SideBar>
    </>
  );
};

export default CreateUserRole;
