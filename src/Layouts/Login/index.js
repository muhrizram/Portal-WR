import Grid from '@mui/material/Grid';
import React from 'react';
import rightBackground from '../../assets/frame79.png'
import logo from '../../assets/logo.png'
import Forgot from './forgot';
import Login from './login';
import "../../App.css";
import { Hidden, Typography } from '@mui/material';

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
          <Grid item xs={12} sm={6} height="100%" display="flex" flexDirection="column">
            <Grid item xs={12}>
            <Grid
              item
              xs={12}
              paddingTop={{xs: 6, sm: 4}}
              paddingLeft={{xs: 0, sm: 9}}
              display={{ xs: 'flex', sm: 'block' }}
              justifyContent={{ xs: 'center', sm: 'flex-start' }}
              alignItems={{ xs: 'center' }}
            >
                <img alt="leftImage" src={logo} style={{ maxWidth: '100%', height: 'auto' }}/>
              </Grid>
              <Grid item xs={12} 
                paddingLeft={{xs:3, md:12, lg:25}} 
                paddingRight={{xs:3, md:12, lg:25}} 
                marginTop={{xs: -4, sm: 0}}
                paddingBottom={12}
              >
                {renderComponent(currentStat)}
              </Grid>
            </Grid>

            <Grid item xs={12} paddingLeft={1.875} display="flex" alignItems="flex-end">
              <Typography className='text-files-sizes' color='#8a8a8a' fontSize="0.875rem" sx={{marginBottom: -12}}>
                &copy; {new Date().getFullYear()} PT Padepokan Tujuh Sembilan. All Rights Reserved
              </Typography>
            </Grid>
          </Grid>
          <Hidden smDown>
          <Grid item xs={6} height="100%">
            <img alt="rightimage" src={rightBackground} style={
              { 
                width: '100%', 
                minHeight: '100%', 
                objectFit: 'cover'
              }
            }/>
          </Grid>
          </Hidden>
        </Grid>
      </Grid>
  )
}

export default LoginScreen