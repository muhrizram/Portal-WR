import React from "react";
import SideBar from "../../Component/Sidebar";
// import RolePrivilege from "../RolePrivilege";
// import DetailRolePrivilege from "../detailRolePrivilege";
// import Jobgroup from "../JobGroup";
// import DetailBacklog from "../detailBacklog";
import Header from "../../Component/Header";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";

const ClickableCard = ({ title, description }) => {
  return (
    <CardStyle title={title}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="p" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </CardStyle>
  );
};

const cardNotCheckIn = "Employee Not Check In";
const CardStyle = styled(Card)(({ title }) => ({
  backgroundColor: title === cardNotCheckIn ? "#EE4E4E" : "#97BE5A",
}));

const Dashboard = () => {
  const handleCardClick = () => {
    console.log("Card clicked");
  };

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
                description="Total: "
                onClick={handleCardClick}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <ClickableCard
                title="Employee Not Check In"
                description="Total: "
                onClick={handleCardClick}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </SideBar>
  );
};

export default Dashboard;
