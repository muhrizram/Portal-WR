import React, { useState } from 'react';
import backlog from './initjson.json';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button } from '@mui/material';
import CustomAlert from '../../Component/Alert';
import SideBar from '../../Component/Sidebar';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';


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
      flex: 1,
      renderCell: (data) => (
        <Rating
          name="rating"
          value={data.row.priority} // Ambil nilai rating dari properti "priority"
          readOnly
          precision={0.5}
        />
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (data) => (
        <Box
          sx={{
            backgroundColor: getStatusColor(data.row.status),
            color: getStatusFontColor(data.row.status),
            padding: '5px 10px',
            gap: '10px',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          {data.row.status}
        </Box>
      ),
    },
    {
      field: 'assignedTo',
      headerName: 'Assigned To',
      flex: 1 
    }
  ];
  const data = backlog.backlog.map(item => ({
    ...item,
    rating: item.priority // Ubah properti "priority" sesuai dengan properti "rating"
  }));

  const getStatusColor = (status) => {
    const statusColors = {
      Todo: '#FDECEB',
      InProgress: '#E6F2FB',
      Success: '#EBF6EE'
    };
  
    // Return the color for the given status, default to a fallback color if not found
    return statusColors[status] || '#ccc'; // Fallback color: gray
  };

  const getStatusFontColor = (status) => {
    const statusFontColors = {
      Todo: '#EE695D',
      InProgress: '#3393DF',
      Success: '#5DB975'
    };
  
    // Return the color for the given status, default to a fallback color if not found
    return statusFontColors[status] || '#ccc'; // Fallback color: gray
  };

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
          placeSearch="Project Name"
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