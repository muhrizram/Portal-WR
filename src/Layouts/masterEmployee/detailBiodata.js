import React from 'react';
import Grid from '@mui/material/Grid';
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
      <Grid item xs container direction="column" spacing={2}>
        <Grid container className="containerHeader">
        

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-place"
                  style={{ width: "100%", paddingRight: "10px" }}
                  label="Place of Birth"
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                    label="Date of Birth"
                    sx={{
                      width: "100%",
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-id"
                  label="National ID Number"
                  style={{ width: "100%", paddingRight: "10px" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-phone-number"
                  style={{width:"100%"}}
                  label="Phone Number"
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-address"
                  label="Address"
                  style={{ width: "100%", paddingRight: "10px" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-postal-code"
                  label="Postal Code"
                  style={{width:"100%"}}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-family-contact"
                  label="Family Contact"
                  style={{ width: "100%", paddingRight: "10px" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-contact-name"
                  label="Contact Name"
                  style={{width:"100%"}}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-contact-number"
                  label="Contact Number"
                  style={{ width: "100%", paddingRight: "10px" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-school"
                  label="School of Origin"
                  style={{width:"100%"}}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <Autocomplete
                    required
                    id="outlined-education"
                    style={{ width: "100%", paddingRight: "10px" }}
                    options={placement}
                    renderInput={(params) => <TextField {...params} label="Education" required/>}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-major"
                  label="Major"
                  style={{width:"100%"}}
                />
              </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid item md={11.5} alignSelf="center" textAlign="right">
        <Button variant="outlined" color="warning" style={{marginRight:3}} onClick={() => onCancel()}>
          Cancel Data
        </Button>
        <Button variant="contained" onClick={() => onSave()}>
          Save Data
        </Button>
      </Grid> */}

  </Grid>
  )
}

export default CDetailBiodataEmployee

