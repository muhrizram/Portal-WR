import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../Component/Sidebar";
import Header from "../../Component/Header";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  getCountEmployeeCheckIn,
  getEmployeeCheckIn,
  getEmployeeNotCheckIn,
} from "./apiFunctions";
import { AlertContext } from "../../context";
import DataTable from "../../Component/DataTable";
import { convertBase64 } from "../../global/convertBase64";

const cardNotCheckIn = "Employee Not Check In";
const ClickableCard = ({ title, employeeCount, handleCardClick }) => {
  return (
    <CardStyle title={title} onClick={handleCardClick}>
      <CardActionArea style={{ height: "100%" }}>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box>
            <Typography variant="h5">{title}</Typography>
          </Box>
          <Box>
            <Typography color="text.secondary" style={{ fontSize: "0.875rem" }}>
              Total: {employeeCount}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </CardStyle>
  );
};

const CardStyle = styled(Card)(({ title }) => ({
  height: "125px",
  backgroundColor: title === cardNotCheckIn ? "#DC7C76" : "#97BE5A",
}));

const Dashboard = () => {
  const [employeeCheckIn, setEmployeeCheckIn] = useState(0);
  const [employeeNotCheckIn, setEmployeeNotCheckIn] = useState(0);
  const [dataEmployee, setDataEmployee] = useState([]);
  const { setDataAlert } = useContext(AlertContext);
  const [totalDataEmployee, setTotalDataEmployee] = useState(0);
  const [checkIn, setCheckIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: "firstName",
    sortType: "asc",
    search: "",
  });

  const columns = [
    {
      field: "no",
      headerName: "No",
      sortable: false,
    },
    {
      field: "nip",
      headerName: "NIP",
      flex: 0,
      minWidth: 150,
    },
    {
      field: "firstName",
      headerName: "Name",
      flex: 0.3,
      minWidth: 180,
      renderCell: (params) => {
        const urlMinio = params.row.image
          ? convertBase64(params.row.image)
          : "";
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={urlMinio}
                className="img-master-employee"
                alt="Profile Image"
              />
              <div style={{ marginLeft: "0.5rem" }}>
                <span className="text-name">{params.row.firstName}</span>
                <span className="text-position">{params.row.position}</span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Work Email",
      flex: 0.3,
      minWidth: 170,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      sortable: false,
      flex: 0.5,
      minWidth: 200,
    },
  ];

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

  const rebuildData = (resData) => {
    let temp = [];
    let number = filter.page * filter.size;
    temp = resData.data.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.id,
        nip: value.attributes.nip,
        firstName: value.attributes.fullname,
        position: value.attributes.position,
        image: value.attributes.photoProfile,
        email: value.attributes.email !== "" ? value.attributes.email : "-",
        projectName:
          value.attributes.projects.length > 0
            ? value.attributes.projects
                .map((project) => {
                  return project.projectName;
                })
                .join(", ")
            : "-",
      };
    });

    setDataEmployee([...temp]);
    setTotalDataEmployee(resData.meta.page.totalElements);
  };

  useEffect(() => {
    getCountEmployeeCheckIn(
      setEmployeeCheckIn,
      setEmployeeNotCheckIn,
      setDataAlert
    );
    if (!checkIn) {
      getEmployeeNotCheckIn(rebuildData, setDataAlert, filter, setLoading);
    } else {
      getEmployeeCheckIn(rebuildData, setDataAlert, filter, setLoading);
    }
  }, [filter, checkIn]);

  return (
    <SideBar>
      <Grid container spacing={3} direction="column" mb={3}>
        <Grid item xs={12}>
          <Header judul="Dashboard" />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2}>
              <ClickableCard
                title="Employee Check In"
                employeeCount={employeeCheckIn}
                handleCardClick={() => {
                  setCheckIn(true);
                  setFilter({ ...filter, page: 0, size: 10 });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <ClickableCard
                title="Employee Not Check In"
                employeeCount={employeeNotCheckIn}
                handleCardClick={() => {
                  setCheckIn(false);
                  setFilter({ ...filter, page: 0, size: 10 });
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DataTable
        dashboard={true}
        columns={columns}
        data={dataEmployee}
        disableRowSelectionOnClick
        loading={loading}
        hideFooterPagination
        hideFooter
        disableColumnFilter
        disableColumnMenu
        sortingMode="server"
        onFilter={(dataFilter) => onFilter(dataFilter)}
        totalData={totalDataEmployee}
        filter={filter}
      />
    </SideBar>
  );
};

export default Dashboard;
