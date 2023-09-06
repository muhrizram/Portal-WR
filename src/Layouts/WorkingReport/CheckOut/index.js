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

export default function CheckOut({ setIsCheckin }) {
  const videoConstraints = {
    width: 622,
    height: 417,
    facingMode: "user",
  };
  const webcamRef = React.useRef(null);
  const [picture, setPicture] = useState("");
  const { setDataAlert } = useContext(AlertContext);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPicture(imageSrc);
  }, [webcamRef]);
  const checkIn = async () => {
    const blob = await fetch(picture).then((res) => res.blob());
    const file = new File([blob], "test_picture.jpg");
    // URL.createObjectURL(blob)
    const result = await uploadFile(file);
    const res = await client.requestAPI({
      endpoint: `/workingReport/checkOut?wrId=${localStorage.getItem(
        "workingReportId"
      )}&fileName=${result}`,
      method: "PUT",
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
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card>
          <Grid container p={4} spacing={2}>
            <Grid item xs={6}>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="title">Take a Picture</Typography>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography>Snap a photo to record attendance</Typography>
              </Grid>
              {picture !== "" ? (
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
                      if (picture === "") capture();
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
                      setPicture("");
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
                          setPicture("");
                        }}
                      >
                        Back
                      </Button>
                    </Grid>
                    <Grid item xs={2} display="flex" alignItems="center">
                      <Button variant="contained" onClick={() => checkIn()}>
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
