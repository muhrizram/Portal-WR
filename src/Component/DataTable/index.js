
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Button, IconButton, TextField } from '@mui/material';
import SearchBar from '../Searchbar';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import blanktable from '../../assets/blanktable.png'
import '../../App.css'
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import { EditOutlined, UploadFileOutlined } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DataTable = ({
  title,
  data,
  columns,
  handleChangeSearch,
  handleChangeMonthFilter,
  handleChangeYearFilter,
  placeSearch,
  searchTitle,
  onAdd,
  onEdit,
  onUpload,
  onDetail,
  onDelete,
  onFilter,
  totalData,
  onEmployee,
  loading = false
}) => {
  const [pagination, setPagination] = useState({ page: 0, pageSize: 10 });
  const [sorting, setSort] = useState([]);
  const [dataColumns, setDataColumns] = useState([]);

  /**
   * return fungsi model dari pagination.
   *
   * @param {model} object Page & page size saat ini.
   */
  const changePagination = (model) => {
    setPagination({ ...model });
  };

  /**
   * return fungsi model dari sorting.
   *
   * @param {model} object field & sort size saat ini dalam bentuk array.
   */
  const changeSort = (model) => {
    if (model.length > 0) {
      setSort([{ ...model }]);
    } else {
      setSort([{
        field: "",
        sort: "",
      }])
    }
  };

  const handleBuildList = (filter) => {
    onFilter(filter)
  }

  useEffect(() => {
    const filter = {
      sorting: sorting.length > 0 ? { ...sorting[0] } : { field: "", sort: "" },
      ...pagination,
    };
    handleBuildList(filter);
  }, [sorting, pagination]);

  useEffect(() => {
    const temp = [...columns];   
    if(!onEmployee) {
      temp.push({
        field: "actions",
        headerName: "Action",
        width: 200,
        renderCell: (data) => {
          return (
            <div>
              {onEdit ? (
                <IconButton onClick={() => onEdit(data.id)}>
                  <EditOutlined />
                </IconButton>
              ) : (
                <IconButton onClick={() => onDetail(data.id)}>
                  <PreviewIcon />
                </IconButton>                 
              )} 
              <IconButton onClick={() => onDelete(data.id)}>
                <DeleteIcon />
              </IconButton>  
            </div>
          );
        },
      }); 
    }
    setDataColumns(temp);
  }, [columns]);

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Grid container className="containerHeader">
          <Grid item>
            <div className="dividerHeader" />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="headerCardMenu">{`Master ${title}`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        justifyContent="space-between"
        container
        xs={12}
        paddingTop={3}
      >
      {!onUpload ? (
        <Grid item xs={4}>
          <SearchBar
          placeholder={placeSearch}
          label={searchTitle}
          onChange={handleChangeSearch}
          />
        </Grid>
        ): (
        <Grid container direction="row" item xs={4} alignItems="center" justifyContent="flex-start" spacing={2}>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={["month"]}
                openTo="month"
                name="month"
                label="Select Month"
                inputFormat="MM"
                onChange={handleChangeMonthFilter}
                renderInput={(params) => <TextField {...params} name="month" variant="outlined" />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={["year"]}
                openTo="year"
                name="year"
                label="Select Year"
                inputFormat="YYYY"
                onChange={handleChangeYearFilter}
                renderInput={(params) => <TextField {...params} name="year" variant="outlined" />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
          )}
          
          {onEmployee && (
          <Grid container direction='row' item xs={2} alignSelf="center" textAlign="right">
            <Button
            variant="contained"
            className='button-text'
            onClick={() => onEmployee()}
            startIcon={<SyncOutlinedIcon />}
            >
              Synchronise
            </Button>
          </Grid>
          ) }

          {onUpload && (
          <Grid container direction="row" item xs={4} gap={1} alignItems="center" justifyContent="flex-end">
            <Button variant="contained" onClick={() => onAdd()} startIcon={<AddIcon />}>
              {`NEW ${title}`}
            </Button>
            <Button variant="outlined" onClick={() => onUpload()} startIcon={<UploadFileOutlined />} sx={{ paddingY: 1 }}>
              Upload Holiday
            </Button>
          </Grid>
          )}
          
          
          {(!onEmployee && !onUpload) && 
            (
              <Grid container direction='row' item xs={2} alignSelf="center" textAlign="right">
                <Button
                variant="contained" 
                onClick={() => onAdd()}
                startIcon={<AddIcon />}
                >
                {`NEW ${title}`}
                </Button>
              </Grid> 
            )
          }
        
      </Grid>
      {data.length > 0 ? (
        <Grid item xs={12}>
          <DataGrid
            rows={data}
            columns={dataColumns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 20, 50]}
            paginationMode='server'
            paginationModel={{ ...pagination }}
            onPaginationModelChange={(model) => changePagination(model)}
            onSortModelChange={(model) => changeSort(model)}
            disableColumnFilter
            loading={loading}
            disableColumnMenu
            rowCount={totalData}
            getRowId={(row) => row.id}
            sortingMode='server'
            // getRowHeight={() => 'auto'}
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
  );
};

export default DataTable;
