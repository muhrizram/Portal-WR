import React, { useState, useEffect,useContext } from "react";
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
import { AlertContext } from '../../../context';

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
  const [AssignedTo, setAssignedTo] = useState([]);
  const getAssignedTo = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: '/ol/userList?search=',      
    })
    const data = res.data.map(item => ({id : parseInt(item.id), fullName: item.attributes.fullName, groupName: item.attributes.groupName}));    
    setAssignedTo(data)
  }
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
    getAssignedTo()
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
              name="statusBacklog"
              options={AssignedTo}
              value={AssignedTo.find((option) => option.fullName === taskData.assignedTo) || null}
              getOptionLabel={(option) => option.fullName}
              onChange={(event, newValue) =>
                setTaskData((prevData) => ({
                  ...prevData,
                  assignedTo: newValue ? newValue.fullName : null, 
                }))
              }
              sx={{ width: "100%" }}
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
  const { setDataAlert } = useContext(AlertContext)
  const [ProjectName, setProjectName] = useState([]);
  const [isSave, setIsSave] = useState(false)  
  const [addTask, setAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [valueproject, setValueproject] = React.useState();

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

  const handleClickOpenCancel = () => {
    setIsSave(false)
    setOpen(true);
  };

  const handleClickOpenSave = () => {
    setIsSave(true)
    setOpen(true);    
  };

  const handleClose = () => {   
    setOpen(false);
  };

  const handleCloseOpenCancelData = () => {
    if (!isSave){
      navigate('/masterbacklog')
    }
    setOpen(false);    
  };

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
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const confirmSave = async () => {    
    setIsSave(true)
    setOpen(true)    
  }
  
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + 1)
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  const day = ('0' + currentDate.getDate()).slice(-2);
  const formattedDate = year + '-' + month + '-' + day;

  const handleClickTask = () => {
    setAddTask(true);
    const newTask = {
      id: tasks.length + 1,
      projectId : valueproject,
      statusBacklog: null,
      userId : parseInt(localStorage.getItem('userId')),
      taskName: '',
      taskDescription: '',
      estimationTime: null,
      actualTime: '',
      estimationDate: formattedDate,
      actualDate: formattedDate,
      createdBy: parseInt(localStorage.getItem('userId')),
      updatedBy: parseInt(localStorage.getItem('userId')),
      priority: '',           
      taskCode:`T-WR-00${tasks.length + 1}`,        
    };
    const newTasks = JSON.parse(JSON.stringify(tasks));
    newTasks.push(newTask);
    setTasks(newTasks);
  };

  const methods = useForm({
    resolver: yupResolver(shemabacklog),
    defaultValues: {
      taskName:'',
      taskDescription: '',
      estimationTime:'',
    }
  })

  const SubmitSave = async () => {
    if (!isSave){
      setOpen(false);
    }
    else {
      try {      
        for (let i = 0; i < tasks.length; i++) {
          const taskObject = tasks[i];        
        const res = await client.requestAPI({
          method: 'POST',
          endpoint: '/backlog/addBacklog',
          data: taskObject,
        });
        console.log(taskObject)
    
        if(!res.isError){
          setDataAlert({
            severity: 'success',
            open: true,
            message: res.data.meta.message
          }) 
    
          setTimeout(() => {
            navigate('/masterbacklog');
          }, 3000);
        }
        else {          
          setDataAlert({
            severity: 'error',
            message: res.error.detail,
            open: true
          })
          setOpen(false);
        }
        setOpen(false);
      }} catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const getProjectName = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: '/ol/project?search=',      
    })
    const data = res.data.map(item => ({id : item.id, name: item.attributes.name}));    
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
                        setTasks([])
                        setAddTask(false);
                        setValueproject(undefined);
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
                    <Grid item xs textAlign='right'>
                    <Button
                      style={{ marginRight: '16px' }} 
                      variant='cancelButton'
                      onClick={() => handleClickOpenCancel()}
                    >
                      Cancel Data
                    </Button>
                    <Button                    
                      disabled={tasks.length === 0}
                      variant='saveButton'
                      type='button'
                      onClick={handleClickOpenSave}
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
                      {isSave ? 'Save Data' : 'Cancel Data'}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          {isSave ? "Save your progress: Don't forget to save your data before leaving" : "Warning: Canceling will result in data loss without saving!"}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions className="dialog-delete-actions">
                        <Button variant="cancelButton" onClick={handleCloseOpenCancelData}>
                          {isSave ? "Back" : "Cancel without saving"}
                        </Button>
                        <Button variant="saveButton" onClick={SubmitSave} autoFocus>
                          {isSave ? 'Save Data' : 'Back'}
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
