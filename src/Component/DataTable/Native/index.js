import React from 'react';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import blanktable from '../../../assets/blanktable.png'
import '../../../App.css'

const TableNative = ({
  data,
  columns
}) => {

  return (
    <Grid container>
      {data.length > 0 ? (
        <Grid item xs={12}>
          <DataGrid
            rows={data}
            columns={columns}
            disableRowSelectionOnClick
            hideFooterPagination
            disableColumnFilter
            disableColumnMenu
            hideFooter
            getRowId={(row) => row.id}
          />
        </Grid>
      ) : (
        <Grid
          container
          item
          xs={12}
          minHeight="600px"
          alignContent="center"
          alignItems="center"
          display="flex"
          justifyContent="center"
          textAlign="center"
        >
          <Grid item xs={12} pb={3.75}>
            <img src={blanktable} alt="blank-table" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="noDataTable">
              Sorry, the data you are looking for could not be found.
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  )

}

export default TableNative