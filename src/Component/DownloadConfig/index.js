import React, { useEffect, useRef, useState } from 'react';

import { Box, Button, Tabs, Grid, Tab, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Autocomplete, TextField, InputAdornment } from "@mui/material";


import ColumnConfiguration from './ColumnConfiguration';
import { merged, split } from './columns';
import './index.css'
import TaskConfiguration from '../../Layouts/WorkingReport/PopupSetting/TaskConfiguration';
import ApprovalConfiguration from '../../Layouts/WorkingReport/PopupSetting/ApprovalConfiguration';

const DownloadConfiguration = ({ open = false, onClose: handleClose = () => false, defaultConfiguration = {
  includeAbsenceType: true,
  includeProjectName: true,
  includeDuration: true,
  columnConfiguration: split,
} }) => {
  const [value, setValue] = useState("one");

  const [dataApproval, setDataApprove] = useState([
    {
      approvalName: '',
      approvalRole: ''
    }
  ])
  console.log("approval : ", dataApproval);

  const columnConfig = useRef(null);
  console.log(columnConfig);

  const [state, setState] = useState(defaultConfiguration);
  console.log("state", state);

  const [taskConfig, setTaskConfig] = useState({
    includeAbsenceType: true,
    includeProjectName: true,
    includeDuration: true,
  });
  console.log("task configuration : ", taskConfig);

  const handleTaskConfigChange = (config) => {
    setTaskConfig(config);
  };


  const handleTab = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    open && setState(JSON.parse(localStorage.getItem('downloadConfiguration')) || defaultConfiguration);
  }, [open]);

  const f = useRef(true);
  useEffect(() => {
    if (f.current) {
      f.current = false;
    } else {
      setState((p) => ({
        ...p,
        columnConfiguration: p.splitTask ? split : merged,
      }));
    }
  }, [state.splitTask]);

  useEffect(() => {
    saveConfiguration()
  }, [])

  const saveConfiguration = () => {
    const tempApproval = dataApproval.map(res => {
      return {
        headerValue: "",
        nameValue: res.approvalName,
        roleValue: res.approvalRole
      }
    })
    localStorage.setItem(
      'downloadConfiguration',
      JSON.stringify({
        ...taskConfig,
        columnConfiguration: columnConfig.current ? columnConfig.current.items : state.columnConfiguration,
        list: [...tempApproval],
      })
    );
    handleClose();
  };

  return (
    <>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-configuration"
    >
      <DialogTitle id="alert-dialog-title" className='dialog-delete-header'>
        {"Setting Download Configuration"}
      </DialogTitle>
      <DialogContent className="dialog-delete-content">
        <DialogContentText>
          Edit setting documents
        </DialogContentText>
      </DialogContent>

      <DialogContent className="dialog-delete-content"> 
        <Grid>
          <Box className="tab-config">
          <Tabs value={value} onChange={handleTab} indicatorColor="primary" textColor="primary" sx={{marginBottom: 3}}>
              <Tab 
                value="one" 
                label="TASK CONFIGURATION"
                style={{
                  borderBottom: value === "one" ? "2px solid #2196F3" : "none",
                }}
              ></Tab>
              <Tab 
                value="two" 
                label="COLUMN CONFIGURATION"
                style={{
                  borderBottom: value === "two" ? "2px solid #2196F3" : "none",
                }}
              />
              <Tab 
                value="three" 
                label="APPROVAL CONFIGURATION"
                style={{
                  borderBottom: value === "three" ? "2px solid #2196F3" : "none",
                }}
              />
            </Tabs>
          </Box>
          {value === "one" && (<TaskConfiguration taskConfig={taskConfig} setTaskConfig={handleTaskConfigChange} />)}
          {value === "two" && (<ColumnConfiguration ref={columnConfig} />)}
          {value === "three" && (<ApprovalConfiguration approvalConfig={dataApproval} setApprovalConfig={setDataApprove} />)}
        </Grid>
      </DialogContent>
              

      <DialogActions className="dialog-delete-actions" sx={{paddingTop: 3}}>
        <Button onClick={handleClose} variant='outlined' className="button-text">Cancel</Button>
        <Button onClick={saveConfiguration} variant='contained' className='button-text'>Update Configuration</Button>
      </DialogActions>
  </Dialog>
  </>
  );
};

export default DownloadConfiguration;
