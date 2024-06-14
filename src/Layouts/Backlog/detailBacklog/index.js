import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Autocomplete, Button, Divider, TextField, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import SideBar from "../../../Component/Sidebar";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import client from "../../../global/client";
import FormInputText from '../../../Component/FormInputText';
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AlertContext } from '../../../context';
import { yupResolver } from '@hookform/resolvers/yup';
import createTaskSchema from "../shema";

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

//rating
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import dayjs from "dayjs";


const TaskItem = ({ errors, control, task, onUpdate, statusBacklogOl, assignedToOl, setValue }) => {
  const [taskData, setTaskData] = useState(task);
  const [taskDataUpdate, setTaskDataUpdate] = useState(task);
  useEffect(() => {
    onUpdate(taskDataUpdate);
  }, [taskDataUpdate]);

  useEffect(()=>{
    setValue(`taskName-${task.id}`, task.taskName);
    setValue(`priority-${task.id}`, parseInt(task.priority));
    setValue(`taskDescription-${task.id}`, task.taskDescription);
    setValue(`statusBacklog-${task.id}`, task.statusBacklog);
    setValue(`estimationTime-${task.id}`, task.estimationTime);
    setValue(`actualTime-${task.id}`, task.actualTime);
    setValue(`assignedTo-${task.id}`, task.userId);
  },[]);

  const handleChangeAutocomplete = (name, value) => {
    console.log("Task before: ", taskData[name])
    setTaskData((prevData) => ({...prevData, [name]: value}));
    setTaskDataUpdate((prevData) => ({...prevData, [name]: value }))
    console.log("Task after: ", taskData[name])
  }

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
    <Accordion defaultExpanded key={taskData.id} elevation={0}>
      <Grid
        container
        direction="row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid item>
          <AccordionSummary
            expandIcon={<ArrowDropDownOutlined />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ padding: 0 }}
          >
            <Typography fontSize="1.5rem" marginRight="12px">
              {taskData.taskCode}
            </Typography>
          </AccordionSummary>
        </Grid>
      </Grid>
      <AccordionDetails style={{ padding:0 }}>
        <Grid container direction="row" spacing={3.75}>
          <Grid item xs={12} sm={6}>
            <FormInputText
              focused
              name={`taskName-${task.id}`}
              className='input-field-crud'
              placeholder='e.g Create Login Screen"'
              label='Task Name *'
              inputProps={{
                maxLength: 100,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ width: "100%" }}>
              <Typography
                component="legend"
                sx={{ color: errors[`priority-${task.id}`] ? "#D32F2F" : "grey"}}
              >
                Priority *
              </Typography>
              <Controller
                control={control}
                name={`priority-${task.id}`}
                render={({field}) => (
                  <Rating
                    variant="outlined"
                    name={`priority-${task.id}`}
                    value={field.value? field.value : null}
                    onChange={(event, newValue)=>field.onChange(newValue)}
                  />
                )}
              />
              {errors[`priority-${task.id}`] && (
                <Typography
                  color="#d32f2f"
                  textAlign={"left"}
                  fontSize={12}
                  paddingY={'3px'}
                  paddingX={'6px'}
                >
                  {errors[`priority-${task.id}`].message}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              focused
              name={`taskDescription-${task.id}`}
              className='input-field-crud'
              placeholder='e.g Create Login Screen - Front End'
              label='Task Decription'
              inputProps={{
                maxLength: 255,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name={`statusBacklog-${task.id}`}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  name="statusBacklog"
                  options={statusBacklogOl}
                  value={statusBacklogOl.find((option) => option.id === field.value) || null}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, newValue) => {
                      handleChangeAutocomplete('statusBacklog', newValue ? newValue.id : null);
                      field.onChange(newValue ? newValue.id : null)
                    }
                  }
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Backlog Status *"
                      placeholder="Select Status"
                      error={!!errors[`statusBacklog-${task.id}`]}
                      helperText={errors[`statusBacklog-${task.id}`] ? errors[`statusBacklog-${task.id}`].message : ''}
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
              style={{ paddingRight: "10px" }}
              focused
              onKeyPress={handleKeyPress}
              name={`estimationTime-${task.id}`}
              className='input-field-crud'
              placeholder='e.g 1 Hour'
              label='Estimation Duration *'
              inputProps={{
                maxLength: 5,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} mt={2}>
            <FormInputText
              style={{ paddingLeft: "5px" }}
              focused
              disabled
              name={`actualTime-${task.id}`}
              className='input-field-crud'
              placeholder='e.g 1 Hour'
              label='Actual Duration'
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Controller
              name={`assignedTo-${task.id}`}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  name={`assignedTo-${task.id}`}
                  options={assignedToOl}
                  getOptionLabel={(option) => option.fullName}
                  value={assignedToOl.find((option) => option.id === field.value) || null}
                  onChange={(_, newValue) => {
                    handleChangeAutocomplete("assignedTo", newValue ? newValue.id : null);
                    field.onChange(newValue ? newValue.id : null)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assigned To *"
                      placeholder="Select Talent"
                      error={!!errors[`assignedTo-${task.id}`]}
                      helperText={errors[`assignedTo-${task.id}`] ? errors[`assignedTo-${task.id}`].message : ''}
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

const DetailBacklog = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [ProjectName, setProjectName] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [valueproject, setValueproject] = useState();
  const [isSave, setIsSave] = useState(false)
  const { setDataAlert } = useContext(AlertContext)
  const [initialProject, setInitialProject] = useState()
  const [statusBacklogOl, setStatusBacklogOl] = useState([]);
  const [assignedToOl, setAssignedToOl] = useState([]);
  const navigate = useNavigate();

  const dataBreadDetailBacklog = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masterbacklog",
      title: "Master Project Backlog",
      current: false,
    },
    {
      href: "/masterbacklog/listBacklog",
      title: "Backlog",
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
      href: "/",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masterbacklog",
      title: "Master Backlog",
      current: false,
    },
    {
      href: "/masterbacklog/listBacklog",
      title: "Backlog",
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
      'Backlog' : '#7367F029',
      'In Progress': '#E6F2FB',
      'Completed' : '#EBF6EE', 
      'Done': '#EBF6EE'
    };
    return statusColors[status] || '#ccc';
  };

  const getStatusFontColor = (status) => {
    const statusFontColors = {
      'to do': '#EE695D',
      'Backlog' : '#4C4DDC',
      'In Progress': '#3393DF',
      'Completed' : '#5DB975',
      'Done': '#5DB975'
    };
    return statusFontColors[status] || '#fff';
  };

  const getProjectName = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: '/ol/project?search=',      
    })    
    const data = res.data.map(item => ({id : parseInt(item.id), name: item.attributes.name, projectInitial: item.attributes.projectInitial}));        
    setProjectName(data)
  }

  const getAssignedTo = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/backlogUser?search=${dataDetail.projectId}`
    })
    const data = res.data.map(item => ({id : parseInt(item.id), fullName: item.attributes.userName}));    
    setAssignedToOl(data)
  }

  const getStatusBacklog = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: '/ol/status?search=',      
    })
    const data = res.data.map(item => ({id : parseInt(item.id), name: item.attributes.name}));       
    setStatusBacklogOl(data)
  }

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
        projectInitial: resData.data.attributes.projectInitial    
      }        
    setDataDetail(tempDetail)
    setInitialProject(resData.data.attributes.projectInitial)
    const newTasks = [tempDetail];
    setTasks(newTasks);
  }

  const clickEdit = () => {
    getAssignedTo();
    getStatusBacklog();
    setIsEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenSave = () => {
    setIsSave(true)
    setOpen(true);
  };

  const handleClickOpenCancel = () => {
    setIsSave(false)
    setOpen(true);
  };

  const handleCloseOpenCancelData = () => {
    if (!isSave){
      setIsEdit(false);
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

  const methods = useForm({resolver: yupResolver(createTaskSchema(tasks))})

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = methods

  const SubmitSave = async (formData) => {
    const data = {
      actualTime:formData[`actualTime-${tasks[0].id}`],
      estimationTime:formData[`estimationTime-${tasks[0].id}`],
      id:tasks[0].id,
      priority:formData[`priority-${tasks[0].id}`],
      projectId:tasks[0].projectId,
      projectName:tasks[0].projectName,
      statusBacklog:parseInt(formData[`statusBacklog-${tasks[0].id}`]),
      taskCode:tasks[0].taskCode,
      taskDescription:formData[`taskDescription-${tasks[0].id}`],
      taskName:formData[`taskName-${tasks[0].id}`],
      updatedBy:parseInt(localStorage.getItem('userId')),
      updatedOn:dayjs(new Date()).format('YYYY-MM-DD'),
      userId:parseInt(formData[`assignedTo-${tasks[0].id}`]),
    }
    if (!isSave){
      setOpen(false);
    }else{    
      try {
        const res = await client.requestAPI({
          method: 'PUT',
          endpoint: `/backlog/${tasks[0].id}`,
          data: data,
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
            message: res.error.detail,
            open: true
          })
        }
        setOpen(false);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  useEffect(() => {
    getProjectName()
    getDataDetail()
  }, [valueproject])

  return (
    <SideBar>
      <Breadcrumbs breadcrumbs={ isEdit ? dataBreadEditBacklog : dataBreadDetailBacklog} />
      {isEdit ? (
        <Grid container rowSpacing={2.5}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={9.9}>
                <Header judul="Edit Backlog" />
              </Grid>
              <Grid item />
            </Grid>
            <Grid className="HeaderDetail">
              <Grid item xs={12}>
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(handleClickOpenSave)}>
                    <Grid container direction="column" spacing={3.75}>
                      <Grid item xs={12}>
                        <Autocomplete
                          disablePortal
                          disabled
                          id="combo-box-demo"
                          name="ProjectName"
                          options={ProjectName}
                          defaultValue={ProjectName.find((option) => option.id === (dataDetail.projectInitial && dataDetail.projectId)) || null}
                          sx={{ width: "100%", marginTop: "8px", backgroundColor: "#EDEDED" }}                    
                          getOptionLabel={(option) => option.projectInitial + ' - ' + option.name}
                          renderInput={(params) => (
                            <TextField {...params} label="Project Name *" placeholder="Select Backlog" />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider/>
                      </Grid>
                      <Grid item xs={12}>
                        {tasks.map((task) => (
                          <TaskItem
                            key={task.id}
                            task={task}
                            onDelete={handleDeleteTask}
                            onUpdate={handleUpdateTask}
                            onUpdateTasks={handleUpdateTasks}
                            initialProject={initialProject}
                            idProject={dataDetail.projectId}
                            control={control}
                            errors={errors}
                            setValue={setValue}
                            getValues={getValues}
                            assignedToOl={assignedToOl}
                            statusBacklogOl={statusBacklogOl}
                          />
                        ))}
                      </Grid>

                      <Grid item container spacing={2} justifyContent="flex-end" mt={3.5}>
                        <Grid item xs={12} sm={2} textAlign="right">
                          <Button
                            fullWidth
                            variant="cancelButton"
                            onClick={() => handleClickOpenCancel()}
                          >
                            Cancel Data
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={2} textAlign="right">
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
                    <Button variant="saveButton" onClick={handleSubmit(SubmitSave)} autoFocus>
                      {isSave ? 'Save Data' : 'Back'}
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container rowSpacing={2.5}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} sm={8}>
                <Header judul="Detail Backlog" />
              </Grid>
              <Grid item />
              <Grid item xs={12} sm={4} alignSelf="center" sx={{textAlign: {xs: "start", sm:"end"}}}>
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
              <Grid item xs={12} container direction="row">
                <Grid container direction="row" borderBottom="solid 1px #0000001F">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="backlogDetail">
                      {dataDetail.projectInitial} - {dataDetail.projectName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Accordion defaultExpanded elevation={0} disableGutters>
                    <Grid container direction="row">
                      <Grid item paddingY={3}>
                        <AccordionSummary
                          expandIcon={<ArrowDropDownOutlined />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          style={{ padding:0 }}
                        >
                          <Typography variant="backlogDetailText" marginRight="12px">
                            {!isEdit && `${dataDetail.taskName} :: ` }{dataDetail.taskCode}
                          </Typography>
                        </AccordionSummary>
                      </Grid>
                    </Grid>
                    <AccordionDetails style={{ padding:0 }}>
                      <Grid container direction="row" spacing={3.75}>
                        <Grid item xs={12} sm={4}>
                          <Typography sx={{ color: "text.secondary", fontSize: "12px" }}>
                            Task Description
                          </Typography>
                          <Typography
                            variant="descBaklog"
                            maxWidth="100%"
                            sx={{
                              overflowWrap: "break-word",
                              wordBreak: "break-word",
                              hyphens: "auto",
                            }}
                          >
                            {dataDetail.taskDescription}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography sx={{ color: "text.secondary", fontSize: "12px" }}>
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
                            }}
                          >
                            {dataDetail.status}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
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
                        <Grid item xs={12} sm={4}>
                          <Typography
                            sx={{ color: "text.secondary", fontSize: "12px" }}
                          >
                            Assigned To
                          </Typography>
                          <Typography variant="descBaklog">
                            {dataDetail.assignedTo}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            sx={{ color: "text.secondary", fontSize: "12px" }}
                          >
                            Estimation Duration
                          </Typography>
                          <Typography variant="descBaklog">
                            {dataDetail.estimationTime}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} mt={5}>
                    <Divider/>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </SideBar>
  );
};

export default DetailBacklog;
