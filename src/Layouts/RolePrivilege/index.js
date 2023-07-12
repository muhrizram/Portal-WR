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
            flexWrap: 'wrap',
            borderRadius: '4px',
            fontSize: '12px',
            backgroundColor: getStatusColor(data.row.privilege),
            color: getStatusFontColor(data.row.privilege),
            // padding: '5px 10px',
            // display: 'flex',
            // gap: '10px',
            // borderRadius: '4px',
            // fontSize: '12px'
          }}
        >
          {data.row.privilege}
            {/* {Array.isArray(data.row.privilege) ? (
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
        ))):(<></>)} */}
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
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'roleId',
    sortType: 'asc',
    search: ''
  })


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
      endpoint: `/rolePrivilege?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}&search=${filter.search}`
      // 0&size=20&search=
    })
    rebuildData(res)
  }

  const rebuildData = (resData) => {
    let temp = []
    let number = filter.page * filter.size
    temp = resData.data.map((value, index) => {
      const privileges = value.attributes.listPrivilege.map((privilege) => privilege.privilegeName).join(', ')
      return {
        no: number + (index + 1),
        id: value.id,
        role: value.attributes.roleName,
        privilege: privileges,
      }
    })
    console.log('temp: ', temp)
    setData([...temp])
    setTotalData(resData.meta.page.totalElements)
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