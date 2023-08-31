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
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


import DateRangeCalendar from "../../Component/DateRangeCalendar";
import { styled } from '@mui/system';

export default function Calendar({ setOnClick, setIsViewTask, setIsViewOvertime, events, setSelectedWorkingReportId, setWrIdDetail }) {
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [openOvertime, setOpenOvertime] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [wrId, setId] = useState({"workingReportId": null , "AbsenId": null})
  const [goDetail,setgoDetail] = useState(false)
  const [openDetailOvertime,setopenDetailOvertime] = useState(false)
  const [filternowStatus,setfilternowStatus] = useState(false)
  const [filterRangeData,setfilterRangeData] = useState(['2023-08-23'])
  const [currentMonthYear, setCurrentMonthYear] = useState("");
  const [changeCurrentMonth, setchangeCurrentMonth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
   console.log("INI FILTER READY",filterRangeData)
   console.log("INI FILTER READY",filternowStatus)
   const currentDate = new Date();
   const formattedMonthYear = moment(currentDate).format("MMMM YYYY");
   setCurrentMonthYear(formattedMonthYear);
  },[filterRangeData,filternowStatus])  
  


  const CustomButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: '6px 16px',
  fontSize: '14px',
  lineHeight: '100%',
  borderColor: 'black', 
  marginRight: '10vh',
  marginTop: '9vh',  
  borderRadius:6
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

  const renderCalendar = (info) => {        
    const FilterTanggal = () => {
      if(filternowStatus){        
        let tanggalRender = moment(info.date).format("YYYY-MM-DD");
        return filterRangeData.includes(tanggalRender);
      }else{
        return true
      }
    };
    
    const currentDate = moment().startOf("day");

    const isWeekend = (date) => {
      const dayOfWeek = moment(date).day();
      return dayOfWeek === 0 || dayOfWeek === 6;
    };
    if (FilterTanggal()) {
      const datalibur = moment(info.date).format("yyyy-MM-DD") 
      const data = events.filter(
        (val) => val.tanggal === moment(info.date).format("yyyy-MM-DD")
      );      
      if (datalibur.length > 0) {
        return (
          <Grid container spacing={2} sx={{height:'10vh'}}>
            <Grid item xs={12} display="flex" justifyContent="right" >            
              <Typography variant="h6" color={isWeekend(info.date) ? "error" : "#3393DF"}>{info.dayNumberText}</Typography>
            </Grid>            
            <Grid item >
                {info.isToday ? (
                    null
                  ) : (
                    datalibur[0].workingReportId == null ? (
                      <>
                        {moment(info.date).isSameOrBefore(currentDate) && data.length > 0 && !data[0].workingReportId ? (
                          <Button
                            variant="outlined-attedance"
                            onClick={() => {
                              setOnClick(info)}  
                            }
                          >
                            attedance
                          </Button>
                        ) : null}
                        {isWeekend(info.date) ? (
                          <Grid justifyContent="left">
                              <Button variant="outlined-holiday">
                                holiday
                              </Button>
                          </Grid>                          
                        ) : (
                          data.length > 0 && data[0].overtime ? (
                            null
                          ) : ( data.length > 0 && data[0].workingReportId ? (
                            <CustomButton variant="outlined-task"  onClick={
                              () => 
                              {
                                setWrIdDetail(data[0].workingReportId)
                                setIsViewTask(true)
                              }
                            }>
                              task
                            </CustomButton>
                          ) : (
                            <CustomButton disabled variant="outlined" >
                              task
                            </CustomButton>
                          ))
                        )}
                      </>
                    ) : null
                  )}
                </Grid>   
            {data.length > 0 ? 
            <> 
                {/* <Grid item xs={12} display="flex" justifyContent="left" >
                {isWeekend(info.date) ? 
                        <Button variant="outlined-holiday" >
                        holiday
                      </Button> 
                        : 
                          null
                        }                  
                </Grid>      */}
                <Grid item xs={12} display="flex" justifyContent="left" sx={{ marginRight: "4vh", marginTop: "0.8vh", flexDirection: "column" }}>                
                {info.isToday && !data[0].workingReportId ? (
                  <Button                    
                    variant="outlined-attedance-today"
                    onClick={() => {
                      setOnClick(info)}  
                    }
                  >
                    attedance
                  </Button>
                ) : null            
                }
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
                  data[0].overtime === true && (
                  <Button
                    // sx={{marginTop: "5vh"}}
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
                  )
                )}
                {info.isToday ? (
                  <Button
                    disabled={!data[0].workingReportId}
                    variant={!data[0].workingReportId ? "outlined" : "outlined-task"}
                    onClick={                      
                      data[0].task
                        ? () => {                         
                          setId({
                            workingReportId: data[0].workingReportId,
                            absenceId: data[0].absenceId,
                          });
                          setWrIdDetail(data[0].workingReportId);
                          setIsViewTask(true);
                          // setOpenTask(true);
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
                  ) : (
                    data.length > 0 && data[0].overtime ? (
                    <CustomButtonDisabledovertime disabled variant="outlined" sx={{ width: "30%", marginRight: "8vh" }}>
                        task
                    </CustomButtonDisabledovertime>
                    ) : null
                  )              
                }                
              </Grid>
            </> : null
          
            }
          </Grid>
        );
      }
    } else {
      return null;
    }
    
  };

  return (
    <Grid>      
      {!changeCurrentMonth &&
      <div style={{ position: 'relative' }}>
          <Grid position='absolute' margin={4}>
            <Typography variant='TextBulankalender'>{currentMonthYear}</Typography>                    
          </Grid>
      </div>
      }
      {/* <Grid marginLeft={63} marginTop={4} position='absolute' container alignItems="flex-start" justifyContent="flex-start" >
            <Grid item>
              <IconButton>
                <ArrowLeftIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6">Today</Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <ArrowRightIcon />
              </IconButton>
            </Grid>             
      </Grid> */}
      <DateRangeCalendar setchangeCurrentMonth={setchangeCurrentMonth} setfilterRangeData={setfilterRangeData} setfilternowStatus={setfilternowStatus}/> 
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
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
        // customButtons={{
        //   custom1: {
        //     text: 'custom 1',
        //     click: function() {
        //       alert('clicked custom button 1!');
        //     }
        //   },
        // }}
        events={events}
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
      <CreateOvertime setSelectedWorkingReportId={wrId} open={openOvertime} closeTask={() => setOpenOvertime(false)} />
      <PopupTask selectedWrIdanAbsenceId={wrId} open={openTask} closeTask={() => setOpenTask(false)} />
    </Grid>
  );
}
