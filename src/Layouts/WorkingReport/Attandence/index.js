import { Grid, Typography, Button, MenuItem, TextField, Autocomplete } from '@mui/material'
import '../../../App.css'
import React, { useEffect, useState } from 'react'
import UploaderFile from '../../../Component/UploaderFile'
import client from '../../../global/client'
const Attendance = () => {
  // const listPresence = [
  //   {
  //     label: 'Check in Present',
  //     value: 1
  //   },
  //   {
  //     label: 'Sick Leave',
  //     value: 2
  //   },
  //   {
  //     label: 'Authorize Absence',
  //     value: 3
  //   },
  // ]

  const listLocation = [
    {
      label: 'Work From Home',
      value: 1
    },
    {
      label: 'Work From Office',
      value: 2
    },
  ]

  const [presence, setPresence] = useState({
    value: undefined,
    label: ''
  })
  const [location, setLocation] = useState('')
  const [listPresence, setListPresence] = useState([])

  const handleChange = (value) => {
    console.log("value: ", value)
    setPresence(value);
  };

  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const getDatalist = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/presence?search=`
    })
    console.log('res: ', res.data)
    const temp = res.data.map((value) => {
      return {
        value: value.id,
        label: value.attributes.name
      }
    })
    console.log('temp: ', temp)
    setListPresence(temp)
  }
  
  useEffect(() => {
    getDatalist()
  }, [])

  const renderBottom = () => {
    let dom = null
    if (presence.value === '42') {
      dom = 
      (
        <TextField
          value={location}
          select
          className='input-field-crud'
          label='Check In Location'
          placeholder='Select Location'
          fullWidth
          onChange={handleChangeLocation}
        >
          {listLocation.map((res, index) => (
            <MenuItem value={res.value} key={`${index+1}-menu-item`}>{res.label}</MenuItem>
          ))}
        </TextField>
      )
    } else if (presence.value !== '42' && presence.value !== undefined) {
      dom = <UploaderFile />
    }
    return dom
  }

  return (
    <div className='card-attendance'>
      <Grid container rowSpacing={2}>
        <Grid item xs={12} textAlign='center'>
          <Typography variant='attendanceHeader'>
            Employee Attendance
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign='center'>
          <Typography variant='attendanceTrack'>
            Track and start your workday
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign='center'>
          <Typography variant='attendanceHeader'>
            Tuesday, 2 May 2023
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={listPresence}
          sx={{ width: "100%", marginTop: "20px" }}
          onChange={(_event, newValue) => handleChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              className='input-field-crud'
              label='Presence'
              placeholder='Select status'
            />
          )}
          />
          {/* <TextField
            value={presence}
            select
            className='input-field-crud'
            label='Presence'
            placeholder='Select status'
            fullWidth
            onChange={handleChange}
          >
            {listPresence.map((res, index) => (
              <MenuItem value={res.value} key={`${index+1}-menu-item`}>{res.label}</MenuItem>
            ))}
          </TextField> */}
        </Grid>
        <Grid item xs={12}>
        {renderBottom()}
        </Grid>
        <Grid item xs={12} textAlign='center' mt={presence.value === '42' ? 21 : 15}>
          <Button
            style={{ marginRight: '16px' }} 
            variant='outlined'
            // onClick={() => cancelData()}
          >
            Cancel
          </Button>
          <Button
            disabled={presence.value === undefined || location === ''}
            variant='saveButton'
            // onClick={() => cancelData()}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Attendance