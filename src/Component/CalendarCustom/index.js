import React, { useEffect, useState } from "react";
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
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/en-gb";
import { important } from "polished";
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
  onStatusHr,
  setonOtherUser,
  setIsViewAttendance,
}) {
  console.log("Ini filter ", filter);
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
  // const [activeMonth, setActiveMonth] = useState(
  //   filter.startDate ? filter.startDate : new Date()
  // );
  const [activeMonth, setActiveMonth] = useState(new Date());
  const [wrDate, setWrDate] = useState(null);
  const [dialogOpenHoliday, setDialogOpenHoliday] = useState(false);
  const [tanggalHoliday, setTanggalHoliday] = useState(null);
  const [descHoliday, setdescHoliday] = useState(null);
  const [finalDateCalendar, setfinalDateCalendar] = useState();

  useEffect(() => {
    if (isDataObtained) {
      if (StartDate) {
        setActiveMonth(moment(StartDate).toDate());
      } else {
        setActiveMonth(moment(filter.startDate).toDate());
      }
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

  const tambahSatuHari = () => {
    if (EndDate) {
      const tanggalAwal = new Date(EndDate);
      tanggalAwal.setDate(tanggalAwal.getDate() + 1);

      const tanggalBaru = tanggalAwal.toISOString().split("T")[0];
      setfinalDateCalendar(tanggalBaru);
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

      return <Typography onClick={clickHere}>{event.title}</Typography>;
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

  const eventStyle = (event) => {
    let backgroundColor = "transparent";
    let opacity = 1;
    let cursor = "pointer";
    let color = "transparent";
    if (event.title === "Hadir") {
      cursor = "pointer";
      backgroundColor = "#F0F3FF";
      color = "#618AEA";
    } else if (event.title === "Sakit") {
      cursor = "pointer";
      backgroundColor = "#FBE9E7";
      color = "#FF5722";
    } else if (event.title === "Cuti") {
      cursor = "pointer";
      backgroundColor = "#E0F2F1";
      color = "#009688";
    } else if (event.title === "Izin") {
      backgroundColor = "#FCE4EC";
      cursor = "pointer";
      color = "#E91E63";
    } else if (event.title === "Overtime") {
      backgroundColor = "#FFF9F2";
      color = "#734011";
      if (event.presenceName === "Hadir" || event.holiday === true) {
        backgroundColor = "#FFF9F2";
        color = "#734011";
        cursor = "pointer";
        opacity = 1;
      }
    } else if (event.title === "View Overtime") {
      backgroundColor = "#FFF9F2";
      color = "#734011";
      cursor = "pointer";
      opacity = 1;
    } else if (event.title === "Attendance") {
      cursor = "pointer";
      backgroundColor = "#B1C5F6";
      opacity = 1;
      color = "#3267E3";
    } else if (event.title === "Task") {
      backgroundColor = "#F0F3FF";
      color = "#618AEA";
      if (event.presenceName === "Hadir") {
        cursor = "pointer";
        opacity = 1;
      }
    } else if (event.title === "Holiday") {
      cursor = "pointer";
      backgroundColor = "#FFF4F2";
      color = "#CB3A31";
      opacity = 1;
    }
    const eventStyle = {
      backgroundColor: backgroundColor,
      borderRadius: "6px",
      margin: "0px auto 5px auto",
      cursor: cursor,
      opacity: opacity,
      width: "80%",
      display: "block",
      border: `1px solid ${color}`,
      color: color,
      textAlign: "center",
    };
    return {
      style: eventStyle,
    };
  };

  const MOCK_EVENTS = [
    {
      id: 1,
      title: "Event 1",
      start: "2024-05-15T08:31:38",
      end: "2024-05-15T18:15:58",
      description:
        "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
      color: "#C97D60",
    },
    {
      id: 2,
      title: "Event 2",
      start: "2024-05-15T13:30:02",
      end: "2024-05-15T17:30:20",
      description:
        "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
      color: "green",
    },
  ];

  const concos = MOCK_EVENTS.map((event) => {
    // new Date(Y, M, D, H, MIN)
    return {
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      color: event.color,
    };
  });

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
      {/* <Calendar
        localizer={localizer}
        startAccessor={"start"}
        endAccessor={"end"}
        events={concos}
        style={{
          height: "1000px",
        }}
        eventPropGetter={(event) => {
          return {
            style: {
              backgroundColor: event.color,
              border: "1px solid black",
              color: "black",
              textAlign: "center",
            },
          };
        }}
        onSelectEvent={(event) => alert(event.title)}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
      /> */}

      {console.log(allEvents, "allEvents")}
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
