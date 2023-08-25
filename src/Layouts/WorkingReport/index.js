import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../Component/Sidebar";
// import Calendar from "../../Component/CalendarCustom";
import { Autocomplete, Avatar, Button, Card, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckinTime from "./CheckIn";
import Attendance from "./Attandence";
import Calendar from "../../Component/CalendarCustom";
import { useNavigate } from "react-router-dom";
import blanktable from '../../assets/blanktable.png'
import client from "../../global/client";
import moment from "moment/moment";
import { AlertContext } from "../../context";
import ViewTask from "./ViewTask";
import ViewOvertime from "../Overtime/detailEditOvertime";
import CheckOut from "./CheckOut";
import CreateOvertime from "../Overtime/createOvertime";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from "@mui/material/Box";
import { getWorkingReportExcelUrl, getWorkingReportPdfUrl } from "../../global/donwloadConfig";
import DownloadConfiguration from "../../Component/DownloadConfig";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function WorkingReport() {
  const [isCheckin, setIsCheckin] = useState(false);
  const [isViewTask, setIsViewTask] = useState(false);
  const [isViewOvertime, setIsViewOvertime] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [openOvertime, setOpenOvertime] = useState(false);
  const [isHr, setIsHr] = useState(false)  
  const [WrIdDetail, setWrIdDetail] = useState()
  const [dropMenu, setDropMenu] = useState(null)
  
  const open = dropMenu
  const handleClick = (event) => {
    setDropMenu(event.currentTarget)
  }
  
  const handleClose = () => {
    setDropMenu(null);
  };

  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const [filter, setFilter] = useState({
    startDate: new Date(y, m, 1),
    endDate: new Date(y, m + 1, 0),
  });
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataAttandance, setAttandance] = useState({
    isAttandance: false,
    dataPeriod: null,
  });
  const { setDataAlert } = useContext(AlertContext);
  const [downloadConfiguration, setDownloadConf] = useState({
    open: false
  })

  const [filteredNames, setFilteredNames] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [selectedUserDetail, setSelectedUserDetail] = useState(null)
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    console.log("WrIdDetail: ", WrIdDetail);
    localStorage.removeItem("companyId");
    let listRoles = localStorage.getItem("roles");
    let roles = JSON.parse(listRoles)
    
    for(let role of roles) {
      console.log(role.roleName);
      if(role.roleName == 'HRD') {
        setIsHr(true)
      }
    }

    if(isHr == false) {
      getData();
    }
  }, [filter], WrIdDetail);

  const getData = async (id = null) => {
    let endpoint = `/workingReport/${moment(filter.startDate).format("yyyy-MM-DD")}/${moment(filter.endDate).format("yyyy-MM-DD")}`;
    
    if(id !== null) {
      console.log('selected user id : ', id);
      endpoint += `/${id}`
    }else if(isHr == false) {
      endpoint += `/${currentUserId}`
    }

    console.log('this endpoint : ', endpoint);
    const res = await client.requestAPI({
      method: "GET",
      endpoint: endpoint,
    });
    if (!res.isError) {      
      rebuildData(res);
    } else {
      setDataAlert({
        severity: "error",
        message: res.error.detail,
        open: true,
      });
    }
  };

  const getDetailData = async (id) => {
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/users/employee/${id}`,
    });
    if (!res.isError) {
      console.log('res detail users : ', res.data);
      const data = {
        id: res.data.id,
        name: res.data.attributes.fullName,
        role: res.data.attributes.role.join(', '),
        email: res.data.attributes.email,
        photoProfile: res.data.attributes.photoProfile,
      };

      setSelectedUserDetail(data)
    } else {
      setDataAlert({
        severity: "error",
        message: res.error.detail,
        open: true,
      });
    }
  };

  // func for get download file excel or pdf
  const downloadFormatFile = (employeeId = 1, isExcell, url = '') => {
    // employeeId = this.state.role !== 'talent' ? this.state.selectedEmployee.employeeId : localStorage.getItem('employeeId');
    const start = moment(filter.startDate).format('yyyy-MM-DD')
    const end = moment(filter.endDate).format('yyyy-MM-DD');
    const link = document.createElement('a');
    link.href = isExcell ? getWorkingReportExcelUrl(employeeId, start, end, url) : getWorkingReportPdfUrl(employeeId, start, end, url);
    link.download = '';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(link.href);
  }

  const rebuildData = (resData) => {
    console.log("data: ", resData);
    let temp = [];
    temp = resData.data.map((value, index) => {
      return value.attributes.listDate.holiday
        ? {
            title: "Libur",
            date: moment(value.attributes.listDate.date).format("yyyy-MM-DD"),
            tanggal: moment(value.attributes.listDate.date).format(
              "yyyy-MM-DD"
            ),
            period: value.attributes.period,
            workingReportId: value.attributes.listDate.workingReportId,
            overtime: value.attributes.listDate.overtime,
          }
        : {
            period: value.attributes.period,
            tanggal: moment(value.attributes.listDate.date).format(
              "yyyy-MM-DD"
            ),
            workingReportId: value.attributes.listDate.workingReportId,
            task: value.attributes.listDate.task,
            overtime: value.attributes.listDate.overtime,
          };
    });
    console.log(temp);
    if(selectedUser == null){
      setData([])
    }
    setData([...temp]);
  };

  const onAttendence = (value) => {    
    console.log("attendance", value);
    if (value[0].workingReportId !== null) {
      setIsCheckin(true);
    }
    setAttandance({
      dataPeriod: value[0],
      isAttandance: true,
    });
    console.log(value[0]);
  };

  const renderCheckin = () => {
    let dom = null;
    if (isCheckin) {
      dom = (
        <CheckinTime
          setIsCheckin={(param) => {
            setIsCheckin(() => false);
          }}
        />
      );
    } else if (dataAttandance.isAttandance) {
      dom = (
        <Attendance
          dataPeriod={dataAttandance.dataPeriod}
          setIsCheckin={(param) => {            
            setIsCheckin(true);
          }}
        />
      );
    } else if (isCheckOut) {
      dom = <CheckOut />;
    } else if (isViewTask) {
      dom = (
        <ViewTask
          setIsCheckOut={() => {
            setIsViewTask(false);
            setIsCheckOut(true);
          }}          
          WrIdDetail={WrIdDetail}
        />
      );
    } else if (isViewOvertime) {
      dom = (
        <ViewOvertime
        WrIdDetail = {WrIdDetail}
        />
      )
    }
      else {
        console.log('data cal : ', data);
        {
          isHr ? (
            selectedUser == null ? (
              dom = (<Grid
                container
                item
                xs={12}
                minHeight="600px"
                alignContent="center"
                alignItems="center"
                display="flex"
                justifyContent="center"
                textAlign="center"
              >
                <Grid item xs={12} pb={3.75}>
                  <img src={blanktable} alt="blank-table" />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="noDataTable">
                    Sorry, the data you are looking for could not be found.
                  </Typography>
                </Grid>
              </Grid>)
            ) : (
              dom = (<Calendar
                setOnClick={(param) => {
                  const _data = data.filter(
                    (val) => val.tanggal === moment(param.date).format("yyyy-MM-DD")
                  );
                  onAttendence(_data);
                }}
                setIsViewTask={setIsViewTask}
                setIsViewOvertime={setIsViewOvertime}
                events={data}
                setWrIdDetail={setWrIdDetail}
              />)
            )
          ) : (
            dom = (<Calendar
              setOnClick={(param) => {
                const _data = data.filter(
                  (val) => val.tanggal === moment(param.date).format("yyyy-MM-DD")
                );
                onAttendence(_data);
              }}
              setIsViewTask={setIsViewTask}
              setIsViewOvertime={setIsViewOvertime}
              events={data}
              setWrIdDetail={setWrIdDetail}
            />)
          )
        }
        
      }
    return dom;
  };

  const openDownload = (open) => {
    setDownloadConf({
      open
    })
  }

  const handleDownloadPdf = () => {
    let id;
    if(selectedUser == null){
      id = currentUserId
    } else {
      id = selectedUser.id
    }
    downloadFormatFile(id, false, "/workingReport/download/pdf?userId=")
  }

  const handleDownloadExcel = () => {
    let id;
    if(selectedUser == null){
      id = currentUserId
    } else {
      id = selectedUser.id
    }
    downloadFormatFile(id, true, "/workingReport/download/toExcel?userId=")
  }

  const handleSearchChange = async (searchValue) => {

    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/users/userList?search=${searchValue}`,
    });

    console.log('response : ', res);
    
    const data = res.data.map(user => ({
      id: user.id,
      name: `${user.attributes.firstName} ${user.attributes.lastName}`,
      nip: user.attributes.nip
    }));
    
    console.log('data user search : ', data);
    setFilteredNames(data);
  };

  const handleOptionSelectUser = (event, value) => {
    const user = filteredNames.find(user => (`${user.name} - ${user.nip}` === value));
    console.log('value user :', value);
    if (user) {
      setSelectedUser(user)
      getDetailData(user.id)
      getData(user.id);
    }
  };

  return (
    <SideBar>
      <Grid container rowSpacing={2}>
        <Grid time xs={12}>
          <Card className="cardHeader">
            <Grid container p={2} alignContent="space-between" spacing={1}>
              <Grid item xs={0.1}>
                <div className="dividerHeader" />
              </Grid>
              <Grid item xs={8.4}>
                <Typography variant="headerCardMenu">{`Working Report`}</Typography>
              </Grid>
              <Grid item xs={2} display="flex" justifyContent="flex-end" alignItems="center">
                <Button
                  id="basic-button"
                  variant="contained"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  startIcon={<DownloadIcon style={{ fontSize: 16 }} />}
                  endIcon={<ArrowForwardIosIcon style={{ fontSize: 14 }} />}
                >
                  Download
                </Button>
                <Menu
                  id="basic-menu"
                  sx={{ marginTop: 0.5 }}
                  anchorEl={open}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={handleDownloadPdf}>Download as Pdf</MenuItem>
                  <MenuItem onClick={handleDownloadExcel}>Download as Excel</MenuItem>
                </Menu>
              </Grid>
              <Grid item display="flex" alignItems="center" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={openDownload}
                  startIcon={<SettingsIcon />}
                  sx={{ paddingY: 1 }}
                >
                  Settings
                </Button>
              </Grid>
              {isHr && (
              <> 
              <Grid item xs={4}>
                <Autocomplete
                  freeSolo
                  options={filteredNames.map(option => (`${option.name} - ${option.nip}`))}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Name, NIP, etc"
                      label="Search By"
                      onChange={(e) => handleSearchChange(e.target.value)}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchOutlinedIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  renderOption={(props, option) => (
                    <Box
                      onClick={(event) => handleOptionSelectUser(event, option)}
                    >
                      <Typography variant="body1" {...props} style={{ padding: '8px', marginLeft: '8px' }}>
                        {option}
                      </Typography>
                    </Box>
                  )}
                />
              </Grid>
              <Grid item xs={8}></Grid>
              </>
              )}
              <Grid item xs={1}>
                <Avatar variant="square" className="full-avatar" src={selectedUserDetail != null ? selectedUserDetail.photoProfile : ''} />
              </Grid>
              <Grid item xs={11}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="body2">Employee Details</Typography>
                  </Grid>
                  {isHr ? (
                    <>
                    <Grid item xs={4}>
                      <Typography>Name</Typography>
                      <Typography variant="drawerNameUser">
                        {selectedUserDetail == null ? "-" : selectedUserDetail.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>Role</Typography>
                      <Typography variant="drawerNameUser">{selectedUserDetail == null ? "-" : selectedUserDetail.role}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>Email</Typography>
                      <Typography variant="drawerNameUser">
                        {selectedUserDetail == null ? "-" : selectedUserDetail.email}
                      </Typography>
                    </Grid>
                  </>
                  ) : (
                    <>
                    <Grid container>
                      <Grid item xs={4}>
                        <Typography>Name</Typography>
                        <Typography variant="drawerNameUser">
                          ikiwprikitiw
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>Role</Typography>
                        <Typography variant="drawerNameUser">Dev Ops</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>Email</Typography>
                        <Typography variant="drawerNameUser">
                          ikiwprikitiw@gmail.com
                        </Typography>
                      </Grid>
                    </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography></Typography>
          {renderCheckin()}
        </Grid>
      </Grid>

      {/* <PopupTask selectedWrIdanAbsenceId={104} open={openTask} closeTask={() => setOpenTask(false)} /> */}
      <CreateOvertime open={openOvertime} closeTask={() => setOpenOvertime(false)} />
      <DownloadConfiguration {...downloadConfiguration} onClose={() => openDownload(false)} />
    </SideBar>
  );
}
