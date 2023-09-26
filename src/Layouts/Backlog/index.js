import React, { useState, useEffect, useContext } from 'react';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Box } from '@mui/material';
import SideBar from '../../Component/Sidebar';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router";
import client from "../../global/client";
import { AlertContext } from "../../context";


const Backlog = () => {
  const columns = [
    {
      field: 'no',
      headerName: 'No',
      flex: 0.3,
      sortable: false,
    },
    {
      field: 'projectName',
      headerName: 'Project Name',
      flex: 0.7,
      minWidth: 200,
    },
    {
      field: 'taskCode',
      headerName: 'Task Code',
      flex: 0.7,
      minWidth: 200,
    },
    {
      field: 'taskName',
      headerName: 'Task Name',
      flex: 1 ,
      minWidth: 240
    },
    {
      field: 'priority',
      headerName: 'Priority',
      flex: 1,
      minWidth: 200,
      renderCell: (data) => (
        <Rating
          variant="outlined"
          name="rating"
          value={parseFloat(data.row.priority)} 
          readOnly
          precision={0.5}
        />
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 180,
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
      flex: 1 ,
      minWidth: 200
    }
  ];

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [idHapus,setidHapus] = useState();
  const [totalData, setTotalData] = useState();
  const { setDataAlert } = useContext(AlertContext)
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
      'Backlog' : '#7367F029',
      'In Progress': '#E6F2FB',
      'Completed' : '#EBF6EE', 
      'Done': '#EBF6EE'
    };
    return statusColors[status] || '#ccc';
  };

  const getStatusFontColor = (status) => {
    const statusFontColors = {
      'to do': '#EE695D',
      'Backlog' : '#4C4DDC',
      'In Progress': '#3393DF',
      'Completed' : '#5DB975',
      'Done': '#5DB975'
    };
    return statusFontColors[status] || '#fff';
  };

  const handleClickOpen = async (id) => {
    //setId
    setidHapus(id)
    setOpen(true)
  };

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
    setData([...temp])
    setTotalData(resData.meta.page.totalElements)
  }
  
  const deleteData = async (id) => {
    const res = await client.requestAPI({
      method: 'DELETE',
      endpoint: `/backlog/${id}`
    })
    setOpenAlert(true);
    getData()
    if (!res.isError) {
      setDataAlert({
        severity: 'warning',
        open: true,
        message: res.meta.message
      })
      handleClose();
    } else {
      setDataAlert({
        severity: 'error',
        message: res.error.detail,
        open: true
      })
    }
    handleClose();
  }
  

  const handleDetail = async (id) => {
    localStorage.setItem('idBacklog', id)
    navigate("/masterbacklog/detail");
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleChangeSearch = (event) => {
    setFilter({
      ...filter,
      page: event.target.value != "" ? 0 : filter.page,
      search: event.target.value
    });
  }
  
  
  const onAdd = () => {
    navigate("/masterbacklog/create");
  }

  const onFilter = (dataFilter) => {
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
        <DataTable
          title='Backlog'
          data={data}
          columns={columns}
          placeSearch="Project Name, task code, etc"
          searchTitle="Search By"
          onAdd={() => onAdd()}
          onFilter={(dataFilter => onFilter(dataFilter))}
          handleChangeSearch={handleChangeSearch}
          onDetail={(id) => handleDetail(id)}
          onDelete={(id) => handleClickOpen(id)}
          totalData={totalData}
          getRowHeight={() => 'auto'} getEstimatedRowHeight={() => 200}
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
            <Button onClick={() => deleteData(idHapus)} className='delete-button button-text'>Delete Data</Button>
            {/* <Button onClick={() => onDelete(idHapus)} className='delete-button button-text'>Delete Data</Button> */}
          </DialogActions>
        </Dialog>
      </SideBar>
    </div>
  )
}

export default Backlog