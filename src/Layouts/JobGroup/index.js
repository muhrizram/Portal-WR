import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchBar from '../../Component/Searchbar';
import { DataGrid } from '@mui/x-data-grid';
import datatemp from './initjson.json'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
const Jobgroup = () => {
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
  const data = datatemp.datatemp

  const handleChangeSearch = (event) => {
    console.log('value search: ', event.target.value)
  }
  return (
      <Grid container rowSpacing={2.5}>
        <Grid item xs={12}>
          <Grid container className="containerHeader">
            <div className="dividerHeader" />
            <Grid item xs={9.9}>
              <Typography variant="headerCardMenu">Job Group</Typography>
            </Grid>
            <Grid item />
            <Grid item xs={2} alignSelf="center" textAlign="right">
              <Button variant="outlined" startIcon={<AddIcon />}>
                ADD NEW JOB GROUP
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="searchTitleText">Search by group name</Typography>
        </Grid>
        <Grid item xs={12}>
          <SearchBar placeholder="project" onChange={handleChangeSearch} />
        </Grid>
        <Grid item xs={12}>
          <DataGrid 
            rows={data}
            columns={columns}
            disableRowSelectionOnClick
            hideFooter
          />
        </Grid>
      </Grid>
  )
}

export default Jobgroup