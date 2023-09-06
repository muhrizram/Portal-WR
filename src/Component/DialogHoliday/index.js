import React from 'react'
import {  
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
    DialogActions,
  } from "@mui/material";
import moment from "moment";

const HolidayDialog = ({dialogOpen, handleClose,date}) => {

  return (
        <Dialog
          open={dialogOpen}          
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
        >
          <DialogTitle id="alert-dialog-title">{"Holiday"}</DialogTitle>
          <DialogContent className="dialog-delete-content">
            <DialogContentText
              className="dialog-delete-text-content"
              id="alert-dialog-description"
            >             
              {moment(date).format("DD MMMM YYYY")}              
            </DialogContentText>
            <DialogContentText>             
              Weekend Holiday
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions">
            <Button
              onClick={() =>handleClose()}
              variant="contained"
              className="button-text"
            >
              Close
            </Button>           
          </DialogActions>
        </Dialog>  
  )
}

export default HolidayDialog 