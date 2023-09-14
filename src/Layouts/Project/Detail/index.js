import React, { useEffect, useState, useContext } from "react";
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
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import "../../../App.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import FormInputText from "../../../Component/FormInputText";
import schemacompany from "../shema";
import client from "../../../global/client";
import TableNative from "../../../Component/DataTable/Native";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { AlertContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../Component/Searchbar";
import moment from "moment";

const DetailProject = () => {
  const [open, setOpen] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [roles, setOptRoles] = useState([]);
  const [valueUser, setValueUser] = useState([]);
  const [company, setOptCompany] = useState([]);
  const [projectTypes, setOptProjectType] = useState([]);
  const [selectedMember, setSelectedMember] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [editData, setEditData] = useState({});
  const [columnsProject, setColumns] = useState([]);
  const [isInviteDisabled, setIsInviteDisabled] = useState(true);
  const [loading, setLoading] = useState(false)
  const [isSaveloading, setIsSaveLoading] = useState(false)
  const currentUserId = parseInt(localStorage.getItem("userId"))

  useEffect(() => {
    if (isEdit) {
      setEditData(dataDetail);
    }
    setValue("projectName", dataDetail.projectName);
    setValue("companyId", dataDetail.companyId);
    setValue("picProjectName", dataDetail.picProjectName);
    setValue("picProjectPhone", dataDetail.picProjectPhone);
    setValue("projectType", dataDetail.projectType);
    setValue("initialProject", dataDetail.initialProject);
    setValue(
      "startDate",
      moment(dataDetail.startDateProject).format("YYYY-MM-DD")
    );
    setValue("endDate", moment(dataDetail.endDateProject).format("YYYY-MM-DD"));
    setValue("projectDescription", dataDetail.projectDescription);
  }, [dataDetail, isEdit]);

  const [dataMember, setdataMember] = useState([
    {
      id: "",
      userId: "",
      no: null,
      nip: "",
      name: "",
      firstName: "",
      lastName: "",
      joinDate: "",
      endDate: "",
      roleId: "",
      role: "",
    },
  ]);
  
  useEffect(() => {
    setColumns([
      {
        field: "no",
        headerName: "No",
        flex: 0.2,
        sortable: false,
      },
      {
        field: "nip",
        headerName: "NIP",
        flex: 0.9,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 2,
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
                <Grid style={{ marginLeft: "0.5rem" }} item xs={12} sm={6}>
                  <span className="text-name">{params.row.name}</span>
                </Grid>
                <Grid style={{ marginLeft: "0.5rem" }} item xs={12} sm={6}>
                  <span className="text-name">{params.row.assignment}</span>
                </Grid>
              </Grid>
            </div>
          );
        },
      },
      ...(isEdit
        ? [
            {
              field: "joinDate",
              headerName: "Join-End Date",
              flex: 3.5,
              renderCell: (params) => {
                return (
                  <Grid container>
                    <Grid item xs={5.5}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          className="date-input-table"
                          format="DD/MM/YYYY"
                          defaultValue={dayjs(params.row.joinDate)}
                          onChange={(startJoinProject) => {
                            const newStartDate =
                              startJoinProject.format("YYYY-MM-DD");
                            const updatedListUser = editData.teamMember.map(
                              (u) => {
                                if (u.userId == params.row.id) {
                                  return { ...u, joinDate: newStartDate };
                                }
                                return u;
                              }
                            );

                            setEditData({
                              ...editData,
                              teamMember: updatedListUser,
                            });
                          }}
                          sx={{ paddingRight: "2px" }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={0.5}>
                      {" -"}
                    </Grid>
                    <Grid item xs={5.5}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          className="date-input-table"
                          format="DD/MM/YYYY"
                          defaultValue={dayjs(params.row.endDate)}
                          onChange={(endJoinProject) => {
                            const newEndDate =
                              endJoinProject.format("YYYY-MM-DD");
                            const updatedListUser = editData.teamMember.map(
                              (u) => {
                                if (u.userId == params.row.id) {
                                  return { ...u, endDate: newEndDate };
                                }
                                return u;
                              }
                            );

                            setEditData({
                              ...editData,
                              teamMember: updatedListUser,
                            });
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                );
              },
            },
            {
              field: "role",
              headerName: "Role",
              flex: 1.5,
              renderCell: (params) => {
                return (
                  <Grid item xs={12}>
                    <Autocomplete
                      freeSolo
                      name="roleProjectId"
                      options={roles}
                      defaultValue={params.row.dataSelect}
                      getOptionLabel={(option) => option.role}
                      onChange={(_event, newValue) => {
                        if (newValue) {
                          const updatedListUser = editData.teamMember.map(
                            (u) => {
                              if (u.userId == params.row.id) {
                                return { ...u, roleId: parseInt(newValue.id) };
                              }
                              return u;
                            }
                          );

                          setEditData((prevData) => ({
                            ...prevData,
                            teamMember: updatedListUser,
                          }));
                        }
                      }}
                      renderInput={(paramsInput) => (
                        <TextField
                          {...paramsInput}
                          name="roleProjectId"
                          placeholder="Select Role"
                          inputProps={{
                            ...paramsInput.inputProps,
                            style: {
                              height: "8px",
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                );
              },
            },
            {
              field: "action",
              headerName: "Action",
              flex: 0.7,
              renderCell: (params) => {
                return (
                  <IconButton
                    onClick={(e) => deleteMember(params.row.id)}
                    color="default"
                  >
                    <DeleteOutlineOutlined />
                  </IconButton>
                );
              },
            },
          ]
        : [
            {
              field: "joinDate",
              headerName: "Join-End Date",
              flex: 2,
            },
            {
              field: "role",
              headerName: "Role",
              flex: 1,
            },
          ]),
    ]);
  }, [isEdit, editData]);

  const [filter, setFilter] = useState({
    sortName: "role",
    sortType: "desc",
    search: "",
  });

  const onFilter = (dataFilter) => {
    setFilter({
      sortName:
        dataFilter.sorting.field !== "" ? dataFilter.sorting[0].field : "nip",
      sortType:
        dataFilter.sorting.sort !== "" ? dataFilter.sorting[0].sort : "desc",
      search: filter.search,
    });
  };

  const handleChangeSearch = (event) => {
    setFilter({
      ...filter,
      search: event.target.value.toLowerCase(),
    });
  };

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
      href: "/masterProject/detail",
      title: isEdit ? "Edit Project" : "Detail Project",
      current: true,
    },
  ];

  useEffect(() => {
    getProjectTypes();
    getOptRoles();
    getOptDataUser();
    getOptCompany();
    getDetailProject();
  }, [filter]);

  const navigate = useNavigate();
  const { setDataAlert } = useContext(AlertContext);

  const deleteMember = async (userId) => {
    let updatedSelected;
    setdataMember((prevSelected) => {
      updatedSelected = prevSelected.filter(
        (existingMember) => existingMember.id !== userId
      );
      return updatedSelected;
    });

    const updatedListUser = editData.teamMember.filter(
      (user) => user.userId != userId
    );

    const updatedDataUser = dataUser.filter((user) => user.id !== userId);

    const updatedValueUser = updatedSelected.map((member) => ({
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
    }));
    setValueUser(updatedValueUser);

    setDataDetail((prevData) => ({
      ...prevData,
      teamMember: updatedListUser,
    }));

    setDataUser(updatedDataUser);
  };

  const handleInvite = () => {
    methods.setValue('role', null)
    const newMembers = valueUser
      .filter(newUser => !dataMember.some(existingMember => newUser.id == existingMember.id))
      .map(newUser => ({
        id: parseInt(newUser.id),
        userId: parseInt(newUser.id),
        name: `${newUser.firstName} ${newUser.lastName}`,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        roleProjectId: newUser.roleProjectId,
        roleId: parseInt(newUser.roleSelect.id),
        nip: newUser.nip,
        assignment: newUser.position,
        joinDate: newUser.startJoin,
        endDate: newUser.endDate,
        dataSelect: newUser.roleSelect
      }))
      .filter(newMember => !dataMember.some(existingMember => newMember.id == existingMember.id));
  
    setSelectedMember(prevSelected => [...prevSelected, ...newMembers]);
  
    const updatedListUser = editData.teamMember
      .filter(existingMember => !newMembers.some(newMember => newMember.id === existingMember.id))
      .concat(newMembers.map((member, index) => ({
        no: editData.teamMember.length + index + 1,
        id: member.id,
        name: member.name,
        userId: parseInt(member.userId),
        roleId: parseInt(member.roleId),
        joinDate: member.joinDate,
        endDate: member.endDate,
      })));
  
    setEditData(prevData => ({
      ...prevData,
      teamMember: updatedListUser
    }));
    setIsInviteDisabled(true)
  }

  const updateData = [
    ...dataMember,
    ...selectedMember.map((row, index) => ({
      ...row,
      no: dataMember.length + index + 1,
    })),
  ];

  const DetailMemberData = [
    ...dataMember.map((row, index) => ({
      id: row.id,
      name: row.name,
      nip: row.nip,
      no: index + 1,
      role: row.role,
      dataSelect: {
        id: parseInt(row.roleId),
        role: row.role,
      },
      joinDate:
        dayjs(row.joinDate).format("DD/MM/YYYY") +
        "   -   " +
        dayjs(row.endDate).format("DD/MM/YYYY"),
    })),
  ];

  const getOptDataUser = async () => {
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/ol/teamMember?page=0&size=&sort=nip,asc&search=`,
    });
    const data = res.data.map((item) => ({
      id: item.id,
      positionId: item.attributes.positionId,
      nip: item.attributes.nip,
      firstName: item.attributes.firstName,
      lastName: item.attributes.lastName,
      userName: item.attributes.userName,
      photoProfile: item.attributes.photoProfile,
      position: item.attributes.position,
      assignment: item.attributes.assignment,
      active: item.attributes.active,
    }));
    setDataUser(data);
  };

  const getOptRoles = async () => {
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/ol/roleProject`,
    });
    const data = res.data.map((item) => ({
      id: item.id,
      role: item.attributes.role,
    }));
    setOptRoles(data);
  };

  const getOptCompany = async () => {
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/ol/companylistname`,
    });
    const data = res.data.map((item) => ({
      companyId: item.id,
      name: item.attributes.name,
    }));
    setOptCompany(data);
  };

  const getProjectTypes = async () => {
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/ol/projectType?search=`,
    });
    const data = res.data.map((item) => ({
      id: parseInt(item.id),
      name: item.attributes.name,
    }));
    setOptProjectType(data);
  };

  const cancelData = () => {
    setIsSave(false);
    setOpen(true);
  };

  const confirmSave = async () => {
    await schemacompany.validate(getValues(), {abortEarly:false})
    .then(()=>{
      setIsSave(true);
      setOpen(true);
      setEditData(editData);
    })
  };

  let methods = useForm({
    resolver: yupResolver(schemacompany),
    defaultValues: {
      projectName: "",
      picProjectName: "",
      picProjectPhone: "",
      projectType: "",
      projectDescription: "",
      initialProject: "",
    },
  });
  let {
    control,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
  } = methods;
  const handleClose = () => {
    if (!isSave) {
      setColumns([]);
      setIsEdit(false);
    }
    setOpen(false);
  };

  const onSave = async () => {
    setIsSaveLoading(true)
    const data = {
      companyId: editData.companyId,
      projectName: editData.projectName,
      picProjectName: editData.picProjectName,
      picProjectPhone: editData.picProjectPhone,
      projectDescription: editData.projectDescription,
      startDate: dayjs(editData.startDateProject).format("YYYY-MM-DD"),
      endDate: dayjs(editData.endDateProject).format("YYYY-MM-DD"),
      projectType: editData.projectTypeId,
      lastModifiedBy: currentUserId,
      initialProject: editData.initialProject,

      listUser: editData.teamMember.map((member) => {
        return {
          userId: member.userId,
          roleProjectId: parseInt(member.roleId),
          joinDate: dayjs(member.joinDate).format("YYYY-MM-DD"),
          endDate: dayjs(member.endDate).format("YYYY-MM-DD"),
        };
      }),
    };

    const id = localStorage.getItem("projectId");
    const res = await client.requestAPI({
      method: "PUT",
      endpoint: `/project/update-project/projectId=${id}`,
      data: data,
    });
    if (!res.isError) {
      setDataAlert({
        severity: "success",
        open: true,
        message: res.data.meta.message,
      });
      setTimeout(() => {
        navigate('/masterProject')
      }, 3000)
      setIsSaveLoading(false)
    } else {
      setDataAlert({
        severity: "error",
        message: res.error.detail,
        open: true
      })
      setIsSaveLoading(false)
    }
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    const { name, value } = event.target;
    const temp = { ...editData };
    if (name === "companyName") {
      temp.companyId = newValue;
    } else if (name === "projectType") {
      temp.projectTypeId = newValue;
    } else if (name === "memberInvite") {
      temp.teamMember.userId = newValue;
    } else if (name === "roleProjectId") {
      temp.teamMember.roleId = newValue;
    }
    setEditData(temp);
  };

  const getDetailProject = async () => {
    setLoading(true);
    const id = localStorage.getItem("projectId");
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/project/detail-project/projectId=${id}?search=${filter.search}&sort=${filter.sortName},${filter.sortType}`,
    });
    const formattedData = res.data.attributes.teamMember.map(
      (member, index) => ({
        id: member.userId.toString(),
        userId: parseInt(member.userId),
        no: index + 1,
        nip: member.nip,
        name: member.fullName,
        firstName: member.fullName.split(" ")[0],
        lastName: member.fullName.split(" ")[1],
        role: member.role,
        joinDate: member.joinDate,
        endDate: member.endDate,
        roleId: parseInt(member.roleId),
        dataSelect: {
          id: parseInt(member.roleId),
          role: member.role,
        },
        assignment: member.position,
      })
    );
    setValueUser(formattedData);
    setdataMember(formattedData);
    if (res) {
      setDataDetail(res.data.attributes);
      setLoading(false);
    }
  };

  const handleEditChange = (event, fieldName) => {
    const updatedEditData = { ...editData };
    if (fieldName === "companyName") {
      updatedEditData.companyName = event.target.value;
      updatedEditData.companyId = event.target.value;
    } else if (fieldName === "projectType") {
      updatedEditData.projectType = event.target.value;
      updatedEditData.projectTypeId = event.target.value;
    } else if (fieldName === "roleProjectId") {
      updatedEditData.teamMember.role = event.target.value;
      updatedEditData.teamMember.roleId = event.target.value;
    } else if (fieldName === "picProjectPhone") {
      const inputPhone = event.target.value.replace(/\D/g, "");
      updatedEditData.picProjectPhone = inputPhone;
      event.target.value = inputPhone;
    } else {
      updatedEditData[fieldName] = event.target.value;
    }
    setValue(fieldName, event.target.value);
    updatedEditData.teamMember = [...updateData];
    setEditData(updatedEditData);
  };

  const onChangeRole = (value) => {
    let temp = [];
    if (valueUser.length > 0) {
      temp = valueUser.map((res) => {
        return {
          ...res,
          roleId: value.id,
          roleSelect: value,
        };
      });
    }
    setValueUser(temp);
    setIsInviteDisabled(false);
  };

  return (
    <SideBar>
      <Breadcrumbs breadcrumbs={dataBread} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Header judul={isEdit ? "Edit Project" : "Detail Project"} />
        </Grid>
        {!isEdit && (
          <Grid item xs={12} sm={4} alignSelf="center" sx={{
            textAlign: {
              xs: 'start',
              sm: 'end'  
            }
          }}>
            <Button
              variant="outlined"
              className="button-text"
              startIcon={<EditOutlinedIcon />}
              onClick={() => setIsEdit(true)}
            >
              Edit Data Project
            </Button>
          </Grid>
        )}
        <Grid item xs={12}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(confirmSave)} noValidate>
              <div className="card-container-detail">
                <Grid container columnSpacing={1} rowSpacing={3.79}>
                  <Grid item xs={12} sm={6}>
                    {isEdit ? (
                      <FormInputText
                        focused
                        name="projectName"
                        value={editData.projectName || ""}
                        onChange={(e) => handleEditChange(e, "projectName")}
                        className="input-field-crud"
                        placeholder="e.g Project Internal 79"
                        label="Project Name"
                        required={true}
                        inputProps={{ maxLength: 100 }}
                      />
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            Project Name
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            {dataDetail.projectName}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {isEdit ? (
                      <FormControl fullWidth>
                        <Controller
                          name="companyId"
                          control={control}
                          render={({ field }) => (
                            <Autocomplete
                              name="companyId"
                              disablePortal
                              id="combo-box-demo"
                              options={company}
                              defaultValue={company.find((option) => option.name === dataDetail.companyName) || null}
                              getOptionLabel={(option) => option.name}
                              sx={{ width: "100%" }}
                              onChange={(_event, newValue) => {
                                handleChange({target: {name: "companyName",value: newValue ? newValue.companyId : null,},},newValue ? newValue.companyId : null);
                                field.onChange(newValue ? newValue.companyId : null);
                              }}
                              
                              isOptionEqualToValue={(option, value) => option.value === value.value}
                              renderInput={(params) => {
                                return(
                                <TextField
                                  {...params}
                                  label="Company Name *"
                                  placeholder="Select Company"
                                  InputLabelProps={{ shrink: true }}
                                  error={!!errors.companyId}
                                  helperText={errors.companyId ? errors.companyId.message : ''}
                                />
                              )}}
                            />
                          )}
                        />
                      </FormControl>
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            Company Name
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            {dataDetail.companyName}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {isEdit ? (
                      <FormInputText
                        focused
                        name="picProjectName"
                        value={editData.picProjectName || ""}
                        onChange={(e) => handleEditChange(e, "picProjectName")}
                        className="input-field-crud"
                        placeholder="e.g John Doe"
                        label="PIC Project Name *"
                        inputProps={{ required: true, maxLength: 100 }}
                      />
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            PIC Project Name
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            {dataDetail.picProjectName}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {isEdit ? (
                      <FormInputText
                        focused
                        name="picProjectPhone"
                        type="tel"
                        value={editData.picProjectPhone || ""}
                        onChange={(e) => handleEditChange(e, "picProjectPhone")}
                        className="input-field-crud"
                        placeholder="e.g 08123456789"
                        label="PIC Project Phone *"
                        inputProps={{
                          required: true,
                          maxLength: 15,
                          inputMode: "numeric",
                        }}
                      />
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            PIC Project Phone
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            {dataDetail.picProjectPhone}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {isEdit ? (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name="startDate"
                          control={control}
                          defaultValue={
                            dayjs(dataDetail.startDateProject) || null
                          }
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              label="Start Date Project *"
                              format="DD/MM/YYYY"
                              name={field.name}
                              sx={{ width: "100%" }}
                              value={dayjs(field.value)}
                              onChange={(startProjectDate) => {
                                setEditData({
                                  ...editData,
                                  startDateProject:
                                    startProjectDate.format("YYYY-MM-DD"),
                                });
                                field.onChange(
                                  startProjectDate.format("YYYY-MM-DD")
                                );
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
                            paddingY={"3px"}
                            paddingX={"13px"}
                          >
                            {errors.startDate.message}
                          </Typography>
                        )}
                      </LocalizationProvider>
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            Start Date Project
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            {dayjs(dataDetail.startDateProject).format(
                              "DD/MM/YYYY"
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {isEdit ? (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name="endDate"
                          control={control}
                          defaultValue={
                            dayjs(dataDetail.endDateProject) || null
                          }
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              label="End Date Project *"
                              format="DD/MM/YYYY"
                              name={field.name}
                              sx={{ width: "100%" }}
                              value={dayjs(field.value)}
                              onChange={(endProjectDate) => {
                                setEditData({
                                  ...editData,
                                  endDateProject:
                                    endProjectDate.format("YYYY-MM-DD"),
                                });
                                field.onChange(
                                  endProjectDate.format("YYYY-MM-DD")
                                );
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
                            paddingY={"3px"}
                            paddingX={"13px"}
                          >
                            {errors.endDate.message}
                          </Typography>
                        )}
                      </LocalizationProvider>
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            End Date Project
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            {dayjs(dataDetail.endDateProject).format(
                              "DD/MM/YYYY"
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {isEdit ? (
                      <FormInputText
                        focused
                        name="initialProject"
                        className="input-field-crud"
                        placeholder="e.g T-PR-WR-001"
                        label="Initial Project *"
                        value={editData.initialProject || ""}
                        onChange={(e) => handleEditChange(e, "initialProject")}
                        inputProps={{ maxLength: 20 }}
                      />
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            Initial Project
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            {dataDetail.initialProject}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {isEdit ? (
                      <FormControl fullWidth>
                        <Controller
                          name="projectType"
                          control={control}
                          render={({field}) => (
                            <Autocomplete
                              disablePortal
                              name="projectType"
                              id="combo-box-demo"
                              options={projectTypes}
                              defaultValue={ projectTypes.find( (option) => option.name === dataDetail.projectType ) || null }
                              getOptionLabel={(option) => option.name}
                              sx={{ width: "100%" }}
                              onChange={(_event, newValue) => {
                                handleChange({ target: { name: "projectType", value: newValue? newValue.id : null, }, }, newValue? newValue.id : null);
                                field.onChange(newValue? newValue.id : null);
                              }}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Project Type *"
                                  placeholder="Select Project Type"
                                  InputLabelProps={{ shrink: true }} 
                                  error={!!errors.projectType}
                                  helperText={errors.projectType ? errors.projectType.message : ''}
                                />
                              )}
                            />
                          )}
                        />
                      </FormControl>
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            Project Type
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            {dataDetail.projectType}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {isEdit ? (
                      <FormInputText
                        focused
                        name="projectDescription"
                        value={editData.projectDescription}
                        onChange={(e) =>
                          handleEditChange(e, "projectDescription")
                        }
                        className="input-field-crud"
                        placeholder="e.g Project internal for Working Reports Employee"
                        label="Project Description"
                        inputProps={{ maxLength: 255 }}
                        InputProps={{
                          maxLength: 255,
                          endAdornment: (
                            <InputAdornment position="end">
                              {editData.projectDescription ? editData.projectDescription.length:0}/255
                            </InputAdornment>
                          ),
                        }}
                      />
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            Project Description
                          </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ wordWrap: 'break-word' }}>
                          <Typography variant="inputDetail" style={{ whiteSpace: 'pre-wrap' }}>
                            {dataDetail.projectDescription}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {isEdit && (
                  <Grid
                    container
                    spacing={2}
                    justifyContent="flex-end"
                    mt={3.5}
                  >
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
                )}
              </div>
            </form>
          </FormProvider>
        </Grid>
        <Grid item container mt={2} xs={12}>
          <div className="card-container-detail">
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              marginBottom={2}
            >
              <Grid
                item
                sx={{
                  marginBottom: {
                    xs: "20px",
                    sm: "0px",
                  },
                }}
              >
                <Typography variant="inputDetail" fontSize={20}>
                  Teams Member
                </Typography>
              </Grid>
              {!isEdit && (
                <Grid item style={{ marginLeft: "auto" }}>
                  <SearchBar
                    placeholder="Nip, name, etc"
                    label="Search By"
                    onChange={handleChangeSearch}
                  />
                </Grid>
              )}
            </Grid>

            {isEdit && (
              <Grid item xs={12} mb={2}>
                <div className="card-project">
                  <Grid container rowSpacing={2} columnSpacing={1.25}>
                    <Grid item xs={12}>
                      <Typography variant="inputDetail" fontWeight="600">
                        Member Invite
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <Autocomplete
                        multiple
                        name="userId"
                        value={valueUser}
                        limitTags={2}
                        onChange={(_event, newValue) => {
                          setValueUser([...newValue]);
                          if (newValue) {
                            handleChange(
                              {
                                target: {
                                  name: "userId",
                                  value: newValue.userId,
                                },
                              },
                              newValue.firstName
                            );
                          }
                        }}
                        options={dataUser}
                        getOptionLabel={(option) =>
                          `${option.firstName} ${option.lastName}`
                        }
                        className="auto-custom"
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            focused
                            label="Invite by name"
                            placeholder="Search name"
                            className="input-field-crud bg-white auto-chips"
                          />
                        )}
                      ></Autocomplete>
                    </Grid>
                    <Grid item xs={12} sm={2.5}>
                      <Autocomplete
                        value={null}
                        disablePortal
                        name="role"
                        options={roles}
                        getOptionLabel={(option) => option.role}
                        onChange={(_event, newValue) => {
                          if (newValue) {
                            onChangeRole(newValue);
                          }
                        }}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField
                            focused
                            {...params}
                            label="Select Role *"
                            placeholder="Search Role"
                            className="blue-outline input-field-crud"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2.5}>
                      <Button
                        fullWidth
                        sx={{
                          minHeight: {
                            xs: "48px",
                            sm: "72px",
                          },
                        }}
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
            )}
            <Grid item xs={12}>
              <TableNative
                data={isEdit ? updateData : DetailMemberData}
                columns={columnsProject}
                onFilter={(dataFilter) => onFilter(dataFilter)}
                loading={loading}
              />
            </Grid>
          </div>
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
          <Button onClick={handleSubmit(onSave)}  variant="saveButton" disabled={isSaveloading}>
            {isSave ? (
              isSaveloading ? (
                <>
                  <CircularProgress size="14px" color="inherit" sx={{ marginRight: '4px' }} />
                  Loading...
                </>
              ) : (
                "Save Data"
              )
            ) : (
              "Back"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </SideBar>
  );
};

export default DetailProject;
