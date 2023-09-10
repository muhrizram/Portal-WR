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
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const { setDataAlert } = useContext(AlertContext)
  const navigate = useNavigate(); 
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const textPlease = 'Please Input'
  const Schemareset = Yup.object().shape({
    password: Yup.string()
    .required(`${textPlease} Current Password`)
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must not exceed 16 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?& #^_\-+=()<>,./|\[\]{}~])[A-Za-z\d@$!%*?& #^_\-+=()<>,./|\[\]{}~]*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    ),
    newPassword: Yup.string()
      .required(`${textPlease} New Password`)
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must not exceed 16 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?& #^_\-+=()<>,./|\[\]{}~])[A-Za-z\d@$!%*?& #^_\-+=()<>,./|\[\]{}~]*$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      ),
    confirmPassword: Yup.string()
      .required(`${textPlease} Confirm Password`)
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must not exceed 16 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?& #^_\-+=()<>,./|\[\]{}~])[A-Za-z\d@$!%*?& #^_\-+=()<>,./|\[\]{}~]*$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      ),
    notMatch: Yup.string()
      .required(`New Password and Confirm Password doesn't match`),
    ifMatch: Yup.string()
      .required(`Current Password and New Password can't be match`)
  });

  const { handleSubmit, formState: { errors }, register } = useForm({
    resolver: yupResolver(Schemareset),
  });

  const handleReset = async () => {
    const res = await client.requestAPI({
        method: 'POST',
        endpoint: `/auth/changePassword`,
        data: dataPassword,
    })
      if(res.isError){ 
        console.error("Invalid current password")
        setDataAlert({
          severity: 'error',
          open: true,
          message: res.error.meta.message
        })
      }
      else{
        localStorage.removeItem('token')
        localStorage.removeItem('refreshtoken')
        setDataAlert({
          severity: 'success',
          open: true,
          message: res.meta.message
        })
        setTimeout(() => {
          navigate('/login')
        }, 3000)
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
            type={showCurrentPassword ? 'text' : 'password'}
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
                    onClick={handleClickShowCurrentPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showCurrentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />  }
                  </IconButton>
                </InputAdornment>
              )
            }} 
            error={errors.password !== undefined}
            helperText={errors.password ? errors.password.message : ''}
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
            type={showNewPassword ? 'text' : 'password'}
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
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />  }
                  </IconButton>
                </InputAdornment>
              )
            }} 
            error={errors.newPassword !== undefined}
            // helperText={dataPassword.password === dataPassword.newPassword ? 
            //   (errors.ifMatch ? errors.ifMatch.message : '')  : (errors.newPassword ? errors.newPassword.message : '')}
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
            type={showConfirmPassword ? 'text' : 'password'}
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
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />  }
                  </IconButton>
                </InputAdornment>
              )
            }} 
            error={errors.confirmPassword !== undefined}
            helperText={
              dataPassword.newPassword !== dataPassword.confirmPassword ? 
              (errors.notMatch ? errors.notMatch.message : '')  : (errors.confirmPassword ? errors.confirmPassword.message : '')}
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
      </DialogContent>

    </Dialog>
    </>
  )
}

export default Reset