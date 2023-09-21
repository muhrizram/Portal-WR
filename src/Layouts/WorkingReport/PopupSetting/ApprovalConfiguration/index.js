import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import React, { useContext, useRef, useState } from "react";
import '../../../../App.css';
import uploadFile from "../../../../global/uploadFile";
import { AlertContext } from '../../../../context';

const convertBytesToString = (bytes) => {
  const kb = bytes / 1024;
  const mb = kb / 1024;
  const gb = mb / 1024;

  if (gb >= 1) {
    return gb.toFixed(2) + " GB";
  } else if (mb >= 1) {
    return mb.toFixed(2) + " MB";
  } else if (kb >= 1) {
    return kb.toFixed(2) + " KB";
  } else {
    return bytes + " Bytes";
  }
};

const ApprovalConfiguration = ({approvalConfig, setApprovalConfig}) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState('')
  const [filePath, setFilePath] = useState('')
  const { setDataAlert } = useContext(AlertContext)
  const [uploadedFiles, setUploadedFiles] = useState(new Array(approvalConfig.length).fill(null));
  const [isUploading, setIsUploading] = useState(new Array(approvalConfig.length).fill(false));
  const addApproval = () => {
    setApprovalConfig((prevData) => [
      ...prevData, {...approvalConfig}
    ])
  }

  const handleChangeUpload = async (e, index) => {
    if (e.target.files) {
      setIsUploading((prevIsUploading) => {
        const updatedIsUploading = [...prevIsUploading];
        updatedIsUploading[index] = true;
        return updatedIsUploading;
      });

      try {
        const tempFilePath = await uploadFile(e.target.files[0], 'signature');
        const parts = tempFilePath.split('=');
        const fileName = parts[1];

        setFilePath(fileName);

        const tempUploadedFiles = [...uploadedFiles];
        tempUploadedFiles[index] = e.target.files[0];
        setUploadedFiles(tempUploadedFiles);

        const tempApproval = [...approvalConfig];
        tempApproval[index] = {
          ...tempApproval[index],
          signatureName: fileName
        };
        setApprovalConfig(tempApproval);
      } catch (error) {
        setDataAlert({
          severity: 'error',
          open: true,
          message: "Error uploading file!"
        }) 
      } finally {
        setIsUploading((prevIsUploading) => {
          const updatedIsUploading = [...prevIsUploading];
          updatedIsUploading[index] = false;
          return updatedIsUploading;
        });
      }
    }
  }

  const deleteApproval = (index) => {
    setApprovalConfig((prevData) => {
      const temp = [...prevData]
      temp.splice(index, 1)
      return temp
    })  
  }

  const clearSignature = (index) => {
    const tempApproval = [...approvalConfig];
    tempApproval[index] = {
      ...tempApproval[index],
      signatureName: null
    };
    setApprovalConfig(tempApproval);

    const tempUploadedFiles = [...uploadedFiles];
    tempUploadedFiles[index] = null;
    setUploadedFiles(tempUploadedFiles);
  };

  const changeField = (props, value, idx) => {
    const tempApproval = [...approvalConfig]
    tempApproval[idx] = {
      ...tempApproval[idx],
      [props]: value
    }
    setApprovalConfig(tempApproval)
  } 

  const handleButtonClick = (index) => {
    const fileInput = document.getElementById(`file-input-${index}`);
    fileInput.click();
  };

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
              <Button
                variant="contained"
                sx={{ marginBottom: '8px' }}
                onClick={() => handleButtonClick(index)}
                disabled={!!isUploading[index]}
              >
                {isUploading[index] ? (
                  <>
                    <CircularProgress size={12} color="inherit" />
                    <Typography marginLeft={1}>Uploading...</Typography>
                  </>
                ) : (
                  "Upload Signature"
                )}
              </Button>
              <input
                id={`file-input-${index}`}
                type="file"
                hidden
                accept=".png, .jpg, jpeg"
                className="custom-file-input"
                style={{ display: 'none' }}
                onChange={(e) => handleChangeUpload(e, index)}
              />


              {uploadedFiles[index] ? (
                      <Grid item xs={12} component={Paper} mt={1} display="flex" p={2}>
                        <Box display="flex" flexDirection="column" textAlign="start" flex={1}>
                          <span className='text-files-name'>{uploadedFiles[index].name}</span>
                          <Box display="flex" gap={1} alignItems="center">
                          <span className='text-files-sizes'>
                            {convertBytesToString(uploadedFiles[index].size)}
                          </span>
                          <Box width="3px" height="3px" borderRadius="999px" backgroundColor="#00000099"/>
                          <span className='text-files-sizes'>
                            Completed
                          </span>
                          </Box>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <IconButton
                            onClick={() => clearSignature(index)}
                          >
                            <Clear />
                          </IconButton>
                        </Box>
                      </Grid>
                    ) : (
                      <Typography className="font-upload-signature">
                        {approval.signatureName ? (
                          <Grid item xs={12} component={Paper} mt={1} display="flex" p={2}>
                            <Box display="flex" flexDirection="column" textAlign="start" flex={1}>
                            <span className='text-files-name'>{approval.signatureName.split('/').pop()}</span>
                              <Box display="flex" gap={1} alignItems="center">
                              <Box width="3px" height="3px" borderRadius="999px" backgroundColor="#00000099"/>
                              <span className='text-files-sizes'>
                                Stored in Settings
                              </span>
                              </Box>
                            </Box>
                            <Box display="flex" alignItems="center">
                              <IconButton
                                onClick={() => clearSignature(index)}
                              >
                                <Clear />
                              </IconButton>
                            </Box>
                          </Grid>
                        ) : 'Allowed JPG or PNG. Max size of 1MB'}
                      </Typography>
                    )}
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
    </Grid>
  );
};

export default ApprovalConfiguration;
