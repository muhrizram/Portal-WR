import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import SideBar from "../../../Component/Sidebar";
import { DeleteOutline } from "@mui/icons-material";
import client from "../../../global/client";
import FormInputText from '../../../Component/FormInputText';
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AlertContext } from '../../../context';

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

const TaskItem = ({ task, onDelete, onUpdate,onUpdateTasks }) => {
  const [AssignedTo, setAssignedTo] = useState([]);
  const [StatusBacklog, setStatusBacklog] = useState([]);
  const [taskData, setTaskData] = useState(task);

  const getAssignedTo = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: '/ol/userList?search=',      
    })
    const data = res.data.map(item => ({id : parseInt(item.id), fullName: item.attributes.fullName, groupName: item.attributes.groupName}));    
    setAssignedTo(data)
  }

  const getStatusBacklog = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: '/ol/status?search=',      
    })
    const data = res.data.map(item => ({id : parseInt(item.id), name: item.attributes.name}));       
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
              name="statusBacklog"
              options={StatusBacklog}
              value={StatusBacklog.find((option) => option.id === taskData.statusBacklog) || null}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) =>
                setTaskData((prevData) => ({
                  ...prevData,
                  statusBacklog: newValue ? newValue.id : null, 
                }))
              }
              sx={{ width: "100%" }}
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

