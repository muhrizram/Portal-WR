import React, { useState, useEffect } from 'react';
import backlog from './initjson.json';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button } from '@mui/material';
import CustomAlert from '../../Component/Alert';
import SideBar from '../../Component/Sidebar';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';
import { useNavigate } from "react-router";


const Backlog = () => {
  const columns = [
    {
      field: 'no',
      headerName: 'No',
      // flex: 1 
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
      // renderCell: (data) => (
      //   <Rating
      //     name="rating"
      //     value={data.row.priority} // Ambil nilai rating dari properti "priority"
      //     readOnly
      //     precision={0.5}
      //   />
      // )
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
  const data = backlog.backlog

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
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const [dat, setData] = useState();
const [idHapus,setidHapus] = useState()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/backlog");
      const jsonData = await response.json();
      const updatedData = jsonData.map((item, index) => ({
        ...item,
        no: index + 1,
      }));
      console.log("INI FETCHING ",updatedData)
      setData(updatedData);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const handleClickOpen = (id) => {
    console.log("INI TESTING ID MUNCUL",id)
    setidHapus(id);
    setOpen(true);
  };

  const onDelete = async(id) => {
    console.log("INI IDNYA SA GA HADIR HOREE : ", id)

    try {
      const response = await fetch(`http://localhost:4000/backlog/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setOpenAlert(true);
        fetchData(); // Ambil data terbaru setelah berhasil menghapus
      } else {
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    handleClose();

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
  
  const handleDetail = (id) => {
    navigate("/masterbacklog/detail");
  };

  const onAdd = () => {
    navigate("/masterbacklog/create");
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
          onAdd={() => onAdd()}
          // onButtonClick={() => handleAdd()}
          handleChangeSearch={handleChangeSearch}
          // onDetail={(id) => console.log('id detail: ', id)}
          onDetail={(id) => handleDetail(id)}
          onDelete={(id) => handleClickOpen(id)}
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
            <Button onClick={() => onDelete(idHapus)} className='delete-button button-text'>Delete Data</Button>
          </DialogActions>
        </Dialog>
      </SideBar>
    </div>
  )
}

export default Backlog