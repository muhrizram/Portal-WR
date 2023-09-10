import React , {useState,useEffect} from "react";
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

export default function ViewTask({ setIsCheckOut, WrIdDetail ,dataAll, onStatusHr, setonOtherUser, setIsViewTask}) {
  const [openTask, setOpenTask] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [beforeThanToday, setBeforeThanToday] = useState(false);  
  
  useEffect(() => (
    getDetailTask(),
    checkForMatch()    
  ),[])

  const checkForMatch = () => {
    for (const item of dataAll) {
      if (item.workingReportId === WrIdDetail) {      
        setBeforeThanToday(item.isToday);        
        break;
      }else{
        setBeforeThanToday(false)        
      }
    }
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

  const getDetailTask = async () => {    
    try {         
      const res = await client.requestAPI({
        method: "GET",
        endpoint: `/task/detail?wrId=${WrIdDetail}`        
      });
      setTaskData(res.data);      
    } catch (error) {
      console.error("Error fetching task details:", error);
    } 
  }

  return (
    <>
     <Grid container spacing={2}>      
      {/* <Grid item xs={12}>
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab value="one" label="Regular Task" />
            <Tab value="two" label="Overtime Task" />
          </Tabs>
        </Box>
      </Grid> */}
      {taskData ? (<>      
        {taskData.map((task) => (
        <React.Fragment key={task.id}>
          <Grid item xs={12}>
            <Card>
              <Grid container p={4} spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h4">
                    {task.attributes.projectName}
                  </Typography>
                  <Typography variant="body1">
                  </Typography>
                </Grid>
                <Divider />
                {task.attributes.listTask.map((taskItem) => (
                  <Grid item xs={12} key={taskItem.taskId}>
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
                              <Typography variant="labelHeaderDetail">
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
                              // className="rating-outline"
                              variant="outlined"
                              name="rating"
                              value={parseInt(taskItem.priority)}
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
                setIsViewTask()
                setonOtherUser(false)
              }
                }>
              Back
            </Button>
          </Grid>
            {!onStatusHr 
              && (       
                <>
              <Grid item>
                {/* {beforeThanToday ? ( */}
                  <Button
                  startIcon={<CreateIcon />}
                  variant="outlined"
                  onClick={() => setOpenTask(true)}
                  >
                    Edit Task
                  </Button>
                {/* ) : null}             */}
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
              </>  
            )}
          </Grid>
        </Grid>            
      <PopupTask
        isEdit={true}
        open={openTask}
        closeTask={() => setOpenTask(false)}
        dataDetail={taskData}        
      />    
      </>) : (<><h1>No DATA</h1> </>)        
    }    
      </Grid>
    </>
  );
}
