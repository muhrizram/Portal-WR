import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';

const BPJSclass = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
]

const CInsuranceDetail = ({
  onCancel
}) => {

  const [open, setOpen] = React.useState(false);

  const onSave = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs container direction="column" spacing={2}>
        <Grid container className="containerHeader">

          <Grid container direction="row" style={{ padding: "20px" }}>
            <Grid item xs={6}>
              <TextField
                id="outlined-required"
                style={{ width: "100%", paddingRight: "10px" }}
                label="No Health Insurance (BPJS)"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-postal-code"
                style={{ width: "100%" }}
                label="Number of Dependents"
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ padding: "20px" }}>
            <Grid item xs={6}>
              <Autocomplete
                id="outlined-select-classBPJS"
                style={{ width: "100%", paddingRight:"10px" }}
                options={BPJSclass}
                renderInput={(params) => <TextField {...params} label="BPJS Class" />}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-required"
                style={{ width: "100%" }}
                label="Worker's Social Security (BPJS TK)"
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ padding: "20px" }}>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    width: "100%",paddingRight: "10px"
                  }}
                  label="Start Date of Career" />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="outlined-select-ptkp"
                style={{ width: "100%" }}
                options={BPJSclass}
                renderInput={(params) => <TextField {...params} label="PTKP Status" />}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ padding: "20px" }}>
            <Grid item xs={12}>
              <Autocomplete
                id="outlined-select-employee-dependents"
                style={{ width: "100%" }}
                options={BPJSclass}
                renderInput={(params) => <TextField {...params} label="Number of Employee Dependents" />}
              />
            </Grid>
          </Grid>

          <Grid item md={11.5} alignSelf="center" textAlign="right">
            <Button variant="outlined" color="warning" style={{ marginRight: 3 }} onClick={() => onCancel()}>
              Cancel Data
            </Button>
            <Button variant="contained" onClick={() => onSave()}>
              Save Data
            </Button>
          </Grid>


          {/* DIALOG SAVE */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="dialog-delete"
          >
            <DialogTitle id="alert-dialog-title">
              {"Save Data"}
            </DialogTitle>
            <DialogContent className="dialog-delete-content">
              <DialogContentText className='dialog-delete-text-content' id="alert-dialog-description">
                Save your progress: Don't forget to save your data before leaving
              </DialogContentText>
            </DialogContent>
            <DialogActions className="dialog-delete-actions">
              <Button onClick={handleClose} variant='outlined' className="button-text">Cancel</Button>
              <Button onClick={handleClose} variant='contained' className='button-text'>Save Data</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CInsuranceDetail

