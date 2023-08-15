import React, { useState, useEffect } from "react";
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
import { options } from "@fullcalendar/core/preact";

const CreateProject = () => {
  const [dataProject, setDataProject] = useState([
    {
      id: 1,
      no: 1,
      nip: "0213819",
      name: "Iqbal",
      joinDate: "02/02/2023",
      role: "",
    },
  ]);
  const columnsProject = [
    {
      field: "no",
      headerName: "No",
      flex: 1,
    },
    {
      field: "nip",
      headerName: "NIP",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
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
              <span className="text-name">{params.row.name}</span>
            </div>
          </div>
        );
      },
    },
    {
      field: "joinDate",
      headerName: "Join-End Date",
      flex: 4,
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
  const [sendData, setData] = useState({});
  const [isSave, setIsSave] = useState(false);
  const [dataAlert, setDataAlert] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState({
    companyName: "",
    companyEmail: "",
    npwp: "",
    address: "",
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

  const dataUser = [
    {
      title: 'Fahreja Abdullah',
      id: '1-user'
    },
    {
      title: 'Selfi Muji',
      id: '2-user'
    },
    {
      title: 'Aristo Pacitra Randu Wangi',
      id: '3-user'
    },
    {
      title: 'Rizza Prata Putra',
      id: '4-user'
    }
  ]
  // const [dataUser, setDataUser] = useState([])
  // const getOptDataUser = async () => {
  //   const res = await client.requestAPI({
  //     method: 'GET',
  //     endpoint: `/ol/projectTypeList?userId=1&search=`
  //   })
  //   const data = res.data.map(item => ({id : item.id, positionId: item.attributes.positionId, nip: item.attributes.nip, firstName: item.attributes.firstName, lastName: item.attributes.lastName}));
  //   setDataUser(data)
  // }

// const roles = [
//     {
//       value: 'master',
//       label: 'Master',
//     },
//     {
//       value: 'maintener',
//       label: 'Maintener',
//     },
//     {
//       value: 'dev',
//       label: 'Developer',
//     }
//   ]
  const [roles, setOptRoles] = useState([])
  const getOptRoles = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/roleProject`
    })
    const data = res.data.map(item => ({id : item.id, role: item.attributes.role}));
    setOptRoles(data)
  }

  const [valueUser, setValueUser] = useState([]);

  const cancelData = () => {
    setIsSave(false);
    setOpen(true);
  };

  const confirmSave = async (data) => {
    setIsSave(true);
    setOpen(true);
    setData(data);
  };

  let methods = useForm({
    resolver: yupResolver(schemacompany),
    defaultValues: {
      projectName: "",
      companyName: "",
      npwp: "",
      address: "",
    },
  });

  const handleClose = () => {
    if (!isSave) {
      setIsEdit(false);
    }
    setOpen(false);
  };
  const onSave = async () => {
    const res = await client.requestAPI({
      method: 'POST',
      endpoint: '/project/add-project'
    })
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
    }
    setOpen(false);
  };

  const top100Films = [
    { label: "PT ABC", year: 1994 },
    { label: "PT WASD", year: 1972 },
    { label: "PT QWE", year: 1974 },
  ];
  
  const [projectTypes, setOptProjectType] = useState([])
  const getProjectTypes = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/projectTypeList?userId=1&search=`
    })
    const data = res.data.map(item => ({id : item.id, projectTypes: item.attributes.projectTypes, projectTypeName: item.attributes.projectTypeName, projectName: item.attributes.projectName}));
    setOptProjectType(data)
  }
  useEffect(() => {
    getProjectTypes()
    getOptRoles()
    // getOptDataUser()
  }, [])

  return (
    <SideBar>
      <CustomAlert
        open={dataAlert.open}
        message={dataAlert.message}
        severity={dataAlert.severity}
      />
      <Breadcrumbs breadcrumbs={dataBread} />
      <Grid container>
        <Grid item xs={8} pb={2}>
          <Header judul={"Create Project"} />
        </Grid>
        <Grid item xs={12}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(confirmSave)}>
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
                        id="combo-box-demo"
                        options={top100Films}
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
                          label="End Date Project"
                          sx={{ width: "100%", paddingRight: "20px" }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
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
                    <FormControl fullWidth>
                      <Autocomplete
                        disablePortal
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
                    <div className='card-project'>
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
                            className='auto-custom'
                            getOptionLabel={(option) => option.title}
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
                          <Button fullWidth style={{ minHeight: '72px'}} variant="saveButton">INVITE</Button>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TableNative
                      data={dataProject}
                      columns={columnsProject}
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
                    <Button variant="saveButton" type="submit">
                      Save Data
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </form>
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
