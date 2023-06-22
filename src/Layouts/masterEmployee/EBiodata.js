import React from 'react';
import Index from '../../Component/Header';
import BreadCumbComp from '../../Component/BreadCumb';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import TabsMenu from '../../Component/menu/tabs';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';

const placement = [
  {
    value: 'wfo',
    label: 'WFO',
  },
  {
    value: 'wfh',
    label: 'WFH',
  },
]

const position = [
  {
    value: 'ceo',
    label: 'Chief Executive Officer',
  },
  {
    value: 'coo',
    label: 'Chief Operation Officer',
  },
  {
    value: 'cco',
    label: 'Chief Customer Officer',
  },
]

const contractStatus = [
  {
    value: 'fulltime',
    label: 'Fulltime',
  },
  {
    value: 'parttime',
    label: 'PartTime',
  },
]

const CBiodataEmployee = ({
  onCancel,
  onSave
}) => {
  
  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Grid container className="containerHeader">
          <BreadCumbComp />
          <Index judul='Create New'/>
          <TabsMenu />

          <Grid>
            <Typography style={{marginTop:20}}>Profile Picture</Typography>
            <Button variant="outlined" style={{marginTop:10}}>Upload Image</Button>
            <Typography className="text">Single upload file should not be more 3MB. Only the .png/jpg file types are allowed</Typography>
          </Grid>
            
          <Grid
            style={{marginTop:30}}
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '68ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-number"
                  label="NIP"
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Generation"
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Employee First Name"
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Employee Last Name"
                />
                <TextField
                  id="outlined-number"
                  label="NPWP"
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                />

                <Grid container direction="row">
                      {/* START JOIN */}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                          label="Start Join Date"
                        />
                      </LocalizationProvider>
                      {/* START JOIN */}

                    {/* PLACEMENT TYPE */}
                    <Autocomplete
                      required
                      id="outlined-placement-type"
                      options={placement}
                      renderInput={(params) => <TextField {...params} label="Placement Type" required/>}
                    />
                    {/* PLACEMENT TYPE */}
                    
                    {/* CONTRACT STATUS */}
                      <Autocomplete
                        required
                        id="outlined-contract-status"
                        options={contractStatus}
                        renderInput={(params) => <TextField {...params} label="Contract Status" required/>}
                      />
                    {/* CONTRACT STATUS */}

                    {/* ONSITE STATUS */}
                      <Autocomplete
                        required
                        id="outlined-onsite-status"
                        options={placement}
                        renderInput={(params) => <TextField {...params} label="Onsite Status" required/>}
                      />
                    {/* ONSITE STATUS */}

                    {/* CONTRACT START */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                        label="Contract Start Date"
                      />
                    </LocalizationProvider>
                    {/* CONTRACT START */}

                    {/* CONTRACT END */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                        label="Contract End Date"
                      />
                    </LocalizationProvider>
                    {/* CONTRACT END */}

                    {/* DIVISION GROUP */}
                    <Autocomplete
                      required
                      id="outlined-division-group"
                      options={placement}
                      renderInput={(params) => <TextField {...params} label="Division Group" required/>}
                    />
                    {/* DIVISION GROUP */}

                    {/* POSITION */}
                    <Tooltip title="Select Division Group First">
                      <Autocomplete
                        required
                        id="outlined-position"
                        options={position}
                        renderInput={(params) => <TextField {...params} label="Position" required/>}
                      />
                    </Tooltip>
                    {/* POSITION */}
                </Grid>
              </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid item md={11.5} alignSelf="center" textAlign="right">
        <Button variant="outlined" color="warning" style={{marginRight:3}} onClick={() => onCancel()}>
          Cancel Data
        </Button>
        <Button variant="contained" onClick={() => onSave()}>
          Save Data
        </Button>
      </Grid>

  </Grid>
  )
}

export default CBiodataEmployee

