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
import client from "../../../global/client";
import { AlertContext } from '../../../context';
import { useNavigate } from "react-router-dom";
import { is } from "date-fns/locale";

const PopupTask = ({
  open,
  closeTask,
  isEdit,
  selectedWrIdanAbsenceId,
  dataDetail
}) => {
  const { setDataAlert } = useContext(AlertContext)
  const [listTaskProject, setlistTaskProject] = useState([])
  const [listProject, setlistProject] = useState([])
  const [ideffortTask, setideffortTask] = useState()
  const [opentask, setOpentask] = useState(false)
  const [statusTask, setstatusTask] = useState([])
  const [openPopUpMoretask, setPopUpMoretask] = useState(false)
  const selectedTask = listTaskProject.find((item) => item.backlogId === ideffortTask);
  const [taskDurations, setTaskDurations] = useState([listTaskProject.find((item) => item.backlogId === ideffortTask)]);
  const [cekAbsen, setCekabsen] = useState()
  const [openConfirmCancel,setopenConfirmCancel] = useState(false)
  const navigate = useNavigate();
  
  const clearProject = {
    absenceId: null,
    projectId: null,
    listTask: []
  }
  
  const [dataProject, setProject] = useState(
    {
    workingReportId: undefined,
    listProject: [clearProject]
    }
  )

  const clearTask = {
    backlogId: '',
    taskName: '',
    statusTaskId: '',
    duration: '',
    taskItem: ''
  };

  useEffect(() => {
    console.log("DATA DETAIL",dataDetail)
    if(isEdit){
      setOpentask(true)      
    }
    getlistTaskProject()
    getlistProject()
    getstatusTask()    
    console.log("dataproject",dataProject)    
  },[dataProject,dataDetail])

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
  const UpdateTask = async () => {
    const res = await client.requestAPI({
      method: 'PUT',
      endpoint: `task/update`
    })
    if (res.data) {      
     console.log("update task")
    }
  }  

  const getlistTaskProject = async () => {    
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/taskProject?projectId=1&search=`
    })
    if (res.data) {      
      const datalisttask = res.data.map((item) => ({backlogId:parseInt(item.id), taskName:item.attributes.taskName, actualEffort:item.attributes.actualEffort}))      
      setlistTaskProject(datalisttask)
    }
  }

  const getlistProject = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `ol/projectTypeList?userId=1&search=`
    })            
    const resabsen = await client.requestAPI({
      method: 'GET',
      endpoint: `ol/absenceTask?search=`
    })
    const datalist = res.data.map((item) => ({id:parseInt(item.id), name:item.attributes.projectName}))
      const dataabsen = resabsen.data.map((item) => ({ id: parseInt(item.id), name: item.attributes.name, absen:true }));
 
    if (res.data && resabsen.data) {
      const mergedList = [...datalist, ...dataabsen];
      setlistProject(mergedList);
    }
  }

  const onAddProject = () => {
    const temp = { ...dataProject };
    temp.listProject = [...dataProject.listProject, { absenceId: null, projectId: 1, listTask: [{ ...clearTask }] }];
    setProject(temp);    
  }

  const AddTask = (idxProject) => {
    const temp = { ...dataProject };
    temp.listProject[idxProject].listTask.push({ ...clearTask });
    setProject(temp);
    setTaskDurations((prevDurations) => [
      ...prevDurations,
      { listTask: temp.listProject[idxProject].listTask.backlogId, duration: 0 },
    ]);
  };

  const handleChange = (event, idxProject, index, backlogId) => {    
    const { name, value } = event.target;
    if (name === 'duration') {      
        setideffortTask(parseInt(value));
        const temp = { ...dataProject };
        temp.listProject[idxProject].listTask[index][name] = parseInt(value);
        setProject(temp);

        setTaskDurations((prevDurations) =>
        prevDurations.map((durationItem, i) => ({
          ...durationItem,
          duration: i === index ? parseInt(value) : durationItem.duration,
        }))
      );      
    }  
    else {
      const temp = { ...dataProject };
      temp.listProject[idxProject].listTask[index][name] = value;
      if (name === 'taskName') {
        temp.listProject[idxProject].listTask[index].backlogId = backlogId;
      }  
      setProject(temp);
    }
  };
  
  const handleChangeProject = (id, idxProject,absen) => {   
    const temp = { ...dataProject };    
    temp.workingReportId = selectedWrIdanAbsenceId.workingReportId;
    if(absen){
      temp.listProject[idxProject].absenceId = id;
    }else{
      temp.listProject[idxProject].projectId = id;
    }    
    temp.listProject[idxProject].listTask = [clearTask];
    setProject(temp);
  };

  const deleteTask = (e, idxProject, index) => {
    e.preventDefault();
    const temp = { ...dataProject };
    temp.listProject[idxProject].listTask.splice(index, 1);
    setProject(temp);
  };

  const SubmitSave = async () => {      
      try {
        let tempEffort = 0
        for(let i = 0; i < dataProject.listProject.length; i++) {
          const project = dataProject.listProject[i];
          for (let j = 0; j < project.listTask.length; j++) {
            tempEffort = tempEffort + project.listTask[j].duration;            
          }
          console.log("INI EFFORT",tempEffort)
        }
        if (tempEffort > 8 || tempEffort < 1) {
          setPopUpMoretask(true);        
        }else{
          const dataPost = dataProject
          console.log("INI OBJECT POST", dataPost)
          // const res = await client.requestAPI({
          //   method: 'POST',
          //   endpoint: `/task/addTask`,
          //   data: dataProject,
          // });      
          // if(!res.isError){
          //   console.log("INI RES",res.data.attributes)
          //   localStorage.setItem('istaskadd', true)            
          //   setDataAlert({
          //     severity: 'success',
          //     open: true,
          //     message: res.data.meta.message
          //   }) 
          //   setTimeout(() => {
          //     navigate('/workingReport')
          //   }, 3000)      
          // }else{      
          //   setDataAlert({
          //     severity: 'error',
          //     message: res.error.meta.message,
          //     open: true
          //   })
          // }
          // closeTask(false)
          // setOpentask(false)
          // setProject(
          //   {
          //     workingReportId: undefined,
          //     listProject: [clearProject]
          //   }
          // )
          // setideffortTask('')
        }
      }catch (error) {
        console.error('Error:', error);
      }
    }
  
  return (
    <>
    <Dialog
      open={open}      
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
          {dataProject.listProject.length > 0 && dataProject.listProject.map((resProject, idxProject) => (                   
            <div className={opentask ? 'card-project' : ''} key={`${idxProject+1}-project`}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Autocomplete
                    disabled={isEdit}
                    disablePortal                    
                    name='project'
                    className='autocomplete-input autocomplete-on-popup'
                    options={listProject}
                    getOptionLabel={isEdit ? "CMS" : (option) => option.name}
                    sx={{ width: "100%", marginTop: "20px", backgroundColor: "white" }}
                    onChange={(_event, newValue) => {
                    if (newValue) {
                      handleChangeProject(newValue.id, idxProject, newValue.absen) 
                      setCekabsen(newValue.absen)                     
                      setOpentask(true)
                    }else {
                      setOpentask(false)
                      setProject(
                          {
                          workingReportId: undefined,
                          listProject: [clearProject]
                          }
                        )
                      setideffortTask('')
                      setCekabsen('')
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
                  {cekAbsen ? (
                  <>
                  {resProject.listTask.map((res, index) => (
                    <Grid container rowSpacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          focused
                          name='duration'
                          sx={{ width: "100%" , backgroundColor: 'white' }}
                          // value={selectedTask ? selectedTask.actualEffort : ideffortTask}
                          onChange={(e) => handleChange(e,idxProject, index)}                                
                          className='input-field-crud'
                          type="number"
                          placeholder='e.g 0,5 or 3 (hour)'
                          label='Duration'
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          focused
                          name='taskItem'
                          sx={{ width: "100%" , backgroundColor: 'white' }}
                          // value={res.detail}
                          onChange={(e) => handleChange(e,idxProject, index)}
                          className='input-field-crud'
                          placeholder='e.g Rest for a while'
                          label='Information Details'
                          multiline
                          maxRows={4}
                        />
                        </Grid>
                      </Grid>
                    ))}
                    </> ) : (
                    <>
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
                                  sx={{ width: "100%" , backgroundColor: 'white' }}
                                  onChange={(_event, newValue) => {
                                    if (newValue) {
                                    handleChange(
                                      {target : { name : 'taskName', value: newValue.taskName}},                                    
                                      idxProject,
                                      index,
                                      newValue.backlogId
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
                                  name='statusTaskId'
                                  className='autocomplete-input autocomplete-on-popup'
                                  options={statusTask}
                                  getOptionLabel={(option) => option.name} 
                                  sx={{ width: "100%" , backgroundColor: 'white' }}
                                  onChange={(_event, newValue) =>
                                    handleChange(
                                      { target: { name : 'statusTaskId', value : newValue.id } },
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
                                  name='duration'
                                  sx={{ width: "100%" , backgroundColor: 'white' }}
                                  // value={selectedTask ? selectedTask.actualEffort : ideffortTask}
                                  onChange={(e) => handleChange(e,idxProject, index)}                                
                                  className='input-field-crud'
                                  type="number"
                                  placeholder='e.g Create Login Screen"'
                                  label='Actual Effort'
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  focused
                                  name='taskItem'
                                  sx={{ width: "100%" , backgroundColor: 'white' }}
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
                    </>)
                  }
                  </Grid>                  
                      {/* {dataProject.workingReportId !== undefined && */}
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
                        {/* } */}                    
                </Grid>
              </div>
            )
          )
        }
      </DialogContent>
      <DialogActions>
        {/* {dataProject.workingReportId !== undefined && ( */}
          <>         
              <div className='left-container'>
              <Button              
                variant="outlined"
                className='green-button button-text'
                onClick={() => onAddProject()}
                startIcon={<AddIcon />}
                >
                Add Project
              </Button>
            </div>              
        <div className='right-container'>
          <Button
            onClick={() => {
              setopenConfirmCancel(true)              
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
        </>
        {/* )
      } */}
      </DialogActions>
    </Dialog>
    <Dialog
          open={openConfirmCancel}
          onClose={() => setopenConfirmCancel(false)}
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
          onClick={() => 
            {
            closeTask(false)
            setOpentask(false)
            setProject(
              {
                workingReportId: undefined,
                listProject: [clearProject]
              }
            )
            setideffortTask('')
            setopenConfirmCancel(false)
            }            
          }
          >
              {"Cancel without saving"}
            </Button>
            <Button variant="contained" 
            onClick={() => setopenConfirmCancel(false)}
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