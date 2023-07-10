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
  const [dataIduser, setDataIduser] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [totalData, setTotalData] = useState()
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'companyName',
    sortType: 'asc'
  })
  const onFilter = (dataFilter) => {
    console.log('on filter: ', dataFilter)
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'companyName',
      sortType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'asc',
    })
  }

  const rebuildData = (resData) => {
    let temp = []
    let number = filter.page * filter.size
    temp = resData.data.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.id,
        companyName: value.attributes.companyName,
        companyProfile: value.attributes.companyProfile,
        address: value.attributes.address,
        companyEmail: value.attributes.companyEmail,
        npwp: value.attributes.npwp
      }
    })
    console.log('temp: ', temp)
    setData([...temp])
    setTotalData(resData.meta.page.totalElements)
  }
  useEffect(() => {
    // getData()
    fetchData()
  }, [])

  const getData = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/company?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}`
    })
    rebuildData(res)
  }

  const deleteData = async (id) => {
    const res = await client.requestAPI({
      method: 'DELETE',
      endpoint: `/userRole/delete/${id}`
    })
    rebuildData(res)
  }

  // useEffect(() => {
  //   fetchData();
  //   let isCreate = localStorage.getItem("isCreate")
  //   setOpenAlertCreate(isCreate);  
  // }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/content");
      const jsonData = await response.json();      
      const updatedData = jsonData.map((item, index) => ({
        ...item,
        no: index + 1,
      }));
      setData2(updatedData);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const handleDelete = async (id) => {
    setDataIduser(id);
    setOpen(true);
  };  

  const onDeletenya = async (dataIduser) => {
    try {
      console.log(dataIduser);
      const response = await fetch(`http://localhost:4000/content/${dataIduser}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setOpenAlert(true);
        fetchData();
      } else {
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }    
    setOpen(false);
  }

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

  const handleDetail = () => {
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
      field: "nip",
      headerName: "NIP",
      flex: 1,
    },   
    {
      field: "user",
      headerName: "User",
      width: 200,
      flex: 1,      
    },
    {
      field: "role",
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
           {Array.isArray(data.row.role) ? (
        data.row.role.map((role) => (
          <Box
            key={role}
            sx={{
              padding: '5px 10px',
              borderRadius: '4px',
              backgroundColor: statusColor,
              color: statusFontColors,
            }}
          >
            {role}
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
          {data.row.role}
        </Box>
      )}
        </Box>
      ),
    },   
  ];
  const handleChangeSearch = (event) => {
    console.log("value search: ", event.target.value);
  };

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
          data={data2}
          columns={columns}
          placeSearch="User, Role, etc"
          onAdd={() => onAdd()}
          handleChangeSearch={handleChangeSearch}
          onDetail={(id) => handleDetail(id)}
          onDelete={(id) => handleDelete(id)}
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
              onClick={() =>onDeletenya(dataIduser)}
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
