import React, { useState, useEffect, useContext } from 'react';
import DataTable from '../../Component/DataTable';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button } from '@mui/material';
import CustomAlert from '../../Component/Alert';
import SideBar from '../../Component/Sidebar';
import { Box } from '@mui/system';
import { useNavigate } from "react-router";
import client from "../../global/client";
import Grid from '@mui/material/Grid';
import { gridClasses } from '@mui/x-data-grid';
import { AlertContext } from "../../context";


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
      width: 60,
      flex: 0.2
    },
    {
      field: 'roleName',
      headerName: 'Role',
      flex: 1,
      width: 80
    },
    {
      field: 'privilege',
      headerName: 'Privilege',
      flex: 1,
      renderCell: (data) => (
        <Box className="chips"
        > 
          {Array.isArray(data.row.privilege) ? (data.row.privilege.slice(0,4).map((privilege, index) => (
            <Box
              key={`${privilege}-${index}`}
              sx={{
                padding: '5px 10px',
                borderRadius: '4px',
                backgroundColor: getStatusColor(privilege),
                color: getStatusFontColor(privilege),
              }}
              className={index >= 3 ? 'ellipsis' : ''}
            >
              {index >= 3 ? '...' : privilege}
            </Box>
          ))):(<></>)}
          </Box>
        ),
    }
  ];

  // const data = rolePrevilege.rolePrevilege
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [data, setData] = useState([]);
  const [idHapus,setidHapus] = useState()
  const [totalData, setTotalData] = useState()
  const { setDataAlert } = useContext(AlertContext)
  const [filter, setFilter] = useState({
    page: 0,
    size: 20,
    sortName: 'roleName',
    sortPrivilege: 'privilege',
    sortNameType: 'asc',
    sortPrivilegeType: 'desc',
    search: ''
  })


  const handleClickOpen = async (id) => {
    setidHapus(id)
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
      endpoint: `/rolePrivilege?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortNameType}&sort=${filter.sortPrivilege},${filter.sortPrivilegeType}&search=${filter.search}`
    })
    rebuildData(res)
    console.log('list role privilege', res)
  }

  const rebuildData = (resData) => {
    let temp = []
    let number = filter.page * filter.size
    temp = resData.data.map((value, index) => {
      const privileges = value.attributes.listPrivilege.map((privilege) => privilege.privilegeName)
      return {
        no: number + (index + 1),
        id: value.id,
        roleName: value.attributes.roleName,
        privilege: privileges,
      }
    })
    console.log('temp: ', temp)
    setData([...temp])
    setTotalData(resData.meta.page.totalElements)
  }

  const deleteData = async (id) => {
    const res = await client.requestAPI({
      method: 'DELETE',
      endpoint: `/rolePrivilege/delete/${id}`
    })
    console.log('response', res)
    // console.log('id', id)
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
  
  const handleDetail = async (id) => {
    localStorage.setItem('idRolePrivilege', id)
    console.log('idDetail', id)
    navigate("/masterroleprivilege/detail");
  }
  const onAdd = (createdBy) => {
    // localStorage.setItem('createdBy', createdBy)
    navigate("/masterroleprivilege/create");
    console.log('add')
  }

  const onFilter = (dataFilter) => {
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'roleName',
      sortNameType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'asc',
      sortPrivilege: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'privilege',
      sortPrivilegeType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'desc',
      search: filter.search
    })
    
    console.log('on filter: ', dataFilter)
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
        <Grid container wrap="nowrap">
        <DataTable
          title='Role Privilege'
          data={data}
          columns={columns}
          placeSearch="Role, Privilege, etc"
          searchTitle="Search By"
          onAdd={() => onAdd()}
          onFilter={(dataFilter => onFilter(dataFilter))}
          handleChangeSearch={handleChangeSearch}
          onDetail={(id) => handleDetail(id)}
          onDelete={(id) => handleClickOpen(id)}
          totalData={totalData}
          getRowHeight={() => 'auto'}
          // slots={{ toolbar: GridToolbar }}
        />
        </Grid>
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
          </DialogActions>
        </Dialog>
      </SideBar>
    </div>
  )
}

export default RolePrivilege