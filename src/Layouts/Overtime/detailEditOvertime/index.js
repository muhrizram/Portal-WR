import React, {useState, useEffect} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button, Card, Divider, Grid, Rating, Typography } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import CreateIcon from "@mui/icons-material/Create";
import CreateOvertime from "../createOvertime";
import client from '../../../global/client';


export default function ViewOvertime({WrIdDetail}) {
  const [value, setValue] = React.useState("one");
  const [openOvertime, setOpenOvertime] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'to do': '#FDECEB',
      'Backlog' : '#E6F2FB',
      'In Progress': '#E6F2FB',
      'Completed' : '#EBF6EE', 
      'Done': '#EBF6EE'
    };
    return statusColors[status] || '#ccc';
  };

  const getStatusFontColor = (status) => {
    const statusFontColors = {
      'to do': '#EE695D',
      'Backlog' : '#3393DF',
      'In Progress': '#3393DF',
      'Completed' : '#5DB975',
      'Done': '#5DB975'
    };
    return statusFontColors[status] || '#fff';
  };

  const [detail, setDetail] = useState([]);
  const getDetailOvertime = async () => {
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/overtime/${WrIdDetail}`
    })

    const updatedData = {
      ...res.data,
      id: parseInt(res.data.id)
    };

      setDetail(updatedData)
      // setDetail(res.data.attributes.listProject)
  }

  useEffect(() => {
    getDetailOvertime()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab value="one" label="Overtime Task" />
          </Tabs>
        </Box>
      </Grid>

      {detail.attributes ? (<>
        {detail.attributes.listProject.map((item) => (
      <Grid item xs={12} key={`${item.id}`}>
        <Card>
          <Grid container p={4} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">
                Project - {item.projectName}
              </Typography>
              <Typography variant="body1">
                {item.date}
                {/* Tuesday, 2 May 2023 */}
                </Typography>
            </Grid>
            <Divider />

            {item.listTask.map((taskItem,id) => (
            <Grid item xs={12} key={`${taskItem}-${id}`}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ fontSize: "24px" }}>
                    {taskItem.taskName} :: {taskItem.taskCode}
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
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid item xs={12}>
                        <Typography variant="descBaklog">
                          Status Task
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Box
                          sx={{
                            backgroundColor: getStatusColor(taskItem.statusTaskName),
                            color: getStatusFontColor(taskItem.statusTaskName),
                            padding: '5px 10px',
                            gap: '10px',
                            borderRadius: '4px',
                            fontSize: '12px',
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
                        value={parseFloat(taskItem.priority)}
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
      ))}
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button startIcon={<CreateIcon />} variant="outlined"
              onClick={() => {
                setOpenOvertime(true)
              }
                }>
              Edit Task
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <CreateOvertime isEdit={true} open={openOvertime} closeOvertime={() => setOpenOvertime(false)} dataDetail={detail}/>
      </>) : <><h1>DATA KOSONG</h1></>}
    </Grid>
  );
}
