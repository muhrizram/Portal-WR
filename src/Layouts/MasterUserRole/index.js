import React, { useState, useEffect, useContext } from "react";

import { AlertContext } from '../../context';
import DataTable from "../../Component/DataTable";
import SideBar from "../../Component/Sidebar";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import client from "../../global/client";
import DeleteDialog from "../../Component/DialogDelete";

const RoleUser = () => {
  const [open, setOpen] = useState(false);
  const [dataIduser, setDataIduser] = useState();
  const [totalData, setTotalData] = useState()
  const [data, setData] = useState([]);
  const { setDataAlert } = useContext(AlertContext)
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'name',
    sortType: 'asc',
    search: ''
  })
  const onFilter = (dataFilter) => {    
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'name',
      sortType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'asc',
      search: filter.search
    })
  }
  
  useEffect(() => {
    getData()    
  }, [filter])


  const getData = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/userRole?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}&search=${filter.search}`
    })
    if(!res.isError){      
      rebuildData(res)          
    }else {      
      setDataAlert({
        severity: 'error',
        message: res.error.meta.message,
        open: true
      })
    }    
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
          userRole.role,
          userRole.active,
        ]),      
      }
    })    
    setData([...temp])
    setTotalData(resData.meta.page.totalElements)
  }
  

  const deleteData = async (userId) => {    
    const res = await client.requestAPI({
      method: 'DELETE',
      endpoint: `/userRole/delete/${userId}`
    })
    if(!res.isError){      
      setDataAlert({
        severity: 'warning',
        open: true,
        message: res.meta.message
      }) 
      setTimeout(() => {
        navigate('/masteruserrole')
      }, 3000)      
    }else {      
      setDataAlert({
        severity: 'error',
        message: res.error.meta.message,
        open: true
      })
    }    
    getData()
    handleClose();
  }

  const handleDelete = async (userId) => {        
    setDataIduser(userId);
    setOpen(true);
  };  

  const handleClose = () => {
    setOpen(false);
    setFilter({
      page: 0,
      size: 10,
      sortName: 'name',
      sortType: 'asc',
      search: ''
    })
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
      flex: 0.3,
      sortable: false
    },
    {
      field: "nip",
      headerName: "NIP",
      flex: 0.7,
      minWidth: 200,
    },   
    {
      field: "name",
      headerName: "User",
      width: 200,
      flex: 1,
      minWidth: 250,
      renderCell: (data) => (
        <Box sx={{color: '#4B465C', fontSize: '15px'}}>
          {data.row.firstName + " " + data.row.lastName}
        </Box>
      ),
    },
    
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      minWidth: 300,
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
    setFilter({
      ...filter,
      page: event.target.value != "" ? 0 : filter.page,
      search: event.target.value
    });
  }

  const onAdd = () => {
    navigate("/masteruserrole/create");
  };

  return (
    <div>
      <SideBar>   
        <DataTable
          title="User Role"
          data={data}
          columns={columns}
          placeSearch="User, Role, etc"
          searchTitle="Search By"
          onAdd={() => onAdd()}
          handleChangeSearch={handleChangeSearch}
          onDetail={(userId) => handleDetail(userId)}
          onDelete={(userId) => handleDelete(userId)}
          onFilter={(dataFilter => onFilter(dataFilter))}
          totalData={totalData}
          getRowHeight={() => 'auto'}
          filter={filter}
        />

        <DeleteDialog dialogOpen={open} handleClose={handleClose} deleteData={deleteData} id={dataIduser} />       
      </SideBar>
    </div>
  );
};

export default RoleUser;
