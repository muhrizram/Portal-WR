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
import MinIcon from '@mui/icons-material/Remove';
import '../../../App.css'
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import client from "../../../global/client";
import { AlertContext } from '../../../context';
import { useNavigate } from "react-router-dom";
import { da, is } from "date-fns/locale";

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
  const [cekAbsen, setCekabsen] = useState([])
  const [openConfirmCancel,setopenConfirmCancel] = useState(false)
  const [dataDetailnya,setdataDetailnya] = useState([])
  const [addTaskinEdit,setAddtaskinEdit] = useState(false)
  const [CekProjectEdit,setCekProjectEdit] = useState([])
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

  const [firstEditTask,setfirstEditTask] = useState(
      {    
        workingReportId: null,
        listProject: []
      }
    )

  const refreshdataDetail = () => {
    let tempProject = []
      for(let i=0;i<dataDetail.length;i++){
        tempProject.push(dataDetail[i].attributes)
        setfirstEditTask((prevfirstEditTask) => ({
          ...prevfirstEditTask,
          workingReportId : parseInt(dataDetail[i].id),
          listProject : tempProject           
        }
        ));
      }     
  }

  useEffect(() => {
    if(isEdit){
      setdataDetailnya(dataDetail)
      refreshdataDetail()          
      setOpentask(true)      
    }
    getlistTaskProject()
    getlistProject()
    getstatusTask()
    console.log("DATA",dataProject)
    console.log("MAU EDIT",dataDetailnya)
  },[dataProject,dataDetailnya,dataDetail])

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
    const readyUpdate = {
      workingReportId: null,
      listProject: []
    }    
    readyUpdate.workingReportId = firstEditTask.workingReportId;    

    for (const project of firstEditTask.listProject) {
      const newProject = {};
      
      newProject.projectId = project.projectId;      
      newProject.absenceId = project.absenceId;      
      
      newProject.listTask = [];
      for (const task of project.listTask) {
        if(task.taskId === null){
          task.backlogId = null
        }
        const newTask = {};
        
        newTask.taskId = task.taskId;
        newTask.backlogId = task.backlogId;
        newTask.taskName = task.taskName;
        newTask.statusTaskId = task.statusTaskId;
        newTask.duration = parseInt(task.taskDuration);
        newTask.taskItem = task.taskItem;   
        newProject.listTask.push(newTask);
      } 
      readyUpdate.listProject.push(newProject);
    }    
    console.log("READY UPDATE",readyUpdate)
    const res = await client.requestAPI({
      method: 'PUT',
      endpoint: `/task/update`,
      data : readyUpdate
    })    
    if (res.data) {           
     closeTask(true)
     setDataAlert({
      severity: 'success',
      open: true,
      message: res.detail
    })
    }else{
      setDataAlert({
        severity: 'error',
        open: true,
        message: res.detail
      })
      closeTask(true)
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
      endpoint: `/ol/projectTypeList?userId=1&search=`
    })            
    const resabsen = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/absenceTask?search=`
    })
    const datalist = res.data.map((item) => ({id:parseInt(item.id), name:item.attributes.projectName}))
      const dataabsen = resabsen.data.map((item) => ({ id: parseInt(item.id), name: item.attributes.name, absen:true }));
 
    if (res.data && resabsen.data) {
      const mergedList = [...datalist, ...dataabsen];
      setlistProject(mergedList);
    }
  }

  const onAddProject = (CekProject) => {
    if(isEdit){
      setCekProjectEdit(CekProject)
      setAddtaskinEdit(true)      
      setfirstEditTask((prevState) => ({
        ...prevState,
        listProject: [...prevState.listProject, clearProject]
      }));      
    }else{
      setProject((prevState) => ({
        ...prevState,
        listProject: [...prevState.listProject, clearProject]
      }));
    }
  };

  const onRemoveProject = (idxProject) => {
  if (isEdit) {
    const updatedListProject = firstEditTask.listProject.filter(
      (_project, index) => index !== idxProject
    );
    setfirstEditTask((prevState) => ({
      ...prevState,
      listProject: updatedListProject,
    }));
  }
};

  const AddTask = (idxProject) => {        
    if(isEdit){
      const temp = { ...firstEditTask };
      temp.listProject[idxProject].listTask.push({ ...clearTask });
      setfirstEditTask(temp);      
    }else{
      const temp = { ...dataProject };
      temp.listProject[idxProject].listTask.push({ ...clearTask });
      setProject(temp);
    }
  };

  const handleChange = (event, idxProject, index, backlogId) => {
    if(isEdit){      
      const updatedFirstEditTask = { ...firstEditTask };
      if (name === 'taskName') {
        updatedFirstEditTask.listProject[idxProject].listTask[index].backlogId = backlogId;
      }  
      const { name, value } = event.target;            
      updatedFirstEditTask.listProject[idxProject].listTask[index][name] = value;
      setfirstEditTask(updatedFirstEditTask);      
    }else{
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
    }    
  };
  
  
  const handleChangeProject = (newValue, idxProject,absen) => {    
    if(isEdit){
      const temp = { ...firstEditTask };              
      if(absen){
        temp.listProject[idxProject].absenceId = newValue.id;
      }else{
        temp.listProject[idxProject].projectId = newValue.id;
        temp.listProject[idxProject].projectName = newValue.name;
      }    
      temp.listProject[idxProject].listTask = [clearTask];
      setfirstEditTask(temp);
    }else{
      const temp = { ...dataProject };    
      temp.workingReportId = selectedWrIdanAbsenceId.workingReportId;    
      if(absen){
        temp.listProject[idxProject].absenceId = newValue;
      }else{        
        temp.listProject[idxProject].projectId = newValue;
      }    
      temp.listProject[idxProject].listTask = [clearTask];
      setProject(temp);
    }
  };

  const deleteTask = (e, idxProject, index) => {
    e.preventDefault();
    if(isEdit){
      const temp = { ...firstEditTask};
      temp.listProject[idxProject].listTask.splice(index, 1);
      setfirstEditTask(temp);
    }else{
      const temp = { ...dataProject };
      temp.listProject[idxProject].listTask.splice(index, 1);
      setProject(temp);
    }    
  };

  const SubmitSave = async () => {      
      try {
        let tempEffort = 0
        for(let i = 0; i < dataProject.listProject.length; i++) {
          const project = dataProject.listProject[i];
          for (let j = 0; j < project.listTask.length; j++) {
            tempEffort = tempEffort + project.listTask[j].duration;            
          }          
        }
        if (tempEffort > 8 || tempEffort < 1) {
          setPopUpMoretask(true);        
        }else{
          const res = await client.requestAPI({
            method: 'POST',
            endpoint: `/task/addTask`,
            data: dataProject,
          });      
          if(!res.isError){            
            setDataAlert({
              severity: 'success',
              open: true,
              message: res.data.meta.message
            }) 
            setTimeout(() => {
              window.location.reload();
            }, 3000)
          }else{      
            setDataAlert({
              severity: 'error',
              message: res.error.meta.message,
              open: true
            })
          }
          closeTask(false)
          setOpentask(false)
          setProject(
            {
              workingReportId: undefined,
              listProject: [clearProject]
            }
          )
          setideffortTask('')
          navigate('/workingReport')
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
        {isEdit ? (
          <>          
            {firstEditTask.listProject.length > 0 && firstEditTask.listProject.map((resProject, idxProject) => (
              <div className={opentask ? 'card-project' : ''} key={`${idxProject}-project`}>
                <Grid container rowSpacing={2}>
                   <Grid item xs={12}>
                     <Autocomplete
                        disabled={addTaskinEdit && CekProjectEdit[idxProject-1] ? false : true}
                        disablePortal                    
                        name='project'
                        options={listProject}
                        getOptionLabel={(option) => option.name}
                        className='autocomplete-input autocomplete-on-popup'                       
                        sx={{ width: "100%", marginTop: "20px", backgroundColor: "white" }}
                        onChange={(_event, newValue) => {
                        if (newValue) {                      
                          handleChangeProject(newValue, idxProject, newValue.absen)                       
                          setCekabsen((prevCekAbsen) => {
                            const updatedCekAbsen = [...prevCekAbsen];
                            updatedCekAbsen[idxProject] = newValue.absen;
                            return updatedCekAbsen;
                          });     
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
                          setCekabsen((prevCekAbsen) => {
                            const updatedCekAbsen = [...prevCekAbsen];
                            updatedCekAbsen[idxProject] = '';
                            return updatedCekAbsen;
                          });
                        }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            className='input-field-crud'
                            label={addTaskinEdit == true && !CekProjectEdit[idxProject] ? "Project ": (resProject.absenceId ? dataDetailnya[idxProject].attributes.absenceName : dataDetailnya[idxProject].attributes.projectName) }
                            placeholder='Select Project'
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {resProject.absenceId ? (
                      <>
                      {resProject.listTask.map((res, index) => (
                        
                        <Grid container rowSpacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              focused
                              name='taskDuration'
                              sx={{ width: "100%" , backgroundColor: 'white' }}
                              value={res.taskDuration}
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
                              value={res.taskItem}
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
                          {resProject.listTask.map((res, index) => (
                            <Accordion key={res.id} sx={{ boxShadow: 'none', width: '100%' }}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className='header-accordion'
                              >
                                <Typography sx={{ fontSize: "24px" }}>
                                  Task {index + 1}
                                </Typography>
                                {index > 0 && (
                                  <DeleteIcon 
                                    className='icon-trash'
                                    onClick={(e) => deleteTask(e, idxProject, index)}
                                  />
                                )}
                              </AccordionSummary>
                              <AccordionDetails>
                                <Grid container rowSpacing={2}>
                                  <Grid item xs={12}>
                                    <Autocomplete
                                      disablePortal
                                      name='taskName'
                                      defaultValue={listTaskProject.find((option) => option.taskName === res.taskCode + ' - ' +  res.taskName) || null}
                                      // value={res.taskName}
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
                                      value={statusTask.find((option) => option.name === res.statusTaskName)}
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
                                      name='taskDuration'
                                      sx={{ width: "100%" , backgroundColor: 'white' }}
                                      value={res.taskDuration}
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
                                      value={res.taskItem}
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
                        <Grid container xs={12}>
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
                          <Grid item xs={6} textAlign='right'>
                          {idxProject > 0 && (
                            <Button
                              onClick={() => onRemoveProject(idxProject)}
                              variant="outlined"
                              color="error"                             
                              startIcon={<MinIcon />}
                            >
                              Remove Project
                            </Button>
                          )}
                          </Grid>    
                        </Grid>
                     </Grid>
                  </div>
                )
              )
            }
          </>
          ) : (
          <>
            {dataProject.listProject.length > 0 && dataProject.listProject.map((resProject, idxProject) => (                   
              <div className={opentask ? 'card-project' : ''} key={`${idxProject}-project`}>
                <Grid container rowSpacing={2}>
                   <Grid item xs={12}>
                     <Autocomplete                        
                        disablePortal                    
                        name='project'
                        className='autocomplete-input autocomplete-on-popup'
                        options={listProject}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: "100%", marginTop: "20px", backgroundColor: "white" }}
                        onChange={(_event, newValue) => {
                        if (newValue) {                      
                          handleChangeProject(newValue.id, idxProject, newValue.absen)                       
                          setCekabsen((prevCekAbsen) => {
                            const updatedCekAbsen = [...prevCekAbsen];
                            updatedCekAbsen[idxProject] = newValue.absen;
                            return updatedCekAbsen;
                          });     
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
                          setCekabsen((prevCekAbsen) => {
                            const updatedCekAbsen = [...prevCekAbsen];
                            updatedCekAbsen[idxProject] = '';
                            return updatedCekAbsen;
                          });
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
                      {cekAbsen[idxProject] ? (
                      <>
                      {resProject.listTask.map((res, index) => (
                        <Grid container rowSpacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              focused
                              name='duration'
                              sx={{ width: "100%" , backgroundColor: 'white' }}                              
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
                          {resProject.listTask.map((res, index) => (
                            <Accordion key={res.id} sx={{ boxShadow: 'none', width: '100%' }}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className='header-accordion'
                              >
                                <Typography sx={{ fontSize: "24px" }}>
                                  Task {index + 1}
                                </Typography>
                                {index > 0 && (
                                  <DeleteIcon 
                                    className='icon-trash'
                                    onClick={(e) => deleteTask(e, idxProject, index)}
                                  />
                                )}
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
                          {dataProject.workingReportId !== undefined &&                           
                          <Grid container xs={12}>
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
                            <Grid item xs={6} textAlign='right'>
                            {idxProject > 0 && (
                              <Button
                                onClick={() => onRemoveProject(idxProject)}
                                variant="outlined"
                                color="error"                             
                                startIcon={<MinIcon />}
                              >
                                Remove Project
                              </Button>
                            )}
                            </Grid>    
                          </Grid>                   
                            }                    
                    </Grid>
                  </div>
                )
              )
            }
          </>
          )
        }
          
      </DialogContent>
      <DialogActions>
        {isEdit ? (
          <>
                <div className='left-container'>
                  <Button              
                    variant="outlined"
                    className='green-button button-text'
                    onClick={() =>                       
                       {
                       let CekProject = []
                       for(let i=0; i<listProject.length; i++){
                          if(dataDetailnya[i]){
                            if (dataDetailnya[i].attributes.projectName) {
                            CekProject[i] =  true
                          }else{
                            CekProject[i] = false
                          }
                        }                       
                       }
                       onAddProject(CekProject)
                      }                       
                    }
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
                    onClick={() => 
                      {isEdit ? UpdateTask() : SubmitSave()}                      
                    }
                    >
                    Submit
                  </Button>
                </div>                                        
          </>
          ) : (
          <>
            {dataProject.workingReportId !== undefined && (
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
                </>
              )
            }
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
                    disabled={dataProject.workingReportId === undefined}
                    variant='saveButton'
                    className="button-text"
                    onClick={() => SubmitSave()}
                    >
                    Submit
                  </Button>
                </div>
             
          </>
          )
        }        
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