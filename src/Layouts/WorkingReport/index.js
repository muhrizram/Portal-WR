import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Button, Tab } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import SearchBar from '../../Component/Searchbar';
import DownloadIcon from '@mui/icons-material/Download';
import SettingsIcon from '@mui/icons-material/Settings';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import ava from '../../assets/avatar.png'
import TabMenu from '../../Component/tabMenu';
import RangeDatePic from '../../Component/datePicker';
// import datatemp from './initjson.json'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const WorkingReport = () => {
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1 
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1 
    },
    {
      field: 'actions',
      headerName: '',
      width: 200,
      renderCell: () => {
        return (
          <div>
            <DriveFileRenameOutlineOutlinedIcon className="iconTable" />
            <DeleteOutlineOutlinedIcon className="iconTable" />
          </div>
        )
      }

    },
  ];
//   const data = datatemp.datatemp

  const handleChangeSearch = (event) => {
    console.log('value search: ', event.target.value)
  }
  return (
      <Grid container rowSpacing={2.5}>
        <Grid item xs={12}>
          <Grid container className="containerHeader">
            <div className="dividerHeader" />
            <Grid item xs={9.9}>
              <Typography variant="headerCardMenu">Working Report</Typography>
            </Grid>
            <Grid item />
            <Grid item xs={2} alignSelf="center" textAlign="center">
                <div className="containerButton">
                    <Button variant="contained" startIcon={<DownloadIcon />}>
                        DOWNLOAD
                    </Button>
                    <Button variant="outlined" startIcon={<SettingsIcon />}>
                        SETTING
                    </Button>
                </div>  
            </Grid> 
            <img alt="leftImage" className='fotoprofile' src={ava} />   
            <h1 style={{marginLeft: 27}}>Employee Details</h1>
            {/* <Grid alignSelf="center" textAlign="left">
              <Typography variant="h5">Employee Details</Typography>
            </Grid> */}
            <div className='employetext'> 
                <p className='textnameemploye'>Name</p>
                <p className='textnameemploye'>Role</p>
                <p className='textnameemploye'>Email</p>
            </div>
            <div className='employetextvalue'> 
                <strong className='textnameemployevalue'>Reyna</strong>
                <strong className='textnameemployevalue'>FrontEnd</strong>
                <strong className='textnameemployevalue'>Reynanur@gmail.com</strong>
            </div>
          </Grid>
          <TabMenu />
          <RangeDatePic />
        </Grid>
      </Grid>
  )
}

export default WorkingReport