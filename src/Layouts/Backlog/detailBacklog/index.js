import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import SideBar from "../../../Component/Sidebar";

//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//acordion
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//rating
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

//assets
import Allura from "../../../assets/Allura.png";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

const DetailBacklog = () => {
  const ContractStatus = [
    { label: "Electronic Health Record" },
    { label: "API Factory" },
    { label: "Selection Exam" },
  ];
  const [isEdit, setIsEdit] = React.useState(false);
  const [addTask, setAddTask] = React.useState(true);
  const [valuerating, setValuerating] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [valueproject, setValueproject] = useState({
    label: "Electronic Health Record",
  });
  const [open1, setOpen1] = React.useState(false);

  const dataBread = [
    {
      href: "/dashboard",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masteremployee",
      title: "Master Backlog",
      current: false,
    },
    {
      href: "/",
      title: "Detail Backlog",
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
      href: "/masteremployee",
      title: "Master Backlog",
      current: false,
    },
    {
      href: "/",
      title: "Edit Backlog",
      current: true,
    },
  ];

  const clickEdit = () => {
    setIsEdit(true);
  };
  const handleClickTask = () => {
    setAddTask(true);
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
                    <Header judul="Edit Backlog" />
                  </Grid>
                  <Grid item />
                </Grid>

                <Grid container className="HeaderDetail">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={ContractStatus}
                    sx={{ width: "100%", marginTop: "8px" }}
                    getOptionLabel={(option) => option.label}
                    value={valueproject}
                    onChange={(event, newValue) => {
                      setValueproject(newValue);
                      if (!newValue) {
                        console.log("kosong");
                        setAddTask(false);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Project Name" />
                    )}
                  />
                  {addTask ? (
                    <>
                      <Accordion sx={{ boxShadow: "none", width: "100%" }}>
                        <Grid
                          container
                          direction="row"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginRight: "80%",
                          }}
                        >
                          <Grid item>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography sx={{ fontSize: "24px" }}>
                                Task 1 / T-WR-0011
                              </Typography>
                            </AccordionSummary>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="outlined"
                              color="error"
                              startIcon={<DeleteOutline />}
                              style={{ marginRight: "10px" }}
                            >
                              Delete Task
                            </Button>
                          </Grid>
                        </Grid>

                        <AccordionDetails>
                          <Grid container direction="row">
                            <Grid item xs={6}>
                              <TextField
                                placeholder="e.g Create Login Screen"
                                style={{ width: "100%", paddingRight: "10px" }}
                                id="outlined-error-helper-text"
                                label="Task Name"
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ width: "100%", paddingLeft: "10px" }}>
                                <Typography
                                  component="legend"
                                  sx={{ color: "grey" }}
                                >
                                  Priority
                                </Typography>
                                <Rating
                                  name="simple-controlled"
                                  value={valuerating}
                                  onChange={(event, newValue) => {
                                    setValuerating(newValue);
                                  }}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            direction="row"
                            style={{ marginTop: "30px" }}
                          >
                            <Grid item xs={6}>
                              <TextField
                                placeholder="e.g Create Login Screen - Front End"
                                style={{ width: "100%", paddingRight: "10px" }}
                                id="outlined-error-helper-text"
                                label="Task Decription"
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                placeholder="e.g To Do"
                                style={{ width: "100%" }}
                                id="outlined-error-helper-text"
                                label="Backlog Status"
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            direction="row"
                            style={{ marginTop: "30px" }}
                          >
                            <Grid item xs={6}>
                              <TextField
                                placeholder="e.g 1 Hour"
                                style={{ width: "100%", paddingRight: "10px" }}
                                id="outlined-error-helper-text"
                                label="Estimation Duration"
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={ContractStatus}
                                sx={{ width: "100%" }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Assigned To"
                                    placeholder="Select Talent"
                                  />
                                )}
                              />
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </>
                  ) : (
                    <>
                      <Grid
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img src={Allura} width="396px" height="188px" />
                        <Typography
                          sx={{
                            marginTop: "20px",
                            fontFamily: "Poppins",
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "24px",
                            letterSpacing: "0em",
                            textAlign: "left",
                          }}
                        >
                          Sorry, the data you are looking for could not be found
                        </Typography>
                      </Grid>
                    </>
                  )}
                  <Grid container direction="row" sx={{ width: "100%" }}>
                    <Grid
                      item
                      xs={6}
                      alignSelf="center"
                      textAlign="left"
                      sx={{ marginTop: "20px" }}
                    >
                      <Button
                        disabled={!valueproject}
                        color="success"
                        variant="contained"
                        onClick={handleClickTask}
                        style={{ marginRight: "10px" }}
                      >
                        + Add Task
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      alignSelf="center"
                      textAlign="right"
                      sx={{ marginTop: "20px" }}
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
                  </Grid>

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
                        Save your progress: Don't forget to save your data
                        before leaving
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button variant="outlined" onClick={handleClose}>
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        onClick={SubmitSave}
                        autoFocus
                      >
                        Save Data
                      </Button>
                    </DialogActions>
                  </Dialog>
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
                    <Header judul="Detail Backlog" />
                  </Grid>

                  <Grid item />

                  <Grid item xs={2} alignSelf="center" textAlign="right">
                    <Button
                      variant="outlined"
                      startIcon={<CreateIcon />}
                      style={{ marginRight: "10px" }}
                      onClick={clickEdit}
                    >
                      Edit Data Backlog
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
                          style={{ padding: "20px" }}
                        >
                          <Grid item xs={12}>
                            <Typography variant="backlogDetail">
                              Electronic Health Record
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          direction="row"
                          style={{ padding: "20px" }}
                        >
                          <Grid item xs={5}>
                            <Typography variant="backlogDetail">
                              Create Mockup Screen Dashboard
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography variant="backlogDetail">::</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="backlogDetail">
                              Task 1 / T-WR-0011
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          direction="row"
                          style={{ padding: "30px" }}
                        >
                          <Grid item xs={4}>
                            <Typography
                              sx={{ color: "text.secondary", fontSize: "12px" }}
                            >
                              Task Description
                            </Typography>
                            <Typography variant="employeeDetail">
                              Create Mockup Screen Dashboard - UI/UX
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              sx={{ color: "text.secondary", fontSize: "12px" }}
                            >
                              Backlog Status
                            </Typography>
                            <Typography variant="employeeDetail">
                              Todo
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              sx={{ color: "text.secondary", fontSize: "12px" }}
                            >
                              Priority
                            </Typography>
                            <Typography variant="employeeDetail">
                              abc
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          direction="row"
                          style={{ padding: "30px" }}
                        >
                          <Grid item xs={4}>
                            <Typography
                              sx={{ color: "text.secondary", fontSize: "12px" }}
                            >
                              Assigned To
                            </Typography>
                            <Typography variant="employeeDetail">
                              Abdan Hafidzul
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              sx={{ color: "text.secondary", fontSize: "12px" }}
                            >
                              Estimation Duration
                            </Typography>
                            <Typography variant="employeeDetail">
                              3 Hours
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              sx={{ color: "text.secondary", fontSize: "12px" }}
                            >
                              Actual Duration
                            </Typography>
                            <Typography variant="employeeDetail">
                              3 Hours
                            </Typography>
                          </Grid>
                        </Grid>
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

export default DetailBacklog;
