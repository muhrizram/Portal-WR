import React from 'react'
import {  
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
    DialogActions,
  } from "@mui/material";

const DeleteDialog = ({dialogOpen, handleClose, deleteData, id}) => {

  return (
        <Dialog
          open={dialogOpen}          
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Data"}</DialogTitle>
          <DialogContent className="dialog-delete-content">
            <DialogContentText
              className="dialog-delete-text-content"
              id="alert-dialog-description"
            >
              Warning: Deleting this data is irreversible. Are you sure you want
              to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions">
            <Button
              onClick={() =>handleClose()}
              variant="outlined"
              className="button-text"
            >
              Cancel
            </Button>
            <Button
              onClick={() =>deleteData(id)}
              className="delete-button button-text"
            >
              Delete Data
            </Button>
          </DialogActions>
        </Dialog>  
  )
}

export default DeleteDialog 