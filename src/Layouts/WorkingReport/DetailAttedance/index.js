import {
    Grid,
    Typography,
    Button,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
  } from "@mui/material";
  import "../../../App.css";
  import React, { useContext, useEffect, useState } from "react";
  import client from "../../../global/client";
  import { AlertContext } from "../../../context";
  const DetailAttendance = ({ setIsViewAttendance, WrIdDetail }) => {
    const [open,setopen] = useState(false)
    const [urlMinio,seturlMinio] = useState()       

    const getDetailAttendance = async () => {    
      try {
        const res = await client.requestAPI({
          method: "GET",
          endpoint: `/workingReport/detailWorkingReport/${WrIdDetail}`        
        });
        seturlMinio(res.data ? `${process.env.REACT_APP_BASE_API}/${res.data.attributes.file}` : '' )
      } catch (error) {
        console.error("Error fetching task details:", error);
      } 
    }  
    
    useEffect(() => {
      getDetailAttendance()
    },[])
  
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
          <a href="#">
            <img 
            src={urlMinio}
            alt="Gambar" 
            style={{ width: "100%", height: "500px", borderRadius: "10px" }}
            onClick={() => setopen(true)}
            />
          </a>
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

        <Dialog
          open={open}
          onClose={() => setopen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{ sx: { width: "100%", height:"100%" } }}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <img 
              src={urlMinio}
              alt="Gambar" 
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              onClick={() => setopen(true)}
            />
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions" sx={{alignSelf:'flex-end', padding:2}}> 
            <Button variant="outlined" onClick={() => setopen(false)}>
              {"close"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  
  export default DetailAttendance;
  