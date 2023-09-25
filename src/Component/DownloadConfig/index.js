import React, { useEffect, useRef, useState } from 'react';

import { Box, Button, Tabs, Grid, Tab, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from "@mui/material";


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
      approvalHeader: '',
      approvalName: '',
      approvalRole: '',
      signatureName: ''
    }
  ])

  const columnConfig = useRef(null);

  const [state, setState] = useState(defaultConfiguration);

  const [taskConfig, setTaskConfig] = useState({
    includeAbsenceType: true,
    includeProjectName: true,
    includeDuration: true,
  });

  const handleTaskConfigChange = (config) => {
    setTaskConfig(config);
  };


  const handleTab = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    { value: "one", label: "TASK CONFIGURATION" },
    { value: "two", label: "COLUMN CONFIGURATION" },
    { value: "three", label: "APPROVAL CONFIGURATION" },
  ];

  const TaskConfigurationTab = (
    <TaskConfiguration taskConfig={taskConfig} setTaskConfig={handleTaskConfigChange} />
  );
  const ColumnConfigurationTab = <ColumnConfiguration ref={columnConfig} />;
  const ApprovalConfigurationTab = (
    <ApprovalConfiguration approvalConfig={dataApproval} setApprovalConfig={setDataApprove} />
  );

  const tabContent = {
    one: TaskConfigurationTab,
    two: ColumnConfigurationTab,
    three: ApprovalConfigurationTab,
  }[value];

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
      const { approvalHeader = '', approvalName = '', approvalRole = '', signatureName } = res;

      return {
        headerValue: approvalHeader,
        nameValue: approvalName,
        roleValue: approvalRole,
        signatureName
      };
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
        <DialogContentText sx={{marginBottom: '2px'}}>
          Edit setting documents
        </DialogContentText>
      </DialogContent>

      <DialogContent className="dialog-delete-content"> 
        <Grid>
          <Box className="tab-config">
          <Tabs value={value} onChange={handleTab} indicatorColor="primary" textColor="primary" sx={{ marginBottom: 3 }}>
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                style={{
                  borderBottom: value === tab.value ? "2px solid #2196F3" : "none",
                }}
              />
            ))}
          </Tabs>
          </Box>
          {tabContent}
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
