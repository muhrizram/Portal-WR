import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import SideBar from "../../../Component/Sidebar";
import TextField from "@mui/material/TextField";
import Divider from '@mui/material/Divider';
import { FormProvider, useForm } from "react-hook-form";
import client from '../../../global/client';
import { useNavigate } from "react-router-dom";
import { AlertContext } from '../../../context';

//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//timeline
import Timeline from "@mui/lab/Timeline";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

//form
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const DetailUserRole = () => {
  const { setDataAlert } = useContext(AlertContext)
  const [isSave, setIsSave] = useState(false)
  const [isEdit, setIsEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [detail, setDetail] = useState({});
  const [Detailid,setDetailid] = useState()
  const [role,setRole] = useState([])
  const [selectedRoles, setSelectedRoles] = useState([]);
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
      title: isEdit ? "Edit User Role" : "Detail User Role",
      current: true,
    },
  ];

  const navigate = useNavigate();  

  const textPlease = 'Please Select'
  const schemaUserRole = Yup.object().shape({
    role: Yup.string()
      .required(`${textPlease} Role`)
  });

  const { handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaUserRole),
  });

  const handleRoleChange = (id) => {
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
          onChange={() => handleRoleChange(parseInt(role.id))}
        />
      }
      label={role.name}
      key={parseInt(role.id)}
    />
  ));

  const clickEdit = () => {
    setIsEdit(true);
  };

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

  useEffect(() => {    
    getDataDetail()
    getRole()
  }, [])

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

  const getDataDetail = async () => {
    const id = localStorage.getItem('idBacklog')
    setDetailid(id)
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/userRole/${id}`
    })
    if (res.data.attributes) {
      setDetail(res.data.attributes)
      setRole(res.data.attributes.listRole)      
      const selectedRoleIds = res.data.attributes.listRole.map((userRole) => userRole.roleId);      
      setSelectedRoles(selectedRoleIds);      
    }
  }

  const SubmitSave = async () => {
    if (!isSave){
      setOpen(false);  
    }else{
      const data = {      
        roleId: selectedRoles,
        lastModifiedBy : parseInt(localStorage.getItem('userId'))
      }
      const res = await client.requestAPI({
        method: 'PUT',
        endpoint: `/userRole/update/${Detailid}`,
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
        }, 2000)        
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
        {isEdit ? (
          <>
            <Breadcrumbs breadcrumbs={dataBread} />
            <Grid container rowSpacing={2.5}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={9.9}>
                    <Header judul="Edit User Role" />
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
                          <TextField sx={{width:"100%", backgroundColor: "#EDEDED" }} disabled id="outlined-basic" label="NIP & User *" value={detail.nip +  " " + detail.firstName + " " + detail.lastName} variant="outlined" />                                                                        
                        </Grid>  
                        <Divider sx={{marginLeft:"20px", marginBottom:"30px"}}/>   
                        <Typography
                              sx={{marginLeft:"20px", fontSize: "18px", fontWeight:"bold" }}
                            >
                              Role *
                            </Typography>
                          <Grid container direction={{ xs: "row", sm: "column" }} sx={{ marginLeft: "25px" }}
                          errors= {errors.role !== undefined}>
                            <Grid item xs={12}>
                              <FormGroup>{roleCheckboxes.slice(0, 3)}</FormGroup>
                            </Grid>
                            <Grid item xs={12}>
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
                    <Grid container spacing={2} justifyContent="flex-end" mt={3.5}>
                      <Grid item xs={12} sm={2} textAlign="right">
                        <Button
                          fullWidth
                          variant="cancelButton"
                          onClick={() => handleClickOpenCancel()}
                        >
                          Cancel Data
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={2} textAlign="right">
                        <Button 
                          fullWidth
                          variant="saveButton"
                          type="submit"
                          onClick={handleClickOpenSave}
                        >
                          Save Data
                        </Button>
                      </Grid>
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
        </>
        ) : (
          <>
            <Breadcrumbs breadcrumbs={dataBread} />
            <Grid container rowSpacing={2.5}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={9.9} sm={8}>
                    <Header judul="Detail User Role" />
                  </Grid>

                  <Grid item />

                  <Grid item xs={12} sm={4} alignSelf="center" sx={{textAlign: {xs: "start", sm:"end"}}}>
                    <Button
                      variant="outlined"
                      startIcon={<CreateIcon />}
                      style={{ marginRight: "10px" }}
                      onClick={clickEdit}
                    >
                      Edit Data User Role
                    </Button>
                  </Grid>
                </Grid>

                <Grid container className="HeaderDetail">
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs container direction="column" spacing={2}>                                              
                        <Grid
                          container
                          direction="row"
                          style={{ padding: "30px" }}
                        >
                          <Grid item xs={4}>
                            <Typography
                              sx={{ color: "text.secondary", fontSize: "12px" }}
                            >
                              NIP & User
                            </Typography>
                            <Typography  sx={{ color: "text.secondary", fontSize: "16px" }} >                              
                              {detail.nip +  " " + detail.firstName + " " + detail.lastName}
                            </Typography>
                          </Grid>                                                   
                        </Grid>  
                        <Divider sx={{marginLeft:"20px", marginBottom:"30px"}}/>   
                        <Typography
                              sx={{marginLeft:"20px", fontSize: "18px", fontWeight:"bold" }}
                            >
                              Role
                            </Typography>
                            <Timeline>
                              {role.map((item, index) => (
                                <Grid key={index} sx={{ display: "flex", alignItems: "center" }}>
                                  <TimelineDot color="primary" />
                                  <TimelineContent>{item.role}</TimelineContent>
                                </Grid>
                              ))}
                            </Timeline>
                      </Grid>
                    </Grid>
                  </>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </SideBar>
    </>
  );
};

export default DetailUserRole;
