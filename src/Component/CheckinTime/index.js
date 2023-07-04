import {
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

export default function CheckinTime({ setIsCheckin }) {
  const [isTakePicture, setIsTakePicture] = useState();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card>
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
                      <TimePicker label="Basic time picker" />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker label="Basic time picker" />
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
                        //   onClick={() => onAdd()}
                      >
                        Continue
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
