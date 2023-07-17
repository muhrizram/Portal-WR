import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../Component/Sidebar";
// import Calendar from "../../Component/CalendarCustom";
import { Avatar, Button, Card, Grid, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckinTime from "./CheckIn";
import Attendance from "./Attandence";
import Calendar from "../../Component/CalendarCustom";
import { useNavigate } from "react-router-dom";
import client from "../../global/client";
import moment from "moment/moment";
import PopupTask from "./PopupTask";
import { AlertContext } from "../../context";
import ViewTask from "./ViewTask";
import CheckOut from "./CheckOut";

export default function WorkingReport() {
  const [isCheckin, setIsCheckin] = useState(false);
  const [isViewTask, setIsViewTask] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const [filter, setFilter] = useState({
    startDate: new Date(y, m, 1),
    endDate: new Date(y, m + 1, 0),
  });
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataAttandance, setAttandance] = useState({
    isAttandance: false,
    dataPeriod: null,
  });
  const { setDataAlert } = useContext(AlertContext);

  useEffect(() => {
    localStorage.removeItem("companyId");
    getData();
  }, [filter]);

  const getData = async () => {
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/workingReport/${moment(filter.startDate).format(
        "yyyy-MM-DD"
      )}/${moment(filter.endDate).format("yyyy-MM-DD")}/2`,
    });
    if (!res.isError) {
      rebuildData(res);
    } else {
      setDataAlert({
        severity: "error",
        message: res.error.detail,
        open: true,
      });
    }
  };

  const rebuildData = (resData) => {
    console.log("data: ", resData);
    let temp = [];
    temp = resData.data.map((value, index) => {
      return value.attributes.listDate.holiday
        ? {
            title: "Libur",
            date: moment(value.attributes.listDate.date).format("yyyy-MM-DD"),
            tanggal: moment(value.attributes.listDate.date).format(
              "yyyy-MM-DD"
            ),
            period: value.attributes.period,
            workingReportId: value.attributes.listDate.workingReportId,
          }
        : {
            period: value.attributes.period,
            tanggal: moment(value.attributes.listDate.date).format(
              "yyyy-MM-DD"
            ),
            workingReportId: value.attributes.listDate.workingReportId,
          };
    });
    console.log(temp);
    setData([...temp]);
  };

  const onAttendence = (value) => {
    console.log("attendance", value);
    if (value[0].workingReportId !== null) {
      setIsCheckin(true);
    }
    setAttandance({
      dataPeriod: value[0],
      isAttandance: true,
    });
    console.log(value[0]);
  };

  const renderCheckin = () => {
    let dom = null;
    if (isCheckin) {
      dom = (
        <CheckinTime
          setIsCheckin={(param) => {
            setIsCheckin(() => false);
          }}
        />
      );
    } else if (dataAttandance.isAttandance) {
      dom = (
        <Attendance
          dataPeriod={dataAttandance.dataPeriod}
          setIsCheckin={(param) => {
            console.log("masuk sini");
            setIsCheckin(true);
          }}
        />
      );
    } else if (isCheckOut) {
      dom = <CheckOut />;
    } else if (isViewTask) {
      dom = (
        <ViewTask
          setIsCheckOut={() => {
            setIsViewTask(false);
            setIsCheckOut(true);
          }}
        />
      );
    } else {
      dom = (
        <Calendar
          setOnClick={(param) => {
            const _data = data.filter(
              (val) => val.tanggal == moment(param.date).format("yyyy-MM-DD")
            );
            onAttendence(_data);
          }}
          setIsViewTask={setIsViewTask}
          events={data}
        />
      );
    }

    return dom;
  };

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
      <PopupTask open={openTask} closeTask={() => setOpenTask(false)} />
    </SideBar>
  );
}
