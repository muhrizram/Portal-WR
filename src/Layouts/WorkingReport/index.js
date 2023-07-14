import React, { useEffect, useState } from "react";
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
import Calendar from "../../Component/CalendarCustom";
import { useNavigate } from "react-router-dom";
import client from "../../global/client";
import moment from "moment/moment";
import PopupTask from "./PopupTask";

export default function WorkingReport() {
  const [isCheckin, setIsCheckin] = useState(false);
  const [openTask, setOpenTask] = useState(false)

  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataAttandance, setAttandance] = useState({
    isAttandance: false,
    dataPeriod: null
  })

  useEffect(() => {
    localStorage.removeItem("companyId");
    getData();
  }, [filter]);

  const getData = async () => {
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/workingReport/2023-07-01/2023-07-30/2`,
    });
    rebuildData(res);
  };

  const rebuildData = (resData) => {
    console.log("data: ", resData);
    let temp = [];
    temp = resData.data.map((value, index) => {
      return value.attributes.listDate.holiday
        ? {
            title: "Libur",
            date: moment(value.attributes.listDate.dateHoliday).format(
              "yyyy-MM-DD"
            ),
            tanggal: moment(value.attributes.listDate.dateHoliday).format(
              "yyyy-MM-DD"
            ),
            period: value.attributes.period,
          }
        : {
            period: value.attributes.period,
            tanggal: moment(value.attributes.listDate.dateHoliday).format(
              "yyyy-MM-DD"
            ),
          };
    });
    console.log(temp);
    setData([...temp]);
  };

  const onAttendence = (value) => {
    setAttandance({
      dataPeriod: value[0],
      isAttandance: true
    })
  }

  const renderCheckin = () => {
    let dom = null
    if (isCheckin) {
      dom = (
        <CheckinTime
          setIsCheckin={(param) => {
            setIsCheckin(() => false);
          }}
        />
      )
    } else if (dataAttandance.isAttandance) {
      dom = <Attendance dataPeriod={dataAttandance.dataPeriod} />
    } else {
      dom = (
        <Calendar
          setOnClick={(param) => {
            const _data = data.filter(
              (val) =>
                val.tanggal == moment(param.date).format("yyyy-MM-DD")
            );
            onAttendence(_data)
          }}
          events={data}
        />
      )
    }

    return dom
  }

  return (
    <SideBar>
      <Grid container rowSpacing={2}>
        <Grid time xs={12}>
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
          <Button onClick={() => setOpenTask(true)}>Open task</Button>
        </Grid>
        <Grid item xs={12}>
          {renderCheckin()}
        </Grid>
      </Grid>
      <PopupTask 
        open={openTask}
        closeTask={() => setOpenTask(false)}
      />
    </SideBar>
  );
}
