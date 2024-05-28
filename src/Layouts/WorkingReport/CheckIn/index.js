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
import React, { useContext, useEffect, useState } from "react";
import Webcam from "react-webcam";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ReplayIcon from "@mui/icons-material/Replay";
import uploadFile from "./../../../global/uploadFile";
import client from "../../../global/client";
import moment from "moment";
import { AlertContext } from "../../../context";
import { ABSENCE } from "../../../global/constant/absence";

export default function CheckinTime({
  setIsCheckin,
  dataReadyAttedance,
  dataPeriod,
  beforeThanToday,
  DataPresence,
}) {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const webcamRef = React.useRef(null);
  const { setDataAlert } = useContext(AlertContext);

  const onContinue = () => {
    const presence = localStorage.getItem("presence");
    if (presence === ABSENCE.hadir.code) {
      presentFunction();
    } else {
      absentFunction();
    }
  };

  const absentFunction = async () => {
    let workingReportId = null;
    const res = await client.requestAPI({
      endpoint: "/workingReport/notAttendance",
      method: "POST",
      data: dataReadyAttedance,
    });
    workingReportId = res.data.attributes.workingReportId;
    if (!res.isError) {
      const body = {
        workingReportId: workingReportId,
        latitude: lat,
        longitude: lon,
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
        }, 3000);
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
  };

  const presentFunction = async () => {
    let workingReportId = null;
    const res = await client.requestAPI({
      endpoint: "/workingReport/attendance",
      method: "POST",
      data: dataReadyAttedance,
    });
    workingReportId = res.data.attributes.workingReportId;
    if (!res.isError) {
      const body = {
        workingReportId: workingReportId,
        latitude: lat,
        longitude: lon,
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
        }, 3000);
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
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude.toString());
      setLon(position.coords.longitude.toString());
    });
  }, []);

  useEffect(() => {
    const iframeData = document.getElementById("iframeId");
    iframeData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`;
  }, [lat, lon]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card>
          <Grid container p={4}>
            <Grid item xs={6}>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="title">Geolocation</Typography>
              </Grid>
              <Typography>Latitude : {lat}</Typography>
              <Typography>Longitude : {lon}</Typography>
              <iframe id="iframeId" height="82%" width="98%"></iframe>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Typography variant="title">
                    {moment(dataPeriod.tanggal).format("dddd, DD MMMM YYYY")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    sx={{ backgroundColor: "#EDEDED", borderRadius: 2 }}
                  >
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
                      <MenuItem disabled value={10}>
                        {DataPresence.presence}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    sx={{ backgroundColor: "#EDEDED", borderRadius: 2 }}
                  >
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
                      <MenuItem disabled value={10}>
                        {DataPresence.location}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 25 }}>
                  <Grid container justifyContent="center">
                    <Grid item xs={1.2} display="flex" alignItems="center">
                      <Button
                        variant="outlined"
                        onClick={() => setIsCheckin(false)}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={1.2} display="flex" alignItems="center">
                      <Button
                        disabled={lat == "" || lon == ""}
                        variant="contained"
                        onClick={() => onContinue()}
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
