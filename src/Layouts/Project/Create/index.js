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
  IconButton,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import "../../../App.css";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import FormInputText from "../../../Component/FormInputText";
import schemacompany from "../shema";
// import CustomAlert from "../../../Component/Alert";
import TableNative from "../../../Component/DataTable/Native";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import client from "../../../global/client";
import { AlertContext } from "../../../context";
// import { options } from "@fullcalendar/core/preact";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import debounce from "@mui/utils/debounce";
import dayjs from "dayjs";

const CreateProject = () => {
  const [open, setOpen] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [dataUser, setDataUser] = useState([])
  const [roles, setOptRoles] = useState([])
  const [valueUser, setValueUser] = useState([]);
  const [company, setOptCompany] = useState([])
  const [projectTypes, setOptProjectType] = useState([])
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false)
  const [selectedMember, setSelectedMember] = useState([])
  const [dataProject, setDataProject] = useState([]);
  const [startProject, setStartProject] = useState()
  const [endProject, setEndProject] = useState()
  const [startJoin, setStartJoin] = useState()
  const [endJoin, setEndJoin] = useState()
  const [sendData, setData] = useState({
    listUser: [],
    startDate: null,
    endDate: null,
  });
  const [isInviteDisabled, setIsInviteDisabled] = useState(true);
  const currentUserId = localStorage.getItem("userId");

  const columnsProject = [
    {
      field: "no",
      headerName: "No",
      flex: 0.2,
      sortable: false
    },
    {
      field: "nip",
      headerName: "NIP",
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1.3,
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
            <Grid container>
              <Grid style={{ marginLeft: "0.5rem" }} item xs={6}>
                <span className="text-name">{params.row.firstName}</span>
              </Grid>
              <Grid style={{ marginLeft: "0.5rem" }} item xs={6}>
                <span className="text-name">{params.row.position}</span>
              </Grid>
            </Grid>
          </div>
        );
      },
    },
    {
      field: "joinDate",
      headerName: "Join-End Date",
      flex: 2.5,
      cellClassName: "joinDate-cell",
      renderCell: (params) => {
        return (
          <Grid container columnSpacing={1}>
            <Grid item xs={5.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="date-input-table"
                  format="DD/MM/YYYY"
                  onChange={(startJoinProject) => {
                    const newJoinDate = startJoinProject.format("YYYY-MM-DD");
                    const updatedListUser = sendData.listUser.map(u => {
                      if (u.userId === params.row.userId || currentUserId == params.row.userId) {
                        return { ...u, joinDate: newJoinDate };
                      }
                      return u;
                    });

                    setData(prevData => ({
                      ...prevData,
                      listUser: updatedListUser
                    }));
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={1} alignSelf="center" textAlign="center">
              <span>-</span>
            </Grid>
            <Grid item xs={5.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="date-input-table"
                  format="DD/MM/YYYY"
                  onChange={(endJoinProject) => {
                    const newEndDate = endJoinProject.format("YYYY-MM-DD");
                    const updatedListUser = sendData.listUser.map(u => {
                      if (u.userId === params.row.userId || currentUserId == params.row.userId) {
                        return { ...u, endDate: newEndDate };
                      }
                      return u;
                    });
  
                    setData(prevData => ({
                      ...prevData,
                      listUser: updatedListUser
                    }));
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        );
      }
    },
    {
      field: "roleProjectId",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => {
        return (
          <Grid item xs={12}>
          <Autocomplete
            name="roleProjectId"
            freeSolo
            defaultValue={params.row.roleSelect}
            options={roles}
            getOptionLabel={(option) => option.role}
            onChange={(_event, newValue) => {
              if (newValue) {
                const updatedListUser = sendData.listUser.map(u => {
                  if (u.userId === params.row.userId) {
                    return { ...u, roleProjectId: newValue.id };
                  }
                  return u;
                });
  
                setData(prevData => ({
                  ...prevData,
                  listUser: updatedListUser
                }));
              }
            }}
            className="date-input-table"
            renderInput={(paramsInput) => (
              <TextField
                {...paramsInput}
                placeholder="Select Role"
                inputProps={{
                  ...paramsInput.inputProps,
                  style: {
                    height: '8px',
                  }
                }}
              />
            )}
            />
            </Grid>
        );
      }
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => handleDeleteMember(params.row.userId)}
            color="default"
          >
            <DeleteOutlineOutlined />
          </IconButton>
        );
      }
    },
  ];
  
  const [filter, setFilter] = useState({
    sortName: "role",
    sortType: "asc",
    search: "",
  });

  const onFilter = (dataFilter) => {
    setFilter({
      sortName:
        dataFilter.sorting.field !== ""
          ? dataFilter.sorting[0].field
          : "nip",
      sortType:
        dataFilter.sorting.sort !== "" ? dataFilter.sorting[0].sort : "asc",
      search: '',
    });
  };

  const navigate = useNavigate();
  const { setDataAlert } = useContext(AlertContext);

  
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
      href: "/master-project/create",
      title: "Create Project",
      current: true,
    },
  ];

  useEffect(() => {
    getProjectTypes()
    getOptRoles()
    getOptCompany()
    getOptDataUser('')
  }, [filter])

  const handleInvite = () => {
    const newMembers = [];
    for (const newUser of valueUser) {
      let exists = false;
      for (const existingMember of selectedMember) {
        if (newUser.id === existingMember.id) {
          exists = true;
        }
      }
      if (!exists) {
        newMembers.push(newUser);
      }
    }

    setSelectedMember((prevSelected) => [...prevSelected, ...newMembers])

    const updatedListUser = [...sendData.listUser, ...dataProject.map(user => ({
      userId: user.userId,
      roleProjectId: user.roleSelect.id,
      joinDate: null,
      endDate: null
    })), ...newMembers.map(member => ({
      userId: member.userId,
      roleProjectId: member.roleProjectId,
      joinDate: null,
      endDate: null
    }))];

    setData(prevData => ({
      ...prevData,
      listUser: updatedListUser
    }));
    
    methods.setValue('roleProjectIds', null)
    setIsInviteDisabled(true)
  }
  const updateData = [...dataProject, ...selectedMember.map((row, index) => ({ ...row, no: 1 + (index + 1) }))]

  const handleDeleteMember = (userId) => {
    let updatedSelected;
    setSelectedMember((prevSelected) => {
      updatedSelected = prevSelected.filter(
        (existingMember) => existingMember.userId !== userId
      );
      return updatedSelected;
    });

    const updatedListUser = sendData.listUser.filter(
      (user) => user.userId !== userId
    );

    const updatedDataUser = dataUser.filter(
      (user) => user.userId !== userId
    );

    const updatedValueUser = updatedSelected.map((member) => ({
      id: member.userId,
      firstName: member.firstName,
      lastName: member.lastName
    }));
    setValueUser(updatedValueUser);

    setData((prevData) => ({
      ...prevData,
      listUser: updatedListUser,
    }));

    setDataUser(updatedDataUser);
  };

  const getOptDataUser = async (value) => {
    setLoading(true)
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/teamMember?page=0&size=&sort=${filter.sortName},${filter.sortType}&search=${value}`
    })
    const data = res.data.map(item => ({
      id : parseInt(item.id),
      userId: parseInt(item.id),
      positionId: item.attributes.positionId,
      nip: item.attributes.nip, 
      firstName: item.attributes.firstName, 
      lastName: item.attributes.lastName,
      userName: item.attributes.userName,
      photoProfile: item.attributes.photoProfile,
      position: item.attributes.position,
      assignment: item.attributes.assignment,
      active: item.attributes.active
    }));
    setDataUser(data)
    const newMembers = data.filter((newUser) => newUser.id == currentUserId);
    newMembers.forEach((user, i) => {
      user.roleSelect = {
        id: 70,
        role: 'Master'
      }
      user.no = i + 1
    });
    setDataProject(newMembers)
    setLoading(false)
  }

  const getOptRoles = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/roleProject`
    })
    const data = res.data.map(item => ({id : parseInt(item.id), role: item.attributes.role}));
    setOptRoles(data)
  }

  const getOptCompany = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/companylistname`
    })
    const data = res.data.map(item => ({companyId : parseInt(item.id), name: item.attributes.name}));
    setOptCompany(data)
  }
  
  const getProjectTypes = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/projectType?search=`
    })
    const data = res.data.map(item => ({
      id : parseInt(item.id),
      name : item.attributes.name
    }));
    setOptProjectType(data)
  }

  const cancelData = () => {
    setIsSave(false);
    setOpen(true);
  };

  const methods = useForm({
    resolver: yupResolver(schemacompany),
    defaultValues: {
      projectName: '',
      picProjectName: '',
      picProjectPhone: '',
      projectDescription: '',
      initialProject: '',
      projectName: '',
      createdBy: currentUserId
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = methods
  
  const handleClose = () => {
    if (!isSave) {
      setIsEdit(false);
    }
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    const {name, value} = event.target
    const temp = {...sendData}
    temp[name] = event.target.value
    if(name === 'companyId'){
      temp.companyId = newValue.companyId
    } else if(name === 'projectType'){
      temp.projectType = newValue.id
    } 
    setData(temp)
  }

  const onSaveSubmit = (data) => {
    if (Object.keys(methods.formState.errors).length == 0) {
      setIsSave(true);
      setOpen(true);
    }
  };

  const onSave = async () => {
    const dataForm = methods.getValues()
    delete dataForm.userId
    
    const data = {
      ...sendData,
      ...dataForm
    }

    const res = await client.requestAPI({
      method: 'POST',
      endpoint: '/project/add-project',
      data
    })
    
    if(!res.isError){
      setDataAlert({
        severity: 'success',
        open: true,
        message: res.data.meta.message
      }) 

      setTimeout(() => {
        navigate('/masterProject');
      }, 1000);
    }
    else {          
      setDataAlert({
        severity: 'error',
        message: res.error.detail,
        open: true
      })
      setOpen(false);
    }
    setOpen(false);
  };

  const onChangeRole = (value) => {
    let temp = []
    if (valueUser.length > 0) {
      temp = valueUser.map((res) => {
        return {
          ...res,
          roleProjectId: value.id,
          roleSelect: value
        }
      })
    }
    setValueUser(temp)
    setIsInviteDisabled(false)
  }

  const searchMember = (value) => {
    // setTimeout(() => {
    getOptDataUser(value)
    // }, 200)
  }
  return (
    <SideBar>
      <Breadcrumbs breadcrumbs={dataBread} />
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12} sm={8} pb={2}>
          <Header judul={"Create Project"} />
        </Grid>
        <Grid item xs={12}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSaveSubmit)}>
              <div className="card-container-detail">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormInputText
                      focused
                      name="projectName"
                      className="input-field-crud"
                      placeholder="e.g Project Internal 79"
                      label="Project Name *"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="companyId"
                      control={control}
                      render={({ field }) => (
                    <Autocomplete
                      disablePortal
                      name="companyId"
                      id="combo-box-demo"
                      options={company}
                      getOptionLabel={(option) => option.name}
                      sx={{ width: "100%" }}
                      onChange={(_event, newValue) => {
                        if (newValue) {
                          handleChange({ target: { name: 'companyId', value: newValue.companyId } }, newValue);
                          field.onChange(newValue.companyId);
                        }
                      }}
                      isOptionEqualToValue={(option, value) => option.id === value.id}                      
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Company Name *"
                          placeholder="Select Company"
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.companyId}
                          helperText={errors.companyId ? errors.companyId.message : ''}/>
                      )}
                    />
                    )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormInputText
                      focused
                      name="picProjectName"
                      className="input-field-crud"
                      placeholder="e.g John Doe"
                      label="PIC Project Name *"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormInputText
                      focused
                      name="picProjectPhone"
                      type="number"
                      className="input-field-crud"
                      placeholder="e.g 08123456789"
                      label="PIC Project Phone *"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            label="Start Date Project *"
                            format="DD/MM/YYYY"
                            name={field.name}
                            sx={{ width: "100%" }}
                            value={field.value}
                            onChange={(startProjectDate) => {
                              field.onChange(startProjectDate.format("YYYY-MM-DD"));
                              setStartProject(startProjectDate.format("YYYY-MM-DD"));
                            }}
                            onAccept={field.onBlur}
                            slotProps={{
                              textField: {
                                error: !!errors.startDate,
                              },
                            }}
                          />
                        )}
                      />
                      {errors.startDate && (
                        <Typography
                          color="#d32f2f"
                          textAlign={"left"}
                          fontSize={12}
                          paddingY={'3px'}
                          paddingX={'13px'}
                        >
                          {errors.startDate.message}
                        </Typography>
                      )}
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            label="End Date Project *"
                            format="DD/MM/YYYY"
                            name={field.name}
                            sx={{ width: "100%" }}
                            value={field.value}
                            onChange={(endProjectDate) => {
                              field.onChange(endProjectDate.format("YYYY-MM-DD"));
                              setEndProject(endProjectDate.format("YYYY-MM-DD"));
                            }}
                            onAccept={field.onBlur}
                            slotProps={{
                              textField: {
                                error: !!errors.endDate,
                              },
                            }}
                          />
                        )}
                      />
                      {errors.endDate && (
                        <Typography
                          color="#d32f2f"
                          textAlign={"left"}
                          fontSize={12}
                          paddingY={'3px'}
                          paddingX={'13px'}
                        >
                          {errors.endDate.message}
                        </Typography>
                      )}
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormInputText
                      focused
                      name="initialProject"
                      className="input-field-crud"
                      placeholder="e.g T-PR-WR-001"
                      label="Initial Project *"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="projectType"
                      control={control}
                      render={({ field }) => (
                      <Autocomplete
                        disablePortal
                        name="projectType"
                        id="combo-box-demo" 
                        options={projectTypes}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: "100%" }}
                        onChange={(_event, newValue) => {
                          if(newValue){
                            handleChange({target : { name : 'projectType', value: newValue.id }}, newValue)
                            field.onChange(newValue.id);
                          }
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                          <TextField 
                          {...params}
                          label="Project Type *"
                          placeholder="Select Project Type"
                          InputLabelProps={{ shrink: true }} 
                          error={!!errors.projectType}
                          helperText={errors.projectType ? errors.projectType.message : ''}/>
                        )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller 
                      control={control}
                      name="projectDescription"
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          focused
                          className="input-field-crud"
                          placeholder="e.g Project internal for Working Reports Employee"
                          label="Project Description"
                          InputProps={{
                            maxLength: 255,
                            endAdornment: (
                              <InputAdornment position="end">
                                {field.value.length}/255
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid item container mt={4} spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="inputDetail" sx={{fontWeight: 'bold', fontSize: 20}}>Teams Member</Typography>
                  </Grid>
                  <Grid item xs={12} mb={2}>
                    <div className='card-project' >
                      <Grid container rowSpacing={2} columnSpacing={1.25}>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail" fontWeight="600">Member Invite</Typography>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                        <Controller
                          name="userId"
                          control={control}
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              name="userId"
                              multiple
                              limitTags={2}
                              onChange={(_event, newValue) => {
                                setValueUser([...newValue])
                              }}
                              className="input-field-crud bg-white auto-chips"
                              onKeyUpCapture={debounce((event) => searchMember(event.target.value), 500)}
                              options={dataUser}
                              getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                              isOptionEqualToValue={(option, value) => option.id === value.id}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  InputLabelProps={{ shrink: true }} 
                                  label="Invite by name"
                                  placeholder="Search name"/>
                                
                              )}
                            />
                          )}
                        />
                          
                        </Grid>
                        <Grid item xs={12} sm={2.5}>
                          <Controller
                          name="roleProjectIds"
                          control={control}
                          render={({ field }) => (
                            <Autocomplete
                              disablePortal
                              name="roleProjectIds"
                              options={roles}
                              getOptionLabel={(option) => option.role}
                              onChange={(_event, newValue) => {
                                onChangeRole(newValue)
                              }}
                              sx={{ width: "100%" }}
                              className="blue-outline input-field-crud"
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  InputLabelProps={{ shrink: true }} 
                                  label="Select Role *"
                                  placeholder="Search Role"
                                />
                              )}
                            />
                          )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2.5}>
                          <Button 
                            fullWidth
                            sx={{ minHeight: {
                              xs: '48px',
                              sm: '72px'
                            }}}
                            variant="saveButton"
                            onClick={handleInvite}
                            disabled={isInviteDisabled}
                          >
                            INVITE
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TableNative
                      data={updateData}
                      columns={columnsProject}
                      onFilter={(dataFilter => onFilter(dataFilter))}
                      loading={loading}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="flex-end" mt={3.5}>
                <Grid item xs={12} sm={2} textAlign="right">
                  <Button
                    fullWidth
                    variant="cancelButton"
                    onClick={() => cancelData()}
                  >
                    Cancel Data
                  </Button>
                </Grid>
                <Grid item xs={12} sm={2} textAlign="right">
                  <Button 
                    fullWidth
                    variant="saveButton"
                    type="submit"
                  >
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
