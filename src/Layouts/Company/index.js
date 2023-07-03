import React, { useState } from 'react';
import datatemp from './initjson.json'
// import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button } from '@mui/material';
import CustomAlert from '../../Component/Alert';
import SideBar from '../../Component/Sidebar';
import { useNavigate } from 'react-router';
const MasterCompany = () => {
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1 
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1 
    }
  ];
  const data = []
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false)
  const navigate = useNavigate()

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
    navigate('/master-company/create')
  }
  return (
    <div>
      <SideBar>
        <CustomAlert
          severity='warning'
          message='This is a waring message!'
          open={openAlert}
          onClose={handleCloseAlert}
        />
        <DataTable
          title='Company'
          data={data}
          columns={columns}
          placeSearch="company"
          searchTitle="Search By"
          onAdd={() => handleAdd()}
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
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
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

export default MasterCompany