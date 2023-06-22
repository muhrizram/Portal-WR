import React from 'react';
import Index from '../../Component/Header';
import BreadCumbComp from '../../Component/BreadCumb';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import TabsMenu from '../../Component/menu/tabs';
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
                  id="outlined-required"
                  label="No Health Insurance (BPJS)"
                />
                <TextField
                  id="outlined-postal-code"
                  label="Number of Dependents"
                />

                <Grid container direction="row">
                  <Autocomplete
                    id="outlined-select-classBPJS"
                    options={BPJSclass}
                    renderInput={(params) => <TextField {...params} label="BPJS Class"/>}
                  />

                  <TextField
                    id="outlined-required"
                    label="Worker's Social Security (BPJS TK)"
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    label="Start Date of Career"/>
                  </LocalizationProvider>

                  <Autocomplete
                    id="outlined-select-ptkp"
                    options={BPJSclass}
                    renderInput={(params) => <TextField {...params} label="PTKP Status"/>}
                  />
                </Grid>
              </div>
            </Grid>
          <Grid
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '137.5ch' },
              }}
              noValidate
            >
            <Autocomplete
              id="outlined-select-employee-dependents"
              options={BPJSclass}
              renderInput={(params) => <TextField {...params} label="Number of Employee Dependents"/>}
            />
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

export default CInsuranceDetail

