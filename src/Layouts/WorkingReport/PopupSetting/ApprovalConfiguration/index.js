import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import '../../../../App.css';
import uploadFile from "../../../../global/uploadFile";

const ApprovalConfiguration = ({approvalConfig, setApprovalConfig}) => {

  const [file, setFile] = useState('')
  const [filePath, setFilePath] = useState('')

  const addApproval = () => {
    setApprovalConfig((prevData) => [
      ...prevData, {...approvalConfig}
    ])
  }

  const handleChangeUpload = async (e, index) => {
    if (e.target.files) {
      const tempFilePath = await uploadFile(e.target.files[0])
      const parts = tempFilePath.split('=')
      const fileName = parts[1];

      setFilePath(fileName)
      setFile(URL.createObjectURL(e.target.files[0]));

      const tempApproval = [...approvalConfig];
      tempApproval[index] = {
        ...tempApproval[index],
        signatureName: fileName
      };
      setApprovalConfig(tempApproval);
    }
  }

  const deleteApproval = (index) => {
    setApprovalConfig((prevData) => {
      const temp = [...prevData]
      temp.splice(index, 1)
      return temp
    })  
  }

  const changeField = (props, value, idx) => {
    const tempApproval = [...approvalConfig]
    tempApproval[idx] = {
      ...tempApproval[idx],
      [props]: value
    }
    setApprovalConfig(tempApproval)
  } 

  return (
    <Grid container direction="row"  className={'card-configuration'}>
      {approvalConfig.map((approval, index) => (
      <Grid item xs={12} key={index} >
        <Accordion sx={{ boxShadow: 'none', width: '100%' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className='header-accordion'
          >
            <Typography sx={{ fontSize: "24px" }}>
              Approval {index + 1}
            </Typography>
            {approvalConfig.length > 1 && (
            <DeleteIcon 
              className='icon-trash'
              onClick={() => deleteApproval(index)}
            />
            )}
          </AccordionSummary>
          <AccordionDetails>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  focused
                  name='approval-header'
                  className='input-field-crud'
                  label='Header Name'
                  placeholder='e.g Jhon Doe'
                  value={approval.approvalHeader}
                  onChange={(e) => changeField('approvalHeader', e.target.value, index)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  focused
                  name='approval-name'
                  className='input-field-crud'
                  label='Approval Name'
                  placeholder='e.g Jhon Doe'
                  value={approval.approvalName}
                  onChange={(e) => changeField('approvalName', e.target.value, index)}
                />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                  focused
                  name='apprval-role'
                  className='input-field-crud'
                  placeholder='e.g Human Resource'
                  label='Approval Role'
                  value={approval.approvalRole}
                  onChange={(e) => changeField('approvalRole', e.target.value, index)}
                />
              </Grid>
              <Grid item xs={12} textAlign='left' sx={{marginTop:'10px'}}>
              <Button className="button-text" variant="contained" sx={{marginBottom:'10px'}}>
                <label>Upload Signature</label>
                <input
                  type="file"
                  accept=".png, .jpg"
                  className="custom-file-input"
                  onChange={(e) => handleChangeUpload(e, index)}
                />
              </Button>
              <Typography className="font-upload-signature">Allowed JPG or PNG. Max size of 1MB</Typography>
            </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        </Grid>
        ))}
      
            
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

export default ApprovalConfiguration;
