import {
  // Checkbox,
  // FormControlLabel,
  // FormGroup,
  // IconButton,
  Button,
  // InputAdornment,
  // TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import { useNavigate } from 'react-router';
import { useAuth } from "react-oidc-context";
const Login = ({ changeStat }) => {
  const auth = useAuth();

  // const navigate = useNavigate();

  // const [showPassword, setShowPassword] = React.useState(false);

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };
  console.log("auth login: ", auth);
  const handleLogin = () => {
    // navigate('/dashboard')
    auth.signinRedirect();
  };
  return (
    <Grid container paddingTop={20}>
      <Grid item xs={12}>
        <Typography variant="body2">Welcome to</Typography>
        <Typography variant="body2">Working Report 79 👋</Typography>
      </Grid>
      <Grid item xs={12} paddingTop={2}>
        <Typography variant="body4">Please sign in to continue</Typography>
      </Grid>
      {/* <Grid item xs={12} paddingBottom={2} paddingTop={4}>
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
      </Grid> */}
      {/* <Grid item xs={12} paddingBottom={5}>
        <TextField 
          fullWidth 
          placeholder="Input your password" 
          label="password" 
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
      </Grid> */}
      {/* <Grid item xs={6}>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Remember Me" />
        </FormGroup>
      </Grid>
      <Grid item xs={6} textAlign="right" alignSelf="center">
        <Typography style={{ cursor: 'pointer' }} variant='primaryText' onClick={() => changeStat('forgot')}>Forgot Password ?</Typography>
      </Grid> */}
      <Grid item xs={12} paddingTop={5}>
        <Button variant="primaryButton" fullWidth onClick={() => handleLogin()}>
          SIGN IN
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
