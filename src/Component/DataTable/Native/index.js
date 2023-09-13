import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import blanktable from "../../../assets/blanktable.png";
import "../../../App.css";

const TableNative = ({
  data,
  columns,
  disableRowSelectionOnClick = false,
  checkboxSelection = false,
  onFilter = () => {},
  loading = false,
  sortingMode = "client",
}) => {
  const [sorting, setSort] = useState([]);

  const changeSort = (model) => {
    console.log('model table : ', model);
    if (model.length > 0) {
      setSort([{ ...model }]);
    } else {
      setSort([
        {
          field: "",
          sort: "",
        },
      ]);
    }
  };

  const handleBuildList = (filter) => {
    onFilter(filter);
  };

  useEffect(() => {
    const filter = {
      sorting: sorting.length > 0 ? { ...sorting[0] } : { field: "", sort: "" },
    };
    handleBuildList(filter);
  }, [sorting]);

  
  return (
    <Grid container>
      {data.length > 0 ? (
        <Grid item xs={12}>
          <DataGrid
            rows={data}
            columns={columns}
            disableRowSelectionOnClick={disableRowSelectionOnClick}
            onSortModelChange={(model) => changeSort(model)}
            hideFooterPagination
            disableColumnFilter
            disableColumnMenu
            hideFooter
            loading={loading}
            checkboxSelection={checkboxSelection}
            getRowId={(row) => row.id}
            sortingMode={sortingMode}
            rowHeight={80}
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
            <img src={blanktable} alt="blank-table" style={{ maxWidth: '100%', height: 'auto' }} />
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

export default TableNative;
