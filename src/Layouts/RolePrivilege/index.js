import React, { useState, useEffect } from 'react';
import rolePrevilege from './initjson.json'
// import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button } from '@mui/material';
import CustomAlert from '../../Component/Alert';
import SideBar from '../../Component/Sidebar';
import { Box } from '@mui/system';
import { useNavigate } from "react-router";
import client from "../../global/client";


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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [dat, setData] = useState([]);
  const [idHapus,setidHapus] = useState()
  const [totalData, setTotalData] = useState()
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'roleCategoryName',
    sortType: 'asc'
  })


  const handleClickOpen = () => {
    setOpen(true);
  };

  const onDelete = () => {
    setOpenAlert(true);
    handleClose();
  };

  // useEffect(() => {
  //   getData()
  // }, [filter])

  // const getData = async () => {
  //   const res = await client.requestAPI({
  //     method: 'GET',
  //     // endpoint: `/backlog?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}`
  //   })
  //   rebuildData(res)
  // }

  // const rebuildData = (resData) => {
  //   let temp = []
  //   let number = filter.page * filter.size
  //   temp = resData.data.map((value, index) => {
  //     return {
  //       no: number + (index + 1),
  //       id: value.id,
  //       role: value.attributes.roleCategoryName,
  //       privilege: value.attributes.privilegeCategoryName,
  //       // taskName: value.attributes.taskName,
  //       // priority: value.attributes.priority,
  //       // status: value.attributes.status,
  //       // assignedTo: value.attributes.assignedTo
  //     }
  //   })
  //   console.log('temp: ', temp)
  //   setData([...temp])
  //   setTotalData(resData.meta.page.totalElements)
  // }
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:4000/rolePrevilege");
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

  // const onDelete = async(id) => {

  //   try {
  //     const response = await fetch(`http://localhost:4000/rolePrevilege/${id}`, {
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

  // const handleClickOpen = (id) => {
  //   console.log("INI TESTING ID MUNCUL",id)
  //   setidHapus(id);
  //   setOpen(true);
  // };

  // const onDelete = (id) => {
  //   setOpenAlert(true);
  //   console.log('id delete: ', id)
  //   handleClose()
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
  
  const handleDetail = (id) => {
    navigate("/masterroleprivilege/detail");
  }
  const onAdd = () => {
    navigate("/masterroleprivilege/create");
    console.log('add')
  }

  const onFilter = (dataFilter) => {
    console.log('on filter: ', dataFilter)
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'companyName',
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
          title='Role Privilege'
          data={data}
          columns={columns}
          placeSearch="Role, Privilege, etc"
          searchTitle="Search By"
          onAdd={() => onAdd()}
          onFilter={(dataFilter => onFilter(dataFilter))}
          // onButtonClick={() => handleAdd()}
          handleChangeSearch={handleChangeSearch}
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

export default RolePrivilege