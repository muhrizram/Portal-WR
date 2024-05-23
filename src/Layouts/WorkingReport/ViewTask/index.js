import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button, Card, Divider, Grid, Rating, Typography } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CreateIcon from "@mui/icons-material/Create";
import PopupTask from "../PopupTask";
import client from "../../../global/client";
import dayjs from "dayjs";

export default function ViewTask({
  setIsCheckOut,
  WrIdDetail,
  dataAll,
  onStatusHr,
  setonOtherUser,
  setIsViewTask,
  StatusSearch,
}) {
  const [openTask, setOpenTask] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [todaysWorkingReport, setTodaysWorkingReport] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(
    () => (getDetailTask(), setIsSubmit(false), checkForMatch()),
    [isSubmit]
  );

  const checkForMatch = () => {
    for (const item of dataAll) {
      if (item.workingReportTaskId === WrIdDetail) {
        // The detail working report viewed is today's working report
        setCurrentDate(item.tanggal);
        setTodaysWorkingReport(item.isToday);
        break;
      } else {
        // The detail working report viewed is not today's working report
        setTodaysWorkingReport(false);
      }
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      "to do": "#FDECEB",
      Backlog: "#E6F2FB",
      "In Progress": "#E6F2FB",
      Completed: "#EBF6EE",
      Done: "#EBF6EE",
    };
    return statusColors[status] || "#ccc";
  };

  const getStatusFontColor = (status) => {
    const statusFontColors = {
      "to do": "#EE695D",
      Backlog: "#3393DF",
      "In Progress": "#3393DF",
      Completed: "#5DB975",
      Done: "#5DB975",
    };
    return statusFontColors[status] || "#fff";
  };

  const getDetailTask = async () => {
    try {
      const res = await client.requestAPI({
        method: "GET",
        endpoint: `/task/detail?wrId=${WrIdDetail}`,
      });
      setTaskData(res.data);
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ width: "100%" }}>
            <Tabs value={"one"}>
              <Tab
                value="one"
                label="Regular Task"
                style={{
                  textTransform: "none",
                  borderBottom: "2px solid #2196F3",
                }}
              />
            </Tabs>
          </Box>
        </Grid>
        {taskData ? (
          <>
            {taskData.map((task) => (
              <React.Fragment key={task.id}>
                <Grid item xs={12}>
                  <Card>
                    <Grid container p={4} spacing={2}>
                      <Grid
                        item
                        xs={12}
                        borderBottom="1px solid rgba(0, 0, 0, .12)"
                        paddingBottom={1}
                      >
                        <Typography variant="h4">
                          {task.attributes.absenceId !== null
                            ? task.attributes.absenceName
                            : task.attributes.projectName}
                        </Typography>
                        <Typography variant="body1">
                          {dayjs(currentDate).format("dddd, DD MMMM YYYY")}
                        </Typography>
                      </Grid>
                      {task.attributes.listTask.map((taskItem) => (
                        <Grid item xs={12} key={taskItem.taskId}>
                          <Accordion elevation={0}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography sx={{ fontSize: "24px" }}>
                                {task.attributes.absenceId !== null
                                  ? "Project"
                                  : taskItem.taskName}{" "}
                                :: {taskItem.taskCode}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container spacing={2}>
                                {task.attributes.absenceId === null && (
                                  <>
                                    <Grid item xs={4}>
                                      <Grid item xs={12}>
                                        <Typography variant="labelHeaderDetail">
                                          Task Description
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12}>
                                        <Typography variant="inputDetail">
                                          {taskItem.taskDescription}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <Grid item xs={12}>
                                        <Typography variant="labelHeaderDetail">
                                          Status Task
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Box
                                          sx={{
                                            backgroundColor: getStatusColor(
                                              taskItem.statusTaskName
                                            ),
                                            color: getStatusFontColor(
                                              taskItem.statusTaskName
                                            ),
                                            padding: "5px 10px",
                                            gap: "10px",
                                            borderRadius: "4px",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {taskItem.statusTaskName}
                                        </Box>
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <Grid item xs={12}>
                                        <Typography variant="labelHeaderDetail">
                                          Priority
                                        </Typography>
                                      </Grid>
                                      <Rating
                                        variant="outlined"
                                        name="rating"
                                        value={parseInt(taskItem.priority)}
                                        readOnly
                                        precision={0.5}
                                      />
                                    </Grid>
                                  </>
                                )}
                                <Grid item xs={6}>
                                  <Grid item xs={12}>
                                    <Typography variant="labelHeaderDetail">
                                      Estimation Effort
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="inputDetail">
                                      {taskItem.taskDuration}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                  <Grid item xs={12}>
                                    <Typography variant="labelHeaderDetail">
                                      Task Detail
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="inputDetail">
                                      {taskItem.taskItem}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                      ))}
                    </Grid>
                  </Card>
                </Grid>
              </React.Fragment>
            ))}

            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                  <Button
                    variant="outlined"
                    className="button-text"
                    color="error"
                    onClick={() => {
                      setIsViewTask();
                      setonOtherUser(false);
                    }}
                  >
                    Back
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    startIcon={<CreateIcon />}
                    variant="outlined"
                    onClick={() => setOpenTask(true)}
                  >
                    Edit Task
                  </Button>
                </Grid>
                {todaysWorkingReport ? (
                  !StatusSearch && onStatusHr ? (
                    <>
                      <Grid item>
                        <Button
                          startIcon={<AccessTimeIcon />}
                          className="delete-button button-text"
                          onClick={() => setIsCheckOut()}
                        >
                          Check Out
                        </Button>
                      </Grid>
                    </>
                  ) : StatusSearch && onStatusHr ? null : (
                    <>
                      <Grid item>
                        <Button
                          startIcon={<AccessTimeIcon />}
                          className="delete-button button-text"
                          onClick={() => setIsCheckOut()}
                        >
                          Check Out
                        </Button>
                      </Grid>
                    </>
                  )
                ) : null}
              </Grid>
            </Grid>
            <PopupTask
              isEdit={true}
              open={openTask}
              closeTask={() => setOpenTask(false)}
              dataDetail={taskData}
              setIsSubmit={setIsSubmit}
            />
          </>
        ) : (
          <>
            <h1>No DATA</h1>

            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                  <Button
                    variant="outlined"
                    className="button-text"
                    color="error"
                    onClick={() => {
                      setIsViewTask();
                      setonOtherUser(false);
                    }}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
