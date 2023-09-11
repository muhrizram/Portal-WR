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
import { AlertContext } from "../../../context";
import moment from "moment";

export default function CheckOut({ setIsCheckin ,setIsCheckOut,  workingReportTaskId}) {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const date = new Date();   
  const videoConstraints = {
    width: 622,
    height: 417,
    facingMode: "user",
  };
  const webcamRef = React.useRef(null);
  const [picture, setPicture] = useState(null);
  const { setDataAlert } = useContext(AlertContext);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPicture(imageSrc);
  }, [webcamRef]);
  const checkIn = async () => {
    const blob = await fetch(picture).then((res) => res.blob());    
    const file = new File([blob],localStorage.getItem("employeeName") + moment(date).format("DD-MM-YYYY") +  "checkout.jpg");
    // URL.createObjectURL(blob)
    const result = await uploadFile(file, 'absence');
    const body ={
      workingReportId: workingReportTaskId ,
      latitude: lat,
      longitude: lon,
      file: result,
      // startTime: '08:00:00',
      // endTime: '17:00:00',
    }
    const res = await client.requestAPI({
      endpoint: `/workingReport/checkOut?wrId=${workingReportTaskId}&fileName=${result}&latitude=${lat}&longitude=${lon}`,
      method: "PUT",
    });
    if (!res.isError) {
      setDataAlert({
        severity: "success",
        open: true,
        message: res.meta.message,
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
  };

  useEffect(()=>{    
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude.toString());
      setLon(position.coords.longitude.toString());
    });
  },[])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card>
          <Grid item p={4} xs={6}>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Typography variant="title">Geolocation</Typography>
                </Grid>
                <Typography>Latitude : {lat}</Typography>
                <Typography>Longitude : {lon}</Typography>
              </Grid>
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
                          setPicture(null);
                          setIsCheckOut()
                        }}
                      >
                        Back
                      </Button>
                    </Grid>
                    <Grid item xs={2} display="flex" alignItems="center">
                      <Button variant="contained" disabled={!picture} onClick={() => checkIn()}>
                        Check Out
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
