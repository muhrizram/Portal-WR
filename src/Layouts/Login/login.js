import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IconButton,
  Button,
  InputAdornment,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, {useContext} from "react";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import client from "../../global/client";
import { useNavigate } from 'react-router';
import { AlertContext } from '../../context';
import CustomAlert from "../../Component/Alert";

const Login = ({ changeStat }) => {
  const navigate = useNavigate()
  const { setDataAlert } = useContext(AlertContext)
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show); 

  const [isLoading, setIsLoading] = React.useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email address"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must not exceed 16 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const { handleSubmit, formState: { errors }, register } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = async (data) => {
    setIsLoading(true)
    const res = await client.requestAPI({
      method: 'POST',
      endpoint: `/auth/login`,
      data,
      isLogin: true
    })    
    if (!res.isError) {
      localStorage.setItem('privilage', JSON.stringify(res.listPrivilege))
      localStorage.setItem('token', res.accessToken)
      localStorage.setItem('refreshtoken', res.refreshToken)
      localStorage.setItem('roles', JSON.stringify(res.listRole))
      localStorage.setItem("userId", res.userId)      
      localStorage.setItem("employeeName", res.employeeName)
      localStorage.setItem("position", res.position)
      setDataAlert({
        severity: 'success',
        open: true,
        message: "Login successful!"
      })
      const currentUserId = localStorage.getItem("userId");
      const resUser = await client.requestAPI({
        method: "GET",
        endpoint: `/users/employee/${currentUserId}`,
      });
      if (!resUser.isError) {
        localStorage.setItem("photoProfile", resUser.data.attributes.photoProfile);
      }
      navigate('/workingReport')
      setIsLoading(false);
    }else{
      setDataAlert({
        severity: 'error',
        open: true,
        message: res.error.meta.message
      })   
      setIsLoading(false);    
    }   
  };


  return (
    <>
    <CustomAlert />
    <form onSubmit={handleSubmit(handleLogin)}>
    <Grid container paddingTop={20}>
      <Grid item xs={12}>
        <Typography variant="body2">Welcome to</Typography>
        <Typography variant="body2">Working Report 79 👋</Typography>
      </Grid>
      <Grid item xs={12} paddingTop={2}>
        <Typography variant="body4">Please sign in to continue</Typography>
      </Grid>
      <Grid item xs={12} paddingBottom={2} paddingTop={4}>
        <TextField
          label="Email"
          fullWidth
          placeholder="Input your email"
          {...register('email')}
          error={errors.email !== undefined}
          helperText={errors.email ? errors.email.message : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} paddingBottom={2}>
        <TextField
          fullWidth
          {...register('password')}
          label="Password"
          placeholder="Input your password"
          type={showPassword ? "text" : "password"}
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
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={errors.password !== undefined}
          helperText={errors.password ? errors.password.message : ''}
        />    
      </Grid>
      <Grid item xs={6}>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Remember Me" />
        </FormGroup>
      </Grid>
      <Grid item xs={6} textAlign="right" alignSelf="center">
        <Typography style={{ cursor: "pointer" }} variant="primaryText" onClick={() => changeStat("forgot")}>
          Forgot Password ?
        </Typography>
      </Grid>
      <Grid item xs={12} paddingTop={2}>
        <Button variant="contained" type="submit" fullWidth disabled={isLoading}>
        {isLoading ? (
          <>
            <CircularProgress size={16} color="inherit" />
            <Typography marginLeft={1}>Loading...</Typography>
          </>
        ) : (
          "SIGN IN"
        )}
        </Button>
      </Grid>
    </Grid>
    </form>
    </>
  );
};

export default Login;
