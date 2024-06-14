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
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="p" color="text.secondary">
            Total: {employeeCount}
          </Typography>
        </CardContent>
      </CardActionArea>
    </CardStyle>
  );
};

const CardStyle = styled(Card)(({ title }) => ({
  backgroundColor: title === cardNotCheckIn ? "#DC7C76" : "#97BE5A",
}));

const Dashboard = () => {
  const [employeeCheckIn, setEmployeeCheckIn] = useState(0);
  const [employeeNotCheckIn, setEmployeeNotCheckIn] = useState(0);
  const [dataEmployee, setDataEmployee] = useState([]);
  const { setDataAlert } = useContext(AlertContext);
  const [totalDataEmployee, setTotalDataEmployee] = useState(0);
  const [checkIn, setCheckIn] = useState(true);
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: "fullName",
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
      flex: 0.5,
      minWidth: 180,
    },
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      minWidth: 270,
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
                <span className="text-name">{params.row.fullName}</span>
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
      flex: 1,
      minWidth: 270,
    },
    {
      field: "departement",
      headerName: "Departement",
      flex: 1,
      minWidth: 160,
    },
  ];

  const onFilter = (dataFilter) => {
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName:
        dataFilter.sorting.field !== ""
          ? dataFilter.sorting[0].field
          : "firstName",
      sortType:
        dataFilter.sorting.sort !== "" ? dataFilter.sorting[0].sort : "asc",
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
        fullName: value.attributes.fullName,
        position: value.attributes.position,
        image: value.attributes.photoProfile,
        email: value.attributes.email !== "false" ? value.attributes.email : "",
        departement: value.attributes.department,
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
      getEmployeeNotCheckIn(rebuildData, setDataAlert, filter);
    } else {
      getEmployeeCheckIn(rebuildData, setDataAlert, filter);
    }
  }, [filter, checkIn]);

  return (
    <SideBar>
      <Grid container spacing={3} direction="column">
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
        <Grid item xs={12}>
          <DataTable
            dashboard={true}
            columns={columns}
            data={dataEmployee}
            disableRowSelectionOnClick
            loading={false}
            hideFooterPagination
            hideFooter
            disableColumnFilter
            disableColumnMenu
            sortingMode="server"
            onFilter={(dataFilter) => onFilter(dataFilter)}
            totalData={totalDataEmployee}
          />
        </Grid>
      </Grid>
    </SideBar>
  );
};

export default Dashboard;
