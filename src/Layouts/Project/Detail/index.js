import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import "../../../App.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import FormInputText from "../../../Component/FormInputText";
import schemacompany from "../shema";
import client from "../../../global/client";
import TableNative from "../../../Component/DataTable/Native";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DeleteOutlineOutlined } from "@mui/icons-material";

const DetailProject = () => {
  
  const [open, setOpen] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [dataUser, setDataUser] = useState([])
  const [roles, setOptRoles] = useState([])
  const [valueUser, setValueUser] = useState([]);
  const [company, setOptCompany] = useState([])
  const [projectTypes, setOptProjectType] = useState([])
  const [selectedMember, setSelectedMember] = useState([])
  const [isEdit, setIsEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [editData, setEditData] = useState({});
  const [columnsProject, setColumns] = useState([])
  
  useEffect(() => {
    if (isEdit) {
      setEditData(dataDetail);
    }    
  }, [dataDetail, isEdit]);

  const [dataMember, setdataMember] = useState([
    {
      id: '',
      no: null,
      nip: "",
      name: "",
      joinDate: "",
      endDate: "",
      roleId: "",
      role: ""
    },
  ]);
  
  const deleteMember = async (e, index) => {
    e.preventDefault()
    const temp = {...editData}
    temp.teamMember.splice(index, 1)
    setEditData(temp)
  }

  useEffect(() => {
    setColumns([
    {
      field: "no",
      headerName: "No",
      flex: 0.3,
    },
    {
      field: "nip",
      headerName: "NIP",
      flex: 0.9,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1.5,
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
                <span className="text-name">{params.row.name}</span>
              </Grid>
              <Grid style={{ marginLeft: "0.5rem" }} item xs={6}>
                <span className="text-name">{params.row.position}</span>
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
            flex: 3,
            renderCell: (params) => {
              return (
                <Grid container>
                  <Grid item xs={5.5}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        className="date-input-table"
                        defaultValue={dayjs(dataDetail.teamMember.joinDate) || null}
                        onChange={(startJoinProject) => {
                          const newStartDate = startJoinProject.format("YYYY-MM-DD");
                          const updatedListUser = editData.teamMember.map(u => {
                            if (u.userId === params.row.id) {
                              return { ...u, joinDate: newStartDate };
                            }
                            return u;
                          });
  
                          setEditData({
                            ...editData,
                            teamMember: updatedListUser
                          });
  
                        }}
                        sx={{ paddingRight: "2px" }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={0.5}>
                    {' -'}
                  </Grid>
                  <Grid item xs={5.5}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        className="date-input-table"
                        defaultValue={dayjs(dataDetail.teamMember.endDate) || null}
                        onChange={(endJoinProject) => {
                          const newEndDate = endJoinProject.format("YYYY-MM-DD");
                          const updatedListUser = editData.teamMember.map(u => {
                            if (u.userId === params.row.id) {
                              return { ...u, endDate: newEndDate };
                            }
                            return u;
                          });
  
                          setEditData({
                            ...editData,
                            teamMember: updatedListUser
                          });
  
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              )
            },
          },
          {
            field: "role",
            headerName: "Role",
            flex: 1.5,
            renderCell: (params) => {
              console.log('params: ', params)
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
                        setEditData({
                          ...editData,
                          teamMember: editData.teamMember.map((member) =>
                            member.id === selectedMember.id
                              ? { ...member, roleId: newValue.id }
                              : member
                          ),
                        });
                      }
                    }}
                    renderInput={(paramsInput) => (
                      <TextField
                        {...paramsInput}
                        name="roleProjectId"
                        label="Select Role"
                        inputProps={{
                          ...paramsInput.inputProps,
                          style: {
                            height: '8px',
                          },
                        }}
                        InputLabelProps={{
                          ...paramsInput.InputLabelProps,
                          style: {
                            marginTop: '-8px',
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
                  onClick={(e) => deleteMember(e)}
                  color="default"
                >
                  <DeleteOutlineOutlined />
                </IconButton>
              )
            }
          },
        ]
      : [
          {
            field: "joinandEndDate",
            headerName: "Join-End Date",
            flex: 2,
          },
          {
            field: "role",
            headerName: "Role",
            flex: 1.5,
          },
        ]
      ),
      ]
    )
    console.log('isEdit: ', isEdit)
  }, [isEdit])


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
    getProjectTypes()
    getOptRoles()
    getOptDataUser()
    getOptCompany()
    getDetailProject()    
  }, [])


  const handleInvite = () => {
    const newMembers = [];
    for (const newUser of valueUser) {
      const customAddUser = {        
          id: parseInt(newUser.id),
          userId: parseInt(newUser.id),
          roleProjectId: newUser.roleProjectId,
          nip: newUser.nip,
          position: newUser.position,
          joinDate: newUser.startJoin,
          endDate: newUser.endDate,   
      }
      let exists = false;      
      for (const existingMember of selectedMember) {
        if (customAddUser.id === existingMember.id) {
          exists = true;
        }
      }
      if (!exists) {
        newMembers.push(customAddUser)
        // editData.teamMember.push(customAddUser);
      }
    }
    setSelectedMember((prevSelected) => [...prevSelected, ...newMembers])
    // setValueUser([])    


    const updatedListUser = [...editData.teamMember, ...newMembers.map((member, index) => ({
      no: index + 1,
      id: member.id,
      userId: member.userId,
      roleProjectId: member.roleProjectId,
      joinDate: member.joinDate,
      endDate: member.endDate
    }))];

    
    setEditData(prevData => ({
      ...prevData,
      teamMember: updatedListUser
    }));
    delete editData.teamMember
  }

  const updateData = [...dataMember, ...selectedMember.map((row, index) => ({
    ...row,
    no: dataMember.length + index +1,
  }))]

  const DetailMemberData = [...dataMember.map((row, index) => ({
    // ...row,
    id : row.id,
    name: row.name,
    nip: row.nip,
    no: index +1,
    role: row.role,
    dataSelect: {
      id: row.roleId.toString(),
      role: row.role
    },
    joinandEndDate: (dayjs(row.joinDate).format('YYYY-MM-DD')) + '   -   ' + (dayjs(row.endDate).format('YYYY-MM-DD')),
  }))]

  const getOptDataUser = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/ol/teamMember?page=0&size=5&sort=nip,asc&search=`
    })
    const data = res.data.map(item => ({
      id : item.id,
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

  const confirmSave = async (data) => {
    setIsSave(true);
    setOpen(true);
    setEditData(editData)
  };

  let methods = useForm({
    resolver: yupResolver(schemacompany),
    defaultValues: {
      projectName: '',
      companyName: '',
      picProjectName: '',
      picProjectPhone: '',
      projectType: '',
      projectDescription: '',
      initialProject: ''
    },
  });

  const handleClose = () => {
    if (!isSave) {
      setColumns([])
      setIsEdit(false);
    }
    setOpen(false);
  };
  const onSave = async () => {
    // setData(data)
    const data = {
      companyId: editData.companyId,
      picProjectName: editData.picProjectName,
      picProjectPhone: editData.picProjectPhone,
      projectDescription : editData.projectDescription,
      startDate : editData.startDateProject,
      endDate : editData.endDateProject,
      projectType : editData.projectType,
      lastModifiedBy: parseInt(localStorage.getItem("userId")),
      initialProject : editData.initialProject,
      projectName: editData.projectName,
      
      listUser: editData.teamMember.map(member => {
        return {
          userId: member.userId,
          roleProjectId: member.roleId,
          joinDate: member.joinDate,
          endDate: member.endDate
        };
      })
    }
    
    // const id = localStorage.getItem('projectId')  
    // const res = await client.requestAPI({
    //   method: 'PUT',
    //   endpoint: `/project/update-project/projectId=${id}`,
    //   data : data
    // })
    // console.log("res update", res)
    // if (!res.isError) {
    //   setDataAlert({
    //     severity: 'success',
    //     open: true,
    //     message: res.data.meta.message
    //   })
    //   setTimeout(() => {
    //     navigate('/masterProject')
    //   }, 3000)
    // } else {
    //   setDataAlert({
    //     severity: 'error',
    //     message: res.error.detail,
    //     open: true
    //   })
    // }
    // setOpen(false);
  };

  const handleChange = (event, newValue) => {
    const {name, value} = event.target
    delete editData.projectTypeId
    const temp = {...editData}
    if(name === 'companyName'){
      temp.companyId = newValue
    } else if(name === 'projectType'){
      temp.projectType = newValue
    } else if(name === 'memberInvite'){
      temp.teamMember.userId = newValue
    } else if(name === 'roleProjectId'){
      temp.teamMember.roleId = newValue
    }
    setEditData(temp)
  }

  const getDetailProject = async () => {
    const id = localStorage.getItem('projectId')    
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/project/detail-project/projectId=${id}?size=5&page=0&sort=name,asc`
    })
    const formattedData = res.data.attributes.teamMember.map((member,index )=> ({
      id: member.userId.toString(),
      no: index + 1,
      nip: member.nip,
      name: member.fullName,
      // if want to input default value auto complete member
      // firstName: member.fullName.split(' ')[0],
      // lastName: member.fullName.split(' ')[1]
      role: member.role,
      roleId: member.roleId,
      joinDate: member.joinDate,
      endDate: member.endDate,
      roleId: member.roleId,
      dataSelect: {
        id: member.roleId.toString(),
        role: member.role
      },
      assignment: member.position,
    }));
    // if want to input default value auto complete member
    // setValueUser(formattedData)
    setdataMember(formattedData);
    if (res) {
      setDataDetail(res.data.attributes)
    }    
  }

  const handleEditChange = (event, fieldName) => {
    const updatedEditData = { ...editData };
    if (fieldName === 'companyName') {
      updatedEditData.companyName = event.target.value;
      updatedEditData.companyId = event.target.value;
    } else if (fieldName === 'projectType') {
      updatedEditData.projectType = event.target.value;
      updatedEditData.projectTypeId = event.target.value;
    } else if (fieldName === 'roleProjectId') {
      updatedEditData.teamMember.role = event.target.value;
      updatedEditData.teamMember.roleId = event.target.value;
    } else {
      updatedEditData[fieldName] = event.target.value;
    }
    updatedEditData.teamMember = [...updateData];
    setEditData(updatedEditData);

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
  }

  return (
    <SideBar>
      <Breadcrumbs breadcrumbs={dataBread} />
      <Grid container>
        <Grid item xs={8} pb={2}>
          <Header judul={isEdit ? "Edit Project" : "Detail Project"} />
        </Grid>
        {!isEdit && (
          <Grid item xs={4} alignSelf="center" textAlign="end">
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
            <form onSubmit={methods.handleSubmit()}>
              <div className="card-container-detail">
                <Grid
                  item
                  container
                  columnSpacing={3.79}
                  rowSpacing={3.79}
                  xs={12}
                >
                  <Grid item xs={6}>
                    {isEdit ? (
                      <FormInputText
                        focused
                        name="projectName"
                        value={editData.projectName || ""}
                        onChange={(e) => handleEditChange(e, "projectName")}
                        className="input-field-crud"
                        placeholder="e.g PT. ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                        label="Project Name"
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
                  <Grid item xs={6}>
                    {isEdit ? (
                      <FormControl fullWidth>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={company}
                          defaultValue={company.find((option) => option.name === dataDetail.companyName) || null}
                          getOptionLabel={(option) => option.name}
                          sx={{ width: "100%" }}
                          onChange={(_event, newValue) => {
                            if (newValue) {
                              handleChange({ target: { name: 'companyName', vaue: newValue.companyId} }, newValue.companyId);
                            }
                          }}
                          
                          isOptionEqualToValue={(option, value) => option.value === value.value}
                          renderInput={(params) => (
                            <TextField {...params} label="Company Name" />
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
                  <Grid item xs={6}>
                    {isEdit ? (
                      <FormInputText
                        focused
                        name="picProjectName"
                        value={editData.picProjectName || ""}
                        onChange={(e) => handleEditChange(e, "picProjectName")}
                        className="input-field-crud"
                        placeholder="e.g Selfi Muji Lestari"
                        label="PIC Project Name"
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
                  <Grid item xs={6}>
                    {isEdit ? (
                      <FormInputText
                        focused
                        name="picProjectPhone"
                        value={editData.picProjectPhone || ""}
                        onChange={(e) => handleEditChange(e, "picProjectPhone")}
                        className="input-field-crud"
                        placeholder="e.g PT. Jalan Gatot Subroto no 122"
                        label="PIC Project Phone"
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
                  <Grid item xs={6}>
                    {isEdit ? (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="Start Date Project"
                            defaultValue={dayjs(dataDetail.startDateProject) || null}
                            onChange={(startProjectData) => {
                              setEditData({
                                ...editData,
                                startDateProject: startProjectData.format("YYYY-MM-DD")
                              });
                            }}
                            sx={{ width: "100%", paddingRight: "20px" }}
                          />
                        </DemoContainer>
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
                            {dayjs(dataDetail.startDateProject).format('YYYY-MM-DD')}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {isEdit ? (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="End Date Project"
                            defaultValue={dayjs(dataDetail.endDateProject) || null}
                            onChange={(endProjectDate) => {
                              setEditData({
                                ...editData,
                                endDateProject: endProjectDate.format("YYYY-MM-DD")
                              });
                            }}
                            sx={{ width: "100%", paddingRight: "20px" }}
                          />
                        </DemoContainer>
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
                            {dayjs(dataDetail.endDateProject).format('YYYY-MM-DD')}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {isEdit ? (
                      <FormInputText
                        focused
                        name="initialProject"
                        className="input-field-crud"
                        placeholder="e.g Selfi Muji Lestari"
                        label="PIC Project Name"
                        value={editData.initialProject || ""}
                        onChange={(e) => handleEditChange(e, "initialProject")}
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
                  <Grid item xs={6}>
                    {isEdit ? (
                      <FormControl fullWidth>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={projectTypes}
                          defaultValue={projectTypes.find((option) => option.name === dataDetail.projectType) || null}
                          getOptionLabel={(option) => option.name}
                          sx={{ width: "100%" }}
                          onChange={(_event, newValue) => {
                            if(newValue){
                              handleChange({target : { name : 'projectType', value: newValue.id }},newValue.id)
                            }
                          }}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          renderInput={(params) => (
                            <TextField {...params} label="Project Type" />
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
                          <Typography variant="inputDetail">{dataDetail.projectType}</Typography>
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
                        onChange={(e) => handleEditChange(e, "projectDescription")}
                        className="input-field-crud"
                        placeholder="e.g PT. Jalan Gatot Subroto no 122"
                        label="Project Description"
                      />
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            Project Description
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            {dataDetail.projectDescription}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {isEdit && (
                  <Grid item container xs={12} justifyContent="end" mt={3.5}>
                    <Grid item textAlign="right">
                      <Button
                        style={{ marginRight: "16px" }}
                        variant="cancelButton"
                        onClick={() => cancelData()}
                      >
                        Cancel Data
                      </Button>
                      <Button variant="saveButton" type="submit"
                        onClick={confirmSave}>
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
            <Grid item xs={12} mb={3}>
              <Typography variant="inputDetail">Teams Member</Typography>
            </Grid>
            {isEdit && (
              <Grid item xs={12} mb={2}>
                {/* {sendData.teamMember.map((res, index) => ( */}
                <div className='card-project' >
                  <Grid container rowSpacing={2} columnSpacing={1.25}>
                    <Grid item xs={12}>
                      <Typography variant="inputDetail" fontWeight="600">Member Invite</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Autocomplete
                        multiple
                        name="userId"
                        value={valueUser}
                        limitTags={2}
                        onChange={(_event, newValue) => {
                          setValueUser([...newValue])
                          if(newValue){
                            handleChange({target : { name : 'userId', value: newValue.userId }},newValue.firstName)
                          }
                        }}
                        options={dataUser}
                        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
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
                        name="roleProjectId"
                        options={roles}
                        getOptionLabel={(option) => option.role}
                        onChange={(_event, newValue) => {
                          if(newValue){
                            onChangeRole(newValue)
                          }
                        }}
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
              </Grid>
            )}
            <Grid item xs={12}>
              <TableNative
                data={isEdit ? updateData : DetailMemberData}
                columns={columnsProject}
                getRowId={(params) => { return params.id }}
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
          <Button onClick={onSave} variant="saveButton">
            {isSave ? "Save Data" : "Back"}
          </Button>
        </DialogActions>
      </Dialog>
    </SideBar>
  );
};

export default DetailProject;
