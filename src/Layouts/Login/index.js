


import Grid from '@mui/material/Grid';
import React from 'react';
import rightBackground from '../../assets/frame79.png'
import logo from '../../assets/logo.png'
import Forgot from './forgot';
import Login from './login';

const LoginScreen = () => {
  const [currentStat, setStat] = React.useState('login')

  const changeStat = (stat) => {
    setStat(stat)
    console.log('stat: ', stat)
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
      <Grid container>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={12} paddingTop={4} paddingLeft={6}>
              <img alt="leftImage" src={logo} />
            </Grid>
            <Grid item xs={12} paddingLeft={25} paddingRight={25}>
              {renderComponent(currentStat)}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <img alt="rightimage" src={rightBackground} style={
            { 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover'
            }
          }/>
        </Grid>
      </Grid>
  )
}

export default LoginScreen