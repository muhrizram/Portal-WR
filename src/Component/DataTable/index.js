
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Button, IconButton } from '@mui/material';
import SearchBar from '../Searchbar';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';

const DataTable = ({
  title, 
  data, 
  columns, 
  handleChangeSearch, 
  placeSearch, 
  searchTitle,
  onAdd,
  onDetail,
  onDelete
}) => {

  const [pagination, setPagination] = useState({ page: 0, pageSize: 10})
  const [sorting, setSort] = useState([])
  const [dataColumns, setDataColumns] = useState([])

  /**
   * return fungsi model dari pagination.
   *
   * @param {model} object Page & page size saat ini.
   */
  const changePagination = (model) => {
    setPagination({...model})
  }

  /**
   * return fungsi model dari sorting.
   *
   * @param {model} object field & sort size saat ini dalam bentuk array.
   */
  const changeSort = (model) => {
    setSort([{...model}])
  }

  const handleBuildList = (filter) => {
    console.log('filter: ', filter)
  }

  useEffect(() => {
    const filter = {
      sorting: sorting.length > 0 ? { ...sorting[0] } : { field: '', sort: '' },
      ...pagination
    }
    handleBuildList(filter)
  }, [sorting, pagination])

  useEffect(() => {
    console.log("rebuild columns: ", columns)
    const temp = [...columns]
    temp.push({
      field: 'actions',
      headerName: 'Action',
      width: 200,
      renderCell: (data) => {
        return (
          <div>
            <IconButton onClick={() => onDetail(data.id)}>
              <PreviewIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(data.id)}>
              <DeleteIcon />
            </IconButton >
          </div>
        )
      }
    })
    setDataColumns(temp)
  }, [columns])

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
              <SearchBar placeholder={placeSearch} label={searchTitle} onChange={handleChangeSearch} />
            </Grid>
            <Grid item xs={2} alignSelf="center" textAlign="right">
              <Button variant="contained" onClick={() => onAdd()} startIcon={<AddIcon />}>
                {`ADD NEW ${title}`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <DataGrid 
          rows={data}
          columns={dataColumns}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 20, 50]}
          paginationModel={{ ...pagination }}
          onPaginationModelChange={(model) => changePagination(model)}
          onSortModelChange={(model) => changeSort(model)}
          disableColumnFilter
          disableColumnMenu
        />
        
      </Grid>
    </Grid>
  )
}

export default DataTable