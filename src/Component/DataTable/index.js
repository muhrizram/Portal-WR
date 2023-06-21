
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Button } from '@mui/material';
import SearchBar from '../Searchbar';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({title, data, columns, handleChangeSearch}) => {

  const [pagination, setPagination] = useState({ page: 0, pageSize: 10})
  
  const changePagination = (model) => {
    console.log('model pagination: ', model)
    setPagination({...model})
  }

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Grid container className="containerHeader">
          <div className="dividerHeader" />
          <Grid item xs={11.9}>
            <Typography variant="headerCardMenu">{`Master ${title}`}</Typography>
          </Grid>
          <Grid item justifyContent="space-between" container xs={12} paddingTop={3}>
            <Grid item xs={4}>
              <SearchBar placeholder="project" onChange={handleChangeSearch} />
            </Grid>
            <Grid item xs={2} alignSelf="center" textAlign="right">
              <Button variant="contained" startIcon={<AddIcon />}>
                {`ADD NEW ${title}`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <DataGrid 
          rows={data}
          columns={columns}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 20, 50]}
          paginationModel={{ ...pagination }}
          onPaginationModelChange={(model) => changePagination(model)}
        />
        
      </Grid>
    </Grid>
  )
}

export default DataTable