import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../Component/Sidebar";
import Header from "../../Component/Header";
import {
  Autocomplete,
  Avatar,
  Button,
  Card,
  CircularProgress,
  Grid,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckinTime from "./CheckIn";
import Attendance from "./Attandence";
import ViewAttendanceScreen from "./DetailAttedance";
import BigCalendar from "../../Component/CalendarCustom";
import { useNavigate } from "react-router-dom";
import blanktable from "../../assets/blanktable.png";
import client from "../../global/client";
import moment from "moment/moment";
import { AlertContext } from "../../context";
import ViewTask from "./ViewTask";
import ViewOvertime from "../Overtime/detailEditOvertime";
import CheckOut from "./CheckOut";
import CreateOvertime from "../Overtime/createOvertime";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import {
  getWorkingReportExcelUrl,
  getWorkingReportPdfUrl,
} from "../../global/donwloadConfig";
import DownloadConfiguration from "../../Component/DownloadConfig";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LockIcon from "@mui/icons-material/Lock";
import { convertBase64 } from "../../global/convertBase64";
import Reset from "../Login/reset";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function WorkingReport() {
  const [isCheckin, setIsCheckin] = useState(false);
  const [isViewTask, setIsViewTask] = useState(false);
  const [isViewOvertime, setIsViewOvertime] = useState(false);
  const [ViewAttendance, setIsViewAttendance] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [openOvertime, setOpenOvertime] = useState(false);
  const [isHr, setIsHr] = useState(false);
  const [WrIdDetail, setWrIdDetail] = useState();
  const [dropMenu, setDropMenu] = useState(null);
  const [dataReadyAttedance, setdataReadyAttedance] = useState();
  const [AttendanceView, setAttendanceView] = useState(false);
  const [HrsetIdemployee, setHrsetIdemployee] = useState();
  const [onStatusHr, setonStatusHr] = useState(false);
  const [onOtherUser, setonOtherUser] = useState(false);
  const [StatusSearch, setStatusSearch] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [DataPresence, setDataPresence] = useState();
  const [isDataObtained, setIsDataObtained] = useState(false);

  const open = dropMenu;
  const handleClick = (event) => {
    setDropMenu(event.currentTarget);
  };

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
    open: false,
  });

  const [changePass, setChangePass] = useState(false);

  const [filteredNames, setFilteredNames] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState();
  const [userProfile, setUserProfile] = useState();
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    setonOtherUser(false);
    localStorage.removeItem("companyId");
    let listRoles = localStorage.getItem("roles");
    let roles = JSON.parse(listRoles);

    for (let role of roles) {
      if (role.roleName == "HRD") {
        setIsHr(true);
      }
    }
    getData();
  }, [filter, JSON.stringify(selectedUser)]);

  const updateStatusHr = (newValue) => {
    if (newValue === null) {
      setonStatusHr(false);
      setSelectedUser(null);
      setHrsetIdemployee(null);
    } else {
      const user = filteredNames.find(
        (user) => `${user.name} - ${user.nip}` === newValue
      );
      if (user) {
        setonStatusHr(true);
        setSelectedUser(user);
        getDetailData(user.id);
        setHrsetIdemployee(user.id);
      }
    }
  };

  const updateFilterDates = (newActiveMonth) => {
    const newEndDate = moment(newActiveMonth).endOf("month").toDate();
    const newStartDate = moment(newActiveMonth).startOf("month").toDate();
    setFilter({
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  const getData = async () => {
    let endpoint = `/workingReport/${moment(filter.startDate).format(
      "yyyy-MM-DD"
    )}/${moment(filter.endDate).format("yyyy-MM-DD")}`;
    const idUser = selectedUser ? selectedUser.id : currentUserId;
    endpoint += `/${idUser}`;
    const res = await client.requestAPI({
      method: "GET",
      endpoint: endpoint,
    });
    if (!res.isError) {
      rebuildData(res);
      setIsDataObtained(true);
    } else {
      setDataAlert({
        severity: "error",
        message: "Working Report Not Found",
        open: true,
      });
      setIsDataObtained(false);
    }

    const resUser = await client.requestAPI({
      method: "GET",
      endpoint: `/users/employee/${idUser}`,
    });
    if (!resUser.isError) {
      const data = {
        id: resUser.data.id,
        name: resUser.data.attributes.fullName,
        role: resUser.data.attributes.role.join(", "),
        email: resUser.data.attributes.email,
      };
      setUserProfile({ ...data });
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
      const data = {
        id: res.data.id,
        name: res.data.attributes.fullName,
        role: res.data.attributes.role.join(", "),
        email: res.data.attributes.email,
        photoProfile: res.data.attributes.photoProfile,
      };

      setSelectedUserDetail(data);
    } else {
      setDataAlert({
        severity: "error",
        message: res.error.detail,
        open: true,
      });
    }
  };

  const downloadFormatFile = (employeeId = 1, isExcel, url = "") => {
    setIsDownloading(true);
    const start = moment(filter.startDate).format("yyyy-MM-DD");
    const end = moment(filter.endDate).format("yyyy-MM-DD");
    const downloadUrl = isExcel
      ? getWorkingReportExcelUrl(employeeId, start, end, url)
      : getWorkingReportPdfUrl(employeeId, start, end, url);

    const fileName = `Timesheet - ${userProfile.name} - ${moment()
      .month(m)
      .format("MMMM")} ${y}.${isExcel ? "xlsx" : "pdf"}`;

    fetch(downloadUrl)
      .then((response) => {
        if (response.ok) {
          setIsDownloading(false);
          return response.blob();
        } else {
          setDataAlert({
            severity: "error",
            open: true,
            message: "Download failed!",
          });
        }
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        setDataAlert({
          severity: "error",
          open: true,
          message: error.message || "Download failed!",
        });
        setIsDownloading(false);
      });
  };

  const rebuildData = (resData) => {
    let temp = [];
    temp = resData.data.map((value, index) => {
      const isToday = moment(value.attributes.listDate.date).isSame(
        moment(),
        "day"
      );
      return value.attributes.listDate.holiday
        ? {
            title: "Libur",
            date: moment(value.attributes.listDate.date).format("yyyy-MM-DD"),
            tanggal: moment(value.attributes.listDate.date).format(
              "yyyy-MM-DD"
            ),
            period: value.attributes.period,
            workingReportOvertimeId:
              value.attributes.listDate.workingReportOvertimeId,
            workingReportTaskId: value.attributes.listDate.workingReportTaskId,
            overtime: value.attributes.listDate.overtime,
            holiday: value.attributes.listDate.holiday,
            isToday: isToday,
            descHoliday: value.attributes.listDate.descHoliday,
          }
        : {
            period: value.attributes.period,
            holiday: value.attributes.listDate.holiday,
            tanggal: moment(value.attributes.listDate.date).format(
              "yyyy-MM-DD"
            ),
            workingReportOvertimeId:
              value.attributes.listDate.workingReportOvertimeId,
            workingReportTaskId: value.attributes.listDate.workingReportTaskId,
            task: value.attributes.listDate.task,
            overtime: value.attributes.listDate.overtime,
            isToday: isToday,
            presenceName: value.attributes.listDate.presenceName,
          };
    });
    setData([...temp]);
  };

  const onAttendence = (value) => {
    if (
      value.workingReportTaskId !== null &&
      value.workingReportOvertimeId !== null
    ) {
      setIsCheckin(true);
    }
    setAttandance({
      dataPeriod: value,
      isAttandance: true,
    });
  };

  const renderCheckin = () => {
    let dom = null;
    if (isCheckin) {
      dom = (
        <CheckinTime
          dataPeriod={dataAttandance.dataPeriod}
          setIsCheckin={(param) => {
            setIsCheckin(() => false);
          }}
          DataPresence={DataPresence}
          dataReadyAttedance={dataReadyAttedance}
          beforeThanToday={dataAttandance.dataPeriod.isToday}
        />
      );
    } else if (dataAttandance.isAttandance) {
      dom = (
        <Attendance
          dataPeriod={dataAttandance.dataPeriod}
          setIsCheckin={(param) => {
            setIsCheckin(true);
          }}
          setAttendanceView={() => setAttandance({ isAttandance: false })}
          beforeThanToday={dataAttandance.dataPeriod.isToday}
          setdataReadyAttedance={setdataReadyAttedance}
          setDataPresence={setDataPresence}
        />
      );
    } else if (isCheckOut) {
      dom = (
        <CheckOut
          workingReportTaskId={WrIdDetail}
          setIsCheckOut={() => {
            setIsViewTask(true);
            setIsCheckOut(false);
          }}
        />
      );
    } else if (isViewTask) {
      dom = (
        <ViewTask
          setIsCheckOut={() => {
            setIsViewTask(false);
            setIsCheckOut(true);
          }}
          WrIdDetail={WrIdDetail}
          dataAll={data}
          onStatusHr={onStatusHr}
          setonOtherUser={setonOtherUser}
          setIsViewTask={() => setIsViewTask(false)}
          StatusSearch={StatusSearch}
        />
      );
    } else if (isViewOvertime) {
      dom = (
        <ViewOvertime
          WrIdDetail={WrIdDetail}
          onCloseViewOvertime={() => setIsViewOvertime(false)}
          onStatusHr={onStatusHr}
          setonOtherUser={setonOtherUser}
        />
      );
    } else if (ViewAttendance) {
      dom = (
        <ViewAttendanceScreen
          setIsViewAttendance={() => setIsViewAttendance()}
          WrIdDetail={WrIdDetail}
        />
      );
    } else {
      dom = (
        <BigCalendar
          setOnClick={(param) => {
            const _data = data.find(
              (val) =>
                val.tanggal === moment(param.tanggal).format("yyyy-MM-DD")
            );
            onAttendence(_data);
          }}
          setIsViewTask={setIsViewTask}
          setIsViewOvertime={setIsViewOvertime}
          events={data}
          setWrIdDetail={setWrIdDetail}
          setIsDataObtained={setIsDataObtained}
          isDataObtained={isDataObtained}
          filter={filter}
          updateFilterDates={updateFilterDates}
          onStatusHr={onStatusHr}
          setonOtherUser={setonOtherUser}
          setIsViewAttendance={setIsViewAttendance}
        />
      );
    }
    return dom;
  };

  const openDownload = (open) => {
    setDownloadConf({
      open,
    });
  };

  const handleDownloadPdf = () => {
    let id;
    if (selectedUser == null) {
      id = currentUserId;
    } else {
      id = selectedUser.id;
    }
    downloadFormatFile(id, false, "/workingReport/download/pdf?userId=");
  };

  const handleDownloadExcel = () => {
    let id;
    if (selectedUser == null) {
      id = currentUserId;
    } else {
      id = selectedUser.id;
    }
    downloadFormatFile(id, true, "/workingReport/download/toExcel?userId=");
  };

  const handleSearchChange = async (searchValue) => {
    let idvalue;
    if (searchValue != null) {
      setStatusSearch(true);
      idvalue = searchValue;
    } else {
      setStatusSearch(false);
      idvalue = userProfile.id;
    }
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/users/userList?search=${idvalue}`,
    });

    const data = res.data.map((user) => ({
      id: user.id,
      name: `${user.attributes.firstName} ${user.attributes.lastName}`,
      nip: user.attributes.nip,
    }));
    setFilteredNames(data);
  };

  const handleReset = () => {
    setChangePass(true);
  };

  return (
    <SideBar>
      <Grid container rowSpacing={2}>
        <Grid time xs={12}>
          <Card className="cardHeader">
            <Grid container p={2} alignContent={"space-between"} spacing={1}>
              <Grid item xs={12} sm={8.4}>
                <Header judul={"Working Report"} />
              </Grid>
              <Grid
                item
                xs={12}
                sm={2}
                display="flex"
                sx={{
                  justifyContent: { xs: "flex-start", sm: "flex-end" },
                  marginTop: { xs: 2, sm: 0 },
                }}
                alignItems="center"
              >
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
                  <MenuItem onClick={handleDownloadPdf}>
                    Download as Pdf
                  </MenuItem>
                  <MenuItem onClick={handleDownloadExcel}>
                    Download as Excel
                  </MenuItem>
                </Menu>
              </Grid>
              <Grid
                item
                xs={12}
                sm={1.2}
                display="flex"
                alignItems="center"
                sx={{
                  justifyContent: { xs: "flex-start", sm: "flex-end" },
                  marginTop: { xs: 2, sm: 0 },
                }}
              >
                <Button
                  variant="outlined"
                  onClick={openDownload}
                  startIcon={<SettingsIcon />}
                  sx={{ paddingY: 1 }}
                >
                  SETTINGS
                </Button>
              </Grid>
              {isHr && (
                <>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      marginY: { xs: 2 },
                    }}
                  >
                    <Autocomplete
                      disabled={onOtherUser}
                      freeSolo
                      options={filteredNames.map(
                        (option) => `${option.name} - ${option.nip}`
                      )}
                      onChange={(_event, newValue) => {
                        updateStatusHr(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Name, NIP, etc"
                          label="Search By"
                          onChange={(e) => {
                            handleSearchChange(e.target.value);
                          }}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchOutlinedIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                      renderOption={(props, option) => (
                        <Box key={`${option}-auto-user`}>
                          <Typography
                            variant="body1"
                            {...props}
                            style={{ padding: "8px", marginLeft: "8px" }}
                          >
                            {option}
                          </Typography>
                        </Box>
                      )}
                    />
                  </Grid>
                  <Grid item xs={0} sm={8}></Grid>
                </>
              )}
              <Grid item xs={4} sm={1}>
                <Avatar
                  variant="square"
                  className="full-avatar"
                  src={
                    userProfile != null
                      ? convertBase64(localStorage.getItem("photoProfile"))
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={11}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">Employee Details</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={5.25}
                    textAlign={{ xs: "left", sm: "right" }}
                    marginY={{ xs: 2, sm: 0 }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleReset}
                      startIcon={<LockIcon />}
                      sx={{ paddingY: 1 }}
                    >
                      CHANGE PASSWORD
                    </Button>
                  </Grid>
                  {isHr ? (
                    <>
                      <Grid item xs={12} sm={4} marginBottom={{ xs: 2, sm: 0 }}>
                        <Typography>Name</Typography>
                        <Typography variant="drawerNameUser">
                          {userProfile == null ? "-" : userProfile.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4} marginBottom={{ xs: 2, sm: 0 }}>
                        <Typography>Role</Typography>
                        <Typography variant="drawerNameUser">
                          {userProfile == null ? "-" : userProfile.role}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4} marginBottom={{ xs: 2, sm: 0 }}>
                        <Typography>Email</Typography>
                        <Typography variant="drawerNameUser">
                          {userProfile
                            ? userProfile.email
                              ? userProfile.email
                              : "-"
                            : "-"}
                        </Typography>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          marginBottom={{ xs: 2, sm: 0 }}
                        >
                          <Typography>Name</Typography>
                          <Typography variant="drawerNameUser">
                            {userProfile == null ? "-" : userProfile.name}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          marginBottom={{ xs: 2, sm: 0 }}
                        >
                          <Typography>Role</Typography>
                          <Typography variant="drawerNameUser">
                            {userProfile == null ? "-" : userProfile.role}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          marginBottom={{ xs: 2, sm: 0 }}
                        >
                          <Typography>Email</Typography>
                          <Typography variant="drawerNameUser">
                            {userProfile
                              ? userProfile.email
                                ? userProfile.email
                                : "-"
                              : "-"}
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

      <CreateOvertime
        open={openOvertime}
        closeTask={() => setOpenOvertime(false)}
      />
      <DownloadConfiguration
        {...downloadConfiguration}
        onClose={() => openDownload(false)}
      />
      <Reset open={changePass} onClose={() => setChangePass(false)} />
      <Dialog
        open={isDownloading}
        aria-labelledby="download-dialog"
        aria-describedby="download-dialog-description"
      >
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress size={50} color="primary" />
            <DialogContentText
              id="download-dialog-description"
              style={{ textAlign: "center", marginTop: 10 }}
            >
              Downloading...
            </DialogContentText>
          </div>
        </DialogContent>
      </Dialog>
    </SideBar>
  );
}
