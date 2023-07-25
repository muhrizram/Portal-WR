import React, { useState, useEffect } from "react";
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
import client from "../../../global/client";

const PopupTask = ({
  open,
  closeTask,
  isEdit
}) => {
  const [listTaskProject, setlistTaskProject] = useState([])
  const [listProject, setlistProject] = useState([])
  const [ideffortTask, setideffortTask] = useState()
  const [opentask, setOpentask] = useState(false)
  const [statusTask, setstatusTask] = useState([])
  const [openPopUpMoretask, setPopUpMoretask] = useState(false)
  const selectedTask = listTaskProject.find((item) => item.backlogId === ideffortTask);
  const clearProject = {
    workingReportId: '',
    backlogId: '',
    listTask: []
  }

  const [dataProject, setProject] = useState([
    clearProject
  ])

  useEffect(() => {
    getlistTaskProject()
    getlistProject()
    getstatusTask()
    console.log("HAHAHHADATA",dataProject)
  },[dataProject])

  const getstatusTask = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/status?search=`
    })
    if (res.data) {      
      const datastatusTask = res.data.map((item) => ({id:parseInt(item.id), name:item.attributes.name}))
      setstatusTask(datastatusTask)
    }
  }

  const getlistTaskProject = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/taskProject?projectId=1&search`
    })
    if (res.data) {      
      const datalisttask = res.data.map((item) => ({backlogId:parseInt(item.id), taskName:item.attributes.taskName, actualEffort:item.attributes.actualEffort}))
      setlistTaskProject(datalisttask)
    }
  }

  const getlistProject = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/projectTypeList?userId=1&search=`
    })
    if (res.data) {      
      const datalist = res.data.map((item) => ({id:parseInt(item.id), projectName:item.attributes.projectName}))      
      setlistProject(datalist)
    }
  }

  const onAddProject = () => {
    const temp = [...dataProject]
    temp.push({
      workingReportId: '',
      backlogId: '',
      listTask: [
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
    temp[idxProject].listTask.push({
      id: `${temp[idxProject].listTask.length + 1}-task`,
      taskName: '',
      taskStatus: '',
      effort: '',
      detail: ''
    })
    setProject(temp)
  }

  const handleChange = (event, idxProject, index) => {    
    const { name, value } = event.target;
    if(name === 'effort' ) {      
      if(value > 8){
        setPopUpMoretask(true)
      }else{
        setideffortTask(value)
        const temp = [...dataProject]
        temp[idxProject].listTask[index][name]= value
        setProject(temp)
      }
    }else{
      const temp = [...dataProject]
      temp[idxProject].listTask[index][name]= value
      setProject(temp)
    }    
  }; 
  
  const handleChangeProject = (id, idxProject) => {
    const temp = [...dataProject]
    temp[idxProject].backlogId = id     
    setProject(temp);
    temp[idxProject].workingReportId = parseInt(localStorage.getItem('workingReportId'))
    setProject(temp);
  };

  const deleteTask = (e, idxProject, index) => {
    e.preventDefault()
    const temp = [...dataProject]
    temp[idxProject].listTask.splice(index, 1)
    setProject(temp)
  }

  const SubmitSave = async () => {      
      try {      
        for (let i = 0; i < dataProject.length; i++) {
          const taskObject = dataProject[i].backlogId;        
          // console.log("taskObject",taskObject)
        // const res = await client.requestAPI({
        //   method: 'POST',
        //   endpoint: `/task/addTask`,
        //   data: taskObject,
        // });
      }} catch (error) {
        console.error('Error:', error);
      }
    }
  
  return (
    <>
    <Dialog
      open={open}
      onClose={() => closeTask(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-delete dialog-task"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" className="dialog-delete-header">
        {isEdit ? "Edit Task" : "Add Task" }
      </DialogTitle>
      <DialogContent className="dialog-task-content">
        <DialogContentText
          className="dialog-delete-text-content"
          id="alert-dialog-description"
        >
          Assign and track employee tasks easily
        </DialogContentText>
          {dataProject.length > 0 && dataProject.map((resProject, idxProject) => (                   
            <div className={opentask ? 'card-project' : ''} key={`${idxProject+1}-project`}>                
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Autocomplete
                    disablePortal
                    name='project'
                    className='autocomplete-input autocomplete-on-popup'
                    options={listProject}
                    getOptionLabel={(option) => option.projectName}
                    sx={{ width: "100%", marginTop: "20px" }}
                    onChange={(_event, newValue) => {
                    if (newValue) {
                      handleChangeProject(newValue.id, idxProject)                      
                      setOpentask(true)
                    }else {
                      setOpentask(false)
                      setProject([clearProject])
                      setideffortTask('')
                    }
                    }}
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
                                options={listTaskProject}
                                getOptionLabel={(option) => option.taskName} 
                                sx={{ width: "100%" }}
                                onChange={(_event, newValue) => {
                                  if (newValue) {
                                  handleChange(
                                    {target : { name : 'taskName', value: newValue.taskName}},
                                    idxProject,
                                    index                                  
                                    )                                  
                                  setideffortTask(newValue.backlogId)
                                  }else{
                                    setideffortTask('')
                                  }
                                 }
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    className='input-field-crud'
                                    label='Task Name'
                                    placeholder='e.g Create Login Screen'
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Autocomplete
                                disablePortal
                                name='taskStatus'
                                className='autocomplete-input autocomplete-on-popup'
                                options={statusTask}
                                getOptionLabel={(option) => option.name} 
                                sx={{ width: "100%" }}
                                onChange={(_event, newValue) =>
                                   handleChange(
                                    { target: { name : 'taskStatus', value : newValue.id } },
                                     idxProject,
                                     index
                                     )
                                  }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    className='input-field-crud'
                                    label='Status Task'
                                    placeholder='e.g Create Login Screen'
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                focused
                                name='effort'
                                value={selectedTask ? selectedTask.actualEffort : ideffortTask}         
                                onChange={(e) => handleChange(e,idxProject, index)}                                
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
                                onChange={(e) => handleChange(e,idxProject, index)}
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
                  {dataProject[0].workingReportId !== '' &&
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
          {dataProject[0].workingReportId !== '' &&
            <Button
              // onClick={() => setOpen(false)}
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
            onClick={() => {
              closeTask(false)
              setOpentask(false)
              setProject([clearProject])
              setideffortTask('')
            }}
            variant="outlined"
            className="button-text"
          >
            Cancel
          </Button>
          <Button 
            variant='saveButton'
            className="button-text"
            onClick={() => SubmitSave()}
            >
            Submit
          </Button>
        </div>
      </DialogActions>
    </Dialog>
    <Dialog
          // open={dialogCancel}
          // onClose={() => closeTask(false)}
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
          <Button variant="outlined" 
          // onClick={() => closeTask(false)}
          >
              {"Cancel without saving"}
            </Button>
            <Button variant="contained" 
            // onClick={handleClose}
            >
              {"Back"}
            </Button>
          </DialogActions>
        </Dialog>
        
        <Dialog
              open={openPopUpMoretask}          
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
              {'Oops! You Work So Hard'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {"Task exceeds 8-hour duration and cannot be submitted"}
                </DialogContentText>
              </DialogContent>
              <DialogActions className="dialog-delete-actions"> 
                <Button variant="contained" onClick={() => setPopUpMoretask(false)}>
                  {"Back To Task"}
                </Button>
              </DialogActions>
            </Dialog>

    </>
  )
}

export default PopupTask