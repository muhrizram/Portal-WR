import { Button, Divider, InputAdornment, TextField, Typography, IconButton, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, {useState, useEffect, useContext} from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from "react-hook-form";
import client from '../../global/client';
import { AlertContext } from '../../context';
import * as Yup from 'yup';
import { useNavigate } from "react-router";


const textPlease = 'Please Input'
const Schemareset = Yup.object().shape({
    password: Yup.string().min(8).required(`${textPlease} Current Password`),
    newPassword: Yup.string().min(8).matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      ).required(`${textPlease} New Password`),
    confirmPassword: Yup.string().min(8).matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      ).required(`${textPlease} Confirm Password`),
  });

const Reset = ({open=false, handleClose = () => false}) => {
  
  const [dataPassword, setDataPassword] = useState({})
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { setDataAlert } = useContext(AlertContext)
  const navigate = useNavigate(); 
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const methods = useForm({
    resolver: yupResolver(Schemareset),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    }
  })

  const handleReset = async() => {
    console.log("coba data reset", dataPassword)
    const res = await client.requestAPI({
      method: 'POST',
      endpoint: `/auth/changePassword`,
      data: dataPassword,
      // isLogin: true
    })    
    console.log("cek respon", res)
    if (!res.isError) {
      
      localStorage.removeItem('token')
      localStorage.removeItem('refreshtoken')
      setDataAlert({
        severity: 'success',
        open: true,
        message: res.data.meta.message
      })
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }else{
      setDataAlert({
        severity: 'error',
        open: true,
        message: res.error.detail
      })       
    }
  };

  useEffect(() => {
    // console.log("paramsLogin", paramsLogin)
  },[dataPassword])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return(
    <>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-delete"
    >
      <DialogTitle id="alert-dialog-title" className='dialog-delete-header'>
        {"Change Password"}
      </DialogTitle>
      <DialogContent className="dialog-delete-content">
        <DialogContentText>
          Easily update your password and enchance your account security
        </DialogContentText>
      </DialogContent>

      <DialogContent>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit()}>
          <div>
        <Grid item xs={12} paddingBottom={2} paddingTop={1}>
          <TextField 
            label="Current Password*"
            name="password"
            fullWidth
            onChange={(e) => handleChange(e)}
            placeholder="Input your password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />  }
                  </IconButton>
                </InputAdornment>
              )
            }} 
          />
        </Grid>
        <Grid item xs={12} paddingBottom={2} paddingTop={1}>
          <TextField 
            label="New Password*"
            name="newPassword"
            fullWidth
            onChange={(e) => handleChange(e)}
            placeholder="Input your password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />  }
                  </IconButton>
                </InputAdornment>
              )
            }} 
          />
        </Grid>
        <Grid item xs={12} paddingBottom={2} paddingTop={1}>
          <TextField 
            label="Confirm New Password*"
            name="confirmPassword"
            fullWidth
            onChange={(e) => handleChange(e)}
            placeholder="Input your pasword"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />  }
                  </IconButton>
                </InputAdornment>
              )
            }} 
          />
        </Grid>
        
      <DialogActions>
        <Button onClick={handleClose} variant='outlined' className='button-text'>Back</Button>
        <Button onClick={handleReset} variant='contained' className='button-text'>Save Data</Button>
      </DialogActions>
      
        </div>
        </form>
        </FormProvider>
      </DialogContent>

    </Dialog>
    </>
  )
}

export default Reset