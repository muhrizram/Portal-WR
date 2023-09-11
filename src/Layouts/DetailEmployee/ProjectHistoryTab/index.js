import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Typography } from "@mui/material";
import client from "../../../global/client";
import blanktable from "../../../assets/blanktable.png";

const ProjectHistoryTab = ({ id }) => {
  const [pagination, setPagination] = useState({ page: 0, pageSize: 10 });
  const [sorting, setSort] = useState([]);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: "projectName",
    sortType: "asc",
  });

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
        dataFilter.sorting.field !== "" ? dataFilter.sorting[0].field : "projectName",
      sortType:
        dataFilter.sorting.sort !== "" ? dataFilter.sorting[0].sort : "asc",
    });
  };

  const columns = [
    {
      field: "no",
      headerName: "No",
      sortable: false,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      flex: 1,
    },
    {
      field: "companyName",
      headerName: "Client Name",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
    },
  ];

  const getData = async (id) => {
    setLoading(true);
    const res = await client.requestAPI({
      endpoint: `/userUtilization/detail?id=${id}&page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}`,
      method: "GET",
    });

    if (!res.isError) {
      rebuildData(res);
    }
    setLoading(false);
  };

  const rebuildData = (resData) => {
    let temp = [];
    let number = filter.page * filter.size;

    const intlDate = new Intl.DateTimeFormat('id',{day:"2-digit", month:'2-digit', year:'numeric'});
    temp = resData.data.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.id,
        projectName: value.attributes.projectName,
        companyName: value.attributes.companyName,
        startDate: intlDate.format(new Date(value.attributes.startDate)),
        endDate: intlDate.format(new Date(value.attributes.endDate)),
      };
    });
    setData([...temp]);
    setTotalData(resData.data.length);
  };

  useEffect(() => {
    getData(id);
  }, [filter]);

  return data.length > 0 ?
  (
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
  ):
  (
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
        <img src={blanktable} alt="blank-table" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="noDataTable">Sorry, the data you are looking for could not be found.</Typography>
      </Grid>
    </Grid>
  );
};

export default ProjectHistoryTab;
