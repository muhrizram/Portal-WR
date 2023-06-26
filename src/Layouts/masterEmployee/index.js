import React, {useState, useEffect} from 'react';
import content from './initjson.json';
import { Avatar } from '@mui/material';

// import content from '../JobGroup/initjson.json'
import DataTableEmployee from '../../Component/DataTable/employee';
import { IconButton, Button, Dialog, DialogContent, DialogTitle, DialogContentText,DialogActions, Typography } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomAlert from '../../Component/Alert';

const Employee = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/content");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:4000/content/${id}`, {
  //       method: "DELETE",
  //     });
  //     if (response.ok) {
  //       fetchData(); // Ambil data terbaru setelah berhasil menghapus
  //     } else {
  //       console.error("Failed to delete data");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting data:", error);
  //   }
  // };


  
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false)
  const [Idnya, setIdnya] = useState("")

  const handleClickOpen = (id) => {
    console.log("IDNYA",id)
    setIdnya(id)
    console.log(Idnya)
    setOpen(true);
  };

  const onDelete = () => {
    console.log("Idnya ",Idnya)
    setOpenAlert(true);
    handleClose()
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const columns = [
    {
      field: 'no',
      headerName: 'No',
      flex: 1 
    },
    {
      field: 'nip',
      headerName: 'NIP',
      flex: 1 
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1 ,
      renderCell: (params) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={params.row.image} className="img-master-employee" alt="Profile Image" />
            <div style={{ marginLeft: '0.5rem' }}>
            <span className="text-name">{params.row.name}</span>
            <span className="text-position">{params.row.position}</span>
            </div>
          </div>
        );
      },
    },
    {
        field: 'contract',
        headerName: 'Contract Status',
        flex: 1 
    },
    {
        field: 'assignment',
        headerName: 'Assignment',
        flex: 1 
    },
    {
        field: 'contractEnd',
        headerName: 'Contract End Date',
        flex: 1 
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 200,
      renderCell: (data) => {
        return (
          <div>
            <IconButton href="/detail">
              <PreviewIcon />
            </IconButton>
            <IconButton onClick={() => handleClickOpen(data.id)}>
              <DeleteIcon />
            </IconButton >
          </div>
        )
      }

    },
  ];
  // const data = content.content
  const handleChangeSearch = (event) => {
    console.log('value search: ', event.target.value)
  }
  return (
    <div>
      <CustomAlert
        severity='warning'
        message='Deletion completed: The item has been successfully remove from the database'
        open={openAlert}
        onClose={handleCloseAlert}
      />

      <DataTableEmployee
        title='Employee'
        data={data}
        columns={columns}
        handleChangeSearch={handleChangeSearch}
        onDetail={(id) => console.log('id detail: ', id)}
        onDelete={(id) => console.log('id delete: ', id)}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-delete"
      >
        <DialogTitle id="alert-dialog-title">
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
    </div>
  )
}

export default Employee