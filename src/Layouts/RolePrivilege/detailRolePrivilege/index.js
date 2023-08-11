import React, { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import SideBar from "../../../Component/Sidebar";
import TextField from "@mui/material/TextField";
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router";
import client from '../../../global/client';
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


const DetailPrivilege = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // const [role,setRole] = useState(["working report","master role privilege"])
  const [Cancel, setCancel] = React.useState(false);
  const { setDataAlert } = useContext(AlertContext)
  // const Role = [
  //   "Employee", "HRD"
  // ];

  const dataBreadDetailRolePrivilege = [
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
      title: "Detail Privilege",
      current: true,
    },
  ];

  const dataBreadEditRolePrivilege = [
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
      title: "Edit Role Privilege",
      current: true,
    },
  ];

  useEffect(() => {
    getDetailRolePrivilege()
    getDataPrivilege()
  }, [])

  const [detail, setDetail] = useState({});
  const [idDetail,setIdDetail] = useState()
  const [privilege,setPrivilege] = useState([])
  const [selectedPrivilege, setSelectedPrivilege] = useState([]);
  const [privilegeCheck,setPrivilegeCheck] = useState([])
  const getDetailRolePrivilege = async () => {
    const idDetail = localStorage.getItem("idRolePrivilege")
    setIdDetail(idDetail)
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/rolePrivilege/${idDetail}`
    })
    if (res.data.attributes) {
      setDetail(res.data.attributes)
      setPrivilege(res.data.attributes.listPrivilege) 
      const selectedListPrivilege = res.data.attributes.listPrivilege.map((privilege) => privilege.privilegeId);
      setSelectedPrivilege(selectedListPrivilege);      
    }
  }

  //option privilege
  const getDataPrivilege = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/privilege?search=`
    })
    // rebuildData(res)
    const data = res.data.map(item => ({id : parseInt(item.id), name: item.attributes.name}));
    setPrivilegeCheck(data)
  }
  //option privilege

  const handleChangeCheckbox = (id) => {
    if (selectedPrivilege.includes(id)) {
      setSelectedPrivilege(selectedPrivilege.filter((privilege) => privilege !== id));
    } else {
      setSelectedPrivilege([...selectedPrivilege, id]);
    }
  };

  const privilegeCheckboxes = privilegeCheck.map((privilege) => (
    <FormControlLabel
      control={
        <Checkbox
          checked={selectedPrivilege.includes(privilege.id)}
          onChange={() => handleChangeCheckbox(privilege.id)}
        />
      }
      label={privilege.name}
      key={parseInt(privilege.id)}
    />
  ));

  const clickEdit = () => {
    setIsEdit(true);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickCancel = () => {
    setCancel(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseOpenCancelData = () => {
    setCancel(false);
    setIsEdit(false);
  };

  const handleClose1 = () => {
    setCancel(false);
  };

  const SubmitSave = async () => {
    const data = {      
      privilegeId: selectedPrivilege,
    }
    const res = await client.requestAPI({
      method: 'PUT',
      endpoint: `/rolePrivilege/update/${idDetail}`,
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
    // navigate('/masterroleprivilege')
    setOpen(false);
    // setIsEdit(false);
  };

  return (
    <>
      <SideBar>
        {isEdit ? (
          <>
            <Breadcrumbs breadcrumbs={dataBreadEditRolePrivilege} />
            <Grid container rowSpacing={2.5}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={9.9}>
                    <Header judul="Edit Role Privilege" />
                  </Grid>
                  <Grid item />                 
                </Grid>

                <Grid container className="HeaderDetail">
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs container direction="column" spacing={2}>                                              
                        <Grid style={{ padding: "30px" }}>    
                          <TextField sx={{width:"100%"}} disabled id="outlined-basic" label="Role" value={detail.roleName} variant="outlined" />
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
                              {privilegeCheckboxes.slice(0,4)}
                            </FormGroup>
                            </Grid>
                            <Grid item xs={6}>
                            <FormGroup>
                            {privilegeCheckboxes.slice(4)}
                            </FormGroup>
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
                    onClick={handleClickCancel}
                    variant='cancelButton'
                    style={{ marginRight: "10px" }}
                    // color="error"
                  >
                    Cancel Data
                  </Button>
                  <Button
                    variant="contained"
                    className="button-text"
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
                  <DialogContentText id="alert-dialog-description"
                    className="dialogDescription">
                    Save your progress: Don't forget to save your data before
                    leaving
                  </DialogContentText>
                </DialogContent>
                <DialogActions className="dialog-delete-actions">
                  <Button variant="outlined" onClick={handleClose}>
                    Back
                  </Button>
                  <Button variant="contained" onClick={SubmitSave} autoFocus>
                    Save Data
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog
                    open={Cancel}
                    onClose={handleClose1}
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
                      {"Cancel Data"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description"
                        className="dialogDescription">
                        Warning: canceling with result in data loss without
                        saving!
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions className="dialog-delete-actions">
                      <Button
                        className="button-text"
                        // style={{ marginRight: '16px' }}
                        variant="outlined"
                        onClick={handleCloseOpenCancelData}
                      >
                        Cancel Without Saving
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleClose1}
                        autoFocus
                      >
                        Back
                      </Button>
                    </DialogActions>
                  </Dialog>
                  </>
                </Grid>
              </Grid>
            </Grid>            
          </>
        ) : (
          <>
            <Breadcrumbs breadcrumbs={dataBreadDetailRolePrivilege} />
            <Grid container rowSpacing={2.5}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={9.9}>
                    <Header judul="Detail Role Privilege" />
                  </Grid>

                  <Grid item />

                  <Grid item xs={2} alignSelf="center" textAlign="right">
                    <Button
                      variant="outlined"
                      startIcon={<CreateIcon />}
                      style={{ marginRight: "10px", padding: "4px 10px"}}
                      onClick={clickEdit}
                    >
                      Edit Data Role Privilege
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
                              Role
                            </Typography>
                            <Typography  sx={{fontSize: "16px" }} >
                              {detail.roleName}
                            </Typography>
                          </Grid>                                                   
                        </Grid>  
                        <Divider sx={{marginLeft:"20px", marginBottom:"30px"}}/>   
                        <Typography
                              sx={{marginLeft:"20px", fontSize: "18px", fontWeight:"bold" }}
                            >
                              Privilege
                            </Typography>
                            <Timeline>
                              {privilege.map((item,index) => (
                              <Grid key={index} sx={{ display: "flex", alignItems: "center",marginLeft:'7px' }}>
                                <TimelineDot color="primary" />
                                <TimelineContent>{item.privilegeName}</TimelineContent>
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

export default DetailPrivilege;
