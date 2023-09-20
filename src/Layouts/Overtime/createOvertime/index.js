import React, { useState, useEffect, useContext } from "react";
import { 
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Grid, 
  TextField,
  Typography
} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import '../../../App.css'
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import client from "../../../global/client";
import { AlertContext } from '../../../context';

//waktu
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
import { Remove } from "@mui/icons-material";

const CreateOvertime = ({
  open,
  closeTask,
  isEdit,
  closeOvertime,
  onSaveSuccess,
  onEditSuccess,
  setSelectedWorkingReportId,
  dataDetail,
  wrDate
}) => {

  const navigate = useNavigate()
  const { setDataAlert } = useContext(AlertContext)
  const [dialogCancel, setDialogCancel] = useState(false)
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [isLocalizationFilled, setIsLocalizationFilled] = useState(false)
  const [optProject, setOptProject] = useState([])
  const [optTask, setOptTask] = useState([])
  const [optStatus, setOptStatus] = useState([])
  const [idEffortTask, setIdEffortTask] = useState()
  const [opentask, setOpentask] = useState(false)
  const [editOvertime, setEditOvertime] = useState(false)
  const [valueDetail, setValueDetail] = useState([])
  const selectedTask = optTask.find((item) => item.taskId);
  const [taskDurations, setTaskDurations] = useState([optTask.find((item) => item.backlogId === idEffortTask)]);
  const [openEditTask, setOpenEditTask] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [isEndTimeError, setIsEndTimeError] = useState(false)

  const currentUserId = parseInt(localStorage.getItem("userId"))
  
  const clearProject = {
    projectId: '',
    listTask: []
  }
  const clearTask = {
    backlogId: null,
    taskName: null,
    statusTaskId: null,
    duration: null,
    taskItem: null
  }

  const [dataOvertime, setDataOvertime] = useState({
    // listProject: [clearProject]    
    listProject: [{      
      projectId: '',
      listTask: [{
        backlogId: null,
        taskName: '',
        statusTaskId: '',
        duration: '',
        taskItem: ''
      }]
    }]
  })

  const [dataEditOvertime, setDataEditOvertime] = useState({
    workingReportOvertimeId: null,
    listProject: [clearProject],
  })
  

  const onAddProject = () => {
    if(isEdit){
      setOpenEditTask(true)
      const temp = {...dataEditOvertime}
      temp.listProject = [...dataEditOvertime.listProject, { 
        projectId: null,
        listTask: [{...clearProject}]}]
      setDataEditOvertime(temp)
    } else{
      const temp = {...dataOvertime}
      temp.listProject = [...dataOvertime.listProject, { 
        projectId: null,
        listTask: [{...clearProject}]}]
      setDataOvertime(temp)
    }
  }

  const RemoveProject = (projectIndex) => {
    if (isEdit) {
      const temp = { ...dataEditOvertime };
      temp.listProject.splice(projectIndex, 1);
      setDataEditOvertime(temp);
    } else {
      const temp = { ...dataOvertime };
      temp.listProject.splice(projectIndex, 1);
      setDataOvertime(temp);
    }
  };
  

  const onEdit = () => {
    let temp = []
    let data = dataDetail.attributes.listProject.length
    let time = dataDetail.attributes
    for (let i=0; i<data; i++){
      temp.push(dataDetail.attributes.listProject[i])
      setDataEditOvertime((prevDataEditOvertime) => ({
        ...prevDataEditOvertime,
        workingReportOvertimeId: dataDetail.id,
        listProject: temp,
        startTime:time.startTime,
        endTime: time.endTime,
        createdBy: currentUserId,
        updatedBy: currentUserId
      }))
    }
  }

  const AddTask = (idxProject) => {
    if(isEdit){
      const temp = {...dataEditOvertime}
      temp.listProject[idxProject].listTask.push({
        ...clearTask
      })
    setDataEditOvertime(temp)
    } else{
    const temp = {...dataOvertime}
    temp.listProject[idxProject].listTask.push({
      ...clearTask
    })
    setDataOvertime(temp)
    }
  }

  function calculateTimeDifference(startTime, endTime) {
    const start = parseTime(startTime);
    const end = parseTime(endTime);
  
    if (!start || !end) {
      return 0;
    }
  
    const startHour = start.hours + start.minutes / 60;
    const endHour = end.hours + end.minutes / 60;
  
    const diff = endHour - startHour;
    const wholeHours = Math.floor(diff);

    const threeQuarterHours =  wholeHours + 0.75;
    const midHours =  wholeHours + 0.50;
  
    if (diff < threeQuarterHours) {
      return midHours;
    } else if (diff >= threeQuarterHours) {
      return threeQuarterHours;
    } else {
      return Math.ceil(diff);
    }
  }
  
  function parseTime(time) {
    const timeRegex = /^(\d{1,2}):(\d{2}):(\d{2})$/;

    const match = time.match(timeRegex);
  
    if (match) {
      const hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      return { hours, minutes };
    }
  
    return null;
  }
  
  
  const handleArrowKeys = (e, idxProject, index) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();

      let currentValue
      if(dataEditOvertime.listProject[idxProject].listTask.length !== 0) {
        currentValue = parseFloat(dataEditOvertime.listProject[idxProject].listTask[index]['duration']);
      } else {
        currentValue = parseFloat(dataOvertime.listProject[idxProject].listTask[index]['duration'])
      }

      let newValue;

      if (e.key === 'ArrowUp') {
        newValue = currentValue + 0.25;
      } else {
        newValue = currentValue - 0.25;
      }

      if (newValue < 0) {
        newValue = 0;
      }

      const startTimes = startTime ? startTime : dataEditOvertime.startTime;
      const endTimes = endTime ? endTime : dataEditOvertime.endTime;
      const hours = calculateTimeDifference(startTimes, endTimes);

      if (newValue > parseFloat(hours)) {
        newValue = parseFloat(hours);
      }

      handleChange({ target: { name: 'duration', value: newValue.toFixed(2) } }, idxProject, index);
    }
  };

  const handleChange = (event, idxProject, index, backlogId, taskId) => {   
    if(isEdit){
      const { name, value } = event.target;
      const updateDataEditOvertime = {...dataEditOvertime}
      updateDataEditOvertime.listProject[idxProject].listTask[index][name] = value
      // setDataEditOvertime(updateDataEditOvertime)

      if (name === 'duration') {
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) {
          updateDataEditOvertime.listProject[idxProject].listTask[index][name] = '';
        } else if (parsedValue < 0) {
          updateDataEditOvertime.listProject[idxProject].listTask[index][name] = '0';
        } else {
          const startTimes = startTime ? startTime : dataEditOvertime.startTime;
          const endTimes = endTime ? endTime : dataEditOvertime.endTime;
          const hours = calculateTimeDifference(startTimes, endTimes);

          if (parsedValue > hours) {
            updateDataEditOvertime.listProject[idxProject].listTask[index][name] = hours.toFixed(2);
          } else {
            updateDataEditOvertime.listProject[idxProject].listTask[index][name] = parsedValue.toFixed(2);
          }
        }
      } else if(name === 'taskName'){
        updateDataEditOvertime.listProject[idxProject].listTask[index].backlogId = backlogId
        // updateDataEditOvertime.listProject[idxProject].listTask[index].taskId = taskId
        // updateDataEditOvertime.listProject[idxProject].listTask[index].taskId = 270
        // updateDataEditOvertime.listProject[idxProject].listTask[index].taskId = null
        // temp.listProject[0].listTask[0].backlogId = "35"
      }
  
      setDataEditOvertime(updateDataEditOvertime);
    

    } else{
      const { name, value } = event.target;
      if (name === 'duration') {
        const temp = { ...dataOvertime };
        const parsedValue = parseFloat(value);

        if (isNaN(parsedValue)) {
          temp.listProject[idxProject].listTask[index][name] = '';
        } else if (parsedValue < 0) {
          temp.listProject[idxProject].listTask[index][name] = '0';
        } else {
          const hours = calculateTimeDifference(startTime, endTime);
          if (parsedValue > hours) {
            temp.listProject[idxProject].listTask[index][name] = hours.toFixed(2);
          } else {
            setIdEffortTask(parsedValue);
            setDataOvertime(temp);
            temp.listProject[idxProject].listTask[index][name] = parsedValue.toFixed(2);
          }
        }
      
        setTaskDurations((prevDurations) =>
          prevDurations.map((durationItem, i) => ({
            ...durationItem,
            duration: i === index ? parsedValue : durationItem.duration,
          }))
        );
      } else{
        const temp = {...dataOvertime}
        temp.listProject[idxProject].listTask[index][name]= value
        if(name === 'taskName'){
          temp.listProject[idxProject].listTask[index].backlogId = backlogId
          // temp.listProject[0].listTask[0].backlogId = "35"
        }
      setDataOvertime(temp)
      }
    }
    
  }; 

  
  const handleChangeProject = (value, idxProject) => {
    if(isEdit){
      const temp = {...dataEditOvertime}
      temp.listProject[idxProject].projectId = value
      temp.listProject[idxProject].listTask = [clearTask]
      setDataEditOvertime(temp); 
    } else{
      const temp = {...dataOvertime}
      temp.listProject[idxProject].projectId = value
      temp.listProject[idxProject].listTask = [clearTask]
      setDataOvertime(temp);
    }
  };

  const deleteTask = async (e, idxProject, index) => {
    e.preventDefault()
    if(isEdit){
      const temp = {...dataEditOvertime}
      temp.listProject[idxProject].listTask.splice(index, 1)
      setDataEditOvertime(temp)
    } else{
      const temp = {...dataOvertime}
      temp.listProject[idxProject].listTask.splice(index, 1)
      setDataOvertime(temp)
    }
  }
  
  const handleClose = () => {
    setDialogCancel(false)
  }

  useEffect(() => {
    if(isEdit){
      setValueDetail(dataDetail)
      onEdit()
      setOpentask(true)
    }
    getDataProject()
    getDataStatus()
  }, [dataOvertime, dataDetail, selectedProjectId])

  const getDataTask = async (id) => {

    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/taskProject?projectId=${id}&userId=${currentUserId}&search=`
    })

    const data = res.data.map(item => ({backlogId : parseInt(item.id), taskName: item.attributes.taskName, actualEffort: item.attributes.actualEffort}));
    setOptTask(data)
  }
  
  const getDataProject = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/projectTypeList?userId=${currentUserId}&search=`
    })
    const data = res.data.map(item => ({id : parseInt(item.id), name: item.attributes.projectName}));
    setOptProject(data)
  }

  const getDataStatus = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/status?search=`
    })
    const data = res.data.map(item => ({id : parseInt(item.id), status: item.attributes.name}));
    setOptStatus(data)
  }

const onSave = async () => { 
    const data = {
      startTime: startTime,
      endTime: endTime,
      date: wrDate,
      // ...dataOvertime,
      listProject: [],
      createdBy: currentUserId,
      updatedBy: currentUserId
    }

    for (const project of dataOvertime.listProject){
      const updateFilled = {
        projectId : project.projectId,
        listTask : []
      }
      for (const task of project.listTask){
        let duration;
        const wholeHours = Math.floor(parseFloat(task.duration));
        if (parseFloat(task.duration) >= wholeHours + 0.75) {
          duration = Math.ceil(parseFloat(task.duration)).toFixed(2)
        } else {
          duration = parseFloat(task.duration)
        }
        const updateTask = {
          backlogId : task.backlogId,
          taskName : task.taskName,
          statusTaskId : task.statusTaskId,
          duration : parseFloat(duration),
          taskItem : task.taskItem,
        }
        updateFilled.listTask.push(updateTask)
      }
      data.listProject.push(updateFilled)
    }

    const res = await client.requestAPI({
      method: 'POST',
      endpoint: `/overtime/addOvertime`,
      data
    })

    if(!res.isError){
      setDataAlert({
        severity: 'success',
        open: true,
        message: res.data.meta.message
      }) 
      // onSaveSuccess();
        // navigate('/workingReport')
        window.location.href = '/workingReport';
        closeTask(false)
        setOpentask(false)
      
    }
    else {          
      setDataAlert({
        severity: 'error',
        message: res.error.detail,
        open: true
      })
    }
  }

  const saveEdit = async () => {
    const dataUpdate = {
      startTime: startTime ? startTime : dataEditOvertime.startTime,
      endTime: endTime ? endTime : dataEditOvertime.endTime,
      workingReportId : null,
      listProjectId : [],
      createdBy: currentUserId,
      updatedBy: currentUserId
    }
    dataUpdate.workingReportId = dataEditOvertime.workingReportOvertimeId
    for (const project of dataEditOvertime.listProject){
      const updateFilled = {
        projectId : project.projectId,
        listTask : []
      }
      for (const task of project.listTask){
        if(task.taskId === null){
          task.backlogId = null
        }
        let duration;
        const wholeHours = Math.floor(parseFloat(task.duration));
        if (parseFloat(task.duration) >= wholeHours + 0.75) {
          duration = Math.ceil(parseFloat(task.duration)).toFixed(2)
        } else {
          duration = parseFloat(task.duration)
        }
        const updateTask = {
          taskId : task.taskId,
          workingReportId : dataUpdate.workingReportOvertimeId,
          backlogId : task.backlogId,
          taskName : task.taskName,
          statusTaskId : task.statusTaskId,
          duration : parseFloat(duration),
          taskItem : task.taskItem,
        }
        updateFilled.listTask.push(updateTask)
      }
      dataUpdate.listProjectId.push(updateFilled)
    }

    const res = await client.requestAPI({
      method: 'POST',
      endpoint: `/overtime`,
      data: dataUpdate
    })
    if(!res.isError){
      setDataAlert({
        severity: 'success',
        open: true,
        message: res.data.meta.message
      })
      onEditSuccess();
      setTimeout(() => {
        navigate('/workingReport')
      }, 3000)
    } else {
      setDataAlert({
        severity: 'error',
        message: res.error.detail,
        open: true
      })
    }
    closeOvertime(true)
    // setOpen(false);
  };

  const setTimeTo = (timeString) => {
    const currentDate = dayjs();
    const formattedDate = currentDate.format("YYYY-MM-DD");
    return timeString ? dayjs(`${formattedDate}T${timeString}`) : null;
  };
  

  return (
    <>
    <Dialog
      open={open}
      onClose={isEdit ? () => closeOvertime(false) : () => closeTask(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-delete dialog-task"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" className="dialog-delete-header">
        {isEdit ? "Edit Overtime" : "Add Overtime"}
      </DialogTitle>
      <DialogContent className="dialog-task-content">
        <DialogContentText
          className="dialog-delete-text-content"
          id="alert-dialog-description"
        >
          Note: If an employee chooses to perform overtime for a spesific task, a notification will be sent to the Human Resources Department
        </DialogContentText>

      {isEdit ? (
        <>
        <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
          <TimePicker
            label="Start Time *"
            defaultValue={setTimeTo(dataEditOvertime.startTime) || null}
            onChange={(start) => setStartTime(start.format("HH:mm:ss"))}
            ampm={false}
          />
          <Grid item>
          <TimePicker
            label="End Time *"
            defaultValue={setTimeTo(dataEditOvertime.endTime) || null}
            onChange={(end) => {
              const newEndTime = end.format("HH:mm:ss");
              const newStartTime = startTime ? startTime : dataEditOvertime.startTime
          
              if (newStartTime && newEndTime <= newStartTime) {
                setEndTime(dataEditOvertime.endTime)
                setIsEndTimeError(true)
                setDataAlert({
                  severity: 'error',
                  message: 'End Time cannot be earlier than Start Time',
                  open: true
                })
              } else {
                setEndTime(newEndTime);
                setIsEndTimeError(false)
                setIsLocalizationFilled(true);
              }
            }}
            ampm={false}
          />
          {isEndTimeError && (
            <Typography
              color="#d32f2f"
              textAlign={"left"}
              fontSize={12}
              paddingY={'3px'}
              paddingX={'13px'}
            >
              {'End Time cannot be earlier than Start Time'}
            </Typography>
          )}
          </Grid>
          </DemoContainer>
        </LocalizationProvider>
        </Grid>

        {dataEditOvertime.listProject.map((resProject, idxProject) => (
          <div className={opentask ? 'card-project' : ''} key={`${idxProject+1}-project`}>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  disabled={!!optProject.find((option) => option.id == resProject.projectId)}
                  name= 'project'
                  className='autocomplete-input autocomplete-on-popup'
                  options={optProject}
                  defaultValue={optProject.find((option) => option.id == resProject.projectId) || null}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: "100%", marginTop: "20px", backgroundColor: "white" }}
                  onChange={(_event, newValue) => {
                    if(newValue){
                    getDataTask(newValue.id)   
                    handleChangeProject(newValue.id, idxProject)
                    setOpentask(true)
                  } else {
                    setOpentask(false)
                    setDataOvertime([clearProject])
                    setIdEffortTask('')
                  }
                }}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className='input-field-crud'
                      label='Project *'
                      InputLabelProps={{ shrink: true }}
                      placeholder='Select Project'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                
                {resProject.listTask.map((res, index) => (
                  <>
                    <Accordion
                      onChange={() => getDataTask(resProject.projectId)}
                      key={res.id}
                      sx={{ boxShadow: 'none', width: '100%' }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        className='header-accordion'
                      >
                        <Typography sx={{ fontSize: "24px" }}>
                          Task {index + 1}
                        </Typography>
                        <DeleteIcon 
                          className='icon-trash'
                          onClick={(e) => deleteTask(e, idxProject, index)}
                        />
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container rowSpacing={2}>
                          <Grid item xs={12}>
                          <Autocomplete
                            disablePortal
                            // disabled
                            // disabled={res.taskName ? true : false}
                            name='taskName'
                            className='autocomplete-input autocomplete-on-popup'
                            options={optTask}
                            // value={selectedTask.taskId}
                            defaultValue={!!resProject.projectId ? {backlogId : res.backlogId, taskName: res.taskCode + ' - ' +  res.taskName, actualEffort: res.duration} : null}
                            getOptionLabel={(option) => option.taskName}
                            sx={{ width: "100%", marginTop: "20px", backgroundColor: "white" }}
                            onChange={(_event, newValue) => {
                              if(newValue) {
                                handleChange({target : { name : 'taskName', value: newValue.taskName }},
                                idxProject,
                                index,
                                newValue.backlogId,)
                                // newValue.taskId)
                                setIdEffortTask(newValue.backlogId)
                              } else {
                                setIdEffortTask('')
                              }
                            }}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className='input-field-crud'
                                placeholder='e.g Create Login Screen"'
                                label='Task Name *'
                                InputLabelProps={{ shrink: true }}
                              />
                            )}
                          />
                          </Grid>
                          <Grid item xs={12}>
                          <Autocomplete
                            disablePortal
                            name='statusTaskId'
                            className='autocomplete-input autocomplete-on-popup'
                            options={optStatus}
                            defaultValue={optStatus.find((option) => option.status === res.statusTaskName) || null}
                            getOptionLabel={(option) => option.status}
                            // value={selectedTask.taskStatus}
                            sx={{ width: "100%", backgroundColor: "white" }}
                            // onChange={(e) => handleChange(e,idxProject, index)}
                            onChange={(_event, newValue) =>
                              handleChange(
                              { target: { name : 'statusTaskId', value : newValue.id } },
                                idxProject,
                                index
                                )
                            }
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className='input-field-crud'
                                placeholder='e.g In Progress'
                                label='Status Task *'
                                InputLabelProps={{ shrink: true }}
                              />
                            )}  
                          />
                          </Grid>
                          
                          <Grid item xs={12}>
                            <TextField
                              focused
                              name='duration'
                              value={res.duration}
                              // value={selectedTask ? selectedTask.actualEffort : ''}
                              onChange={(e) => handleChange(e, idxProject, index)}
                              className='input-field-crud'
                              placeholder='e.g Create Login Screen"'
                              onKeyDown={(e) => handleArrowKeys(e, idxProject, index)}
                              type="text"
                              label='Actual Effort *'
                              sx={{width: "100%", backgroundColor: "white" }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              focused
                              name='taskItem'
                              value={res.taskItem}
                              onChange={(e) => handleChange(e, idxProject, index)}
                              className='input-field-crud'
                              placeholder='e.g Create Login Screen"'
                              label='Task Detail'
                              sx={{width: "100%", backgroundColor: "white" }}
                              multiline
                              maxRows={4}
                            />

                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                    </>
                    ))
                  }
                </Grid>
                {/* {dataOvertime.listProject[idxProject].projectId && ( */}
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Grid item xs={6} textAlign='left'>
                    <Button
                      onClick={() => AddTask(idxProject)}
                      variant="outlined"
                      className="button-text"
                      startIcon={<AddIcon />}
                    >
                      Add Task
                    </Button>
                  </Grid>
                  {idxProject > 0 && (
                    <Grid item xs={6} textAlign='right'>
                      <Button
                        onClick={() => RemoveProject(idxProject)}
                        variant="outlined"
                        color="error"
                        className="button-text"
                        startIcon={<Remove />}
                      >
                        Remove Project
                      </Button>
                    </Grid>
                  )}
                </Grid>

                {/* )} */}
              </Grid>
            </div>
          )
        ) 
        }
        </>
      ) : (
        <>
        <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
            <TimePicker
              label="Start Time *"
              value={startTime}
              onChange={(start) => setStartTime(start.format("HH:mm:ss"))}
              ampm={false}
            />
            <Grid item>
            <TimePicker
              label="End Time *"
              value={endTime}
              onChange={(end) => {
                const newEndTime = end.format("HH:mm:ss");
                const newStartTime = startTime;
            
                if (newStartTime && newEndTime <= newStartTime) {
                  setIsEndTimeError(true)
                  setDataAlert({
                    severity: 'error',
                    message: 'End Time cannot be earlier than Start Time',
                    open: true
                  })
                } else {
                  setEndTime(newEndTime);
                  setIsLocalizationFilled(true);
                  setIsEndTimeError(false)
                }
              }}
              ampm={false}
            />
            {isEndTimeError && (
              <Typography
                color="#d32f2f"
                textAlign={"left"}
                fontSize={12}
                paddingY={'3px'}
                paddingX={'13px'}
              >
                {'End Time cannot be earlier than Start Time'}
              </Typography>
            )}
            </Grid>
            </DemoContainer>
        </LocalizationProvider>
        </Grid>

        {isLocalizationFilled ? dataOvertime.listProject.length > 0 && dataOvertime.listProject.map((resProject, idxProject) => (
          <div className={opentask ? 'card-project' : ''} key={`${idxProject}-project`}>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  name= 'project'
                  className='autocomplete-input autocomplete-on-popup'
                  options={optProject}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: "100%", marginTop: "20px", backgroundColor: "white" }}
                  onChange={(_event, newValue) => {
                    if(newValue){
                    getDataTask(newValue.id)
                    handleChangeProject(newValue.id, idxProject)
                    setOpentask(true)
                  } else {
                    setOpentask(false)
                    setDataOvertime([clearProject])
                    setIdEffortTask('')
                  }
                }}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className='input-field-crud'
                      label='Project *'
                      InputLabelProps={{ shrink: true }}
                      placeholder='Select Project'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                {resProject.value !== '' &&
                  resProject.listTask.map((res, index) => (
                    <Accordion key={res.id} sx={{ boxShadow: 'none', width: '100%' }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        className='header-accordion'
                      >
                        <Typography sx={{ fontSize: "24px" }}>
                          Task {index + 1}
                        </Typography>
                        <DeleteIcon 
                          className='icon-trash'
                          onClick={(e) => deleteTask(e, idxProject, index)}
                        />
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container rowSpacing={2}>
                          <Grid item xs={12}>
                          <Autocomplete
                            disablePortal
                            name='taskName'
                            className='autocomplete-input autocomplete-on-popup'
                            options={optTask}                            
                            getOptionLabel={(option) => option.taskName}
                            sx={{ width: "100%", marginTop: "20px", backgroundColor: "white" }}
                            onChange={(_event, newValue) => {
                              if(newValue) {
                                handleChange({target : { name : 'taskName', value: newValue.taskName }},
                                idxProject,
                                index, newValue.backlogId)
                                setIdEffortTask(newValue.backlogId)
                              } else {
                                setIdEffortTask('')
                              }
                            }}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className='input-field-crud'
                                placeholder='e.g Create Login Screen"'
                                label='Task Name *'
                                InputLabelProps={{ shrink: true }}
                              />
                            )}
                          />
                          </Grid>
                          <Grid item xs={12}>
                          <Autocomplete
                            disablePortal
                            name='statusTaskId'
                            className='autocomplete-input autocomplete-on-popup'
                            options={optStatus}
                            getOptionLabel={(option) => option.status}
                            // value={selectedTask.taskStatus}
                            sx={{ width: "100%", backgroundColor: "white" }}
                            // onChange={(e) => handleChange(e,idxProject, index)}
                            onChange={(_event, newValue) =>
                              handleChange(
                              { target: { name : 'statusTaskId', value : newValue.id } },
                                idxProject,
                                index
                                )
                            }
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className='input-field-crud'
                                placeholder='e.g In Progress'
                                label='Status Task *'
                                InputLabelProps={{ shrink: true }}
                              />
                            )}  
                          />
                          </Grid>
                          
                          <Grid item xs={12}>
                            <TextField
                              focused
                              name='duration'
                              value={res.duration}
                              // value={dataOvertime.listProject[idxProject].listTask[index]['duration'] || ''}
                              onChange={(e) => handleChange(e, idxProject, index)}
                              onKeyDown={(e) => handleArrowKeys(e, idxProject, index)}
                              type="text"
                              className='input-field-crud'
                              placeholder='e.g Create Login Screen'
                              label='Actual Effort *'
                              sx={{width: "100%", backgroundColor: "white" }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              focused
                              name='taskItem'
                              onChange={(e) => handleChange(e, idxProject, index)}
                              className='input-field-crud'
                              placeholder='e.g Create Login Screen"'
                              label='Task Detail'
                              sx={{width: "100%", backgroundColor: "white" }}
                              multiline
                              maxRows={4}
                            />

                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                    ))
                  }
                </Grid>
                {/* {dataOvertime.listProject[idxProject].projectId && ( */}
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Grid item xs={6} textAlign='left'>
                    <Button
                      onClick={() => AddTask(idxProject)}
                      variant="outlined"
                      className="button-text"
                      startIcon={<AddIcon />}
                    >
                      Add Task
                    </Button>
                  </Grid>
                  {idxProject > 0 && (
                    <Grid item xs={6} textAlign='right'>
                      <Button
                        onClick={() => RemoveProject(idxProject)}
                        variant="outlined"
                        color="error"
                        className="button-text"
                        startIcon={<Remove />}
                      >
                        Remove Project
                      </Button>
                    </Grid>
                  )}
                </Grid>
                {/* )} */}
              </Grid>
            </div>
          )
        ) : (<></>)
        }
        </>
      )}
        
        
          
      </DialogContent>
      <DialogActions>
        <div className='left-container'>
          {/* {isLocalizationFilled && dataOvertime.clearProject !== '' && ( */}
            <Button
              variant="outlined"
              className='green-button button-text'
              onClick={() => onAddProject()}
              startIcon={<AddIcon />}
              >
              Add Project
            </Button>
          {/* )} */}
        </div>
        <div className='right-container'>
          <Button
            variant="outlined"
            className="button-text"
            onClick={() => setDialogCancel(true)}
          >
            Cancel
          </Button>
          <Button 
            variant='saveButton'
            className="button-text"
            onClick={isEdit? saveEdit : onSave}
            >
            Submit
          </Button>
        </div>
      </DialogActions>

      <Dialog
          open={dialogCancel}
          onClose={isEdit ? () => closeOvertime(false) : () => closeTask(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle
          sx={{
            alignSelf: "center",
            fontSize: "30px",
            fontStyle: "Poppins",
          }}
          id="alert-dialog-title"
          className="dialog-delete-header"
        >
          {'Cancel Data'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {"Warning: Canceling will result in data loss without saving!"}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions">
          <Button 
            variant="outlined"
            onClick={isEdit ? () => {
              closeOvertime(false)
              setOpentask(false)
              setDataOvertime([clearProject])
              setIdEffortTask('')
              setIsLocalizationFilled(false)
              setDialogCancel(false)
            } : () => {
              closeTask(false)
              setOpentask(false)
              setDataOvertime([clearProject])
              setIdEffortTask('')
              setIsLocalizationFilled(false)
              setDialogCancel(false)
            }}>
              {"Cancel without saving"}
            </Button>
            <Button variant="contained" className="button-text" onClick={handleClose}>
              {"Back"}
            </Button>
          </DialogActions>
        </Dialog>

    </Dialog>
    </>
  )
}

export default CreateOvertime