import React, { useEffect, useState, useContext } from "react";
import { 
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete, 
    Button, 
    Grid, 
    TextField,
    Typography
  } from "@mui/material"
  import AddIcon from '@mui/icons-material/Add';
  import '../../../../App.css'
  import DeleteIcon from '@mui/icons-material/Delete';
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import uploadFile from "../../../../global/uploadFile";

const TaskConfiguration = () => {

  const [file, setFile] = useState('')
  const [filePath, setFilePath] = useState('')

  const [taskConfig, setTaskConfig] = useState([
    {
      approvalName: '',
      approvalRole: ''
    }
  ])

  const addApproval = () => {
    setTaskConfig((prevData) => [
      ...prevData, {...taskConfig}
    ])
  }

  const handleChangeUpload = async (e) => {
    if (e.target.files) {
      const tempFilePath = await uploadFile(e.target.files[0])
      setFilePath(tempFilePath)
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  const deleteApproval = (index) => {
    setTaskConfig((prevData) => {
      const temp = [...prevData]
      temp.splice(index, 1)
      return temp
    })  
  }

  return (
    <Grid container direction="row"  className={'card-configuration'}>
      {taskConfig.map((approval, index) => (
      <Grid item xs={12} key={index} >
        <Accordion sx={{ boxShadow: 'none', width: '100%' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className='header-accordion'
          >
            <Typography sx={{ fontSize: "24px" }}>
              Approval {index + 1}
            </Typography>
            <DeleteIcon 
              className='icon-trash'
              onClick={() => deleteApproval(index)}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  focused
                  name='approval-name'
                  className='input-field-crud'
                  label='Approval Name'
                  placeholder='e.g Jhon Doe'
                />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                  focused
                  name='apprval-role'
                  className='input-field-crud'
                  placeholder='e.g Human Resource'
                  label='Approval Role'
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        </Grid>
        ))}
      
      <Grid item xs={12} textAlign='left' sx={{marginTop:'10px'}}>
            <Button className="button-text" variant="contained">
              <label>Upload Signature</label>
              <input
                type="file"
                accept=".png, .jpg"
                className="custom-file-input"
                onChange={handleChangeUpload}
              />
              </Button>
              <Typography className="font-upload-signature">Allowed JPG or PNG. Max size of 1MB</Typography>
            </Grid>
            <Grid item xs={12} textAlign='left' sx={{marginTop:'10px'}}>
              <Button
                  onClick={() => addApproval()}
                  variant="outlined"
                  className="button-text"
                  startIcon={<AddIcon />}
              >
                  Add Approval
              </Button>
            </Grid>
      {/* </Grid> */}
    </Grid>
  );
};

export default TaskConfiguration;
