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
  // const data = backlog.backlog


  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [idHapus,setidHapus] = useState();
  const [totalData, setTotalData] = useState()
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'taskName',
    sortType: 'asc'
  })


  
  const getStatusColor = (status) => {
    const statusColors = {
      'to do': '#FDECEB',
      'In Progress': '#E6F2FB',
      'Success': '#EBF6EE'
    };
  
    // Return the color for the given status, default to a fallback color if not found
    return statusColors[status] || '#ccc'; // Fallback color: gray
  };

  const getStatusFontColor = (status) => {
    const statusFontColors = {
      'to do': '#EE695D',
      'In Progress': '#3393DF',
      'Success': '#5DB975'
    };
  
    // Return the color for the given status, default to a fallback color if not found
    return statusFontColors[status] || '#fff'; // Fallback color: gray
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onDelete = () => {
    setOpenAlert(true);
    handleClose();
  };

  useEffect(() => {
    getData()
  }, [filter])

  const getData = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/backlog?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}`
      // endpoint: `/company?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}`
    })
    rebuildData(res)
  }

  const handleDetail = async (id) => {
    localStorage.setItem('id', id)
    // console.log('idnya', id)
    // const res = await client.requestAPI({
    //   method: 'GET',
    //   endpoint: `/backlog/${id}`
    //   // endpoint: `/company?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}`
    // })
    // console.log('ini data detai', res)
    // rebuildDataDetail(res)
    navigate("/masterbacklog/detail");
  };

  // const rebuildDataDetail = (resData) => {
  //   let tempDetail = {
  //       id: resData.data.id,
  //       projectName: resData.data.attributes.projectName,
  //       taskCode: resData.data.attributes.taskCode,
  //       taskName: resData.data.attributes.taskName,
  //       taskDescription: resData.data.attributes.taskDescription,
  //       taskName: resData.data.attributes.taskName,
  //       priority: resData.data.attributes.priority,
  //       status: resData.data.attributes.status,
  //       estimationTime: resData.data.attributes.estimationTime,
  //       actualTime: resData.data.attributes.actualTime,
  //       assignedTo: resData.data.attributes.assignedTo
  //     }
    
  //   console.log('tempDetail: ', tempDetail)
  //   setDataDetail(tempDetail)
  // }

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

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:4000/backlog");
  //     const jsonData = await response.json();
  //     const updatedData = jsonData.map((item, index) => ({
  //       ...item,
  //       no: index + 1,
  //     }));
  //     console.log("INI FETCHING ",updatedData)
  //     setData(updatedData);
  //   } catch (error) {
  //     console.log("Error fetching data: ", error);
  //   }
  // };

  // const handleClickOpen = (id) => {
  //   console.log("INI TESTING ID MUNCUL",id)
  //   setidHapus(id);
  //   setOpen(true);
  // };

  // const onDelete = async(id) => {

  //   try {
  //     const response = await fetch(`http://localhost:4000/backlog/${id}`, {
  //       method: "DELETE",
  //     });
  //     if (response.ok) {
  //       setOpenAlert(true);
  //       fetchData(); // Ambil data terbaru setelah berhasil menghapus
  //     } else {
  //       console.error("Failed to delete data");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting data:", error);
  //   }
  //   handleClose();

  // }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const handleChangeSearch = (event) => {
    console.log('value search: ', event.target.value)
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
            <Button onClick={() => onDelete(idHapus)} className='delete-button button-text'>Delete Data</Button>
          </DialogActions>
        </Dialog>
      </SideBar>
    </div>
  )
}

export default Backlog