import {
    Grid,
    Typography,
    Button,
  } from "@mui/material";
  import "../../../App.css";
  import React, { useContext, useEffect, useState } from "react";
  import client from "../../../global/client";
  import { AlertContext } from "../../../context";
  const DetailAttendance = ({ setIsViewAttendance }) => {
  
    return (
      <div className="card-attendance">
        <Grid container rowSpacing={2}>
          <Grid item xs={12} textAlign="center">
            <Typography variant="attendanceHeader">
              Employee Attendance
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="attendanceTrack">
              Track and start your workday
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="attendanceHeader">
              GAMBAR
            </Typography>
          </Grid>         
        
          <Grid
            item
            xs={12}
            textAlign="center"
          >
            <Button style={{ marginRight: "16px" }} variant="outlined" onClick={() => setIsViewAttendance(false)}>
              back
            </Button>            
          </Grid>
        </Grid>
      </div>
    );
  };
  
  export default DetailAttendance;
  