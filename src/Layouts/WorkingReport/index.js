import React, { useState } from "react";
import SideBar from "../../Component/Sidebar";
// import Calendar from "../../Component/CalendarCustom";
import {
  Avatar,
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SettingsIcon from "@mui/icons-material/Settings";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CheckinTime from "../../Component/CheckinTime";
import Attendance from "./Attandence";

export default function WorkingReport() {
  const [isCheckin, setIsCheckin] = useState(false);

  return (
    <SideBar>
      <Grid container rowSpacing={2}>
        <Grid xs={12}>
          <Card className="cardHeader">
            <Grid container p={2} alignContent="space-between" spacing={1}>
              <Grid item xs={0.1}>
                <div className="dividerHeader" />
              </Grid>
              <Grid item xs={8.4}>
                <Typography variant="headerCardMenu">{`Working Report`}</Typography>
              </Grid>
              <Grid item xs={2} display="flex" alignItems="center">
                <Button
                  variant="contained"
                  //   onClick={() => onAdd()}
                  startIcon={<DownloadIcon />}
                  endIcon={<ArrowForwardIosIcon />}
                >
                  Download
                </Button>
              </Grid>
              <Grid display="flex" alignItems="center">
                <Button
                  variant="outlined"
                  //   onClick={() => onAdd()}
                  startIcon={<SettingsIcon />}
                >
                  Settings
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Avatar variant="square" className="full-avatar" />
              </Grid>
              <Grid item xs={11}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="body2">Employee Details</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Name</Typography>
                    <Typography variant="drawerNameUser">
                      ikiwprikitiw
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Role</Typography>
                    <Typography variant="drawerNameUser">Dev Ops</Typography>
                  </Grid>
                  <Grid item xs={4}>
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
