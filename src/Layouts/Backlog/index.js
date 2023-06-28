import React, { useState } from 'react';
import backlog from './initjson.json'
// import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button } from '@mui/material';
import CustomAlert from '../../Component/Alert';
import SideBar from '../../Component/Sidebar';


const Backlog = () => {
  const columns = [
    {
      field: 'no',
      headerName: 'No',
      flex: 1 
    },
    {
      field: 'projectName',
      headerName: 'Project Name',
      flex: 1 
    },
    {
      field: 'taskCode',
      headerName: 'Task Code',
      flex: 1 
    },
    {
      field: 'taskName',
      headerName: 'Task Name',
      flex: 1 
    },
    {
      field: 'priority',
      headerName: 'Priority',
      flex: 1 
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1 
    },
    {
      field: 'assignedTo',
      headerName: 'Assigned To',
      flex: 1 
    }
  ];
  const data = backlog.backlog
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onDelete = () => {
    setOpenAlert(true);
    handleClose()
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const handleChangeSearch = (event) => {
    console.log('value search: ', event.target.value)
  }
  
  const handleAdd = () => {
    console.log('add')
  }
  return (
    <div>
      <SideBar>
        <CustomAlert
          severity='warning'
          message='Deletion completed: The item has been successfully removed from the database'
          open={openAlert}
          onClose={handleCloseAlert}
        />
        <DataTable
          title='Backlog'
          data={data}
          columns={columns}
          placeSearch="project"
          searchTitle="Search By"
          onButtonClick={() => handleAdd()}
          handleChangeSearch={handleChangeSearch}
          onDetail={(id) => console.log('id detail: ', id)}
          onDelete={(id) => handleClickOpen()}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
        >
          <DialogTitle id="alert-dialog-title" className='dialog-delete-header'>
            {"Delete Data"}
          </DialogTitle>
          <DialogContent className="dialog-delete-content">
            <DialogContentText className='dialog-delete-text-content' id="alert-dialog-description">
              Warning: Deleting this data is irreversible. Are you sure you want to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions">
            <Button onClick={handleClose} variant='outlined' className="button-text">Cancel</Button>
            <Button onClick={onDelete} className='delete-button button-text'>Delete Data</Button>
          </DialogActions>
        </Dialog>
      </SideBar>
    </div>
  )
}

export default Backlog