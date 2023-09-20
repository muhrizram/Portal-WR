import React, { useState, useEffect,useContext } from "react";
import Grid from "@mui/material/Grid";
import { Button, CircularProgress, Typography } from "@mui/material";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { yupResolver } from '@hookform/resolvers/yup';
import FormInputText from '../../../Component/FormInputText';
import { Controller, FormProvider, useForm } from "react-hook-form";
import client from '../../../global/client';
import createTaskSchema from "../shema";
import { AlertContext } from '../../../context';
import dayjs from "dayjs";

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

const TaskItem = ({ task, onDelete, onUpdate, onUpdateTasks, initialProject, idProject, taskCode, errors, control }) => {
  const [AssignedTo, setAssignedTo] = useState([]);
  const getAssignedTo = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/backlogUser?search=${idProject}`
    })
    const data = res.data.map(item => ({id : parseInt(item.id), fullName: item.attributes.userName}));    
    setAssignedTo(data)
  }
  const [StatusBacklog, setStatusBacklog] = useState([]);
  const [taskData, setTaskData] = useState(task);
  const [taskDataUpdate, setTaskDataUpdate] = useState(task);

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
    onUpdate(taskDataUpdate);
  }, [taskDataUpdate]);

  const handleChange = (event) => {    
      const { name, value } = event.target;
        setTaskDataUpdate((prevData) => ({
          ...prevData,
          [name]: value,
        }));
  }; 

  const handleDelete = () => {
    onDelete(taskData.id);
    onUpdateTasks(taskData.id);
  };

  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode < 48 || charCode > 57) && 
      charCode !== 46
    ) {
      event.preventDefault();
    }
  };

  return (
    <Accordion key={taskData.id} defaultExpanded sx={{ boxShadow: 'none', width: '100%', borderTop: taskData.id > 1 ?'' : 'solid 1px rgba(0, 0, 0, 0.12)', borderBottom:'solid 1px rgba(0, 0, 0, 0.12)' }}>
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
              T - {initialProject} - 00{taskData.id}
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
          <Grid item xs={12} sm={6} mt={2}>
            <FormInputText
              style={{ paddingRight: "10px" }}
              focused
              name={`taskName-${taskData.id}`}
              className='input-field-crud'
              placeholder='e.g Create Login Screen"'
              label='Task Name *'
              inputProps={{
                maxLength: 100,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} mt={2}>
          <Controller
            name={`priority-${taskData.id}`}
            control={control}
            render={({ field }) => (
            <Box sx={{ width: "100%", paddingLeft: "10px" }}>
              <Typography
                component="legend"
                sx={{ color: errors[`priority-${taskData.id}`] ? "#D32F2F" : "grey" }}
              >
                Priority *
              </Typography>
              <Rating
                variant="outlined"
                name={`priority-${taskData.id}`}
                value={field.value}
                onChange={(event, newValue) => {
                  field.onChange(newValue)
                  setTaskDataUpdate((prevData) => ({
                    ...prevData,
                    priority: newValue,
                  }));
                }}
              />
              {errors[`priority-${taskData.id}`] && (
                <Typography
                  color="#d32f2f"
                  textAlign={"left"}
                  fontSize={12}
                  paddingY={'3px'}
                  paddingX={'6px'}
                >
                  {errors[`priority-${taskData.id}`].message}
                </Typography>
              )}
            </Box>
                )}
                />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={12} sm={6} mt={2}>
            <FormInputText
              style={{ paddingRight: "10px" }}
              focused
              name={`taskDescription-${taskData.id}`}
              className='input-field-crud'
              placeholder='e.g Create Login Screen - Front End'
              label='Task Decription'
              inputProps={{
                maxLength: 255,
              }}
            />                   
          </Grid>
          <Grid item xs={12} sm={6} mt={2}>
          <Controller
            name={`statusBacklog-${taskData.id}`}
            control={control}
            render={({ field }) => (
              <Autocomplete                                
                  disablePortal
                  id="combo-box-demo"
                  name={`statusBacklog-${taskData.id}`}
                  options={StatusBacklog}
                  onChange={(event, newValue) => {
                    setTaskData((prevData) => ({
                      ...prevData,
                      statusBacklog: newValue ? newValue.id : null,
                    }))
                    setTaskDataUpdate((prevData) => ({
                      ...prevData,
                      statusBacklog: newValue ? newValue.id : null,
                    }))
                    field.onChange(newValue ? newValue.id : null)
                  }}
                  sx={{ width: "100%" }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}         
                      InputLabelProps={{ shrink: true }}                    
                      label="Backlog Status *"
                      placeholder="Select Status"
                      error={!!errors[`statusBacklog-${taskData.id}`]}
                      helperText={errors[`statusBacklog-${taskData.id}`] ? errors[`statusBacklog-${taskData.id}`].message : ''}
                    />
                  )}
                />  
            )}
          />         
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
        >
          <Grid item xs={12} sm={6} mt={2}>
            <FormInputText
              name={`estimationTime-${taskData.id}`}
              style={{ paddingRight: "10px" }}
              focused
              onKeyPress={handleKeyPress}
              className='input-field-crud'
              placeholder='e.g 1 Hour'
              label='Estimation Duration *'
              inputProps={{
                maxLength: 5,
              }}
            />
          </Grid>
            <Grid item xs={12} sm={6} mt={2}>
            <Controller
              name={`assignedTo-${taskData.id}`}
              control={control}
              render={({ field }) => (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              name={`assignedTo-${taskData.id}`}
              options={AssignedTo}
              value={AssignedTo.find((option) => option.fullName === taskData.assignedTo) || null}
              getOptionLabel={(option) => option.fullName}
              onChange={(event, newValue) => {
                setTaskData((prevData) => ({
                  ...prevData,
                  assignedTo: newValue ? newValue.fullName : null, 
                }))
                setTaskDataUpdate((prevData) => ({
                  ...prevData,
                  userId: newValue ? newValue.id : null, 
                }))
                field.onChange(newValue ? newValue.id : null)
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputLabelProps={{ shrink: true }}      
                  label="Assigned To *"
                  placeholder="Select Talent"
                  error={!!errors[`assignedTo-${taskData.id}`]}
                  helperText={errors[`assignedTo-${taskData.id}`] ? errors[`assignedTo-${taskData.id}`].message : ''}
                />
              )}
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
  const [open, setOpen] = useState(false);
  const [valueproject, setValueproject] = useState();
  const [initialProject, setInitialProject] = useState()
  const [taskCode, setTaskCode] = useState()

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
          id: task.id,
        };
      }
      return task;
    });  
    const filteredTasks = updatedTasks.filter((task) => task !== null); 
    setTasks(filteredTasks);
  };

  const handleDeleteTask = (taskId) => {
    handleUpdateTasks(taskId);
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    .map((task, index) => ({
      ...task,
      id: index + 1, 
    }));
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
      userId: null,
      taskName: '',
      taskDescription: '',
      estimationTime: null,
      estimationDate: formattedDate,
      actualDate: formattedDate,
      createdBy: parseInt(localStorage.getItem('userId')),
      updatedBy: parseInt(localStorage.getItem('userId')),
      priority: '',           
      taskCode:''  
    };
    const newTasks = JSON.parse(JSON.stringify(tasks));
    newTasks.push(newTask);
    setTasks(newTasks);
  };

  const methods = useForm({
    resolver: yupResolver(createTaskSchema(tasks)),
  })
  
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting}
  } = methods

  const SubmitSave = async (formData) => {
    const data = tasks.map((value) => ({
      projectId: value.projectId,
      statusBacklog: parseInt(formData[`statusBacklog-${value.id}`]),
      userId: parseInt(formData[`assignedTo-${value.id}`]),
      taskName: formData[`taskName-${value.id}`],
      taskDescription: formData[`taskDescription-${value.id}`],
      estimationTime: formData[`estimationTime-${value.id}`],
      createdBy: value.createdBy,
      updatedBy: value.updatedBy,
      actualDate: dayjs(new Date()).add(1, 'day').format("YYYY-MM-DD"),
      estimationDate: dayjs(new Date()).add(1,'day').format("YYYY-MM-DD"),
      priority: parseInt(formData[`priority-${value.id}`]),
    }));
    
    if (!isSave){
      setOpen(false);
    }
    else {
      try {
        const res = await client.requestAPI({
          method: "POST",
          endpoint: "/backlog/addBacklog",
          data: data,
        });

        if (!res.isError) {
          setDataAlert({
            severity: "success",
            open: true,
            message: res.meta.message,
          });
          setTimeout(() => {
            navigate("/masterbacklog");
          }, 3000);
        } else {
          setDataAlert({
            severity: "error",
            message: res.error.detail,
            open: true,
          });
        }
        setOpen(false);
        
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const getProjectName = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: '/ol/project?search=',      
    })
    const data = res.data.map(item => ({id : `${item.id} - ${item.attributes.taskCode}`, name: item.attributes.name, projectInitial: item.attributes.projectInitial, taskCode: item.attributes.taskCode}));    
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
                  <form onSubmit={handleSubmit(handleClickOpenSave)}>
                    <Autocomplete                    
                      disablePortal
                      id="combo-box-demo"
                      name="projectName"
                      options={ProjectName}
                      sx={{ width: "100%", marginTop: "8px" }}
                      getOptionLabel={(option) => option.projectInitial + ' - ' + option.name}
                      onChange={(event, newValue) => {
                        if (!newValue) {                                              
                          setTasks([])
                          setAddTask(false);
                          setValueproject(undefined);
                        }else{
                          setValueproject(parseInt(newValue.id));
                          setInitialProject(newValue.projectInitial)
                          setTaskCode(newValue.taskCode)
                        }                      
                      }}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          InputLabelProps={{ shrink: true }}
                          label="Project Name *" 
                          placeholder="Select Project" 
                        />
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
                          initialProject={initialProject}
                          idProject={valueproject}
                          taskCode={taskCode}
                          control={control}
                          errors={errors}
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
                          <img src={Allura} alt="blank-table" style={{ maxWidth: '100%', height: 'auto' }} />
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
                    <Grid container spacing={2} mt={3.5} alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} sm={3}>
                      <Button
                        disabled={!valueproject}
                        color="success"
                        variant="contained"
                        onClick={handleClickTask}
                        fullWidth
                      >
                        + Add Task
                      </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Button
                            fullWidth
                            variant="cancelButton"
                            onClick={() => handleClickOpenCancel()}
                          >
                            Cancel Data
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Button
                            fullWidth
                            disabled={tasks.length === 0}
                            variant="saveButton"
                            type="submit"
                          >
                            Save Data
                          </Button>
                        </Grid>
                      </Grid>
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
                    <Button variant="saveButton" disabled={isSave && isSubmitting} onClick={isSave ? handleSubmit(SubmitSave) : handleClose} autoFocus>
                      {isSave ? isSubmitting ? <>
                          <CircularProgress size={14} color="inherit" />
                          <Typography marginLeft={1}>Saving...</Typography>
                        </> : 'Save Data' : 'Back'}
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
