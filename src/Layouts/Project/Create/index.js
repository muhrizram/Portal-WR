import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import SideBar from "../../../Component/Sidebar";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Avatar,
  FormControl,
  Autocomplete,
  TextField,
} from "@mui/material";
import "../../../App.css";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import FormInputText from "../../../Component/FormInputText";
import schemacompany from "../shema";
import CustomAlert from "../../../Component/Alert";
import TableNative from "../../../Component/DataTable/Native";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import client from "../../../global/client";
import { AlertContext } from "../../../context";
import { options } from "@fullcalendar/core/preact";

const CreateProject = () => {
  
  const columnsProject = [
    {
      field: "no",
      headerName: "No",
      flex: 0.5,
    },
    {
      field: "nip",
      headerName: "NIP",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.8,
      renderCell: (params) => {
        const urlMinio = params.row.photoProfile
          ? `${process.env.REACT_APP_BASE_API}/${params.row.photoProfile}`
          : "";
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={urlMinio}
              className="img-master-employee"
              alt="Profile Image"
            />
            <div style={{ marginLeft: "0.5rem" }}>
              <span className="text-name">{params.row.firstName}</span>
            </div>
          </div>
        );
      },
    },
    {
      field: "joinDate",
      headerName: "Join-End Date",
      flex: 3,
      renderCell: (params) => {
        return (
          <Grid container columnSpacing={1} margin={2.5}>
            <Grid item xs={5.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DemoContainer components={["DatePicker"]}> */}
                  <DatePicker
                    className='date-input-table'
                    placeholder="Join Date"
                    // sx={{ width: "100%", paddingRight: "10px" }}
                  />
                {/* </DemoContainer> */}
              </LocalizationProvider>
            </Grid>
            <Grid item xs={1} alignSelf="center" textAlign="center">
              <span>-</span>
            </Grid>
            <Grid item xs={5.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DemoContainer components={["DatePicker"]}> */}
                  <DatePicker
                    className='date-input-table'
                    placeholder="End Date"
                    // sx={{ width: "100%", paddingRight: "10px" }}
                  />
                {/* </DemoContainer> */}
              </LocalizationProvider>
            </Grid>
          </Grid>
        )
      }
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "",
      headerName: "Action",
      flex: 1,
    },
  ];

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [dataUser, setDataUser] = useState([])
  const [roles, setOptRoles] = useState([])
  const [valueUser, setValueUser] = useState([]);
  const [company, setOptCompany] = useState([])
  const [projectTypes, setOptProjectType] = useState([])
  const { setDataAlert } = useContext(AlertContext)
  const [isEdit, setIsEdit] = useState(false);
  const [selectedMember, setSelectedMember] = useState([])
  const [dataProject, setDataProject] = useState([]);
  const [sendData, setData] = useState({
    companyId : 4,
    picProjectName : "River",
    picProjectPhone : "089111",
    projectDescription : "ABC",
    startDate : "2023-06-26",
    endDate : "2023-09-22",
    projectType : 62,
    createdBy : 3,
    initialProject : "Project-1",
    projectName : "Open World",
    listUser: [
    {
      userId: 4,
      roleProjectId : 70,
      joinDate: "2023-07-01",
      endDate: "2023-12-31"
    }
  ]
  });

  const dataBread = [
    {
      href: "/dashboard",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masterProject",
      title: "Master Project",
      current: false,
    },
    {
      href: "/master-project/detail",
      title: isEdit ? "Edit Project" : "Detail Project",
      current: true,
    },
  ];

  const handleInvite = () => {
    setSelectedMember((prevSelected) => [...prevSelected, ...valueUser])
    setValueUser([])
  }
  const updateData = [...dataProject, ...selectedMember.map((row, index) => ({ ...row, no: dataProject.length + index +1 }))]

  const getOptDataUser = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/users?search=`
    })
    const data = res.data.map(item => ({
      id : item.id,
      nip: item.attributes.nip, 
      firstName: item.attributes.firstName, 
      lastName: item.attributes.lastName,
      userName: item.attributes.userName,
      active: item.attributes.active
    }));
    setDataUser(data)
  }

  const getOptRoles = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/roleProject`
    })
    const data = res.data.map(item => ({id : item.id, role: item.attributes.role}));
    setOptRoles(data)
  }

  const getOptCompany = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/companylistname`
    })
    const data = res.data.map(item => ({companyId : item.id, name: item.attributes.name}));
    setOptCompany(data)
  }
  
  const getProjectTypes = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/projectTypeList?userId=1&search=`
    })
    const data = res.data.map(item => ({
      id : item.id,
      projectTypes: item.attributes.projectTypes,
      projectTypeName: item.attributes.projectTypeName,
      projectName: item.attributes.projectName
    }));
    setOptProjectType(data)
  }

  const cancelData = () => {
    setIsSave(false);
    setOpen(true);
  };

  const confirmSave = async (data) => {
    setIsSave(true);
    setOpen(true);
    setData(data);
    console.log ("APA YAA",data)
  };

  const methods = useForm({
    resolver: yupResolver(schemacompany),
    defaultValues: {
      projectName: "",
      companyName: "",
      picProjectName: "",
      picProjectPhone: "",
      projectType: "",
      projectDescription: "",
    },
  });

  const handleClose = () => {
    if (!isSave) {
      setIsEdit(false);
    }
    setOpen(false);
  };

  const onSave = async () => {

    const data = {
      ...sendData,
    }

    const res = await client.requestAPI({
      method: 'POST',
      endpoint: '/project/add-project',
      data
    })
    console.log("ADD PROJECT", res)

    if (!res.isError) {
      setDataAlert({
        severity: 'success',
        open: true,
        message: res.data.meta.message
      })
      setTimeout(() => {
        navigate('/master-company')
      }, 3000)
    } else {
      setDataAlert({
        severity: 'error',
        message: res.error.detail,
        open: true
      })
      console.log("ISI NYA", data)
    }
    // setOpen(false);
  };

  
  useEffect(() => {
    getProjectTypes()
    getOptRoles()
    getOptDataUser()
    getOptCompany()
    console.log("DATA PROJECT", sendData)
  }, [])

  return (
    <SideBar>
      <Breadcrumbs breadcrumbs={dataBread} />
      <Grid container>
        <Grid item xs={8} pb={2}>
          <Header judul={"Create Project"} />
        </Grid>
        <Grid item xs={12}>
          <FormProvider {...methods}>
            {/* <form onSubmit={methods.handleSubmit(confirmSave)}> */}
              <div className="card-container-detail">
                <Grid
                  item
                  container
                  columnSpacing={3.79}
                  rowSpacing={3.79}
                  xs={12}
                >
                  <Grid item xs={6}>
                    <FormInputText
                      focused
                      name="projectName"
                      className="input-field-crud"
                      placeholder="e.g PT. ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                      label="Project Name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <Autocomplete
                        disablePortal
                        name="companyName"
                        id="combo-box-demo"
                        options={company}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Company Name" />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormInputText
                      focused
                      name="picProject"
                      className="input-field-crud"
                      placeholder="e.g Selfi Muji Lestari"
                      label="PIC Project Name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormInputText
                      focused
                      name="picProjectPhone"
                      className="input-field-crud"
                      placeholder="e.g PT. Jalan Gatot Subroto no 122"
                      label="PIC Project Phone"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          name="startDate"
                          label="Start Date Project"
                          sx={{ width: "100%", paddingRight: "20px" }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          name="endDate"
                          label="End Date Project"
                          sx={{ width: "100%", paddingRight: "20px" }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <FormInputText
                      focused
                      name="InitialProject"
                      className="input-field-crud"
                      placeholder="e.g Selfi Muji Lestari"
                      label="Initial Project"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <Autocomplete
                        disablePortal
                        name="projectType"
                        id="combo-box-demo"
                        options={projectTypes}
                        getOptionLabel={(option) => option.projectTypeName}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Project Type" />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormInputText
                      focused
                      name="projectDescription"
                      className="input-field-crud"
                      placeholder="e.g PT. Jalan Gatot Subroto no 122"
                      label="Project Description"
                    />
                  </Grid>
                </Grid>
                <Grid item container mt={4} xs={12}>
                  <Grid item xs={12}>
                    <Typography variant="inputDetail">Teams Member</Typography>
                  </Grid>
                  <Grid item xs={12} mb={2}>
                    {/* {sendData.listUser.map((res, index) => ( */}
                    <div className='card-project' >
                      <Grid container rowSpacing={2} columnSpacing={1.25}>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail" fontWeight="600">Member Invite</Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Autocomplete
                            multiple
                            value={valueUser}
                            limitTags={2}
                            onChange={(event, newValue) => {
                              setValueUser([...newValue])
                            }}
                            options={dataUser}
                            getOptionLabel={(option) => option.userName}
                            className='auto-custom'
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => (
                              <TextField 
                                {...params}
                                focused
                                label="Invite by name" 
                                placeholder="Search name"
                                className='input-field-crud bg-white auto-chips'
                              />
                            )}
                          >
                          </Autocomplete>
                        </Grid>
                        <Grid item xs={2.5}>
                          <Autocomplete
                            disablePortal
                            options={roles}
                            getOptionLabel={(option) => option.role}
                            sx={{ width: "100%" }}
                            renderInput={(params) => (
                              <TextField
                                focused
                                {...params} 
                                label="Select Role"
                                placeholder="Search Role" 
                                className='blue-outline input-field-crud'
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={2.5}>
                          <Button 
                            fullWidth
                            style={{ minHeight: '72px'}}
                            variant="saveButton"
                            onClick={handleInvite}
                          >
                            INVITE
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                    {/* ))} */}
                  </Grid>
                  <Grid item xs={12}>
                    <TableNative
                      data={updateData}
                      columns={columnsProject}
                      getRowId={(row) => row.id}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} justifyContent="end" mt={3.5}>
                  <Grid item xs textAlign="right">
                    <Button
                      style={{ marginRight: "16px" }}
                      variant="cancelButton"
                      onClick={() => cancelData()}
                    >
                      Cancel Data
                    </Button>
                    <Button variant="saveButton" type="submit" onClick={onSave}>
                      Save Data
                    </Button>
                  </Grid>
                </Grid>
              </div>
            {/* </form> */}
          </FormProvider>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-delete"
      >
        <DialogTitle id="alert-dialog-title" className="dialog-delete-header">
          {isSave ? "Save Data" : "Cancel Data"}
        </DialogTitle>
        <DialogContent className="dialog-delete-content">
          <DialogContentText
            className="dialog-delete-text-content"
            id="alert-dialog-description"
          >
            {isSave
              ? "Save your progress: Don't forget to save your data before leaving"
              : "Warning: Canceling will result in data loss without saving!"}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialog-delete-actions">
          <Button
            onClick={handleClose}
            variant="outlined"
            className="button-text"
          >
            {isSave ? "Back" : "Cancel without saving"}
          </Button>
          <Button onClick={onSave} variant="saveButton">
            {isSave ? "Save Data" : "Back"}
          </Button>
        </DialogActions>
      </Dialog>
    </SideBar>
  );
};



export default CreateProject;
