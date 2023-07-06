import React, { useState } from 'react';
import rolePrevilege from './initjson.json'
// import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button } from '@mui/material';
import CustomAlert from '../../Component/Alert';
import SideBar from '../../Component/Sidebar';
import { Box } from '@mui/system';
import { useNavigate } from "react-router";


const RolePrivilege = () => {
  const getStatusColor = (privilege) => {
      const statusColors = {
        Inaccessible : '#FDECEB',
      }
      const onPrivilege = Array.isArray(privilege) ? privilege[0] : privilege;
      return statusColors[onPrivilege] || '#7367F033';
    };
  
    const getStatusFontColor = (privilege) => {
      const statusFontColors = {
        Inaccessible : '#EE695D',
      }
      const onPrivilege = Array.isArray(privilege) ? privilege[0] : privilege;
      return statusFontColors[onPrivilege] || '#7367F0';
    };

  const columns = [
    {
      field: 'no',
      headerName: 'No',
      // flex: 1 
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1 
    },
    {
      field: 'privilege',
      headerName: 'Privilege',
      flex: 1,
      renderCell: (data) => (
        <Box
          sx={{
            display: 'flex',
            padding: '5px 10px',
            alignItems: 'center',
            alignContent: 'flex-start',
            gap: '10px',
            flex: '1 0 0',
            // alignSelf: 'stretch',
            flexWrap: 'wrap',
            borderRadius: '4px',
            fontSize: '12px'
            // backgroundColor: getStatusColor,
            // color: getStatusFontColor(data.row.privilege),
            // padding: '5px 10px',
            // display: 'flex',
            // gap: '10px',
            // borderRadius: '4px',
            // fontSize: '12px'
          }}
        >
            {Array.isArray(data.row.privilege) ? (
          data.row.privilege.map((privilege, index) => (
          <Box
            key={privilege}
            sx={{
              padding: '5px 10px',
              borderRadius: '4px',
              backgroundColor: getStatusColor(privilege),
              color: getStatusFontColor(privilege),
            }}
          >
            {privilege}
          </Box>
        ))):(<></>)}
        </Box>
      ),
    }
  ];

  // const getStatusColor = (privilege) => {
  //   const statusColors = {
  //     Inaccessible : '#FDECEB',
  //   }
  //   return statusColors[privilege] || '#7367F033';
  // };

  // const getStatusFontColor = (privilege) => {
  //   const statusFontColors = {
  //     Inaccessible : '#EE695D',
  //   }
  //   return statusFontColors[privilege] || '#7367F0';
  // };

  const data = rolePrevilege.rolePrevilege
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onDelete = (id) => {
    setOpenAlert(true);
    console.log('id delete: ', id)
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
  
  const handleDetail = () => {
    navigate("/masterroleprivilege/detail");
  }
  const onAdd = () => {
    navigate("/masterroleprivilege/create");
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
          title='Role Privilege'
          data={data}
          columns={columns}
          placeSearch="Role, Privilege, etc"
          searchTitle="Search By"
          onAdd={() => onAdd()}
          // onButtonClick={() => handleAdd()}
          handleChangeSearch={handleChangeSearch}
          onDetail={(id) => handleDetail()}
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

export default RolePrivilege