import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import SideBar from "../../../Component/Sidebar";
import TextField from "@mui/material/TextField";
import Divider from '@mui/material/Divider';
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import client from "../../../global/client";
import { yupResolver } from "@hookform/resolvers/yup";
import schemaprivilege from "../shema";
import CustomAlert from "../../../Component/Alert";

//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//form
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormProvider, useForm } from "react-hook-form";


const CreateRolePrivilege = () => {
  const [open, setOpen] = useState(false);
  const [isSave, setIsSave] = useState(false)
  const [sendData, setData] = useState({})
  const [dataAlert, setDataAlert] = useState({
    open: false,
    severity: 'success',
    message: ''
  })
  const navigate = useNavigate();
  const Role = [
    "HRD","Administrator" 
  ];
  const dataBread = [
    {
      href: "/dashboard",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masterroleprivilege",
      title: "Master Role Privilege",
      current: false,
    },
    {
      href: "/",
      title: "Create Role Privilege",
      current: true,
    },
  ];

  const handleClose = () => {
    if (!isSave){
      navigate('/masterroleprivilege')
    }
    setOpen(false);
  };

  const methods = useForm({
    // resolver: yupResolver(schemaprivilege),
    defaultValues: {
      roleName: '',
      listPrivilege: ''
    }
  })

  const onSave = async () => {
    const data = {
      ...sendData,
    }
    console.log('data', data)
    const res = await client.requestAPI({
      method: 'POST',
      endpoint: '/rolePrivilege/addRolePrivilege',
      data
    })
    if (res.data.meta.message) {
      setDataAlert({
        severity: 'success',
        open: true,
        message: res.data.meta.message
      })
      setTimeout(() => {
        navigate('/masterroleprivilege')
      }, 3000)
    }
    setOpen(false)
  }

  const confirmSave = async (data) => {
    setIsSave(true)
    setOpen(true)
    setData(data)
    // console.log('data', data)
  }

  const cancelData = () => {
    setIsSave(false)
    setOpen(true)
  }

  return (
    <SideBar>
      <CustomAlert open={dataAlert.open} message={dataAlert.message} severity={dataAlert.severity} />
      <Breadcrumbs breadcrumbs={dataBread} />
        <Grid container>
          <Grid item xs={9.9}>
            <Header judul="Create New Role Privilege" />
          </Grid>                
        </Grid>

        <Grid item xs container direction="column" spacing={2}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(confirmSave)}>  
              <div>                        
                <Grid style={{ padding: "30px" }}>                          
                <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={Role}
                        sx={{ width: "100%" }}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Role"
                            placeholder="Select Role"
                          />
                        )}
                      />
                </Grid>  

                <Divider sx={{marginLeft:"20px", marginBottom:"30px"}}/>

                <Typography
                  sx={{marginLeft:"20px", fontSize: "18px", fontWeight:"bold" }}
                >
                  Privilege
                </Typography>

                <Grid container direction="row" sx={{marginLeft:'30px'}}>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox  />} label="Working Report" />
                      <FormControlLabel control={<Checkbox  />} label="Employee" />
                      <FormControlLabel control={<Checkbox  />} label="Project" />
                      <FormControlLabel control={<Checkbox  />} label="Holiday" />
                      <FormControlLabel control={<Checkbox  />} label="Privilege" />
                    </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox  />} label="Job Group" />
                      <FormControlLabel control={<Checkbox  />} label="Company" />
                      <FormControlLabel control={<Checkbox  />} label="Backlog" />
                      <FormControlLabel control={<Checkbox  />} label="User Role" />
                      <FormControlLabel control={<Checkbox  />} label="Inaccessible" />
                    </FormGroup>
                  </Grid>
                </Grid>

                <Grid
                  item 
                  container 
                  xs={12}
                  justifyContent='end'
                  mt={3.5}
                >
                  <Grid item xs={9} />
                  <Grid item xs textAlign='right'>
                    <Button
                      style={{ marginRight: '16px' }} 
                      variant='cancelButton'
                      onClick={() => cancelData()}
                    >
                      Cancel Data
                    </Button>
                    <Button
                      variant='saveButton'
                      type='submit'
                      onClick={confirmSave}
                    >
                      Save Data
                    </Button>
                  </Grid>
                </Grid>

              </div>
            </form>
          </FormProvider>
        </Grid>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
        >
        <DialogTitle
          sx={{
            alignSelf: "center",
            fontSize: "30px",
            fontStyle: "Poppins",
          }}
          id="alert-dialog-title"
        >
          {isSave ? 'Save Data' : 'Cancel Data'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {isSave ? "Save your progress: Don't forget to save your data before leaving" : "Warning: Canceling will result in data loss without saving!"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              {isSave ? "Back" : "Cancel without saving"}
            </Button>
            <Button variant="contained" onClick={onSave} autoFocus>
              {isSave ? 'Save Data' : 'Back'}
            </Button>
          </DialogActions>
        </Dialog>
    </SideBar>
  );
};

export default CreateRolePrivilege;
