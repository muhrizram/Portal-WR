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
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
} from "@mui/material";
import "../../../App.css";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import FormInputText from "../../../Component/FormInputText";
import schemacompany from "../shema";
import client from "../../../global/client";
import uploadFile from "../../../global/uploadFile";
import CustomAlert from "../../../Component/Alert";
import TableNative from "../../../Component/DataTable/Native";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AlertContext } from '../../../context';

const DetailProject = () => {
  
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sendData, setData] = useState({});  
  const [isSave, setIsSave] = useState(false);
  const [dataUser, setDataUser] = useState([])
  const [roles, setOptRoles] = useState([])
  const [valueUser, setValueUser] = useState([]);
  const [company, setOptCompany] = useState([])
  const [projectTypes, setOptProjectType] = useState([])
  const [selectedMember, setSelectedMember] = useState([])
  const [dataProject, setDataProject] = useState([]);
  const [startProject, setStartProject] = useState()
  const [endProject, setEndProject] = useState()
  const [startJoin, setStartJoin] = useState()
  const [endJoin, setEndJoin] = useState()
  const { setDataAlert } = useContext(AlertContext)
  const [isEdit, setIsEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (isEdit) {
      setEditData(dataDetail);
    }
    console.log("INI EDEIT",editData)
  }, [dataDetail, isEdit]);

  const [dataMember, setdataMember] = useState([
    {
      id: 1,
      no: null,
      nip: "",
      name: "",
      joinDate: "",
      endDate: "",
      roleId: "",
    },
  ]);

  
  const setDate = (dateString) => {
    let Ubah = String(dateString)
    const [month, day, year] = Ubah.split("-");
    const currentDate = new Date();
    currentDate.setMonth(parseInt(month) - 1);
    currentDate.setDate(parseInt(day));
    currentDate.setFullYear(parseInt(year));
    return currentDate;
  }


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
      flex: 3,
      renderCell: (params) => {
        return (
          <Grid container columnSpacing={1} margin={2.5}>
            <Grid item xs={5.5}>
              {isEdit ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DemoContainer components={["DatePicker"]}> */}
                    <DatePicker
                      defaultValue={setDate(dataDetail.teamMember.joinDate) || null}
                      onChange={(startProjectData) => {
                        setStartProject(startProjectData.format("MM/DD/YYYY"));
                      }}
                      sx={{ width: "100%", paddingRight: "20px" }}
                    />
                  {/* </DemoContainer> */}
                </LocalizationProvider>
              ) : (
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="inputDetail">
                      {/* {dataDetail.teamMember.joinDate} */}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item xs={1} alignSelf="center" textAlign="center">
              <span>-</span>
            </Grid>
            <Grid item xs={5.5}>
              {isEdit ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DemoContainer components={["DatePicker"]}> */}
                    <DatePicker
                      value={setDate(dataDetail.teamMember.endDate) || null}
                      sx={{ width: "100%", paddingRight: "20px" }}
                    />
                  {/* </DemoContainer> */}
                </LocalizationProvider>
              ) : (
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="inputDetail">
                      {/* {dataDetail.teamMember.endDate} */}
                    </Typography>
                  </Grid>
                </Grid>
              )}
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
        field: "action",
        headerName: "Action",
        flex: 1,
      },
  ];


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
    // console.log("DATA PROJECT", sendData)
  }, [])


  const handleInvite = () => {
    const newMembers = [];
    for (const newUser of valueUser) {
      const customAddUser = {        
          id: newUser.id,
          positionId: newUser.positionId,
          nip: newUser.nip,
          name : newUser.firstName + ' ' +  newUser.lastName,
          photoProfile: newUser.photoProfile,
          position: newUser.position,
          assignment: newUser.assignment,
          active: newUser.active      
      }
      let exists = false;      
      for (const existingMember of selectedMember) {
        if (customAddUser.id === existingMember.id) {
          exists = true;
        }
      }
      if (!exists) {
        newMembers.push(customAddUser);
      }
    }        
    setSelectedMember((prevSelected) => [...prevSelected, ...newMembers])
    setValueUser([])    
  }
  const updateData = [...dataMember, ...selectedMember.map((row, index) => ({ ...row, no: dataMember.length + index +1  }))]

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
    setData(editData);
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
      setIsEdit(false);
    }
    setOpen(false);
  };
  const onSave = async () => {
    // setData(data)
    const data = {
      ...sendData,
    }
    console.log("DATA UPDATE", data)
    
    const id = localStorage.getItem('projectId')  
    const res = await client.requestAPI({
      method: 'PUT',
      endpoint: `/project/update-project/projectId=${id}`,
      data : data
    })
    console.log("res update", res)
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

  const handleChange = (event, newValue) => {
    const {name, value} = event.target
    const temp = {...editData}
    if(name === 'companyName'){
      temp.companyId = newValue
    } else if(name === 'projectType'){
      temp.projectType = newValue
    } else if(name === 'memberInvite'){
      temp.listUser.userId = newValue
    }

    setEditData(temp)
  }

  const getDetailProject = async () => {
    const id = localStorage.getItem('projectId')    
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/project/detail-project/projectId=${id}?size=5&page=0&sort=name,asc`
    })
    console.log("res detail", res)
    const formattedData = res.data.attributes.teamMember.map((member,index )=> ({
      id: member.userId,
      no: index + 1,
      nip: member.nip,
      name: member.fullName,
      joinDate: member.joinDate,
      assignment: member.position,
    }));
    
    setdataMember(formattedData);
    if (res) {
      setDataDetail(res.data.attributes)
    }    
  }

  const handleEditChange = (event, fieldName) => {
    const updatedEditData = { ...editData };
    updatedEditData[fieldName] = event.target.value;
    updatedEditData.teamMember = [...updateData];
    setEditData(updatedEditData);

    const updatedDataDetail = { ...dataDetail };
    updatedDataDetail[fieldName] = event.target.value;
    setDataDetail(updatedDataDetail)
  };

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
                        // value={dataDetail.projectName}
                        // onChange={(e) => handleChange(e)}
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
                        // value={dataDetail.picProjectName}
                        // onChange={(e) => handleChange(e)}
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
                        // value={dataDetail.picProjectPhone}
                        // onChange={(e) => handleChange(e)}
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
                            defaultValue={setDate(dataDetail.startDateProject) || null}
                            onChange={(startProjectData) => {
                              setStartProject(startProjectData.format("MM/DD/YYYY"));
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
                            {dataDetail.startDateProject}
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
                            value={setDate(dataDetail.endDate) || null}
                            label="End Date Project"
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
                            {dataDetail.endDateProject}
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
                        // value={dataDetail.initialProject}
                        // onChange={(e) => handleChange(e)}
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
                        // onChange={(e) => handleChange(e)}
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
                    <Grid item xs textAlign="right">
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
            {isEdit ? (<>
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
                                handleChange({target : { name : 'roleProjectId', value: newValue.id }},newValue.id)
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
                    {/* ))} */}
                  </Grid>
                  </>) : (<></>)}
            <Grid item xs={12}>
              <TableNative
                // data={dataMember}
                data={updateData}
                columns={columnsProject}
                // checkboxSelection={isEdit}
                // disableRowSelectionOnClick={isEdit}
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
