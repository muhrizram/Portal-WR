import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import moment from "moment";
import PopupTask from "../../Layouts/WorkingReport/PopupTask";
import ViewTask from "../../Layouts/WorkingReport/ViewTask";
import { useNavigate } from "react-router";
import CreateOvertime from "../../Layouts/Overtime/createOvertime";
import client from "../../global/client";


export default function Calendar({ setOnClick, setIsViewTask, setIsViewOvertime, events, setSelectedWorkingReportId, setWrIdDetail }) {
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [openOvertime, setOpenOvertime] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [wrId, setId] = useState({"workingReportId": null , "AbsenId": null})
  const [goDetail,setgoDetail] = useState(false)
  const [openDetailOvertime,setopenDetailOvertime] = useState(false)

  const navigate = useNavigate();

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
    console.log("dataEvent", eventInfo);
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

  const cekData = async (cekWr) => {         
      const res = await client.requestAPI({
        method: "GET",
        endpoint: `/task/detail?wrId=${cekWr}`
      });      
      if(res.status == "400 BAD_REQUEST"){
        console.log("data kosong")
        setgoDetail(false)
      }else{
        console.log("data ada")
        setgoDetail(true)
      }    
    }

  const renderCalendar = (info) => {
    const data = events.filter(
      (val) => val.tanggal === moment(info.date).format("yyyy-MM-DD")
    );
    
    if (data.length > 0) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" justifyContent="right">
            <Typography variant="h6">{info.dayNumberText}</Typography>
          </Grid>         
          <Grid item xs={12} display="flex" justifyContent="left">
            {info.isToday ? (              
                <Button variant="outlined" onClick={() => setOnClick(info)}>
                  Attendance
                </Button>             
              ) : (data[0].workingReportId == null ? (
                <>
                <Button disabled variant="outlined" >
                  task
                </Button>
              </>
              ) : null )
              }
          </Grid>     
          <Grid item xs={12} display="flex" justifyContent="left">
          {info.isToday ? (
            <Button
              disable={!data[0].workingReportId}
              variant="outlined"
              onClick={
                data[0].task
                  ? () => {                      
                    setId({
                      workingReportId: data[0].workingReportId,
                      absenceId: data[0].absenceId,
                    });
                    setWrIdDetail(data[0].workingReportId);                    
                    setIsViewTask(true);
                    setOpenTask(true);
                    }
                  : () => {
                    setOpenTask(true);
                    setId({
                        workingReportId: data[0].workingReportId,
                        absenceId: data[0].absenceId,
                      });
                    }
              }
            >
              task
            </Button>
          ) : null}

          {info.isToday ? (
            <Button
              variant="outlined-warning"
              onClick={
                data[0].overtime == true ?() => {
                  setId(data[0].workingReportId)
                  setWrIdDetail(data[0].workingReportId);
                  setIsViewOvertime(true);
                }
                : () => {
                  setOpenOvertime(true);
                  setId(data[0].workingReportId)
                }
              }
            >
              {data[0].overtime == true ? "View Overtime" : "Overtime"}
            </Button>
          ) : 
          (
            data[0].overtime == true ? (
            <Button
              variant="outlined-warning"
              onClick={
                () => {
                  setId(data[0].workingReportId)
                  setWrIdDetail(data[0].workingReportId);
                  setIsViewOvertime(true);
                }
              }
            >
              {"View Overtime"}
            </Button>
            ) : (<></>)
          )}
        </Grid>
        </Grid>
      );
    }
  };

  return (
    <Grid>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        dayCellContent={(info, create) => renderCalendar(info)}
        selectable={true}
        eventContent={renderEventContent}
        headerToolbar={{
          start: "title",
          center: "",
          end: "",
        }}
        events={events}
        height={"90vh"}
      />
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Employee Attendance</DialogTitle>
        <DialogContent>
          <DialogContentText>Track and start your workday</DialogContentText>
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
      <CreateOvertime setSelectedWorkingReportId={wrId} open={openOvertime} closeTask={() => setOpenOvertime(false)} />
      <PopupTask selectedWrIdanAbsenceId={wrId} open={openTask} closeTask={() => setOpenTask(false)} />
    </Grid>
  );
}
