import {
    Grid,
    Typography,
    Button,
  } from "@mui/material";
  import "../../../App.css";
  import React, { useContext, useEffect, useState } from "react";
  import client from "../../../global/client";
  import { AlertContext } from "../../../context";
  const DetailAttendance = ({ setIsViewAttendance, WrIdDetail }) => {
    useEffect(() => (
      getDetailAttendance()      
    ),[])

    const getDetailAttendance = async () => {    
      try {
        const res = await client.requestAPI({
          method: "GET",
          endpoint: `/workingReport/detailWorkingReport/${WrIdDetail}`        
        });
        // setTaskData(res.data);      
        console.log("res.data", res.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      } 
    }
  
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
          <a href="https://images.unsplash.com/photo-1549388604-817d15aa0110">
            <img 
            src="https://images.unsplash.com/photo-1549388604-817d15aa0110" 
            alt="Gambar" 
            style={{ width: "100%", height: "500px", borderRadius: "10px" }}
            />
          </a>
            {/* <Typography variant="attendanceHeader">
              GAMBAR
            </Typography> */}
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
  