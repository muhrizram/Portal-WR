import React from 'react';
import { Button, Collapse, Grid, TextField } from '@mui/material';
import { Add, Delete, KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import './index.css'

const Approval = ({dataApproval, setDataApprove}) => {

  const addApproval = () => {
    const tempApproval = [...dataApproval]
      tempApproval.push({
        id: (tempApproval.length + 1) + 'approvalData',
        headerValue: '',
        nameValue: '',
        roleValue: '',
        isCollapse: false
      })
      setDataApprove(tempApproval)
  }

  const deleteApproval = (idx) => {
    const tempApproval = [...dataApproval]
    tempApproval.splice(idx, 1)
    setDataApprove(tempApproval)
  }

  const onCollapse = (idx) => {
    const tempApproval = [...dataApproval]
    tempApproval[idx].isCollapse = !tempApproval[idx].isCollapse
    setDataApprove(tempApproval)
  }

  const changeField = (props, value, idx) => {
    const tempApproval = [...dataApproval]
    tempApproval[idx] = {
      ...tempApproval[idx],
      [props]: value
    }
    setDataApprove(tempApproval)
  }

  return (
      <Grid container className="customContainerApproval" spacing={3}>
        {dataApproval.map((res, index) => (
          <Grid container className="customItemApproval" key={res.id} item xs={12} spacing={1} alignItems="center" justifyContent="space-between">
              <Grid item>
                <Button onClick={() => onCollapse(index)} className="customIconButton">
                  {res.isCollapse ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                </Button>
              </Grid>
              <Grid item xs={8}>
                <span>Approval {index + 1}</span>
              </Grid>
              <Grid item xs={2} />
              {dataApproval.length > 1 && (
                <Grid item style={{textAlign: 'right'}}>
                  <Delete onClick={() => deleteApproval(index)} className='customIconDelete' />
                </Grid>
              )}
            <Grid item xs={12}>
              <Collapse in={res.isCollapse}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <span>Header Approval</span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField value={res.headerValue} fullWidth onChange={(e) => changeField('headerValue', e.target.value, index)} id="outlined-basic" label="e.g : Approval By" variant="outlined" />
                  </Grid>
                  <Grid item xs={4}>
                    <span>Name Approval</span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField value={res.nameValue} fullWidth onChange={(e) => changeField('nameValue', e.target.value, index)} id="outlined-basic" label="e.g : John Doe" variant="outlined" />
                  </Grid>
                  <Grid item xs={4}>
                    <span>Role Approval</span>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField value={res.roleValue} fullWidth onChange={(e) => changeField('roleValue', e.target.value, index)} id="outlined-basic" label="e.g : Software Developer" variant="outlined" />
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>
          </Grid>
        ))}
        {dataApproval.length < 4 && (
          <Grid item xs={12} style={{ alignSelf: 'self-end'}}>
            <div className="containerAdd">
                <Button className="customButtonAdd" variant="outlined" startIcon={<Add />} onClick={() => addApproval()}>
                  Add New Approval
                </Button>
            </div>
          </Grid>
        )} 
      </Grid>
  )
}

export default Approval