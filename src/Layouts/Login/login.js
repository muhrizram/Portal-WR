import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, {useEffect,useContext} from "react";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import client from "../../global/client";
import { useNavigate } from 'react-router';
import { AlertContext } from '../../context';
// import { useAuth } from "react-oidc-context";
const Login = ({ changeStat }) => {
  // const auth = useAuth();
  const navigate = useNavigate()
  const { setDataAlert } = useContext(AlertContext)
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [paramsLogin,setparamsLogin] = React.useState({})
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };  
  const handleLogin = async() => {
    const dataReadyLogin = paramsLogin
    const res = await client.requestAPI({
      method: 'POST',
      endpoint: `auth/login`,
      data: dataReadyLogin,
      isLogin: true
    })
    if (!res.isError) {
      localStorage.setItem('token', res.accessToken)
      localStorage.setItem('refreshtoken', res.refreshToken)
      setDataAlert({
        severity: 'success',
        open: true,
        message: res.detail
      }) 
      console.log("SUCCESS", res)
      console.log("INI TOKEN ",localStorage.getItem('token'))
      navigate('/workingReport')
    }else{
      setDataAlert({
        severity: 'error',
        open: true,
        message: res.error.detail
      }) 
      console.log("ERROR", res)
    }        
    // auth.signinRedirect();
  };

  useEffect(() => {
    console.log("paramsLogin", paramsLogin)
  },[paramsLogin])

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updateParams = { ...paramsLogin };
    updateParams[name] = value;
    setparamsLogin(updateParams)      
  }

  return (
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
          onChange={(e) => handleChange(e)}
          name="email"
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
      <Grid item xs={12} paddingBottom={2}>
        <TextField 
          fullWidth 
          placeholder="Input your password" 
          label="password" 
          onChange={(e) => handleChange(e)}
          name="password"
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
      {/* <Grid item xs={6}>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Remember Me" />
        </FormGroup>
      </Grid>
      <Grid item xs={6} textAlign="right" alignSelf="center">
        <Typography style={{ cursor: 'pointer' }} variant='primaryText' onClick={() => changeStat('forgot')}>Forgot Password ?</Typography>
      </Grid> */}
      <Grid item xs={12} paddingTop={2}>
        <Button variant="primaryButton" fullWidth onClick={() => handleLogin()}>
          SIGN IN
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
