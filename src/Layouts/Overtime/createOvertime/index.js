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


const CreateOvertime = ({
  open,
  closeTask,
  isEdit,
  closeOvertime,
  setSelectedWorkingReportId
}) => {

  const navigate = useNavigate()
  const { setDataAlert } = useContext(AlertContext)
  const [dialogCancel, setDialogCancel] = useState(false)
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [isLocalizationFilled, setIsLocalizationFilled] = useState(false)
  const [optProject, setOptProject] = useState([])
  const [optTask, setOptTask] = useState([])
  const [optStatus, setOptStatus] = useState({})
  const [idEffortTask, setIdEffortTask] = useState()
  const [opentask, setOpentask] = useState(false)
  const selectedTask = optTask.find((item) => item.backlogId === idEffortTask);
  const [taskDurations, setTaskDurations] = useState([optTask.find((item) => item.backlogId === idEffortTask)]);

  const clearProject = {
    projectId: null,
    listTask: []
  }
  const clearTask = {
    backlogId: '',
    taskName: '',
    statusTaskId: '',
    duration: '',
    taskItem: ''
  }

  const [dataOvertime, setDataOvertime] = useState({
    listProject: [clearProject]
  })

  const onAddProject = () => {
    const temp = [...dataOvertime]
    temp.push({
      projectId : null,
      listTask : [
        {
          backlogId: '',
          taskName: '',
          statusTaskId: '',
          duration: '',
          taskItem: ''
        }
      ]
    })
    setDataOvertime(temp)
  }

  const AddTask = (idxProject) => {
    const temp = {...dataOvertime}
    temp.listProject[idxProject].listTask.push({
      ...clearTask
    })
    setDataOvertime(temp)
    setTaskDurations((prevDurations) => [
      ...prevDurations,
      { listTask: temp.listProject[idxProject].listTask.backlogId, duration: 0 },
    ]);
  }

  const handleChange = (event, idxProject, index, backlogId) => {    
    const { name, value } = event.target;
    if(name === 'duration'){
      setIdEffortTask(parseInt(value))
      const temp = {...dataOvertime}
      temp.listProject[idxProject].listTask[index][name]= parseInt(value)
      setDataOvertime(temp)
      setTaskDurations((prevDurations) =>
        prevDurations.map((durationItem, i) => ({
          ...durationItem,
          duration: i === index ? parseInt(value) : durationItem.duration,
        }))
      )
    } else{
    const temp = {...dataOvertime}
    temp.listProject[idxProject].listTask[index][name]= value
    if(name === 'taskName'){
      temp.listProject[idxProject].listTask[index].backlogId = backlogId
    }
    setDataOvertime(temp)
    }
  }; 

  
  const handleChangeProject = (value, idxProject) => {
    const temp = {...dataOvertime}
    temp.listProject[idxProject].projectId = value
    temp.listProject[idxProject].listTask = [clearTask]
    setDataOvertime(temp);
  };

  const deleteTask = (e, idxProject, index) => {
    e.preventDefault()
    const temp = {...dataOvertime}
    temp.listProject[idxProject].listTask.splice(index, 1)
    setDataOvertime(temp)
  }
  
  
  const handleStartTime = (isFilled, start) => {
    if(start){
      const dataStartTime = start.format("HH:mm")
      setStartTime(dataStartTime)
    }
    setIsLocalizationFilled(isFilled)
  }

  const handleEndTime = (isFilled, end) => {
    if (end){
      const dataEndTime = end.format("HH:mm")
      setEndTime(dataEndTime)
    }
    setIsLocalizationFilled(isFilled)
  }

  const handleClose = () => {
    setDialogCancel(false)
  }

  useEffect(() => {
    getDataTask()
    getDataProject()
    getDataStatus()
    console.log("DATAAAA", dataOvertime.listProject)
    console.log("WRRRR",setSelectedWorkingReportId)
  }, [dataOvertime])

  const getDataTask = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/taskProject?projectId=1&search`
    })
    const data = res.data.map(item => ({backlogId : parseInt(item.id), taskName: item.attributes.taskName, actualEffort: item.attributes.actualEffort}));
    setOptTask(data)
  }
  
  const getDataProject = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/projectTypeList?userId=1&search=`
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
      ...dataOvertime
    }
    const res = await client.requestAPI({
      method: 'POST',
      endpoint: `/overtime/addOvertime`,
      data
    })
    console.log('RES', res)

    if(!res.isError){
      setDataAlert({
        severity: 'success',
        open: true,
        message: res.data.meta.message
      }) 

      setTimeout(() => {
        navigate('/workingReport');
      }, 3000);
    }
    else {          
      setDataAlert({
        severity: 'error',
        message: res.error.detail,
        open: true
      })
    }
    console.log("DATA", data)
    // open(false);
  }

  const saveEdit = async () => {
    const data = {
    }
    const res = await client.requestAPI({
      method: 'PUT',
      endpoint: `/overtime`,
      data
    })
    if(!res.isError){
      setDataAlert({
        severity: 'success',
        open: true,
        message: res.data.meta.message
      })
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
    // setOpen(false);
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

        <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <TimePicker label="Start Time"
                value={startTime} 
                onChange={(start) => handleStartTime(false, start)}
                />
                <TimePicker label="End Time" 
                value={endTime}
                onChange={(end) => handleEndTime(true, end)}/>
            </DemoContainer>
        </LocalizationProvider>
        </Grid>
        
          {isLocalizationFilled && dataOvertime.listProject.length > 0 && dataOvertime.listProject.map((resProject, idxProject) => (
            <div className={opentask ? 'card-project' : ''} key={`${idxProject+1}-project`}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Autocomplete
                    disablePortal
                    name= 'project'
                    className='autocomplete-input autocomplete-on-popup'
                    options={optProject}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: "100%", marginTop: "20px" }}
                    onChange={(_event, newValue) => {
                      if(newValue){
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
                        label='Project'
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
                              value={selectedTask}
                              getOptionLabel={(option) => option.taskName}
                              sx={{ width: "100%", marginTop: "20px" }}
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
                                  label='Task Name'
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
                              sx={{ width: "100%" }}
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
                                  label='Status Task'
                                />
                              )}  
                            />
                            </Grid>
                            
                            <Grid item xs={12}>
                              <TextField
                                focused
                                name='duration'
                                // value={selectedTask ? selectedTask.actualEffort : ''}         
                                onChange={(e) => handleChange(e, idxProject, index)}
                                className='input-field-crud'
                                placeholder='e.g Create Login Screen"'
                                type="number"
                                label='Actual Effort'
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                focused
                                name='taskItem'
                                value={res.detail}
                                onChange={(e) => handleChange(e, idxProject, index)}
                                className='input-field-crud'
                                placeholder='e.g Create Login Screen"'
                                label='Task Detail'
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
                  {dataOvertime.clearTask !== '' &&
                    <Grid item xs={12} textAlign='left'>
                      <Button
                        onClick={() => AddTask(idxProject)}
                        variant="outlined"
                        className="button-text"
                        startIcon={<AddIcon />}
                      >
                        Add Task
                      </Button>
                    </Grid>
                  }
                </Grid>
              </div>
            )
          )
        }
      </DialogContent>
      <DialogActions>
        <div className='left-container'>
          {dataOvertime.clearProject !== '' &&
            <Button
              variant="outlined"
              className='green-button button-text'
              onClick={() => onAddProject()}
              startIcon={<AddIcon />}
              >
              Add Project
            </Button>
          }
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
            onClick={onSave}
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
            <Button variant="contained" onClick={handleClose}>
              {"Back"}
            </Button>
          </DialogActions>
        </Dialog>

    </Dialog>
    </>
  )
}

export default CreateOvertime