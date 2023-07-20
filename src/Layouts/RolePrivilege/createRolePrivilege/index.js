import React, { useEffect, useState, useContext } from "react";
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
import CustomAlert from "../../../Component/Alert";
import { AlertContext } from '../../../context';

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
  const [selectRole, setSelectRole] = useState();
  const [selectRoleLabel, setSelectRoleLabel] = useState();
  const { setDataAlert } = useContext(AlertContext)
  const [selectPrivilege, setSelectPrivilege] = useState([])
  const navigate = useNavigate();
  const [optPrivilege, setOptPrivilege] = useState([])
  const [optRole, setOptRole] = useState([])
  const [createdby, setCreatedby] = useState('')
  
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
      title: "Create New Role Privilege",
      current: true,
    },
  ];

  const handleChangeCheckbox = (value) => {
    if (selectPrivilege.includes(value)) {
      setSelectPrivilege(selectPrivilege.filter((privilege) => privilege !== value))
    }
    else {
      setSelectPrivilege([...selectPrivilege, value])
    }
  }

  useEffect(() => {
    getDataPrivilege()
    getDataRole()
  }, [])

  //option role
  const getDataRole = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/role?search=`
    })
    // rebuildData(res)
    const data = res.data.map(item => ({id : item.id, name: item.attributes.name}));
    setOptRole(data)
  }
  //option role

  //option privilege
  const getDataPrivilege = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/privilege?search=`
    })
    // rebuildData(res)
    const data = res.data.map(item => ({id : item.id, name: item.attributes.name}));
    setOptPrivilege(data)
  }
  //option privilege


  const onSave = async () => {

    const data = {
      roleId: optRole,
      listPrivilege: selectPrivilege,
      createdBy: parseInt(localStorage.getItem('createRolePrivilege'))
    }
    const res = await client.requestAPI({
      method: 'POST',
      endpoint: '/rolePrivilege/addRolePrivilege',
      data
    })
    if(!res.isError){
      setDataAlert({
        severity: 'success',
        open: true,
        message: res.data.meta.message
      })
      setTimeout(() => {
        navigate('/masterroleprivilege')
      }, 3000)
    } else {
      setDataAlert({
        severity: 'error',
        message: res.error.detail,
        open: true
      })
    }
    setOpen(false)
    // localStorage.setItem("createRolePrivilege", true);
  }

  const confirmSave = async (data) => {
    setIsSave(true)
    setOpen(true)
    setData(data)
  }

  const cancelData = () => {
    setIsSave(false)
    setOpen(true)
  }

  const handleClose = () => {
    if (!isSave){
      navigate('/masterroleprivilege')
    }
    setOpen(false);
  };

  const handleChangeRole = (value) => {
    setOptRole(value.name)
    setOptRole(value.id)
  }
  const options = Array.isArray(optRole) ? optRole : [];
  return (
    <SideBar>
      <Breadcrumbs breadcrumbs={dataBread} />
        <Grid container>
          <Grid item xs={9.9}>
            <Header judul="Create New Role Privilege" />
          </Grid>                
        </Grid>

        <Grid item xs container direction="column" spacing={2}>
          <FormProvider>
            <form>  
              <div>                        
                <Grid style={{ padding: "30px" }}>  
                  <Autocomplete                    
                      disablePortal
                      id="combo-box-demo"
                      name="role"
                      options={options}
                      sx={{ width: "100%", marginTop: "8px" }}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, newValue) => handleChangeRole(newValue)}
                      // isOptionEqualToValue={(option, value) => option.value === value.value}
                      renderInput={(params) => (
                        <TextField {...params} label="Role" placeholder="Select Role" />
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
                    {optPrivilege.slice(0, 4).map((privilege) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectPrivilege.includes(privilege.id)}
                            onChange={() => handleChangeCheckbox(privilege.id)}
                          />
                        }
                        label={privilege.name}
                        key={privilege.id}
                      />
                    ))}
                  </FormGroup>
                  </Grid>

                  <Grid item xs={6}>
                  <FormGroup>
                    {optPrivilege.slice(4).map((privilege) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectPrivilege.includes(privilege.id)}
                            onChange={() => handleChangeCheckbox(privilege.id)}
                          />
                        }
                        label={privilege.name}
                        key={privilege.id}
                      />
                    ))}
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
                      type='button'
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
          <DialogActions className="dialog-delete-actions">
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
