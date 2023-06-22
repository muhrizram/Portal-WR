import React from 'react';
import Index from '../../Component/Header';
import BreadCumbComp from '../../Component/BreadCumb';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import TabsMenu from '../../Component/menu/tabs';
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

const CDetailBiodataEmployee = ({
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
                  id="outlined-place"
                  label="Place of Birth"
                />

                {/* DATE OF BIRTH */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                    label="Date of Birth"
                  />
                </LocalizationProvider>
                {/* DATE OF BIRTH */}


                <TextField
                  required
                  id="outlined-id"
                  label="National ID Number"
                />
                <TextField
                  required
                  id="outlined-phone-number"
                  label="Phone Number"
                />
                <TextField
                  required
                  id="outlined-address"
                  label="Address"
                />
                <TextField
                  required
                  id="outlined-postal-code"
                  label="Postal Code"
                />
                <TextField
                  required
                  id="outlined-family-contact"
                  label="Family Contact"
                />
                <TextField
                  required
                  id="outlined-contact-name"
                  label="Contact Name"
                />
                <TextField
                  required
                  id="outlined-contact-number"
                  label="Contact Number"
                />
                <TextField
                  required
                  id="outlined-school"
                  label="School of Origin"
                />

                <Grid container direction="row">
                  <Autocomplete
                      required
                      id="outlined-education"
                      options={placement}
                      renderInput={(params) => <TextField {...params} label="Education" required/>}
                  />
                  <TextField
                    required
                    id="outlined-major"
                    label="Major"
                  />
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

export default CDetailBiodataEmployee