const DetailBacklog = () => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [addTask, setAddTask] = React.useState(true);  
  const [open, setOpen] = React.useState(false);
  const [dataDetail, setDataDetail] = useState({});  
  const [ProjectName, setProjectName] = useState([]); 
  const [tasks, setTasks] = useState([]);
  const [valueproject, setValueproject] = React.useState("");
  const [isSave, setIsSave] = useState(false)
  const { setDataAlert } = useContext(AlertContext)
  const navigate = useNavigate();  

  const dataBreadDetailBacklog = [
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
      title: "Detail Backlog",
      current: true,
    },
  ];

  const dataBreadEditBacklog = [
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
      title: "Edit Backlog",
      current: true,
    },
  ];

  const getStatusColor = (status) => {
    const statusColors = {
      'to do': '#FDECEB',
      'Backlog' : '#E6F2FB',
      'In Progress': '#E6F2FB',
      'Completed' : '#EBF6EE', 
      'Done': '#EBF6EE'
    };
    return statusColors[status] || '#ccc';
  };

  const getStatusFontColor = (status) => {
    const statusFontColors = {
      'to do': '#EE695D',
      'Backlog' : '#3393DF',
      'In Progress': '#3393DF',
      'Completed' : '#5DB975',
      'Done': '#5DB975'
    };
    return statusFontColors[status] || '#fff';
  };

  const clickEdit = () => {
    setIsEdit(true);
  };

  const handleClose = () => {    
    setOpen(false);
  };

  useEffect(() => {
    getProjectName()
    getDataDetail()    
  }, [])

  const getDataDetail = async () => {
    const idDetail = localStorage.getItem("idBacklog")
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/backlog/${idDetail}`
    })    
    rebuildDataDetail(res)
  };

  const rebuildDataDetail = (resData) => {
    const idInt = parseInt(resData.data.id);    
    let tempDetail = {
        id: idInt,
        projectId: resData.data.attributes.projectId,
        statusBacklog: resData.data.attributes.statusBacklog,
        userId: resData.data.attributes.userId,
        projectName: resData.data.attributes.projectName,
        status: resData.data.attributes.status,
        assignedTo: resData.data.attributes.assignedTo,
        taskName: resData.data.attributes.taskName,
        taskDescription: resData.data.attributes.taskDescription,
        estimationTime: resData.data.attributes.estimationTime,
        actualTime: resData.data.attributes.actualTime,
        createdBy: resData.data.attributes.createdBy,
        updatedBy: resData.data.attributes.updatedBy,
        createdOn: resData.data.attributes.createdOn,
        updatedOn: resData.data.attributes.updatedOn,
        priority: resData.data.attributes.priority,
        taskCode: resData.data.attributes.taskCode,        
      }        
    setDataDetail(tempDetail)
    const newTasks = [tempDetail];
    console.log('tempDetail: ', tempDetail)
    setTasks(newTasks);
  }

  const handleClickOpenSave = () => {
    setIsSave(true)
    setOpen(true);
    console.log(open);
  };
  
  const handleClickOpenCancel = () => {
    setIsSave(false)
    setOpen(true);
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
    setOpen(true)    
  }  

  const handleClickTask = () => {
    setAddTask(true);
    const newTask = {      
      
      id: tasks.length + 1,
      projectId : 1,
      statusBacklog: 64,
      userId : 2,
      taskName: '',
      taskDescription: '',
      estimationTime: 5,
      actualTime: 5,
      estimationDate: "2023-08-07",
      actualDate: "2023-08-07",
      createdBy: 1,
      updatedBy: 1,
      priority: '3',           
      taskCode:`T-WR-00${tasks.length + 1}`,
    };
    const newTasks = JSON.parse(JSON.stringify(tasks));
    newTasks.push(newTask);
    setTasks(newTasks);
  };

  const methods = useForm({
    // resolver: yupResolver(shemabacklog),
    defaultValues: {      
      projectId: valueproject,
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

  const SubmitSave = async () => {
    if (!isSave){
      setOpen(false);
    }else{    
      try {      
        for (let i = 0; i < tasks.length; i++) {
          const taskObject = tasks[i];        
          console.log("taskObject",taskObject)
        const res = await client.requestAPI({
          method: 'PUT',
          endpoint: `/backlog/${taskObject.id}`,
          data: taskObject,
        });
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
            message: res.error.meta.message,
            open: true
          })
        }
        setOpen(false);
      }} catch (error) {
        console.error('Error:', error);
      }
    }
  }

  const getProjectName = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: '/ol/project?search=',      
    })    
    const data = res.data.map(item => ({id : parseInt(item.id), name: item.attributes.name}));        
    setProjectName(data)
    
  }
  //diaz edit sampe sini

  return (
    <>
      <SideBar>
        {isEdit ? (
          <>
            <Breadcrumbs breadcrumbs={dataBreadEditBacklog} />
            <Grid container rowSpacing={2.5}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={9.9}>
                <Header judul="Edit Backlog" />
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
                    name="ProjectName"
                    options={ProjectName}      
                    defaultValue={ProjectName.find((option) => option.id === dataDetail.projectId) || null}
                    sx={{ width: "100%", marginTop: "8px" }}                    
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {             
                      setValueproject(parseInt(newValue.id));
                      if (!newValue) {                    
                        setAddTask(false);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Project Name" placeholder="Select Backlog" />
                    )}
                  />
                  {addTask ? (
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
                      variant='saveButton'
                      type='submit'
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
          </>
        ) : (
          <>
            <Breadcrumbs breadcrumbs={dataBreadDetailBacklog} />
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
                              Project - {dataDetail.projectName}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Accordion>
                          <Grid
                            container
                            direction="row"
                            style={{ padding: "20px" }}
                          >
                            <Grid item>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                  <Typography variant="backlogDetailText">
                                    {dataDetail.taskName} :: {dataDetail.taskCode}                                
                                  </Typography>
                              </AccordionSummary> 
                            </Grid>
                          </Grid>

                          <AccordionDetails>
                            
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
                                <Typography variant="descBaklog">
                                  {dataDetail.taskDescription}
                                </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography
                                  sx={{ color: "text.secondary", fontSize: "12px" }}
                                >
                                  Backlog Status
                                </Typography>
                                <Typography variant="descBaklog"
                                sx={{
                                  backgroundColor: getStatusColor(dataDetail.status),
                                  color: getStatusFontColor(dataDetail.status),
                                  padding: '5px 10px',
                                  gap: '10px',
                                  borderRadius: '4px',
                                  fontSize: '12px',
                                }}>
                                  {dataDetail.status}
                                </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography
                                  sx={{ color: "text.secondary", fontSize: "12px" }}
                                >
                                  Priority
                                </Typography>
                                {dataDetail && dataDetail.priority && (
                                  <Rating
                                      name="rating"
                                      value={parseFloat(dataDetail.priority)}
                                      readOnly
                                      precision={0.5}
                                  />
                                )}
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
                                <Typography variant="descBaklog">
                                  {dataDetail.assignedTo}
                                </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography
                                  sx={{ color: "text.secondary", fontSize: "12px" }}
                                >
                                  Estimation Duration
                                </Typography>
                                <Typography variant="descBaklog">
                                  {dataDetail.estimationTime}
                                </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography
                                  sx={{ color: "text.secondary", fontSize: "12px" }}
                                >
                                  Actual Duration
                                </Typography>
                                <Typography variant="descBaklog">
                                  {dataDetail.actualTime}
                                </Typography>
                              </Grid>
                            </Grid>

                          </AccordionDetails>
                        </Accordion>
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
