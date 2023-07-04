import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import Breadcrumbs from "../../Component/BreadCumb";
import Header from "../../Component/Header";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SideBar from "../../Component/Sidebar";

//acordion
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//rating
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

//assets
import Allura from "../../assets/Allura.png";

const CreateNewBacklog = () => {
  const ContractStatus = [
    { label: "Electronic Health Record" },
    { label: "API Factory" },
    { label: "Selection Exam" },
  ];
  const [isEdit, setIsEdit] = React.useState(false);
  const [addTask, setAddTask] = React.useState(false);
  const [valuerating, setValuerating] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [valueproject, setValueproject] = React.useState("");
  const [open1, setOpen1] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(valueproject);
    console.log(addTask);
  });

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
      title: "Create New Backlog",
      current: true,
    },
  ];

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

  const SubmitSave = () => {
    setOpen(false);
    setIsEdit(false);
  };

  return (
    <>
      <SideBar>
        <Breadcrumbs breadcrumbs={dataBread} />
        <Grid container rowSpacing={2.5}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={9.9}>
                <Header judul="Create New Backlog" />
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
            </Grid>
          </Grid>
        </Grid>
      </SideBar>
    </>
  );
};

export default CreateNewBacklog;
