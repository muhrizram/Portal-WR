import React, { useState , useEffect, useContext} from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import SideBar from "../../../Component/Sidebar";
import TextField from "@mui/material/TextField";
import Divider from '@mui/material/Divider';
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import client from '../../../global/client';
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
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


const CreateUserRole = () => {
  const { setDataAlert } = useContext(AlertContext)
  const [open, setOpen] = React.useState(false);  
  const [isSave, setIsSave] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [getUsersdata, setgetUsers] = useState([]);
  const navigate = useNavigate();

  const textPlease = 'Please Input'
  const schemauserRole = Yup.object().shape({
    nipUser: Yup.string()
    .required(`${textPlease} NIP & User`),
    role: Yup.string()
      .required(`Please select role`)
  });

  const { handleSubmit, formState: { errors }, register } = useForm({
    resolver: yupResolver(schemauserRole),
  });

  const [RoleCheck,setRoleCheck] = useState([])
  const dataBread = [
    {
      href: "/dashboard",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masteruserrole",
      title: "Master User Role",
      current: false,
    },
    {
      href: "/",
      title: "Create User Role",
      current: true,
    },
  ];

  const handleClickOpenSave = () => {
    setIsSave(true)
    setOpen(true);    
  };
  const handleClickOpenCancel = () => {
    setIsSave(false)
    setOpen(true);
  };

  const handleClose = () => {    
    setOpen(false);
  };
  const handleCloseOpenCancelData = () => {
    if (!isSave){
      navigate('/masteruserrole')
    }
    setOpen(false); 
  };

  const handleRolesChange = (id) => {
    if (selectedRoles.includes(id)) {
      setSelectedRoles(selectedRoles.filter((role) => role !== id));
    } else {
      setSelectedRoles([...selectedRoles, id]);
    }
  };

  const roleCheckboxes = RoleCheck.map((role) => (
    <FormControlLabel
      control={
        <Checkbox
          checked={selectedRoles.includes(parseInt(role.id))}
          onChange={() => handleRolesChange(parseInt(role.id))}
        />
      }
      label={role.name}
      key={parseInt(role.id)}
    />
  ));


  useEffect(() => {        
    getRole()
    getUsers()
  }, [selectedRoles])


  const getUsers  = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/users?search=`
    })
    if (res.data) {      
      const datausers = res.data.map((item) => ({value:parseInt(item.id), label:item.attributes.userName}))
      setgetUsers(datausers)     
    }
  } 

  const getRole = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/role?search=`
    })
    if (res.data) {      
      const datarole = res.data.map((item) => ({id:item.id, name:item.attributes.name}))
      setRoleCheck(datarole)      
    }
  }

  const SubmitSave = async () => {
    if (!isSave){
      setOpen(false);
    }else{
    
      const data = {
        userId: selectedUser ? selectedUser.value : null, 
        roleId: selectedRoles,
        createdBy: parseInt(localStorage.getItem('userId'))
      }    
      const res = await client.requestAPI({
        method: 'POST',
        endpoint: `/userRole/addUserRole/`,
        data
      })
      if(!res.isError){
        setDataAlert({
          severity: 'success',
          open: true,
          message: res.data.meta.message
        }) 
        setTimeout(() => {
          navigate('/masteruserrole')
        }, 3000)      
      }else {
        setDataAlert({
          severity: 'error',
          message: res.error.detail,
          open: true
        })
      }
      setOpen(false)
    }
  }

  return (
    <>
      <SideBar>
            <Breadcrumbs breadcrumbs={dataBread} />
            <Grid container rowSpacing={2.5}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={9.9}>
                    <Header judul="Create User Role" />
                  </Grid>
                  <Grid item />                 
                </Grid>
                <Grid className="HeaderDetail">
                <Grid item xs={12}>
                  <FormProvider>
                    <form onSubmit={handleSubmit()}>              
                    <Grid container spacing={2}>
                      <Grid item xs container direction="column" spacing={2}>                                              
                        <Grid style={{ padding: "30px" }}>                          
                        <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={getUsersdata}
                                sx={{ width: "100%" }}
                                value={selectedUser}
                                onChange={(event, newValue) => setSelectedUser(newValue)}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="NIP & User *"
                                    placeholder="Select User"
                                    focused
                                    {...register('nipUser')}
                                    error={errors.nipUser !== undefined}
                                    helperText={errors.nipUser ? errors.nipUser.message : ''}
                                  />
                                )}
                              />
                        </Grid>  
                        <Divider sx={{marginLeft:"20px", marginBottom:"30px"}}/>   
                        <Typography sx={{marginLeft:"20px", fontSize: "18px", fontWeight:"bold" }}>
                              Role *
                            </Typography>
                            <Grid container direction="row" sx={{ marginLeft: "25px" }}>
                            <Grid item xs={6}>
                              <FormGroup>{roleCheckboxes.slice(0, 3)}</FormGroup>
                            </Grid>
                            <Grid item xs={6}>
                              <FormGroup>{roleCheckboxes.slice(3)}</FormGroup>
                            </Grid>
                            {selectedRoles.length === 0 && (
                              <Typography
                                variant="caption"
                                sx={{ marginLeft: '30px', color: '#D32F2F', marginTop: '15px' }}
                              >
                                {errors.role ? errors.role.message : ''}
                              </Typography>
                            )}
                          </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs textAlign='right'>
                      <Button
                        style={{ marginRight: '16px' }} 
                        variant='cancelButton'
                        onClick={() => handleClickOpenCancel()}
                      >
                        Cancel Data
                      </Button>
                      <Button
                        variant='saveButton'
                        type='submit'
                        onClick={handleClickOpenSave}
                      >
                        Save Data
                      </Button>
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
                        <Button variant="cancelButton" onClick={handleCloseOpenCancelData}>
                          {isSave ? "Back" : "Cancel without saving"}
                        </Button>
                        <Button variant="saveButton" onClick={SubmitSave} autoFocus>
                          {isSave ? 'Save Data' : 'Back'}
                        </Button>
                      </DialogActions>
                    </Dialog>

                   </form>
                  </FormProvider>
                 </Grid>                       
                </Grid>
              </Grid>
            </Grid>                      
      </SideBar>
    </>
  );
};

export default CreateUserRole;
