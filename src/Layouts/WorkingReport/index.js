import React from "react";
import SideBar from "../../Component/Sidebar";
// import Calendar from "../../Component/CalendarCustom";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SettingsIcon from "@mui/icons-material/Settings";
import Attendance from "./Attandence";

export default function WorkingReport() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <SideBar>
      <Grid container rowSpacing={2}>
        <Grid xs={12}>
          <Card className="cardHeader">
            <Grid container p={2} alignContent="space-between" spacing={1}>
              <Grid item xs={0.1}>
                <div className="dividerHeader" />
              </Grid>
              <Grid item xs={8.9}>
                <Typography variant="headerCardMenu">{`Working Report`}</Typography>
              </Grid>
              <Grid xs={1.5} display="flex" alignItems="center">
                <Button
                  variant="contained"
                  //   onClick={() => onAdd()}
                  startIcon={<DownloadIcon />}
                  endIcon={<ArrowForwardIosIcon />}
                >
                  Download
                </Button>
              </Grid>
              <Grid xs={1.5} display="flex" alignItems="center">
                <Button
                  variant="outlined"
                  //   onClick={() => onAdd()}
                  startIcon={<SettingsIcon />}
                >
                  Settings
                </Button>
              </Grid>
              <Grid item sx={2}>
                <Avatar variant="square" className="lg-avatar" />
              </Grid>
              <Grid item xs={10}>
                <Grid container>
                  <Grid xs={12}>
                    <Typography variant="body2">Employee Details</Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Typography>Name</Typography>
                    <Typography variant="drawerNameUser">
                      ikiwprikitiw
                    </Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Typography>Role</Typography>
                    <Typography variant="drawerNameUser">Dev Ops</Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Typography>Email</Typography>
                    <Typography variant="drawerNameUser">
                      ikiwprikitiw@gmail.com
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Attendance />
          {/* <Box sx={{ width: "100%", marginBottom: "2%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              // aria-label="wrapped label tabs example"
            >
              <Tab value={0} label="Calendar" />
              <Tab value={1} label="Attendance History" />
            </Tabs>
          </Box>
          {value === 0 && <Calendar />} */}
        </Grid>
      </Grid>
    </SideBar>
  );
}
