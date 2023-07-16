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


const TaskItem = ({ task, onDelete, onUpdate, onUpdateTasks }) => {
  const ProjectName = [
    { label: "Electronic Health Record" },
    { label: "API Factory" },
    { label: "Selection Exam" },
  ];   
  const [StatusBacklog, setStatusBacklog] = useState([]);
  const [taskData, setTaskData] = useState(task);

  const getStatusBacklog = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: '/ol/status?search=',      
    })
    const data = res.data.map(item => ({id : item.id, name: item.attributes.name}));    

    setStatusBacklog(data)
  }
  
  useEffect(() => {
    getStatusBacklog()
    onUpdate(taskData);
  }, [taskData]);

  const handleChange = (event) => {    
      const { name, value } = event.target;
        setTaskData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
  }; 

  const handleDelete = () => {
    onDelete(taskData.id);
    onUpdateTasks(taskData.id);
  };

  return (
    <Accordion key={taskData.id} sx={{ boxShadow: 'none', width: '100%' }}>
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
              Task {taskData.id} / {taskData.taskCode}
            </Typography>
          </AccordionSummary>
        </Grid>
        <Grid item>
          <Button
            variant='cancelButton'
            color="error"
            onClick={handleDelete}
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
              style={{ paddingRight: "10px" }}
              focused
              name='taskName'
              value={taskData.taskName}
              onChange={handleChange}
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
                variant="outlined"
                name="priority"
                value={taskData.priority}
                onChange={(event, newValue) => {
                  setTaskData((prevData) => ({
                    ...prevData,
                    priority: newValue.toString(),
                  }));
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: "30px" }}>
          <Grid item xs={6}>
            <FormInputText
              style={{ paddingRight: "10px" }}
              focused
              value={taskData.taskDescription}
              onChange={handleChange}
              name='taskDescription'
              className='input-field-crud'
              placeholder='e.g Create Login Screen - Front End'
              label='Task Decription'
            />                   
          </Grid>
          <Grid item xs={6}>
            <Autocomplete                                
                  disablePortal
                  id="combo-box-demo"
                  name='statusBacklog'
                  options={StatusBacklog}
                  value={taskData.statusBacklog ? StatusBacklog.find((option) => option.id === taskData.statusBacklog) : null}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setTaskData((prevData) => ({
                        ...prevData,
                        statusBacklog: newValue.id,
                      }))
                    } else {
                      setTaskData((prevData) => ({
                        ...prevData,
                        statusBacklog: null,
                      }))
                    }
                  }}
                  sx={{ width: "100%" }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}                             
                      label="Backlog Status"
                      placeholder="Select Status"
                    />
                  )}
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
              value={taskData.estimationTime}
              onChange={handleChange}
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
                value={taskData.assignedTo}
                options={ProjectName}
                onChange={handleChange}              
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
  );
};

const CreateNewBacklog = () => {
  const [ProjectName, setProjectName] = useState([]);
  const [isSave, setIsSave] = useState(false)  
  const [addTask, setAddTask] = React.useState(false);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [opencancel, setOpencancel] = React.useState(false);
  const [valueproject, setValueproject] = React.useState();
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
    setOpencancel(true);    
  };

  const handleClose = () => {   
    setOpen(false);
  };

  const handleClosecancel = () => {
    setOpencancel(false);
  };

  const SubmitcancelData = () => {
    if (!isSave) {
      navigate('/masterbacklog')
    }
    setIsSave(false)
    setOpencancel(false)
  }

  const handleUpdateTasks = (deletedTaskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === deletedTaskId) {
        return null; 
      }
      if (task.id > deletedTaskId) {
        return {
          ...task,
          id: task.id - 1,
        };
      }
      return task;
    });  
    const filteredTasks = updatedTasks.filter((task) => task !== null); 
    setTasks(filteredTasks);
  };

  const handleDeleteTask = (taskId) => {
    handleUpdateTasks(taskId);
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleUpdateTask = (updatedTask) => {
    console.log("updatedTask NYA",updatedTask)
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const confirmSave = async () => {
    console.log("Datanya",tasks)
    setIsSave(true)
    setOpen(true)    
  }

  const handleClickTask = () => {
    setAddTask(true);
    const newTask = {
      id: tasks.length + 1,
      projectId : valueproject,
      statusBacklog: null,
      userId : 2,
      taskName: '',
      taskDescription: '',
      estimationTime: null,
      actualTime: 5,
      estimationDate: "2023-08-07",
      actualDate: "2023-08-07",
      createdBy: 1,
      updatedBy: 1,
      priority: '0',           
      taskCode:`T-WR-00${tasks.length + 1}`,        
    };
    const newTasks = JSON.parse(JSON.stringify(tasks));
    newTasks.push(newTask);
    setTasks(newTasks);
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
      taskName:'',
      taskDescription: '',
      estimationTime:'',
      statusBacklog:'',
    }
  })

  const onSave = async () => {
    try {      
      for (let i = 0; i < tasks.length; i++) {
        const taskObject = tasks[i];        
      const res = await client.requestAPI({
        method: 'POST',
        endpoint: '/backlog/addBacklog',
        data: taskObject,
      });
  
      if (res.data.meta.message) {
        setDataAlert({
          severity: 'success',
          open: true,
          message: res.data.meta.message
        });
  
        setTimeout(() => {
          navigate('/masterbacklog');
        }, 3000);
      }
      setOpen(false);
    }} catch (error) {
      console.error('Error:', error);
    }
  };

  const getProjectName = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: '/ol/project?search=',      
    })
    const data = res.data.map(item => ({id : item.id, name: item.attributes.name}));
    console.log("DATA PROJECT", data)

    setProjectName(data)
  }

useEffect(() => {
  getProjectName()
},[])

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
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {                                            
                      if (!newValue) {                    
                        setAddTask(false);
                        setTasks([])                        
                      }else{
                        setValueproject(parseInt(newValue.id));
                      }                      
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Project Name" />
                    )}
                  />
                  
                  {addTask && valueproject ? (
                    <>
                    {tasks.map((task, index) => (
                         <TaskItem
                         key={task.id}
                         task={task}
                         onDelete={handleDeleteTask}
                         onUpdate={handleUpdateTask}
                         onUpdateTasks={handleUpdateTasks}
                       />
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
                        variant="saveButton"
                        type="submit"
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

                <Dialog
                    open={opencancel}
                    onClose={handleClosecancel}
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
                        variant='cancelButton'
                        onClick={SubmitcancelData}
                      >
                        Cancel Without Saving
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleClosecancel}
                        autoFocus
                      >
                        Back
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
