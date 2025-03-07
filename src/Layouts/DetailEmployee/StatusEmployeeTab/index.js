import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Typography,
  Link,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import client from "../../../global/client";
import blanktable from "../../../assets/blanktable.png";
import { AlertContext } from "../../../context";

const StatusEmployeeTab = ({ id, dataChange }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setDataAlert } = useContext(AlertContext);
  const [totalData, setTotalData] = useState(0);
  const [pagination, setPagination] = useState({ page: 0, pageSize: 10 });
  const [sorting, setSort] = useState([]);
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: "startDate",
    sortType: "asc",
  });

  const columns = [
    {
      field: "no",
      headerName: "No",
      flex: 0.3,
      sortable: false,
    },
    {
      field: "codeName",
      headerName: "Contract Status",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      minWidth: 150
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      minWidth: 150
    },
    {
      field: "file",
      headerName: "Contract File",
      sortable:false,
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return params.row.file !== "" ? (
          <Link
            sx={{ fontSize: "14px" }}
            href={`https://portalwr-dev.cloudias79.com/apis/minio/view?file=${params.row.file}`}
            target="_blank"
          >
            preview pdf
          </Link>
        ) : (
          <Typography>-</Typography>
        );
      },
    },
  ];

  const changePagination = (model) => {
    setPagination({ ...model });
  };

  const changeSort = (model) => {
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

  useEffect(() => {
    const filter = {
      sorting: sorting.length > 0 ? { ...sorting[0] } : { field: "", sort: "" },
      ...pagination,
    };
    handleBuildList(filter);
  }, [sorting, pagination]);

  const handleBuildList = (dataFilter) => {
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName:
        dataFilter.sorting.field !== "" ? dataFilter.sorting[0].field : "startDate",
      sortType:
        dataFilter.sorting.sort !== "" ? dataFilter.sorting[0].sort : "asc",
    });
  };

  const getData = async (id) => {
    setLoading(true);
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/users/contractHistory?id=${id}&page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}`,
    });
    if (!res.isError) {
      rebuildData(res);
    } else {
      setDataAlert({
        severity: "error",
        open: true,
        message:res.error.detail
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getData(id);
  }, [dataChange, filter]);

  const rebuildData = (resData) => {
    let temp = [];
    let number = filter.page * filter.size;
    temp = resData.data.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.id,
        codeName: value.attributes.codeName,
        startDate: intlDate.format(new Date(value.attributes.startDate)),
        endDate: intlDate.format(new Date(value.attributes.endDate)),
        file: value.attributes.file,
      };
    });
    setData([...temp]);
    setTotalData(resData.meta.page.totalElements);
  };

  const intlDate = Intl.DateTimeFormat("id", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return data.length > 0 ? (
    <DataGrid
      rows={data}
      columns={columns}
      disableRowSelectionOnClick
      pageSizeOptions={[10, 25, 50, 100]}
      paginationMode="server"
      disableColumnFilter
      disableColumnMenu
      rowCount={totalData}
      paginationModel={{ ...pagination }}
      onPaginationModelChange={(model) => changePagination(model)}
      onSortModelChange={(model) => changeSort(model)}
      loading={loading}
      sortingMode="server"
      getRowId={(row) => row.id}
    />    
  ) : (
    <Grid
      container
      item
      xs={12}
      alignContent="center"
      alignItems="center"
      display="flex"
      justifyContent="center"
      textAlign="center"
    >
      <Grid item xs={12} pb={3.75}>
        <img src={blanktable} alt="blank-table" style={{ maxWidth: '100%', height: 'auto' }}/>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="noDataTable">
          Sorry, the data you are looking for could not be found.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default StatusEmployeeTab;
