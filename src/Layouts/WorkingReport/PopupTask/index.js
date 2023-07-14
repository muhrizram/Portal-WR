import React, { useState } from "react";
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

const PopupTask = ({
  open,
  closeTask
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

  const [dataProject, setProject] = useState([
    {
      value: '',
      dataTask: [
        {
          id: '1-task',
          taskName: '',
          taskStatus: '',
          effort: '',
          detail: ''
        }
      ]
    }
  ])

  const onAddProject = () => {
    const temp = [...dataProject]
    temp.push({
      value: '',
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
    const temp = [...dataProject]
    temp[idxProject].dataTask[index][name]= value
    setProject(temp)
  }; 

  
  const handleChangeProject = (value, idxProject) => {
    const temp = [...dataProject]
    temp[idxProject].value = value
    setProject(temp);
  };

  const deleteTask = (e, idxProject, index) => {
    e.preventDefault()
    const temp = [...dataProject]
    temp[idxProject].dataTask.splice(index, 1)
    setProject(temp)
  }
  
  return (
    <Dialog
      open={open}
      onClose={() => closeTask(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-delete dialog-task"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" className="dialog-delete-header">
        {"Add Task"}
      </DialogTitle>
      <DialogContent className="dialog-task-content">
        <DialogContentText
          className="dialog-delete-text-content"
          id="alert-dialog-description"
        >
          Assign and track employee tasks easily
        </DialogContentText>
          {dataProject.map((resProject, idxProject) => (
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
                              <TextField
                                focused
                                name='taskName'
                                value={res.taskName}
                                onChange={(e) => handleChange(e, idxProject, index)}
                                className='input-field-crud'
                                placeholder='e.g Create Login Screen"'
                                label='Task Name'
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                focused
                                name='taskStatus'
                                value={res.taskStatus}
                                onChange={(e) => handleChange(e, index)}
                                className='input-field-crud'
                                placeholder='e.g Create Login Screen"'
                                label='Status Task'
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
            // onClick={() => setOpen(false)}
            variant="outlined"
            className="button-text"
          >
            Cancel
          </Button>
          <Button 
            variant='saveButton'
            className="button-text"
            >
            Submit
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default PopupTask