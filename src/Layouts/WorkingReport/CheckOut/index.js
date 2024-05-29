import { Button, Card, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import uploadFile from "./../../../global/uploadFile";
import client from "../../../global/client";
import { AlertContext } from "../../../context";
import moment from "moment";

export default function CheckOut({
  setIsCheckin,
  setIsCheckOut,
  workingReportTaskId,
}) {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const { setDataAlert } = useContext(AlertContext);

  const checkIn = async () => {
    const res = await client.requestAPI({
      endpoint: `/workingReport/checkOut?wrId=${workingReportTaskId}&latitude=${lat}&longitude=${lon}`,
      method: "PUT",
    });
    if (!res.isError) {
      setDataAlert({
        severity: "success",
        open: true,
        message: "Check-out successful! Have a great day ahead!",
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
          <Grid item p={4} xs={12}>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Typography variant="title">Geolocation</Typography>
            </Grid>
            <Typography>Latitude : {lat}</Typography>
            <Typography>Longitude : {lon}</Typography>
            <iframe id="iframeId" height="=100%" width="90%"></iframe>
          </Grid>
          <Grid container p={4} spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container justifyContent="center">
                    <Grid item xs={2} display="flex" alignItems="center">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setIsCheckOut();
                        }}
                      >
                        Back
                      </Button>
                    </Grid>
                    <Grid item xs={2} display="flex" alignItems="center">
                      <Button
                        variant="contained"
                        disabled={lat == "" || lon == ""}
                        onClick={() => checkIn()}
                      >
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
