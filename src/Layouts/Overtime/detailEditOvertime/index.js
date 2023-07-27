import React, {useState, useEffect} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button, Card, Divider, Grid, Rating, Typography, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CreateIcon from "@mui/icons-material/Create";
import CreateOvertime from "../createOvertime";
import client from '../../../global/client';


export default function ViewOvertime({open}) {
  const [value, setValue] = React.useState("one");
  const [openOvertime, setOpenOvertime] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      "To Do": "#FDECEB",
      Backlog: "#E6F2FB",
      "In Progress": "#E6F2FB",
      Completed: "#EBF6EE",
      Done: "#EBF6EE",
    };
    return statusColors[status] || "#ccc";
  };

  const getStatusFontColor = (status) => {
    const statusFontColors = {
      "To Do": "#EE695D",
      Backlog: "#3393DF",
      "In Progress": "#3393DF",
      Completed: "#5DB975",
      Done: "#5DB975",
    };
    return statusFontColors[status] || "#fff";
  };

  const [detail, setDetail] = useState([]);
  const [idDetail,setIdDetail] = useState()
  const getDetailOvertime = async () => {
    const idDetail = parseInt(localStorage.getItem('workingReportId'))
    setIdDetail(idDetail)
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/overtime/${idDetail}`
    })
      setDetail(res.data.attributes.listProject)
      console.log("ID WR: ", idDetail)
      console.log("DETAIL OVERTIME", res)
  }

  useEffect(() => {
    getDetailOvertime()
  }, [])

  return (
    <Grid container spacing={2}>
      {/* <TabsMenuWR /> */}
      <Grid item xs={12}>
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab value="one" label="Overtime Task" />
          </Tabs>
        </Box>
      </Grid>

        {detail.map((item) => (
      <Grid item xs={12} key={item.id}>
        <Card>
          <Grid container p={4} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">
                Project - {item.projectName}
                {/* Project - Telkom */}
              </Typography>
              <Typography variant="body1">Tuesday, 2 May 2023</Typography>
            </Grid>
            <Divider />

            {item.listTask.map((taskItem) => (
            <Grid item xs={12} key={taskItem.id}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ fontSize: "24px" }}>
                    {taskItem.taskName} :: {taskItem.taskCode}
                    {/* Create Mockup Screen Dashboard :: T-WR-0011 */}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Grid item xs={12}>
                        <Typography variant="labelHeaderDetail">
                          Task Description
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="inputDetail">
                          {taskItem.taskDescription}
                          {/* Create mockup screen dashboard - UI UX */}
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
                            backgroundColor: getStatusColor("To Do"),
                            color: getStatusFontColor("To Do"),
                            padding: "5px 10px",
                            gap: "10px",
                            borderRadius: "4px",
                            fontSize: "12px",
                          }}
                        >
                          {taskItem.statusTaskName}
                          {/* To Do */}
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
                        // className="rating-outline"
                        variant="outlined"
                        name="rating"
                        value={parseFloat(taskItem.priority)}
                        // value={0} // Ambil nilai rating dari properti "priority"
                        readOnly
                        precision={0.5}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Grid item xs={12}>
                        <Typography variant="labelHeaderDetail">
                          Actual Effort
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="inputDetail">
                          {taskItem.duration}
                          {/* 8 */}
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
                          {/* Create login screen */}
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
      ))}
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button startIcon={<CreateIcon />} variant="outlined" onClick={() => setOpenOvertime(true)}>
              Edit Task
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <CreateOvertime isEdit={true} open={openOvertime} closeOvertime={() => setOpenOvertime(false)}/>
    </Grid>
  );
}
