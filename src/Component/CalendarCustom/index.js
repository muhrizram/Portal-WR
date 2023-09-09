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
import { useNavigate } from "react-router";
import CreateOvertime from "../../Layouts/Overtime/createOvertime";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './calender.css'
import HolidayDialog from "../DialogHoliday";
import DateRangeCalendar from "../../Component/DateRangeCalendar";
import { styled } from '@mui/system';

export default function Calendar({ setOnClick, setIsViewTask, setIsViewOvertime, events, setWrIdDetail, updateFilterDates, onStatusHr, setonOtherUser }) {
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [openOvertime, setOpenOvertime] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [wrId, setId] = useState({workingReportOvertimeId: null, absenceId: null, workingReportTaskId: null})
  const [currentMonthYear, setCurrentMonthYear] = useState("");
  const [changeCurrentMonth, setchangeCurrentMonth] = useState(false);
  const [weekendDates, setWeekendDates] = useState([]);
  const [StartDate, setStartDate] = useState()
  const [EndDate, setEndDate] = useState()
  const [activeMonth, setActiveMonth] = useState(new Date());
  const [wrDate, setWrDate] = useState(null)
  const [dialogOpenHoliday, setDialogOpenHoliday] = useState(false);
  const [tanggalHoliday, setTanggalHoliday] = useState(null);
  const [descHoliday, setdescHoliday] = useState(null);
  const [finalDateCalendar,setfinalDateCalendar] = useState()

  const navigate = useNavigate();

  useEffect(() => {    
   const currentDate = new Date();
   const formattedMonthYear = moment(currentDate).format("MMMM YYYY");
   setCurrentMonthYear(formattedMonthYear);   
   tambahSatuHari()
  },[EndDate])  
  
  const navigateNextMonth = () => {    
    setActiveMonth(moment(activeMonth).add(1, "month").toDate());
    updateFilterDates(moment(activeMonth).add(1, "month").toDate(), true);
  };
  
  const navigatePreviousMonth = () => {    
    setActiveMonth(moment(activeMonth).subtract(1, "month").toDate());
    updateFilterDates(moment(activeMonth).subtract(1, "month").toDate(),false);
  };

  const CustomButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: '6px 16px',
  fontSize: '14px',
  lineHeight: '100%',
  borderColor: 'black', 
  // marginRight: '10vh',
  marginTop: '2vh',  
  borderRadius:6
  }));

  const CustomButtonDisabledTask = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    padding: '6px 16px',
    fontSize: '14px',
    lineHeight: '100%',
    borderColor: 'black', 
    marginRight: '3vh',
    marginTop: '10vh',  
    borderRadius:6
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
    if(EndDate){
      const tanggalAwal = new Date(EndDate);
      tanggalAwal.setDate(tanggalAwal.getDate() + 1);
        
      const tanggalBaru = tanggalAwal.toISOString().split('T')[0];
      setfinalDateCalendar(tanggalBaru);
    }
  };

  const renderCalendar = (info) => {    
    const currentDate = moment().startOf("day");    
    const isWeekend = (date) => {      
      const dayOfWeek = moment(date).day();      
      return dayOfWeek === 0 || dayOfWeek === 6;
    };
       
      const datalibur = events.find(val => val.holiday && val.tanggal === moment(info.date).format("yyyy-MM-DD"))      
      const data = events.find(
        (val) => val.tanggal === moment(info.date).format("yyyy-MM-DD")
      );
      if (data) {
        return (
          <Grid container spacing={2} sx={{height: '10vh'}}>
            <Grid item xs={12} display="flex" justifyContent="right" >            
              <Typography variant="h6" color={isWeekend(info.date) ? "error" : "#3393DF"}>{info.dayNumberText}</Typography>
            </Grid>            
            <Grid item >
                {!info.isToday && (                    
                      <>
                        <Grid>
                        {moment(info.date).isSameOrBefore(currentDate) && !data.workingReportTaskId && !data.task && !isWeekend(info.date) && !datalibur && !onStatusHr ? (
                          <Button
                            variant="outlined-attedance"
                            onClick={() => {
                              setOnClick(info)}  
                            }
                          >
                            Attendance
                          </Button>
                          ) : !datalibur && !isWeekend(info.date) && data.presenceName && (
                          <Button
                            variant="outlined-attedance"
                            // onClick={() => {
                            //   setOnClick(info)}  
                            // }
                          >
                            {data.presenceName}
                          </Button>
                          ) 
                        }
                        </Grid>
                        <Grid>
                          {moment(info.date).isSameOrBefore(currentDate) && (
                          <CustomButton
                            variant="outlined-warning"
                            onClick={
                              data.overtime == true || onStatusHr ? () => {
                                setId(data.workingReportOvertimeId)
                                setWrIdDetail(data.workingReportOvertimeId);
                                setIsViewOvertime(true);
                                setonOtherUser(true)
                              }
                              : () => {
                                setOpenOvertime(true);
                                setId(data.workingReportOvertimeId)
                                setWrDate(data.tanggal)
                              }
                             }
                          >
                            {data.overtime == true || onStatusHr ? "View Overtime" : "Overtime"}
                          </CustomButton>
                          )}
                        </Grid>
                        {isWeekend(info.date) || datalibur ? (
                          <Grid justifyContent="left">
                             {moment(info.date).isSameOrBefore(currentDate) ? (
                              <Button variant="outlined-holiday" onClick={
                                () => {
                                setdescHoliday(data.descHoliday)
                                setTanggalHoliday(data.tanggal);
                                setDialogOpenHoliday(true);
                                }}
                              >
                                holiday
                              </Button>
                            ) : (
                              <CustomButtonHoliday variant="outlined-holiday" onClick={
                                () => {
                                setdescHoliday(data.descHoliday)
                                setTanggalHoliday(data.tanggal);
                                setDialogOpenHoliday(true);
                                }}
                              >
                          holiday
                        </CustomButtonHoliday>
                      )
                    }
                          </Grid>
                        ) : (
                          data.workingReportTaskId ? (
                            <CustomButton variant="outlined-task" onClick={
                              data.task
                              ? () => {
                                setId({
                                  workingReportTaskId: data.workingReportTaskId,
                                  absenceId: data.absenceId,
                                });
                                setWrIdDetail(data.workingReportTaskId);
                                setIsViewTask(true);
                                setonOtherUser(true)
                                }
                              : () => {
                                setonOtherUser(true)
                                setOpenTask(true);
                                setId({
                                    workingReportTaskId: data.workingReportTaskId,
                                    absenceId: data.absenceId,
                                  });
                                }
                            }>
                              task
                            </CustomButton>
                          ) : moment(info.date).isSameOrBefore(currentDate) ? (                            
                            <CustomButton disabled variant="outlined" >
                              task
                            </CustomButton>
                          ) : (
                          <CustomButtonDisabledTask disabled variant="outlined" >
                            task
                           </CustomButtonDisabledTask>
                          )
                        )}
                      </>
                    // )
                  )}
                </Grid>   
            {data ? 
              <> 
                <Grid display="flex" justifyContent="left" sx={{ marginTop: "5vh", flexDirection: "column" }}>                
                {info.isToday && !data.workingReportTaskId && !isWeekend(info.date) && !onStatusHr ? (
                  <Button                    
                    variant="outlined-attedance-today"
                    onClick={() => {
                      setOnClick(info)}  
                    }
                  >
                    Attendance
                  </Button>
                ) : null            
                }
                {info.isToday ? (
                  <CustomButton                  
                    variant="outlined-warning"
                    onClick={
                      data.overtime == true ?() => {
                        setId(data.workingReportOvertimeId)
                        setWrIdDetail(data.workingReportOvertimeId);
                        setIsViewOvertime(true);
                      }
                      : () => {
                        setOpenOvertime(true);
                        setId(data.workingReportOvertimeId)
                        setWrDate(data.tanggal)
                      }
                    }
                  >
                    {data.overtime == true ? "View Overtime" : "Overtime"}
                  </CustomButton>
                ): null}
                {info.isToday && !isWeekend(info.date) ? (
                  <>
                  {data.workingReportTaskId ? (
                    <Button                    
                    variant={"outlined-task"}
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
                    task
                    </Button>
                   ) : (
                    <CustomButton disabled variant="outlined" >
                      task
                    </CustomButton>
                    )}
                  </>                                   
                ) : (info.isToday && isWeekend(info.date) && (
                    <Grid justifyContent="left">
                      {moment(info.date).isSameOrBefore(currentDate) ? (
                        <Button variant="outlined-holiday" onClick={
                          () => {
                          setdescHoliday(data.descHoliday)
                          setTanggalHoliday(data.tanggal);
                          setDialogOpenHoliday(true);
                          }}
                        >
                          holiday
                        </Button>
                      ) : (
                        <CustomButtonHoliday variant="outlined-holiday" onClick={
                          () => {
                          setdescHoliday(data.descHoliday)
                          setTanggalHoliday(data.tanggal);
                          setDialogOpenHoliday(true);
                          }}
                        >
                          holiday
                        </CustomButtonHoliday>
                      )
                    }
                      
                    </Grid>
                    )                                     
                  )
                }                
              </Grid>
            </> : null
            }
          </Grid>
        );
      }    
    
  };

  return (
    <Grid>      
       {!changeCurrentMonth && (
      <div style={{ position: "relative" }}>
        <Grid position="absolute" margin={4}>
          <Grid
            display="flex"
            container
            alignItems="center"
            justifyContent="flex-start"
          >
            <Typography variant="TextBulankalender">
              {moment(activeMonth).format("MMMM YYYY")}
            </Typography>
            <Grid item>
              <IconButton color="primary" onClick={navigatePreviousMonth}>
                <KeyboardArrowLeftIcon />
              </IconButton>
              <Button onClick={() => setActiveMonth(new Date())}>
                Today
              </Button>
              <IconButton color="primary" onClick={navigateNextMonth}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )}
      <DateRangeCalendar setchangeCurrentMonth={setchangeCurrentMonth} setEndDateCall={setEndDate} setStartDateCall={setStartDate} setWeekendDates={setWeekendDates}/> 
      <FullCalendar  
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        // initialView={"dayGridMonth"}
        firstDay={1}
        key={activeMonth.getTime()} 
        initialDate={activeMonth}
        dayCellContent={(info, create) => renderCalendar(info)}        
        // eventAdd={(info, create) => renderCalendar(info)}
        height={1100}        
        selectable={true}
        eventContent={renderEventContent}
        headerToolbar={{
          start: "",
          center: "",
          end: "",
        }}        
        events=
        {[        
          {events},
          {
            start: StartDate,
            end: finalDateCalendar,
            display: 'background',
            color:'blue'
          },
          ...(Array.isArray(weekendDates)
          ? weekendDates.map(date => ({
              start: date,
              display: 'background',
              color: 'red'
            }))
          : []
          )
        ]}        
      />
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Employee Attendance</DialogTitle>
        <DialogContent>
          <DialogContentText className="TextBulankalender">Track and start your workday</DialogContentText>
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
      <CreateOvertime setSelectedWorkingReportId={wrId} open={openOvertime} closeTask={() => setOpenOvertime(false)} wrDate={wrDate} />
      <PopupTask selectedWrIdanAbsenceId={wrId} open={openTask} closeTask={() => setOpenTask(false)} />
      <HolidayDialog dialogOpen={dialogOpenHoliday} handleClose={() => setDialogOpenHoliday(false)} date={tanggalHoliday} titleHoliday={descHoliday}/>
    </Grid>
  );
}
