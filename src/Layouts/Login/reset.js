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



const Reset = ({open, onClose}) => {
  const [dataPassword, setDataPassword] = useState({})
  const [showPassword, setShowPassword] = React.useState(false);
  const [openReset, setOpen] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { setDataAlert } = useContext(AlertContext)
  const navigate = useNavigate(); 
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [responsePasswordNotMatch,setresponsePasswordNotMatch] = useState('')

  const textPlease = 'Please Input'
  const Schemareset = Yup.object().shape({
    password: Yup.string().min(8, "Password must be at least 8 characters").required(`${textPlease} Current Password`),
    newPassword: Yup.string().min(8, "Password must be at least 8 characters").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      ).required(`${textPlease} New Password`),
    confirmPassword: Yup.string().min(8, "Password must be at least 8 characters").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      ).required(`${textPlease} Confirm Password`),
      notmatchpassword: Yup.string().required("HOHOHOO")
  });

  const { handleSubmit, formState: { errors }, register } = useForm({
    resolver: yupResolver(Schemareset),
  });

  const handleReset = () => {
    try {
      const res = client.requestAPI({
        method: 'POST',
        endpoint: `/auth/changePassword`,
        data: dataPassword,
        // isLogin: true
      })
      console.log("INI RES", res)
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
        // localStorage.removeItem('refreshtoken')
        // onClose
        setDataAlert({
          severity: 'error',
          open: true,
          message: res.error.meta.message
        })       
      }

    }catch(error){
      console.error(error)
    }
   
  };

  useEffect(() => {
    // console.log("open", open)
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
      onClose={onClose}
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
      {/* <FormProvider {...methods}> */}
        <form onSubmit={handleSubmit()}>
          <div>
        <Grid item xs={12} paddingBottom={2} paddingTop={1}>
          <TextField 
            label="Current Password*"
            name="password"
            fullWidth
            {...register('password')}
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
            error={errors.password !== undefined}
            helperText={errors.notmatchpassword ? errors.notmatchpassword.message : ''}
          />
        </Grid>
        <Grid item xs={12} paddingBottom={2} paddingTop={1}>
          <TextField 
            label="New Password*"
            name="newPassword"
            fullWidth
            {...register('newPassword')}
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
            error={errors.newPassword !== undefined}
            helperText={errors.newPassword ? errors.newPassword.message : ''}
          />
        </Grid>
        <Grid item xs={12} paddingBottom={2} paddingTop={1}>
          <TextField 
            label="Confirm New Password*"
            name="confirmPassword"
            fullWidth
            {...register('confirmPassword')}
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
            error={errors.confirmPassword !== undefined}
            helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
          />
        </Grid>
        
      <DialogActions className="dialog-delete-actions">
        <Button onClick={onClose} variant='outlined' className='button-text'>Back</Button>
        <Button type= 'submit' 
        onClick={handleReset} 
        variant='contained' className='button-text'>Save Data</Button>
      </DialogActions>
      
        </div>
        </form>
        {/* </FormProvider> */}
      </DialogContent>

    </Dialog>
    </>
  )
}

export default Reset