import React, { useState, useEffect } from "react";
import {  
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CustomAlert from "../../Component/Alert";
import DataTable from "../../Component/DataTable";
import SideBar from "../../Component/Sidebar";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import client from "../../global/client";

const RoleUser = () => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertCreate, setOpenAlertCreate] = useState(false);  
  const [dataIduser, setDataIduser] = useState();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'name',
    sortType: 'desc',
    search: ''
  })
  const onFilter = (dataFilter) => {
    console.log('on filter: ', dataFilter)
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'name',
      sortType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'desc',
      search: filter.search
    })
  }
  
  useEffect(() => {
    getData()    
  }, [])


  const getData = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/userRole?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}&search=${filter.search}`
    })
    console.log("INI RES",res)
    rebuildData(res)
  }

  const rebuildData = (resData) => {
    let temp = []
    let number = filter.page * filter.size
    temp = resData.data.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.attributes.userId,        
        firstName: value.attributes.firstName,
        lastName: value.attributes.lastName,
        nip: value.attributes.nip,
        listRole: value.attributes.listRole.map((userRole) => [
          userRole.userRoleId,
          userRole.roleId,
          userRole.role,
          userRole.active,
        ]),      
      }
    })    
    setData([...temp])    
  }
  

  const deleteData = async (userId) => {    
    await client.requestAPI({
      method: 'DELETE',
      endpoint: `/userRole/delete/${userId}`
    })
    console.log('userId', userId)
    setOpenAlert(true);
    getData()
    handleClose();
  }

  const handleDelete = async (userId) => {    
    console.log('userId NYA', userId)
    setDataIduser(userId);
    setOpen(true);
  };  

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleCloseAlertCreate = () => {
    setOpenAlertCreate(false);
    localStorage.removeItem("isCreate");    
  };

  const handleDetail = async (userId) => {
    localStorage.setItem('idBacklog', userId)
    navigate("/masteruserrole/detail");
  };
  
  const statusColor = '#E5E3FA';
  const statusFontColors ='#7367F0';

  const columns = [
    {
      field: "no",
      headerName: "No",
      flex: 1,
    },
    {
      field: "user",
      headerName: "User",
      width: 200,
      flex: 1,
      renderCell: (data) => (
        <Box sx={{color: '#4B465C', fontSize: '15px'}}>
          {data.row.firstName + " " + data.row.lastName}
        </Box>
      ),
    },
    {
      field: "nip",
      headerName: "NIP",
      flex: 1,
    },   
    
    {
      field: "listRole",
      headerName: "Role",
      flex: 1,
      renderCell: (data) => (
        <Box
          sx={{            
            display: 'flex',
            padding: '5px 10px',
            gap: '10px',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
           {Array.isArray(data.row.listRole) ? (
        data.row.listRole.slice(0,3).map((listRole,index) => (
          <Box
            key={listRole}
            sx={{
              padding: '5px 10px',
              borderRadius: '4px',
              backgroundColor: statusColor,
              color: statusFontColors,              
            }}
            className={index >= 2 ? 'ellipsis' : ''}
          >            
            {index >= 2 ? '...' : listRole}
          </Box>
        ))
      ) : (
        <Box
          sx={{
            padding: '5px 10px',
            borderRadius: '4px',
            backgroundColor: statusColor,
            color: statusFontColors
          }}
        >
          {data.row.listRole}
        </Box>
      )}
        </Box>
      ),
    },   
  ];
  
  const handleChangeSearch = (event) => {
    console.log('value search: ', event.target.value)
    setFilter({
      ...filter,
      search: event.target.value
    });
  }

  const onAdd = () => {
    navigate("/masteruserrole/create");
  };

  return (
    <div>
      <SideBar>
      <CustomAlert
          severity="success"
          message="Success: New User Role created successfully!"
          open={openAlertCreate}
          onClose={handleCloseAlertCreate}
        />
        <CustomAlert
          severity="warning"
          message="Deletion completed: The item has been successfully remove from the database"
          open={openAlert}
          onClose={handleCloseAlert}
        />  

        <DataTable
          title="User Role"
          data={data}
          columns={columns}
          placeSearch="User, Role, etc"
          onAdd={() => onAdd()}
          handleChangeSearch={handleChangeSearch}
          onDetail={(userId) => handleDetail(userId)}
          onDelete={(userId) => handleDelete(userId)}
          onFilter={(dataFilter => onFilter(dataFilter))}          
        />

        <Dialog
          open={open}          
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Data"}</DialogTitle>
          <DialogContent className="dialog-delete-content">
            <DialogContentText
              className="dialog-delete-text-content"
              id="alert-dialog-description"
            >
              Warning: Deleting this data is irreversible. Are you sure you want
              to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions">
            <Button
              onClick={handleClose}
              variant="outlined"
              className="button-text"
            >
              Cancel
            </Button>
            <Button
              onClick={() =>deleteData(dataIduser)}
              className="delete-button button-text"
            >
              Delete Data
            </Button>
          </DialogActions>
        </Dialog>
        
      </SideBar>
    </div>
  );
};

export default RoleUser;
