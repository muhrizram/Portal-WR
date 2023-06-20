import { Button, Divider, InputAdornment, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const Forgot = ({changeStat}) => {
  return(
    <Grid container paddingTop={22}>
      <Grid item xs={12}>
        <Typography variant='body2'>Forget Password 🔒</Typography>
      </Grid>
      <Grid item xs={12} paddingTop={2}>
      <Typography variant='body4'>Forgot your password? We've got you covered! Just give us your email and we'll send a reset link straight to your inbox. Easy-peasy!</Typography>
      </Grid>
      <Grid item xs={12} paddingBottom={2} paddingTop={4}>
        <TextField 
          label="Email"
          fullWidth
          placeholder="Input your email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineOutlinedIcon />
              </InputAdornment>
            ),
          }} 
        />
      </Grid>

      <Grid item xs={12} paddingTop={4} >
        <Button variant="primaryButton" fullWidth>SEND</Button>
      </Grid>
      <Grid item xs={12} padding={2}>
        <Divider />
      </Grid>
      <Grid item xs={12} textAlign="center" display="flex" alignItems="center" justifyContent="center">
        {/* <div> */}
          <ArrowBackIosNewIcon style={{ color: "#0078D7", fontSize: '18px', paddingRight: '14px' }} />
          <Typography style={{ cursor: 'pointer' }} variant='primaryText' onClick={() => changeStat('login')}>BACK TO LOG IN</Typography>
        {/* </div> */}
      </Grid>
    </Grid>
  )
}

export default Forgot