import React , {useState} from "react";
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

export default function ViewTask({ setIsCheckOut }) {
  const [openTask, setOpenTask] = useState(false);
  const [value, setValue] = React.useState("one");

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab value="one" label="Regular Task" />
            <Tab value="two" label="Overtime Task" />
          </Tabs>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Grid container p={4} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">
                Project - Electronic Health Record
              </Typography>
              <Typography variant="body1">Tuesday, 2 May 2023</Typography>
            </Grid>
            <Divider />
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ fontSize: "24px" }}>
                    Create Mockup Screen Dashboard :: T-WR-0011
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
                          Create mockup screen dashboard - UI UX
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
                          To Do
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
                        value={0} // Ambil nilai rating dari properti "priority"
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
                        <Typography variant="inputDetail">8</Typography>
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
                          Create login screen
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button
              startIcon={<CreateIcon />} 
              variant="outlined"
              onClick={() => setOpenTask(true)}
              >              
              Edit Task
            </Button>
          </Grid>
          <Grid item>
            <Button
              startIcon={<AccessTimeIcon />}
              className="delete-button button-text"
              onClick={() => setIsCheckOut()}
            >
              Check Out
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <PopupTask isEdit={true} open={openTask} closeTask={() => setOpenTask(false)}/>
    </Grid>
  );
}
