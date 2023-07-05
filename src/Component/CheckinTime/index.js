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
import React, { useState } from "react";
import Webcam from "react-webcam";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ReplayIcon from "@mui/icons-material/Replay";

export default function CheckinTime({ setIsCheckin }) {
  const videoConstraints = {
    width: 622,
    height: 417,
    facingMode: "user",
  };
  const [isTakePicture, setIsTakePicture] = useState(false);
  const webcamRef = React.useRef(null);
  const [picture, setPicture] = useState("");
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPicture(imageSrc);
  }, [webcamRef]);

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
                            setIsTakePicture(false);
                            setPicture("");
                          }}
                        >
                          Back
                        </Button>
                      </Grid>
                      <Grid item xs={2} display="flex" alignItems="center">
                        <Button
                          variant="contained"
                          onClick={() => setIsTakePicture(true)}
                        >
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
                <Typography>Latitude :</Typography>
                <Typography>Longitude :</Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Typography variant="title">Tuesday, 2 May 2023</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Presence
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        value={10}
                        readOnly
                      >
                        <MenuItem value={10}>Check In Present</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Check In Location
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        value={10}
                        readOnly
                      >
                        <MenuItem value={10}>Work From Office</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker"]}>
                        <TimePicker
                          onChange={(value) => {
                            console.log(value);
                          }}
                          label="Basic time picker"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker"]}>
                        <TimePicker
                          onChange={(value) => {
                            console.log(value);
                          }}
                          label="Basic time picker"
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
                          variant="contained"
                          onClick={() => setIsTakePicture(true)}
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
    </Grid>
  );
}
