import React, { useEffect, useRef, useState } from "react";
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
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/en-gb";
import { cellStyle } from "./cellStyle";
const localizer = momentLocalizer(moment);

export default function BigCalendar({
  setOnClick,
  setIsViewTask,
  setIsViewOvertime,
  events,
  setWrIdDetail,
  isDataObtained,
  setIsDataObtained,
  updateFilterDates,
  filter,
  _onStatusHr,
  setonOtherUser,
  setIsViewAttendance,
  setDataAlert,
}) {
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [openOvertime, setOpenOvertime] = useState(false);
  const [fullWidth, _setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [wrId, setId] = useState({
    workingReportOvertimeId: null,
    absenceId: null,
    workingReportTaskId: null,
  });
  const [changeCurrentMonth, _setchangeCurrentMonth] = useState(false);
  const [_weekendDates, setWeekendDates] = useState([]);
  const [StartDate, setStartDate] = useState();
  const [EndDate, setEndDate] = useState();
  const [activeMonth, setActiveMonth] = useState(new Date());
  const [wrDate, setWrDate] = useState(null);
  const [dialogOpenHoliday, setDialogOpenHoliday] = useState(false);
  const [tanggalHoliday, setTanggalHoliday] = useState(null);
  const [descHoliday, setdescHoliday] = useState(null);
  const [_finalDateCalendar, setfinalDateCalendar] = useState();
  const [holiday, setHoliday] = useState(false);

  const ResetFilterRef = useRef(null);

  useEffect(() => {
    if (isDataObtained) {
      setActiveMonth(moment(filter.startDate).toDate());
    }
  }, [isDataObtained, StartDate]);

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

  function handleClose() {
    setOpen(false);
  }

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const createAllEvents = () => {
    const today = moment().startOf("day");
    let mappedEvents = [];

    events
      .filter((event) => moment(event.tanggal).isSameOrBefore(today, "day"))
      .forEach((event) => {
        let title = "";
        const eventDate = moment(event.tanggal);
        const threeDaysBeforeToday = moment().subtract(3, "days");
        const isExpired = eventDate.isBefore(threeDaysBeforeToday, "day");

        if (event.presenceName === null && event.holiday === false) {
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
          expiredDate: isExpired,
        };
        mappedEvents.push(attendance);

        if (event.overtime === true) {
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

        if (event.holiday === true) {
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
      const isNotCheckIn = event.title === "Attendance" && !event.expiredDate;
      const isCheckInButNotPresent =
        event.presenceName !== "Hadir" &&
        event.paramAttendance &&
        event.title !== "Attendance";
      const isHoliday = event.title === "Holiday";
      const isViewOvertime = event.title === "View Overtime";
      const isOvertime =
        (event.title === "Overtime" &&
          event.presenceName === "Hadir" &&
          event.task === true) ||
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
        if ((event.checkOut === null || !event.checkOut) && !event.holiday) {
          clickHere = () => {
            setDataAlert({
              open: true,
              severity: "error",
              message: "Please check out first",
            });
          };
        } else {
          clickHere = () => {
            setOpenOvertime(true);
            setId(event.workingReportOvertimeId);
            setWrDate(event.tanggal);
            setHoliday(event.holiday);
          };
        }
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

      return <Typography onClick={clickHere}>{event.title}</Typography>;
    },
  };

  const isHoliday = (date, events) => {
    return events.some((event) => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear() &&
        event.holiday
      );
    });
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

    const isHolidayDate = isHoliday(date, allEvents);
    const weekend = {
      sunday: 0,
      saturday: 6,
    };

    if (startDate !== null && isWithinRange) {
      if (
        date.getDay() === weekend.sunday ||
        date.getDay() === weekend.saturday ||
        isHolidayDate
      ) {
        return { className: "selected-weekend" };
      }
      return { className: "date-selected" };
    }
    if (
      date.getDay() === weekend.sunday ||
      date.getDay() === weekend.saturday ||
      isHolidayDate
    ) {
      return { className: "date-weekend" };
    }

    return {};
  };

  const eventStyle = (event) => {
    const defaultStyle = {
      backgroundColor: "transparent",
      opacity: 0.5,
      cursor: "not-allowed",
      color: "transparent",
    };
    const specificStyle = cellStyle[event.title] || {};
    const combinedStyle = {
      ...defaultStyle,
      ...specificStyle,
    };

    let finalStyle = {
      backgroundColor: combinedStyle.backgroundColor,
      borderRadius: "6px",
      margin: "0px auto 5px auto",
      cursor: combinedStyle.cursor,
      opacity: combinedStyle.opacity,
      width: "80%",
      display: "block",
      border: `1px solid ${combinedStyle.color}`,
      color: combinedStyle.color,
      textAlign: "center",
    };

    if (
      (((event.title === "Overtime" && event.task === true) ||
        event.title === "Task") &&
        event.presenceName === "Hadir") ||
      event.holiday === true
    ) {
      finalStyle = {
        ...finalStyle,
        opacity: 1,
        cursor: "pointer",
      };
    }

    if (event.title === "Attendance" && !event.expiredDate) {
      finalStyle = {
        ...finalStyle,
        cursor: "pointer",
        opacity: 1,
      };
    }

    return {
      style: finalStyle,
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
        events={events}
        updateFilterDates={updateFilterDates}
        setIsDataObtained={setIsDataObtained}
        setActiveMonth={setActiveMonth}
        setEndDateCall={setEndDate}
        setStartDateCall={setStartDate}
        setWeekendDates={setWeekendDates}
        setResetFilterRef={(ref) => {
          ResetFilterRef.current = ref;
        }}
      />
      <Calendar
        localizer={localizer}
        views={[Views.MONTH]}
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
        holiday={holiday}
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
