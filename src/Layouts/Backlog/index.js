import React, { useState, useEffect } from "react";
import DataTable from "../../Component/DataTable";
import SideBar from "../../Component/Sidebar";
import { useNavigate } from "react-router";
import client from "../../global/client";

const Backlog = () => {
  const columns = [
    {
      field: "no",
      headerName: "No",
      flex: 0,
      sortable: false,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      flex: 0.7,
      minWidth: 200,
    },
  ];

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState();
  const [filter, setFilter] = useState({
    page: 1,
    size: 10,
    sortName: "projectName",
    sortType: "asc",
    search: "",
  });

  useEffect(() => {
    getData();
  }, [filter]);

  const getData = async () => {
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/backlog?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}&search=${filter.search}`,
    });
    rebuildData(res);
  };

  const rebuildData = (resData) => {
    let temp = [];
    let number = filter.page * filter.size;
    temp = resData.data.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.id,
        projectName: value.attributes.projectName,
        taskCode: value.attributes.taskCode,
        taskName: value.attributes.taskName,
        priority: value.attributes.priority,
        status: value.attributes.status,
        assignedTo: value.attributes.assignedTo,
      };
    });
    setData([...temp]);
    setTotalData(resData.meta.page.totalElements);
  };

  const handleDetail = async (id) => {
    localStorage.setItem("projectId", id);
    navigate("/masterbacklog/listBacklog");
  };

  const handleChangeSearch = (event) => {
    setFilter({
      ...filter,
      page: event.target.value != "" ? 0 : filter.page,
      search: event.target.value,
    });
  };

  const onFilter = (dataFilter) => {
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName:
        dataFilter.sorting.field !== "" ? dataFilter.sorting[0].field : "",
      sortType:
        dataFilter.sorting.sort !== "" ? dataFilter.sorting[0].sort : "",
      search: filter.search,
    });
  };

  const onAdd = () => {
    navigate("/masterbacklog/create");
  };

  return (
    <div>
      <SideBar>
        <DataTable
          title="Backlog"
          data={data}
          columns={columns}
          placeSearch="Project Name"
          searchTitle="Search By"
          onAdd={() => onAdd()}
          onFilter={(dataFilter) => onFilter(dataFilter)}
          handleChangeSearch={handleChangeSearch}
          onDetail={(id) => handleDetail(id)}
          totalData={totalData}
          getRowHeight={() => "auto"}
          getEstimatedRowHeight={() => 200}
        />
      </SideBar>
    </div>
  );
};

export default Backlog;
