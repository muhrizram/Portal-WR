import React, { useState, useEffect } from 'react';
// import backlog from './initjson.json';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button } from '@mui/material';
import CustomAlert from '../../Component/Alert';
import SideBar from '../../Component/Sidebar';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';
import { useNavigate } from "react-router";
import client from "../../global/client";


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

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [idHapus,setidHapus] = useState();
  const [totalData, setTotalData] = useState()
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'taskName',
    sortType: 'asc',
    search: ''
  })

  
  const getStatusColor = (status) => {
    const statusColors = {
      'to do': '#FDECEB',
      'Backlog' : '#E6F2FB',
      'In Progress': '#E6F2FB',
      'Completed' : '#EBF6EE', 
      'Done': '#EBF6EE'
    };
    return statusColors[status] || '#ccc';
  };

  const getStatusFontColor = (status) => {
    const statusFontColors = {
      'to do': '#EE695D',
      'Backlog' : '#3393DF',
      'In Progress': '#3393DF',
      'Completed' : '#5DB975',
      'Done': '#5DB975'
    };
    return statusFontColors[status] || '#fff';
  };

  const handleClickOpen = async (id) => {
    setOpen(true);
  };

  // const onDelete = () => {
  //   setOpenAlert(true);
  //   handleClose();
  // };

  useEffect(() => {
    getData()
  }, [filter])

  const getData = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/backlog?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}&search=${filter.search}`
    })
    rebuildData(res)
  }

  const rebuildData = (resData) => {
    let temp = []
    let number = filter.page * filter.size
    temp = resData.data.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.id,
        projectName: value.attributes.projectName,
        taskCode: value.attributes.taskCode,
        taskName: value.attributes.taskName,
        priority: value.attributes.priority,
        status: value.attributes.status,
        assignedTo: value.attributes.assignedTo
      }
    })
    console.log('temp: ', temp)
    setData([...temp])
    setTotalData(resData.meta.page.totalElements)
  }
  
  const deleteData = async (id) => {
    const res = await client.requestAPI({
      method: 'DELETE',
      endpoint: `/backlog/${id}`
    })
    console.log('id', id)
    setOpenAlert(true);
    handleClose();
  }
  

  const handleDetail = async (id) => {
    localStorage.setItem('idBacklog', id)
    navigate("/masterbacklog/detail");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const handleChangeSearch = (event) => {
    console.log('value search: ', event.target.value)
    setFilter({
      ...filter,
      search: event.target.value
    });
  }
  
  
  const onAdd = () => {
    navigate("/masterbacklog/create");
    console.log('add')
  }

  const onFilter = (dataFilter) => {
    console.log('on filter: ', dataFilter)
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'taskName',
      sortType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'asc',
      search: filter.search
    })
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
          onFilter={(dataFilter => onFilter(dataFilter))}
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
            <Button onClick={deleteData} className='delete-button button-text'>Delete Data</Button>
            {/* <Button onClick={() => onDelete(idHapus)} className='delete-button button-text'>Delete Data</Button> */}
          </DialogActions>
        </Dialog>
      </SideBar>
    </div>
  )
}

export default Backlog