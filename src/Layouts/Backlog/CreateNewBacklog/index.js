import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { yupResolver } from '@hookform/resolvers/yup';
import FormInputText from '../../../Component/FormInputText';
import { FormProvider, useForm } from "react-hook-form";
import client from '../../../global/client';
import shemabacklog from '../shema';

//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SideBar from "../../../Component/Sidebar";

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

const CreateNewBacklog = () => {
  const ProjectName = [
    { label: "Electronic Health Record" },
    { label: "API Factory" },
    { label: "Selection Exam" },
    { label: "" },
  ];
  const [sendData, setData] = useState({})
  const [isSave, setIsSave] = useState(false)  
  const [addTask, setAddTask] = React.useState(false);
  const [tasks, setTasks] = useState([]);
  const [valuerating, setValuerating] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [valueproject, setValueproject] = React.useState("");  
  const [dataAlert, setDataAlert] = useState({
    open: false,
    severity: 'success',
    message: ''
  })
  const navigate = useNavigate();  

  const dataBread = [
    {
      href: "/dashboard",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masterbacklog",
      title: "Master Backlog",
      current: false,
    },
    {
      href: "/",
      title: "Create New Backlog",
      current: true,
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
    console.log(open);
  };

  const handleClose = () => {
    if (!isSave) {
      navigate('/master-company')
    }
    setOpen(false);
  };

  const cancelData = () => {
    setIsSave(false)
    setOpen(true)
  }

  const DeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
     setTasks(updatedTasks);
  };

  const confirmSave = async (data) => {
    console.log("Datanya",data)
    setIsSave(true)
    setOpen(true)
    setData(data)
  }

  const handleClickTask = () => {
    setAddTask(true);
    const newTask = {
      id: tasks.length + 1, 
      taskName: '',
      taskDescription: '',
      estimationTime: '',
      statusBacklog: '',
    };
    setTasks([...tasks, newTask]);
  };

  const methods = useForm({
    resolver: yupResolver(shemabacklog),
    defaultValues: {      
      projectId: '',
      userId: '',
      actualTime:'',   
      taskCode:'',
      //
      projectName:'',
      priority:'',
      taskName: '',
      taskDescription: '',
      estimationTime:'',
      statusBacklog:'',
    }
  })

  const onSave = async () => {
    const data = {
      ...sendData,
    }
    console.log("INI DATA",data)
    // const res = await client.requestAPI({
    //   method: 'POST',
    //   endpoint: '/backlog/addBacklog',
    //   data
    // })
    // if (res.data.meta.message) {
    //   setDataAlert({
    //     severity: 'success',
    //     open: true,
    //     message: res.data.meta.message
    //   })
    //   setTimeout(() => {
    //     navigate('/masterbacklog')
    //   }, 3000)
    // }
    setOpen(false);
    
  }

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
            <Grid className="HeaderDetail" >
              <Grid item xs={12}>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(confirmSave)}>
                  <Autocomplete                    
                    disablePortal
                    id="combo-box-demo"
                    name="projectName"
                    options={ProjectName}
                    sx={{ width: "100%", marginTop: "8px" }}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {
                      setValueproject(newValue);
                      if (!newValue) {                    
                        setAddTask(false);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Project Name" />
                    )}
                  />
                  {addTask ? (
                    <>
                    {tasks.map((task, index) => (
                      <Accordion key={task.id} sx={{ boxShadow: 'none', width: '100%' }}>
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
                                Task {index + 1} / T-WR-0011
                              </Typography>
                            </AccordionSummary>
                          </Grid>
                          <Grid item>
                            <Button
                              variant='cancelButton'
                              color="error"
                              onClick={() => DeleteTask(task.id)}
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
                            <FormInputText
                              style={{ paddingRight: "10px" }}
                              focused
                              name='taskName'
                              className='input-field-crud'
                              placeholder='e.g Create Login Screen"'
                              label='Task Name'
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
                                  name="priority"
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
                            <FormInputText
                              style={{ paddingRight: "10px" }}
                              focused
                              name='taskDescription'
                              className='input-field-crud'
                              placeholder='e.g Create Login Screen - Front End'
                              label='Task Decription'
                            />                   
                            </Grid>
                            <Grid item xs={6}>
                            <FormInputText                          
                              focused
                              name='statusBacklog'
                              className='input-field-crud'
                              placeholder='e.g To Do'
                              label='Backlog Status'
                            />          
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            direction="row"
                            style={{ marginTop: "30px" }}
                          >
                            <Grid item xs={6}>
                            <FormInputText
                              style={{ paddingRight: "10px" }}
                              focused
                              name='estimationTime'
                              className='input-field-crud'
                              placeholder='e.g 1 Hour'
                              label='Estimation Duration'
                            />
                            </Grid>
                            <Grid item xs={6}>
                              <Autocomplete                                
                                disablePortal
                                id="combo-box-demo"
                                options={ProjectName}                            
                                sx={{ width: "100%" }}
                                getOptionLabel={(option) => option.label || ""}
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
                    ))}
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
                        onClick={handleClickOpen}
                        variant='cancelButton'
                        style={{ marginRight: "10px" }}
                        color="error"
                      >
                        Cancel Data
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                        onClick={handleClickOpen}
                        style={{ marginRight: "10px" }}
                      >
                        Save Data
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </FormProvider>

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
                    <Button variant="contained" onClick={onSave} autoFocus>
                      Save Data
                    </Button>
                  </DialogActions>
                </Dialog>         
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SideBar>
    </>
  );
};

export default CreateNewBacklog;
