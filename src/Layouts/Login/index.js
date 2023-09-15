import Grid from '@mui/material/Grid';
import React from 'react';
import rightBackground from '../../assets/frame79.png'
import logo from '../../assets/logo.png'
import Forgot from './forgot';
import Login from './login';
import "../../App.css";
import { Typography } from '@mui/material';

const LoginScreen = () => {
  const [currentStat, setStat] = React.useState('login')

  const changeStat = (stat) => {
    setStat(stat)
  }
  const renderComponent = (stat) => {
    let dom = null
    if (stat === 'login') {
      dom = <Login changeStat={changeStat} />
    } else if (stat === 'forgot') {
      dom = <Forgot changeStat={changeStat} />
    }
    return dom
  }
  return(
      <Grid container height="100vh">
        <Grid container height="100%">
          <Grid item xs={6} height="100%" display="flex" flexDirection="column">
            <Grid item xs={12} paddingTop={4} paddingLeft={6}>
              <img alt="leftImage" src={logo} style={{ maxWidth: '100%', height: 'auto' }}/>
            </Grid>
            <Grid item xs={12} paddingLeft={{xs:3, md:12, lg:25}} paddingRight={{xs:3, md:12, lg:25}}>
              {renderComponent(currentStat)}
            </Grid>
            <Grid item xs={12} paddingLeft={1.875} paddingBottom={2} display="flex" alignItems="flex-end">
              <Typography className='text-files-sizes' color='#8a8a8a' fontSize="0.875rem">&copy; {new Date().getFullYear()} PT Padepokan Tujuh Sembilan. All Rights Reserved</Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} height="100%">
            <img alt="rightimage" src={rightBackground} style={
              { 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover'
              }
            }/>
          </Grid>
        </Grid>
      </Grid>
  )
}

export default LoginScreen