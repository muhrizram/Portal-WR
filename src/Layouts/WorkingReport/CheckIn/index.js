import {
  Avatar,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Webcam from "react-webcam";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ReplayIcon from "@mui/icons-material/Replay";
import uploadFile from "./../../../global/uploadFile";
import client from "../../../global/client";
import moment from "moment";
import { AlertContext } from "../../../context";

export default function CheckinTime({ setIsCheckin,dataReadyAttedance,dataPeriod, beforeThanToday,DataPresence }) {
  const videoConstraints = {
    width: 622,
    height: 417,
    facingMode: "user",
  };
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [isTakePicture, setIsTakePicture] = useState(false);
  const webcamRef = React.useRef(null);
  const [picture, setPicture] = useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const { setDataAlert } = useContext(AlertContext);
  const [Duration,setDuration] = useState()
  const [openPopUpMore, setPopUpMore] = useState(false)  

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPicture(imageSrc);
  }, [webcamRef]);

  const cekRangeHour = () => {
    if (!startTime || !endTime) {
      setDataAlert({
        severity: "error",
        message: 'Rentang waktu Start dan End tidak boleh kosong',
        open: true,
      });
    } else {
      const startHour = parseInt(startTime.format("HH"), 10);
      const endHour = parseInt(endTime.format("HH"), 10);
      const startMinute = parseInt(startTime.format("mm"), 10);
      const endMinute = parseInt(endTime.format("mm"), 10);
  
      const totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
  
      if (totalMinutes === 540) {
        const presence = localStorage.getItem("presence");
        if (beforeThanToday && presence === "42") {
          setIsTakePicture(true);
        } else if (!beforeThanToday) {
          if (presence === "42") {
            hadirNotToday();
          } else {
            TidakhadirNotToday();
          }
        } else {
          TidakhadirNotToday();
        }      
      } else if (totalMinutes < 540){
        setDuration(true)                
        setPopUpMore(true)
      } else {
        setDuration(false)
        setPopUpMore(true)
      }
    }
  };

    const TidakhadirNotToday = async() => {
      let workingReportId = null;
      const res = await client.requestAPI({
            endpoint: "/workingReport/notAttendance",
            method: "POST",
            data: dataReadyAttedance,
          });
          workingReportId = res.data.attributes.workingReportId
          if (!res.isError) {
            const body = {
              workingReportId: workingReportId,
              latitude : lat,
              longitude : lon,
              startTime: startTime.format("HH:mm:ss"),
              endTime: endTime.format("HH:mm:ss"),
              file: "null",
            };
        
            const res = await client.requestAPI({
              endpoint: "/workingReport/attendance/checkIn",
              method: "POST",
              data: body,
            });
            if (!res.isError) {                  
              setDataAlert({
                severity: "success",
                open: true,
                message: res.data.meta.message,
              });
              setTimeout(() => {
                window.location.reload();
              }, 3000)   
            } else {
              setDataAlert({
                severity: "error",
                message: res.error.detail,
                open: true,
              });
            }      
          } else {
            setDataAlert({
              severity: "error",
              message: res.error.detail,
              open: true,
            });
          }
      }

      const hadirNotToday = async() => {
        let workingReportId = null;
        const res = await client.requestAPI({
              endpoint: "/workingReport/attendance",
              method: "POST",
              data: dataReadyAttedance,
            });
            workingReportId = res.data.attributes.workingReportId
              if (!res.isError) {
                const body = {
                  workingReportId: workingReportId,
                  latitude : lat,
                  longitude : lon,
                  startTime: startTime.format("HH:mm:ss"),
                  endTime: endTime.format("HH:mm:ss"),
                  file: "null",
                };
                const res = await client.requestAPI({
                  endpoint: "/workingReport/attendance/checkIn",
                  method: "POST",
                  data: body,
                });
                if (!res.isError) {                  
                  setDataAlert({
                    severity: "success",
                    open: true,
                    message: res.data.meta.message,
                  });
                  setTimeout(() => {
                    window.location.reload();
                  }, 3000)   
                } else {
                  setDataAlert({
                    severity: "error",
                    message: res.error.detail,
                    open: true,
                  });
                }                      
              } else {
                setDataAlert({
                  severity: "error",
                  message: res.error.detail,
                  open: true,
              });
            }
      }
  

  const checkIn = async () => {
    const resAttedance = await client.requestAPI({
      endpoint: "/workingReport/attendance",
      method: "POST",
      data: dataReadyAttedance,
    });
    if (resAttedance.isError) {
      setDataAlert({
        severity: "error",
        message: resAttedance.error.detail,
        open: true,
      });
      return
    }

    const blob = await fetch(picture).then((res) => res.blob());
    const file = new File([blob], localStorage.getItem("employeeName") + dataPeriod.tanggal + "checkin.jpg");
    // URL.createObjectURL(blob)
    const result = await uploadFile(file, 'absence');
    const body = {
      workingReportId: resAttedance.data.attributes.workingReportId,
      latitude : lat,
      longitude : lon,
      startTime: startTime.format("HH:mm:ss"),
      endTime: endTime.format("HH:mm:ss"),
      file: result,
    };

    const res = await client.requestAPI({
      endpoint: "/workingReport/attendance/checkIn",
      method: "POST",
      data: body,
    });
    if (!res.isError) {
      setIsCheckin(false);
      setDataAlert({
        severity: "success",
        open: true,
        message: res.data.meta.message,
      });
    } else {
      setDataAlert({
        severity: "error",
        message: res.error.detail,
        open: true,
      });
    }
    if (!resAttedance.isError) {
      setDataAlert({
        severity: "success",
        open: true,
        message: resAttedance.data.meta.message,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000)
    } 
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords. latitude.toString());
      setLon(position.coords.longitude.toString());
    });
  }, []);

  useEffect(() => {
    const iframeData = document.getElementById("iframeId");    
    iframeData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`;
  },[lat,lon])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card>
          {isTakePicture ? (
            <Grid container p={4} spacing={2}>
              <Grid item xs={6}>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Typography variant="title">Take a Picture</Typography>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Typography>Snap a photo to record attendance</Typography>
                </Grid>
                {picture ? (
                  <Avatar
                    src={picture}
                    variant="square"
                    className="full-avatar"
                  />
                ) : (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Typography variant="title">Take a Picture</Typography>
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Button
                      onClick={() => {
                        if (!picture) capture();
                      }}
                      variant="contained"
                      startIcon={<PhotoCameraIcon />}
                    >
                      Snap a photo
                    </Button>
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setPicture(null);
                      }}
                      startIcon={<ReplayIcon />}
                    >
                      Retake a Photo
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justifyContent="center">
                      <Grid item xs={2} display="flex" alignItems="center">
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setIsTakePicture(false);
                            setPicture(null);
                          }}
                        >
                          Back
                        </Button>
                      </Grid>
                      <Grid item xs={2} display="flex" alignItems="center">
                        <Button disabled={!picture} variant="contained" onClick={() => checkIn()}>
                          Check In
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid container p={4}>
              <Grid item xs={6}>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Typography variant="title">Geolocation</Typography>
                </Grid>
                <Typography>Latitude : {lat}</Typography>
                <Typography>Longitude : {lon}</Typography>
                <iframe id="iframeId" height="70%" width="90%"></iframe>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Typography variant="title">{moment(dataPeriod.tanggal).format('dddd, DD MMMM YYYY')}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ backgroundColor: '#EDEDED',borderRadius:2 }}>
                      <InputLabel id="demo-simple-select-label">
                        Presence
                      </InputLabel>
                      <Select
                        disabled
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        value={10}
                        readOnly
                      >
                        <MenuItem disabled value={10}>{DataPresence.presence}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ backgroundColor: '#EDEDED', borderRadius:2 }}>
                      <InputLabel id="demo-simple-select-label">
                        Check In Location
                      </InputLabel>
                      <Select
                        disabled
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        value={10}
                        readOnly
                      >
                        <MenuItem disabled value={10}>{DataPresence.location}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker"]}>
                        <TimePicker
                          ampm={false}
                          onChange={(value) => {
                            setStartTime(value);
                          }}
                          value={startTime}
                          label="Start Time"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker"]}>
                        <TimePicker
                          ampm={false}
                          onChange={(value) => setEndTime(value)}
                          value={endTime}
                          label="End Time"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justifyContent="center">
                      <Grid item xs={2} display="flex" alignItems="center">
                        <Button
                          variant="outlined"
                          onClick={() => setIsCheckin(false)}
                        >
                          Cancel
                        </Button>
                      </Grid>
                      <Grid item xs={2} display="flex" alignItems="center">
                        <Button
                          disabled={
                            (startTime == null || endTime == null)
                          }
                          variant="contained"
                          onClick={() => cekRangeHour()}
                        >
                          Continue
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Card>
      </Grid>
        <Dialog
          open={openPopUpMore}          
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle
          sx={{
            alignSelf: "center",
            fontSize: "30px",
            fontStyle: "Poppins",
          }}
          id="alert-dialog-title"
          className="dialog-delete-header"
        >
          {Duration ? 'New to the Work Crew' : 'Oops! You Work So Hard'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {Duration ? "Duration is less than 8 hours, preventing task submission" : "Task exceeds 8-hour duration and cannot be submitted"}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions"> 
            <Button variant="contained" onClick={() => setPopUpMore(false)}>
              {"Back To Attendance"}
            </Button>
          </DialogActions>
        </Dialog>
    </Grid>    
  );
}
