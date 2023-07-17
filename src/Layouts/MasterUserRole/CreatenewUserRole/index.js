import React, { useState , useEffect} from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import SideBar from "../../../Component/Sidebar";
import TextField from "@mui/material/TextField";
import Divider from '@mui/material/Divider';
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { FormProvider } from "react-hook-form";
import client from '../../../global/client';

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


const CreateUserRole = () => {
  const [open, setOpen] = React.useState(false);  
  const [openCancel, setOpenCancel] = React.useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [getUsersdata, setgetUsers] = useState([]);
  const navigate = useNavigate();
  const UserName = [
    { label: "02/01/03/23 - Fahreja Abdullah", value: 2 }
  ];  

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

  const handleClickOpen = () => {
    setOpen(true);
    console.log(open);
  };
  const handleClickOpenCancel = () => {
    setOpenCancel(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseOpenCancelData = () => {
    navigate("/masteruserrole");
    setOpenCancel(false);    
  };

  const handleCloseCancel = () => {
    setOpenCancel(false);
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
      console.log("DATA NYA USERS", res.data)
      const datausers = res.data.map((item) => ({value:parseInt(item.id), label:item.attributes.userName}))
      setgetUsers(datausers)
      console.log("INI DATA USER",datausers)     
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
    const data = {     
      userId: selectedUser, 
      roleId: selectedRoles,
    }
    console.log("MISI PAKET ",data)
    const res = await client.requestAPI({
      method: 'POST',
      endpoint: `/userRole/addUserRole/`,
      data
    })
    console.log("INI RES",res)
    if (res.data == undefined) {     
      setTimeout(() => {
        navigate('/masteruserrole/create')
      }, 3000)
      console.log("ERROR DATA ALREADY EXIST")
    }else if (res.data.meta.message){
      setTimeout(() => {
        navigate('/masteruserrole')
      }, 3000)
    }
    setOpen(false)    
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
                    <form>              
                    <Grid container spacing={2}>
                      <Grid item xs container direction="column" spacing={2}>                                              
                        <Grid style={{ padding: "30px" }}>                          
                        <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={getUsersdata}
                                sx={{ width: "100%" }}
                                value={selectedUser}
                                onChange={(event, newValue) => setSelectedUser(newValue.value)}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="User Name"
                                    placeholder="Select User"
                                  />
                                )}
                              />
                        </Grid>  
                        <Divider sx={{marginLeft:"20px", marginBottom:"30px"}}/>   
                        <Typography
                              sx={{marginLeft:"20px", fontSize: "18px", fontWeight:"bold" }}
                            >
                              Role
                            </Typography>
                            <Grid container direction="row" sx={{ marginLeft: "25px" }}>
                            <Grid item xs={6}>
                              <FormGroup>{roleCheckboxes.slice(0, 3)}</FormGroup>
                            </Grid>
                            <Grid item xs={6}>
                              <FormGroup>{roleCheckboxes.slice(3)}</FormGroup>
                            </Grid>
                          </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      alignSelf="center"
                      textAlign="right"                  
                    >
                      <Button
                        onClick={handleClickOpenCancel}
                        variant='cancelButton'
                        style={{ marginRight: "10px" }}
                        color="error"
                      >
                        Cancel Data
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleClickOpen}
                        style={{ marginRight: "10px" }}
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
                        {"Save Data"}
                      </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Save your progress: Don't forget to save your data before
                            leaving
                          </DialogContentText>
                        </DialogContent>
                      <DialogActions>
                        <Button variant="outlined" onClick={handleClose}>
                          Back
                        </Button>
                        <Button variant="contained" onClick={SubmitSave} autoFocus>
                          Save Data
                        </Button>
                      </DialogActions>
                    </Dialog>

                    <Dialog
                      open={openCancel}
                      onClose={handleCloseCancel}
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
                        {"Cancel Save Data"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Warning: canceling with result in data loss without
                          saving!
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="outlined"
                          onClick={handleCloseOpenCancelData}
                        >
                          Cancel Without Saving
                        </Button>
                        <Button
                          variant='cancelButton'
                          onClick={handleCloseCancel}
                          autoFocus
                        >
                          Back
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
