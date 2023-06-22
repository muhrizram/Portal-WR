import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Button } from '@mui/material';
import SearchBar from '../Searchbar';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DataTableEmployee = ({
  title, 
  data, 
  columns, 
  handleChangeSearch, 
  placeSearch, 
  searchTitle,
  onAdd
}) => {

  const [pagination, setPagination] = useState({ page: 0, pageSize: 10})
  const [sorting, setSort] = useState([])
  const [search, setSearch] =  useState('')
  const [importFile, setImportFile] = React.useState(false);

  const onImport = () =>{
    setImportFile(true);
  };

  const handleClose = () => {
    setImportFile(false);
  };


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
            <Grid item md={11.5} alignSelf="center" textAlign="right">
              <Button variant="outlined" style={{marginRight:3}} onClick={() => onAdd()} startIcon={<AddIcon />}>
                {`ADD NEW ${title}`}
              </Button>
              <Button variant="contained" onClick={onImport} startIcon={<UploadFileIcon />}>
              {`IMPORT ${title}`}
              </Button>
            </Grid>
            
            <Dialog
                open={importFile}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                // style={{width:'100%'}}
              >
                <DialogTitle id="alert-dialog-title" style={{alignSelf:'center'}}>
                  {"Import Data"}
                </DialogTitle>
                <DialogContentText style={{alignSelf:'center'}}>
                  {"Select the file you wish to import"}
                </DialogContentText> 
                <UploadFileIcon 
                  alignSelf="center"
                  textAlign="center "
                  style={{width:70}}
                /> 
                <DialogContent>
                  <DialogContentText id="alert-dialog-description" style={{marginLeft:50}}>
                    <Button variant="text">Click to upload</Button>
                    {"or drag and drop"}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description" style={{marginLeft:100}}>
                  {"e.g., Excel (max. 10MB)"}
                </DialogContentText>
              </DialogContent>
              <DialogActions alignSelf="center" textAlign="center" style={{marginRight:100, marginLeft:100}}>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleClose}> Import Data</Button>
              </DialogActions>
            </Dialog>


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
          onSortModelChange={(model) => changeSort(model)}
        />
        
      </Grid>
    </Grid>
  )
}

export default DataTableEmployee