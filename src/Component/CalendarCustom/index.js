import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import scrollGridPlugin from "@fullcalendar/scrollgrid";
import interactionPlugin from "@fullcalendar/interaction";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import moment from "moment";
import PopupTask from "../../Layouts/WorkingReport/PopupTask";
import CreateOvertime from "../../Layouts/Overtime/createOvertime";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./calender.css";
import HolidayDialog from "../DialogHoliday";
import DateRangeCalendar from "../../Component/DateRangeCalendar";
import { styled } from "@mui/system";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/en-gb";
const localizer = momentLocalizer(moment);

export default function BigCalendar({
  setOnClick,
  setIsViewTask,
  setIsViewOvertime,
  events,
  setWrIdDetail,
  updateFilterDates,
  onStatusHr,
  setonOtherUser,
  setIsViewAttendance,
}) {
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [openOvertime, setOpenOvertime] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [wrId, setId] = useState({
    workingReportOvertimeId: null,
    absenceId: null,
    workingReportTaskId: null,
  });
  const [currentMonthYear, setCurrentMonthYear] = useState("");
  const [changeCurrentMonth, setchangeCurrentMonth] = useState(false);
  const [weekendDates, setWeekendDates] = useState([]);
  const [StartDate, setStartDate] = useState();
  const [EndDate, setEndDate] = useState();
  const [activeMonth, setActiveMonth] = useState(new Date());
  const [wrDate, setWrDate] = useState(null);
  const [dialogOpenHoliday, setDialogOpenHoliday] = useState(false);
  const [tanggalHoliday, setTanggalHoliday] = useState(null);
  const [descHoliday, setdescHoliday] = useState(null);
  const [finalDateCalendar, setfinalDateCalendar] = useState();

  useEffect(() => {
    const currentDate = new Date();
    const formattedMonthYear = moment(currentDate).format("MMMM YYYY");
    setCurrentMonthYear(formattedMonthYear);
    tambahSatuHari();
  }, [EndDate]);

  const navigateNextMonth = () => {
    setActiveMonth(moment(activeMonth).add(1, "month").toDate());
    updateFilterDates(moment(activeMonth).add(1, "month").toDate());
  };

  const navigatePreviousMonth = () => {
    setActiveMonth(moment(activeMonth).subtract(1, "month").toDate());
    updateFilterDates(moment(activeMonth).subtract(1, "month").toDate());
  };

  const navigateCurrent = () => {
    const currentDate = new Date();
    setActiveMonth(currentDate);
    updateFilterDates(moment(currentDate).toDate());
  };

  const CustomButton = styled(Button)(({ theme }) => ({
    textTransform: "none",
    padding: "6px 16px",
    fontSize: "14px",
    lineHeight: "100%",
    borderColor: "black",
    marginTop: "2vh",
    borderRadius: 6,
  }));

  const CustomButtonDisabledTask = styled(Button)(({ theme }) => ({
    textTransform: "none",
    padding: "6px 16px",
    fontSize: "14px",
    lineHeight: "100%",
    borderColor: "black",
    marginRight: "3vh",
    marginTop: "10vh",
    borderRadius: 6,
  }));

  const CustomButtonHoliday = styled(Button)(({ theme }) => ({
    textTransform: "none",
    fontSize: "14px",
    color: "#CB3A31",
    background: "#FFF4F2",
    borderColor: "black",
    marginTop: "9vh",
  }));

  const CustomButtonDisabledovertime = styled(Button)(({ theme }) => ({
    textTransform: "none",
    width: "40%",
    padding: "6px 16px",
    fontSize: "14px",
    lineHeight: "125%",
    borderRadius: "6px",
    borderColor: "black",
  }));

  function handleClose() {
    setOpen(false);
  }

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const tambahSatuHari = () => {
    if (EndDate) {
      const tanggalAwal = new Date(EndDate);
      tanggalAwal.setDate(tanggalAwal.getDate() + 1);

      const tanggalBaru = tanggalAwal.toISOString().split("T")[0];
      setfinalDateCalendar(tanggalBaru);
    }
  };

  const renderCalendar = (info) => {
    const currentDate = moment().startOf("day");
    const isWeekend = (date) => {
      const dayOfWeek = moment(date).day();
      return dayOfWeek === 0 || dayOfWeek === 6;
    };

    const datalibur = events.find(
      (val) =>
        val.holiday && val.tanggal === moment(info.date).format("yyyy-MM-DD")
    );

    const data = events.find(
      (val) => val.tanggal === moment(info.date).format("yyyy-MM-DD")
    );

    const finalDateCalendarMinusOneDay = moment(finalDateCalendar).subtract(
      1,
      "days"
    );
    const isDateInRange = moment(info.date).isBetween(
      StartDate,
      finalDateCalendarMinusOneDay,
      null,
      "[]",
      "days"
    );

    if (data) {
      return (
        <Grid
          container
          columnSpacing={4}
          sx={{ height: "10vh", display: "flex" }}
        >
          <Grid
            item
            xs={12}
            justifyContent="start"
            marginBottom={datalibur && isWeekend ? 10.5 : 7.5}
            marginLeft={2}
          >
            <Typography
              variant="h6"
              color={isWeekend(info.date) ? "error" : "#3393DF"}
            >
              {info.dayNumberText}
            </Typography>
          </Grid>
          <Grid item>
            {!info.isToday && (
              <Grid container sx={{ marginLeft: 2, display: "block" }}>
                <Grid marginBottom={1}>
                  {moment(info.date).isSameOrBefore(currentDate) &&
                  !data.workingReportTaskId &&
                  !data.task &&
                  !isWeekend(info.date) &&
                  !datalibur &&
                  !onStatusHr ? (
                    <Button
                      sx={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "#B1C5F6",
                        borderRadius: "8px",
                      }}
                      disabled={
                        finalDateCalendar !== undefined && !isDateInRange
                      }
                      variant="outlined-attedance"
                      onClick={() => {
                        setOnClick(info);
                      }}
                    >
                      Attendance
                    </Button>
                  ) : (
                    !datalibur &&
                    !isWeekend(info.date) &&
                    data.presenceName && (
                      <Button
                        sx={{
                          borderWidth: "1px",
                          borderStyle: "solid",
                          minWidth:
                            data.presenceName == "Hadir" ? "110%" : "150%",
                          borderColor:
                            data.presenceName == "Hadir" ||
                            data.presenceName == "Cuti"
                              ? "#B1C5F6"
                              : "#EEB4B0",
                          borderRadius: "8px",
                        }}
                        disabled={
                          finalDateCalendar !== undefined && !isDateInRange
                        }
                        variant={
                          data.presenceName == "Sakit"
                            ? "outlined-attedance-sick"
                            : data.presenceName == "Cuti"
                            ? "outlined-attedance-cuti"
                            : data.presenceName == "Izin"
                            ? "outlined-attedance-off"
                            : "outlined-attedance"
                        }
                        onClick={
                          data.presenceName != "Hadir"
                            ? () => {
                                setIsViewAttendance(true);
                                setWrIdDetail(data.workingReportTaskId);
                              }
                            : null
                        }
                      >
                        {data.presenceName}
                      </Button>
                    )
                  )}
                </Grid>
                <Grid>
                  {moment(info.date).isSameOrBefore(currentDate) &&
                  !onStatusHr ? (
                    <CustomButton
                      disabled={
                        (!isWeekend(info.date)
                          ? !datalibur
                            ? data.presenceName != "Hadir"
                            : false
                          : false) ||
                        (finalDateCalendar !== undefined && !isDateInRange)
                      }
                      variant={
                        data.overtime ? "outlined-overtime" : "outlined-warning"
                      }
                      sx={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "#EECEB0",
                        borderRadius: "8px",
                        marginBottom: "8px",
                      }}
                      onClick={
                        data.overtime == true
                          ? () => {
                              setId(data.workingReportOvertimeId);
                              setWrIdDetail(data.workingReportOvertimeId);
                              setIsViewOvertime(true);
                              setonOtherUser(true);
                            }
                          : () => {
                              setOpenOvertime(true);
                              setId(data.workingReportOvertimeId);
                              setWrDate(data.tanggal);
                            }
                      }
                    >
                      {data.overtime == true ? "View Overtime" : "Overtime"}
                    </CustomButton>
                  ) : (
                    moment(info.date).isSameOrBefore(currentDate) &&
                    onStatusHr &&
                    data.overtime && (
                      <CustomButton
                        disabled={
                          finalDateCalendar !== undefined && !isDateInRange
                        }
                        variant="outlined-overtime"
                        sx={{
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderColor: "#EECEB0",
                          borderRadius: "8px",
                          marginBottom: "8px",
                        }}
                        onClick={() => {
                          setId(data.workingReportOvertimeId);
                          setWrIdDetail(data.workingReportOvertimeId);
                          setIsViewOvertime(true);
                          setonOtherUser(true);
                        }}
                      >
                        {"View Overtime"}
                      </CustomButton>
                    )
                  )}
                </Grid>
                {isWeekend(info.date) || datalibur ? (
                  <Grid justifyContent="left">
                    {moment(info.date).isSameOrBefore(currentDate) ? (
                      <Button
                        variant="outlined-holiday"
                        onClick={() => {
                          setdescHoliday(data.descHoliday);
                          setTanggalHoliday(data.tanggal);
                          setDialogOpenHoliday(true);
                        }}
                        sx={{
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderColor: "#EEB4B0",
                          borderRadius: "8px",
                          marginTop: 0,
                        }}
                        disabled={
                          finalDateCalendar !== undefined && !isDateInRange
                        }
                      >
                        Holiday
                      </Button>
                    ) : (
                      <CustomButtonHoliday
                        variant="outlined-holiday"
                        onClick={() => {
                          setdescHoliday(data.descHoliday);
                          setTanggalHoliday(data.tanggal);
                          setDialogOpenHoliday(true);
                        }}
                        sx={{
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderColor: "#EEB4B0",
                          borderRadius: "8px",
                          marginTop: 6.5,
                        }}
                        disabled={
                          finalDateCalendar !== undefined && !isDateInRange
                        }
                      >
                        Holiday
                      </CustomButtonHoliday>
                    )}
                  </Grid>
                ) : data.workingReportTaskId && !onStatusHr ? (
                  <CustomButton
                    sx={{
                      marginTop: 0,
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: "#B1C5F6",
                      borderRadius: "8px",
                    }}
                    disabled={
                      data.presenceName != "Hadir" ||
                      (finalDateCalendar !== undefined && !isDateInRange)
                    }
                    variant={
                      data.presenceName != "Hadir"
                        ? "outlined"
                        : "outlined-task"
                    }
                    onClick={
                      data.task
                        ? () => {
                            setId({
                              workingReportTaskId: data.workingReportTaskId,
                              absenceId: data.absenceId,
                            });
                            setWrIdDetail(data.workingReportTaskId);
                            setIsViewTask(true);
                            setonOtherUser(true);
                          }
                        : () => {
                            setonOtherUser(true);
                            setOpenTask(true);
                            setId({
                              workingReportTaskId: data.workingReportTaskId,
                              absenceId: data.absenceId,
                            });
                          }
                    }
                  >
                    Task
                  </CustomButton>
                ) : data.task ? (
                  <CustomButton
                    sx={{ marginTop: 0 }}
                    disabled={
                      data.presenceName != "Hadir" ||
                      (finalDateCalendar !== undefined && !isDateInRange)
                    }
                    variant={
                      data.presenceName != "Hadir"
                        ? "outlined"
                        : "outlined-task"
                    }
                    onClick={() => {
                      setId({
                        workingReportTaskId: data.workingReportTaskId,
                        absenceId: data.absenceId,
                      });
                      setWrIdDetail(data.workingReportTaskId);
                      setIsViewTask(true);
                      setonOtherUser(true);
                    }}
                  >
                    Task
                  </CustomButton>
                ) : moment(info.date).isSameOrBefore(currentDate) ? (
                  <CustomButton
                    disabled
                    variant="outlined"
                    sx={{ marginTop: 0 }}
                  >
                    Task
                  </CustomButton>
                ) : (
                  <CustomButtonDisabledTask
                    disabled
                    variant="outlined"
                    sx={{ marginTop: 9.5 }}
                  >
                    Task
                  </CustomButtonDisabledTask>
                )}
              </Grid>
              // )
            )}
          </Grid>
          {data ? (
            <>
              <Grid
                item
                display="flex"
                justifyContent="left"
                sx={{
                  marginTop: "2vh",
                  flexDirection: "column",
                  marginLeft: 2,
                }}
              >
                {info.isToday &&
                !data.workingReportTaskId &&
                !isWeekend(info.date) &&
                !onStatusHr &&
                !datalibur ? (
                  <Button
                    sx={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: "#B1C5F6",
                      maxWidth: "90%",
                      borderRadius: "8px",
                      marginBottom: 2,
                    }}
                    disabled={finalDateCalendar !== undefined && !isDateInRange}
                    variant="outlined-attedance"
                    onClick={() => {
                      setOnClick(info);
                    }}
                  >
                    Attendance
                  </Button>
                ) : (
                  info.isToday &&
                  !datalibur &&
                  !isWeekend(info.date) &&
                  data.presenceName && (
                    <Button
                      sx={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor:
                          data.presenceName == "Hadir" ||
                          data.presenceName == "Cuti"
                            ? "#B1C5F6"
                            : "#EEB4B0",
                        borderRadius: "8px",
                      }}
                      disabled={
                        finalDateCalendar !== undefined && !isDateInRange
                      }
                      variant={
                        data.presenceName != "Hadir"
                          ? "outlined-attedance-sick"
                          : "outlined-attedance"
                      }
                      onClick={
                        data.presenceName != "Hadir"
                          ? () => {
                              setIsViewAttendance(true);
                              setWrIdDetail(data.workingReportTaskId);
                            }
                          : null
                      }
                    >
                      {data.presenceName}
                    </Button>
                  )
                )}
                {info.isToday && !onStatusHr ? (
                  <CustomButton
                    variant={
                      data.overtime == true
                        ? "outlined-overtime"
                        : "outlined-overtime-today"
                    }
                    sx={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: "#EECEB0",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                    disabled={
                      (!isWeekend(info.date)
                        ? !datalibur
                          ? data.presenceName != "Hadir"
                          : false
                        : false) ||
                      (finalDateCalendar !== undefined && !isDateInRange)
                    }
                    onClick={
                      data.overtime == true
                        ? () => {
                            setId(data.workingReportOvertimeId);
                            setWrIdDetail(data.workingReportOvertimeId);
                            setIsViewOvertime(true);
                          }
                        : () => {
                            setOpenOvertime(true);
                            setId(data.workingReportOvertimeId);
                            setWrDate(data.tanggal);
                          }
                    }
                  >
                    {data.overtime == true ? "View Overtime" : "Overtime"}
                  </CustomButton>
                ) : null}
                {info.isToday && !isWeekend(info.date) ? (
                  <Grid>
                    {data.workingReportTaskId ? (
                      <CustomButton
                        sx={{
                          marginTop: 0,
                          borderWidth: data.presenceName != "Hadir" ? 0 : "1px",
                          borderStyle: "solid",
                          borderColor: "#B1C5F6",
                          borderRadius: "8px",
                        }}
                        disabled={
                          data.presenceName != "Hadir" ||
                          (finalDateCalendar !== undefined && !isDateInRange)
                        }
                        variant={
                          data.presenceName != "Hadir"
                            ? "outlined"
                            : "outlined-task"
                        }
                        onClick={
                          data.task || onStatusHr
                            ? () => {
                                setId({
                                  workingReportTaskId: data.workingReportTaskId,
                                  absenceId: data.absenceId,
                                });
                                setWrIdDetail(data.workingReportTaskId);
                                setIsViewTask(true);
                              }
                            : () => {
                                setOpenTask(true);
                                setId({
                                  workingReportTaskId: data.workingReportTaskId,
                                  absenceId: data.absenceId,
                                });
                              }
                        }
                      >
                        Task
                      </CustomButton>
                    ) : moment(info.date).isSameOrBefore(currentDate) &&
                      !datalibur ? (
                      <CustomButton
                        disabled
                        variant="outlined"
                        sx={{ marginTop: 0 }}
                      >
                        Task
                      </CustomButton>
                    ) : datalibur ? (
                      <Button
                        variant="outlined-holiday"
                        onClick={() => {
                          setdescHoliday(data.descHoliday);
                          setTanggalHoliday(data.tanggal);
                          setDialogOpenHoliday(true);
                        }}
                        sx={{
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderColor: "#EEB4B0",
                          borderRadius: "8px",
                          marginTop: 0,
                        }}
                        disabled={
                          finalDateCalendar !== undefined && !isDateInRange
                        }
                      >
                        Holiday
                      </Button>
                    ) : (
                      <CustomButtonDisabledTask
                        disabled
                        variant="outlined"
                        sx={{ marginTop: 0 }}
                      >
                        Task
                      </CustomButtonDisabledTask>
                    )}
                  </Grid>
                ) : (
                  info.isToday &&
                  isWeekend(info.date) && (
                    <Grid justifyContent="left">
                      {moment(info.date).isSameOrBefore(currentDate) ? (
                        <Button
                          variant="outlined-holiday"
                          onClick={() => {
                            setdescHoliday(data.descHoliday);
                            setTanggalHoliday(data.tanggal);
                            setDialogOpenHoliday(true);
                          }}
                          sx={{
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "#EEB4B0",
                            borderRadius: "8px",
                            marginTop: 0,
                          }}
                          disabled={
                            finalDateCalendar !== undefined && !isDateInRange
                          }
                        >
                          Holiday
                        </Button>
                      ) : (
                        <CustomButtonHoliday
                          variant="outlined-holiday"
                          onClick={() => {
                            setdescHoliday(data.descHoliday);
                            setTanggalHoliday(data.tanggal);
                            setDialogOpenHoliday(true);
                          }}
                          sx={{
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "#EEB4B0",
                            borderRadius: "8px",
                            marginTop: 0,
                          }}
                          disabled={
                            finalDateCalendar !== undefined && !isDateInRange
                          }
                        >
                          Holiday
                        </CustomButtonHoliday>
                      )}
                    </Grid>
                  )
                )}
              </Grid>
            </>
          ) : null}
        </Grid>
      );
    }
  };

  const createAllEvents = () => {
    const today = moment().startOf("day");
    let mappedEvents = []; // Menginisialisasi mappedEvents sebagai array kosong

    events
      .filter((event) => moment(event.tanggal).isSameOrBefore(today, "day"))
      .forEach((event) => {
        let title = "";

        if (event.presenceName == null && event.holiday == false) {
          title = "Attendance";
        } else {
          title = event.presenceName;
        }

        const attendance = {
          ...event,
          paramAttendance: true,
          title: title,
          start: event.tanggal,
          end: event.tanggal,
        };
        mappedEvents.push(attendance);

        if (event.overtime == true) {
          title = "View Overtime";
        } else {
          title = "Overtime";
        }

        const overtime = {
          ...event,
          paramOvertime: true,
          title: title,
          start: event.tanggal,
          end: event.tanggal,
        };
        mappedEvents.push(overtime);

        if (event.holiday == true) {
          title = "Holiday";
        } else {
          title = "Task";
        }
        const task = {
          ...event,
          paramTask: true,
          title: title,
          start: event.tanggal,
          end: event.tanggal,
        };
        mappedEvents.push(task);
      });

    return mappedEvents;
  };

  const components = {
    event: ({ event }) => {
      let clickHere = null;
      const isNotCheckIn = event.title === "Attendance";
      const isCheckIn = event.title === "Hadir";
      const isCheckInButNotPresent =
        event.presenceName !== "Hadir" && event.paramAttendance;
      const isHoliday = event.title === "Holiday";
      const isViewOvertime = event.title === "View Overtime";
      const isOvertime =
        (event.title === "Overtime" && event.presenceName === "Hadir") ||
        event.holiday === true;
      const isTaskNotFilled =
        !event.task && event.title === "Task" && event.presenceName === "Hadir";
      const isTaskFilled = event.task && event.title !== "Hadir";

      if (isNotCheckIn) {
        clickHere = () => {
          setOnClick(event);
        };
      } else if (isCheckInButNotPresent) {
        clickHere = () => {
          setWrIdDetail(event.workingReportTaskId);
          setIsViewAttendance(true);
        };
      } else if (isHoliday) {
        clickHere = () => {
          setdescHoliday(event.descHoliday);
          setTanggalHoliday(event.tanggal);
          setDialogOpenHoliday(true);
        };
      } else if (isViewOvertime) {
        clickHere = () => {
          setId(event.workingReportOvertimeId);
          setWrIdDetail(event.workingReportOvertimeId);
          setIsViewOvertime(true);
          setonOtherUser(true);
        };
      } else if (isOvertime) {
        clickHere = () => {
          setOpenOvertime(true);
          setId(event.workingReportOvertimeId);
          setWrDate(event.tanggal);
        };
      } else if (isTaskNotFilled) {
        clickHere = () => {
          setOpenTask(true);
          setId({
            workingReportTaskId: event.workingReportTaskId,
            absenceId: event.absenceId,
          });
        };
      } else if (isTaskFilled) {
        clickHere = () => {
          setId({
            workingReportTaskId: event.workingReportTaskId,
            absenceId: event.absenceId,
          });
          setWrIdDetail(event.workingReportTaskId);
          setIsViewTask(true);
        };
      }

      return (
        <Typography
          sx={{ color: "white" }} // Menghilangkan background biru
          onClick={clickHere}
        >
          {event.title}
        </Typography>
      );
    },
  };

  const allEvents = createAllEvents();

  const filterDate = (date, { startDate, endDate }) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const startDay = new Date(startDate).getDate();
    const startMonth = new Date(startDate).getMonth();
    const startYear = new Date(startDate).getFullYear();
    const endDay = new Date(endDate).getDate();
    const endMonth = new Date(endDate).getMonth();
    const endYear = new Date(endDate).getFullYear();
    const isWithinRange =
      (year > startYear ||
        (year === startYear && month > startMonth) ||
        (year === startYear && month === startMonth && day >= startDay)) &&
      (year < endYear ||
        (year === endYear && month < endMonth) ||
        (year === endYear && month === endMonth && day <= endDay));

    if (startDate !== null && isWithinRange) {
      if (date.getDay() === 0 || date.getDay() === 6) {
        return { className: "selected-weekend" };
      }
      return { className: "date-selected" };
    }
    if (date.getDay() === 0 || date.getDay() === 6) {
      return { className: "date-weekend" };
    }

    return {};
  };

  const eventStyle = (event, start, end, isSelected) => {
    let backgroundColor = "transparent";
    let opacity = 0.2;
    if (event.title === "Hadir") {
      backgroundColor = "green";
    } else if (event.title === "Sakit") {
      backgroundColor = "red";
    } else if (event.title === "Cuti") {
      backgroundColor = "orange";
    } else if (event.title === "Izin") {
      backgroundColor = "yellow";
    } else if (event.title === "Overtime") {
      backgroundColor = "purple";
      if (event.presenceName === "Hadir" || event.holiday === true) {
        opacity = 1;
      }
    } else if (event.title === "View Overtime") {
      backgroundColor = "black";
      opacity = 1;
    } else if (event.title === "Attendance") {
      backgroundColor = "grey";
      opacity = 1;
    } else if (event.title === "Task") {
      backgroundColor = "yellow";
      if (event.presenceName === "Hadir") {
        opacity = 1;
      }
    } else if (event.title === "Holiday") {
      backgroundColor = "red";
      opacity = 1;
    }
    const style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: opacity,
      border: "none",
      color: "black",
      display: "block",
    };
    return {
      style,
    };
  };

  return (
    <Grid>
      {!changeCurrentMonth && (
        <div sx={{ position: { xs: "block", sm: "relative" } }}>
          <Grid
            sx={{
              position: { xs: "block", sm: "absolute" },
              margin: { sm: 4 },
            }}
          >
            <Grid
              display="flex"
              container
              alignItems="center"
              justifyContent="flex-start"
              sx={{ textAlign: { xs: "left", sm: "center" } }}
            >
              <Typography variant="TextBulankalender">
                {moment(activeMonth).format("MMMM YYYY")}
              </Typography>
              <Grid item>
                <IconButton color="primary" onClick={navigatePreviousMonth}>
                  <KeyboardArrowLeftIcon />
                </IconButton>
                <Button onClick={() => navigateCurrent()}>Today</Button>
                <IconButton color="primary" onClick={navigateNextMonth}>
                  <KeyboardArrowRightIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
      <DateRangeCalendar
        setchangeCurrentMonth={setchangeCurrentMonth}
        setEndDateCall={setEndDate}
        setStartDateCall={setStartDate}
        setWeekendDates={setWeekendDates}
      />
      <Calendar
        localizer={localizer}
        views={["month"]}
        events={allEvents}
        components={components}
        style={{ height: 1100 }}
        date={activeMonth}
        toolbar={false}
        dayPropGetter={(date) =>
          filterDate(date, { startDate: StartDate, endDate: EndDate })
        }
        eventPropGetter={eventStyle}
      />
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Employee Attendance</DialogTitle>
        <DialogContent>
          <DialogContentText className="TextBulankalender">
            Track and start your workday
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="max-width">Presence</InputLabel>
              <Select
                autoFocus
                value={maxWidth}
                onChange={handleMaxWidthChange}
                label="maxWidth"
                inputProps={{
                  name: "max-width",
                  id: "max-width",
                }}
              >
                <MenuItem value={false}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <CreateOvertime
        setSelectedWorkingReportId={wrId}
        open={openOvertime}
        closeTask={() => setOpenOvertime(false)}
        wrDate={wrDate}
      />
      <PopupTask
        selectedWrIdanAbsenceId={wrId}
        open={openTask}
        closeTask={() => setOpenTask(false)}
      />
      <HolidayDialog
        dialogOpen={dialogOpenHoliday}
        handleClose={() => setDialogOpenHoliday(false)}
        date={tanggalHoliday}
        titleHoliday={descHoliday}
      />
    </Grid>
  );
}
