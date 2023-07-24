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
  closeOvertime
}) => {

  const listProject = [
    {
      label: 'Project - ACI Telkom',
      value: 'Project - ACI Telkom'
    },
    {
      label: 'Project - FitAja',
      value: 'Project - FitAja'
    },
  ]

  const clearProject = {
    backlogId: '',
    dataTask: []
  }
  const [dataProject, setProject] = useState([
    clearProject
  ])

  const onAddProject = () => {
    const temp = [...dataProject]
    temp.push({
      backlogId: '',
      dataTask: [
        {
          id: `1-task`,
          taskName: '',
          taskStatus: '',
          effort: '',
          detail: ''
        }
      ]
    })
    setProject(temp)
  }

  const AddTask = (idxProject) => {
    const temp = [...dataProject]
    temp[idxProject].dataTask.push({
      id: `${temp[idxProject].dataTask.length + 1}-task`,
      taskName: '',
      taskStatus: '',
      effort: '',
      detail: ''
    })
    setProject(temp)
  }

  const handleChange = (event, idxProject, index) => {    
    const { name, value } = event.target;
    if(name === 'effort'){
      setIdEffortTask(value)
    } else{
    const temp = [...dataProject]
    temp[idxProject].dataTask[index][name]= value
    setProject(temp)
    }
  }; 

  
  const handleChangeProject = (value, idxProject) => {
    const temp = [...dataProject]
    temp[idxProject].backlogId = value
    setProject(temp);
  };

  const deleteTask = (e, idxProject, index) => {
    e.preventDefault()
    const temp = [...dataProject]
    temp[idxProject].dataTask.splice(index, 1)
    setProject(temp)
  }
  
  const navigate = useNavigate()
  const [dialogCancel, setDialogCancel] = useState(false)
  const [userId, setUserId] = useState()
  const { setDataAlert } = useContext(AlertContext)
  // const [isSave, setIsSave] = useState(false)
  const [sendData, setData] = useState({})
  const [isLocalizationFilled, setIsLocalizationFilled] = useState(false);
  const [startTime, setStartTime] = useState(null)
  const [optTask, setOptTask] = useState([])
  const [optProject, setOptProject] = useState([])
  const [optStatus, setOptStatus] = useState({})
  const [endTime, setEndTime] = useState(null)
  const [idEffortTask, setIdEffortTask] = useState()
  const [opentask, setOpentask] = useState(false)
  const selectedTask = optTask.find((item) => item.backlogId === idEffortTask);

  const handleStartTime = (isFilled, start) => {
    setStartTime(start)
    setIsLocalizationFilled(isFilled)
  }

  const handleEndTime = (isFilled, end) => {
    setEndTime(end)
    setIsLocalizationFilled(isFilled)
  }

  const handleClose = () => {
    setDialogCancel(false)
  }

  useEffect(() => {
    getDataTask()
    getDataProject()
    getDataStatus()
  }, [dataProject])

  //option task
  const getDataTask = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/taskProject?projectId=1&search`
    })
    const data = res.data.map(item => ({id : item.id, name: item.attributes.taskName, actualEffort: item.attributes.actualEffort}));
    setOptTask(data)
  }
  //option task

  //option project
  const getDataProject = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/projectTypeList?userId=1&search=`
    })
    const data = res.data.map(item => ({id : item.id, name: item.attributes.projectName}));
    setOptProject(data)
  }
  //option project

  //option status
  const getDataStatus = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/status?search=`
    })
    const data = res.data.map(item => ({id : item.id, status: item.attributes.name}));
    setOptStatus(data)
  }
  //option status

  const onSave = async () => { 
    const data = {
      startTime: startTime,
      endTime: endTime,
      ...dataProject
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
    // open(false);
  }

  return (
    <>
    {isEdit ? (
      <>
      <Dialog
      open={open}
      onClose={() => closeOvertime(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-delete dialog-task"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" className="dialog-delete-header">
        {"Edit Overtime"}
      </DialogTitle>
      <DialogContent className="dialog-task-content">
        <DialogContentText
          className="dialog-delete-text-content"
          id="alert-dialog-description"
        >
          Note: If an employee chooses to perform overtime for a spesific task, a notification will be sent to the Human Resources Department
        </DialogContentText>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <TimePicker label="Start Time"
                value={startTime} 
                onChange={(newValue) => handleStartTime(newValue)}
                />
                <TimePicker label="End Time" 
                value={endTime}
                onChange={(newValue) => handleEndTime(newValue)}/>
            </DemoContainer>
        </LocalizationProvider>

        
          {isLocalizationFilled && dataProject.map((resProject, idxProject) => (
            <div className='card-project' key={`${idxProject+1}-project`}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Autocomplete
                    disablePortal
                    className='autocomplete-input autocomplete-on-popup'
                    options={listProject}
                    sx={{ width: "100%", marginTop: "20px" }}
                    onChange={(_event, newValue) => handleChangeProject(newValue, idxProject)}
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
                    resProject.dataTask.map((res, index) => (
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
                              className='autocomplete-input autocomplete-on-popup'
                              options={listProject}
                              sx={{ width: "100%" }}
                              defaultValue="T-WR-0011 :: Create Mockup Screen Dashboard"
                              onChange={(_event, newValue) => handleChangeProject(newValue, idxProject)}
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
                            <Autocomplete
                              disablePortal
                              className='autocomplete-input autocomplete-on-popup'
                              options={listProject}
                              sx={{ width: "100%" }}
                              onChange={(_event, newValue) => handleChangeProject(newValue, idxProject)}
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
                                name='effort'
                                value={res.effort}
                                onChange={(e) => handleChange(e, index)}
                                className='input-field-crud'
                                placeholder='e.g Create Login Screen"'
                                label='Actual Effort'
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                focused
                                name='detail'
                                value={res.detail}
                                onChange={(e) => handleChange(e, index)}
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
                  {dataProject[0].value !== '' &&
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
          {dataProject[0].value !== '' &&
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
            onClick={() => closeOvertime(false)}
            >
            Submit
          </Button>
        </div>
      </DialogActions>
      
      <Dialog
          open={dialogCancel}
          onClose={() => closeOvertime(false)}
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
          <Button variant="outlined" onClick={() => closeOvertime(false)}>
              {"Cancel without saving"}
            </Button>
            <Button variant="contained" onClick={handleClose}>
              {"Back"}
            </Button>
          </DialogActions>
        </Dialog>

    </Dialog>
    </>
    ) : (
    
    <Dialog
      open={open}
      onClose={() => closeTask(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-delete dialog-task"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" className="dialog-delete-header">
        {"Add Overtime"}
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
        
          {isLocalizationFilled && dataProject.length > 0 && dataProject.map((resProject, idxProject) => (
            <div className={opentask ? 'card-project' : ''} key={`${idxProject+1}-project`}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Autocomplete
                    disablePortal
                    className='autocomplete-input autocomplete-on-popup'
                    options={optProject}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: "100%", marginTop: "20px" }}
                    onChange={(_event, newValue) => {
                      if(newValue){
                      handleChangeProject(newValue, idxProject)
                      setOpentask(true)
                    } else {
                      setOpentask(false)
                      setProject([clearProject])
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
                    resProject.dataTask.map((res, index) => (
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
                              getOptionLabel={(option) => option.name}
                              sx={{ width: "100%", marginTop: "20px" }}
                              onChange={(_event, newValue) => {
                                if(newValue) {
                                  handleChangeProject(newValue, idxProject)
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
                              name='taskStatus'
                              className='autocomplete-input autocomplete-on-popup'
                              options={optStatus}
                              getOptionLabel={(option) => option.status}
                              sx={{ width: "100%" }}
                              onChange={(_event, newValue) => handleChangeProject(newValue, index)}
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
                                name='effort'
                                value={selectedTask ? selectedTask.actualEffort : ''}         
                                onChange={(e) => handleChange(e, index)}
                                className='input-field-crud'
                                placeholder='e.g Create Login Screen"'
                                label='Actual Effort'
                              />
                            </Grid>
                            {/* <Grid item xs={12}>
                              <TextField
                                focused
                                name='effort'
                                value={res.effort}
                                onChange={(e) => handleChange(e, index, idxProject)}
                                className='input-field-crud'
                                placeholder='e.g Create Login Screen"'
                                label='Actual Effort'
                              />
                            </Grid> */}
                            <Grid item xs={12}>
                              <TextField
                                focused
                                name='detail'
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
                  {dataProject[0].backlogId !== '' &&
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
          {dataProject[0].backlogId !== '' &&
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
          onClose={() => closeTask(false)}
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
            onClick={() => {
              closeTask(false)
              setOpentask(false)
              setProject([clearProject])
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
    )}
    </>
  )
}

export default CreateOvertime