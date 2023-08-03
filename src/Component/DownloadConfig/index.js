import React, { useCallback, useEffect, useRef, useState } from 'react';

import { 
  AppBar,
  Button, 
  Card, 
  Checkbox, 
  Divider, 
  FormControlLabel, 
  Grid, 
  Modal, 
  Typography, 
  Tab,
} from '@mui/material';

import ColumnConfiguration from './ColumnConfiguration';
import { merged, split } from './columns';
import './index.css'
import Approval from './Approval';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const DownloadConfiguration = ({ open = false, onClose: handleClose = () => false, defaultConfiguration = {
  includeAbsenceType: true,
  includeProjectName: true,
  includeDuration: true,
  splitTask: true,
  columnConfiguration: split,
} }) => {
  const [value, setValue] = React.useState("0");

  const handleChange = (event, newValue) => {
    console.log("new value: ", newValue)
    setValue(newValue);
  };

  const columnConfig = useRef(null);

  const [state, setState] = useState(defaultConfiguration);

  const [dataApproval, setDataApprove] = useState([
    {
      id: 1 + 'approvalData',
      headerValue: '',
      nameValue: '',
      roleValue: '',
      isCollapse: false
    }
  ])

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

  const handleOptionsChange = useCallback((i) => () => {
    setState((p) => ({
      ...p,
      [i]: !p[i],
    }));
  });

  useEffect(() => {
    saveConfiguration()
  }, [])

  const saveConfiguration = () => {
    const tempApproval = dataApproval.map(res => {
      return {
        headerValue: res.headerValue,
        nameValue: res.nameValue,
        roleValue: res.roleValue
      }
    })
    localStorage.setItem(
      'downloadConfiguration',
      JSON.stringify({
        ...state,
        columnConfiguration: columnConfig.current ? columnConfig.current.items : state.columnConfiguration,
        list: [...tempApproval],
      })
    );
    // localStorage.setItem('approvalBody', JSON.stringify(
    //   [...dataApproval]))
    handleClose();
  };

  return (
    <Modal {...{ open, onClose: handleClose }} className='modal'>
      <Card>
        <Grid container direction="column" alignItems="stretch">
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <Typography variant="h6">Download Configuration</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <Typography variant="body1" className="customBodyTextTask">Task Configuration</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="row" style={{ padding: `0px ${8}px` }}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox size="small" onChange={handleOptionsChange('includeAbsenceType')} checked={state.includeAbsenceType} />}
                      label="Include Absence Type"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox size="small" onChange={handleOptionsChange('includeProjectName')} checked={state.includeProjectName} />}
                      label="Include Project Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox size="small" onChange={handleOptionsChange('includeDuration')} checked={state.includeDuration} />}
                      label="Include Duration"
                    />
                  </Grid>
                  {/* <Grid item sm={6} xs={12}>
                    <FormControlLabel
                      control={<Checkbox size="small" onChange={handleOptionsChange('splitTask')} checked={state.splitTask} />}
                      label="Split Regular & Overtime Tasks"
                    />
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12}>
                <TabContext value={value}>
                  <AppBar position="static" className="customAppcbar">
                    <TabList onChange={handleChange} aria-label="simple tabs example">
                      <Tab label="Column Configuration" value="0" />
                      <Tab label="Approval Configuration" value="1" />
                    </TabList>
                  </AppBar>
                  <TabPanel value="0" className="customPanelTab">
                    <ColumnConfiguration ref={columnConfig} defaultItems={state.columnConfiguration} />
                  </TabPanel>
                  <TabPanel value="1" className="customPanelTab">
                    <Approval dataApproval={dataApproval} setDataApprove={setDataApprove} />
                  </TabPanel>
                </TabContext>
                {/* <Typography variant="body1">Column Configuration</Typography> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
              <Grid item>
                <Button color="primary" variant="contained" onClick={saveConfiguration}>
                  Save Configuration
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Modal>
  );
};

export default DownloadConfiguration;
