import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Remove } from "@mui/icons-material";

const EditOvertime = ({
  dataEditOvertime,
  startTime,
  setStartTime,
  setEndTime,
  setTimeTo,
  opentask,
  setOpentask,
  getDataTask,
  optProject,
  optTask,
  optStatus,
  isEndTimeError,
  handleChange,
  handleChangeProject,
  AddTask,
  RemoveProject,
  deleteTask,
  setIsLocalizationFilled,
  setIsEndTimeError,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <TimePicker
              label="Start Time *"
              defaultValue={setTimeTo(dataEditOvertime.startTime) || null}
              onChange={(start) => setStartTime(start.format("HH:mm:ss"))}
              ampm={false}
            />
            <Grid item>
              <TimePicker
                label="End Time *"
                defaultValue={setTimeTo(dataEditOvertime.endTime) || null}
                onChange={(end) => {
                  const newEndTime = end.format("HH:mm:ss");
                  const newStartTime = startTime || dataEditOvertime.startTime;

                  if (newStartTime && newEndTime <= newStartTime) {
                    setEndTime(dataEditOvertime.endTime);
                    setIsEndTimeError(true);
                  } else {
                    setEndTime(newEndTime);
                    setIsEndTimeError(false);
                    setIsLocalizationFilled(true);
                  }
                }}
                ampm={false}
              />
              {isEndTimeError && (
                <Typography
                  color="#d32f2f"
                  textAlign={"left"}
                  fontSize={12}
                  paddingY={"3px"}
                  marginLeft={"16px"}
                >
                  {"End Time cannot be earlier than Start Time"}
                </Typography>
              )}
            </Grid>
          </DemoContainer>
        </LocalizationProvider>
      </Grid>

      {dataEditOvertime.listProject.map((resProject, idxProject) => (
        <div
          className={opentask ? "card-project" : ""}
          key={`${idxProject + 1}-project`}
        >
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                disabled={
                  !!optProject.find(
                    (option) => option.id == resProject.projectId
                  )
                }
                name="project"
                className="autocomplete-input autocomplete-on-popup"
                options={optProject}
                defaultValue={
                  optProject.find(
                    (option) => option.id == resProject.projectId
                  ) || null
                }
                getOptionLabel={(option) => option.name}
                sx={{
                  width: "100%",
                  marginTop: "20px",
                  backgroundColor: "white",
                }}
                onChange={(_event, newValue) => {
                  if (newValue) {
                    getDataTask(newValue.id);
                    handleChangeProject(newValue.id, idxProject);
                    setOpentask(true);
                  } else {
                    setOpentask(false);
                  }
                }}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="input-field-crud"
                    label="Project *"
                    InputLabelProps={{ shrink: true }}
                    placeholder="Select Project"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              {resProject.listTask.map((res, index) => (
                <>
                  <Accordion
                    onChange={() => getDataTask(resProject.projectId)}
                    key={res.id}
                    sx={{ boxShadow: "none", width: "100%" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      className="header-accordion"
                    >
                      <Typography sx={{ fontSize: "24px" }}>
                        Task {index + 1}
                      </Typography>
                      <DeleteIcon
                        className="icon-trash"
                        onClick={(e) => deleteTask(e, idxProject, index)}
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container rowSpacing={2}>
                        <Grid item xs={12}>
                          <Autocomplete
                            disablePortal
                            name="taskName"
                            className="autocomplete-input autocomplete-on-popup"
                            options={optTask}
                            defaultValue={
                              resProject.projectId
                                ? {
                                    backlogId: res.backlogId,
                                    taskName:
                                      res.taskCode + " - " + res.taskName,
                                    actualEffort: res.duration,
                                  }
                                : null
                            }
                            getOptionLabel={(option) => option.taskName}
                            sx={{
                              width: "100%",
                              marginTop: "20px",
                              backgroundColor: "white",
                            }}
                            onChange={(_event, newValue) => {
                              if (newValue) {
                                handleChange(
                                  {
                                    target: {
                                      name: "taskName",
                                      value: newValue.taskName,
                                    },
                                  },
                                  idxProject,
                                  index,
                                  true,
                                  newValue.backlogId
                                );
                              }
                            }}
                            isOptionEqualToValue={(option, value) =>
                              option.value === value.value
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className="input-field-crud"
                                placeholder='e.g Create Login Screen"'
                                label="Task Name *"
                                InputLabelProps={{ shrink: true }}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Autocomplete
                            disablePortal
                            name="statusTaskId"
                            className="autocomplete-input autocomplete-on-popup"
                            options={optStatus}
                            defaultValue={
                              optStatus.find(
                                (option) => option.status === res.statusTaskName
                              ) || null
                            }
                            getOptionLabel={(option) => option.status}
                            sx={{
                              width: "100%",
                              backgroundColor: "white",
                            }}
                            onChange={(_event, newValue) =>
                              handleChange(
                                {
                                  target: {
                                    name: "statusTaskId",
                                    value: newValue.id,
                                  },
                                },
                                idxProject,
                                index,
                                true
                              )
                            }
                            isOptionEqualToValue={(option, value) =>
                              option.value === value.value
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className="input-field-crud"
                                placeholder="e.g In Progress"
                                label="Status Task *"
                                InputLabelProps={{ shrink: true }}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            focused
                            name="duration"
                            value={res.duration}
                            onChange={(e) =>
                              handleChange(e, idxProject, index, true)
                            }
                            className="input-field-crud"
                            placeholder="e.g Create Login Screen"
                            type="number"
                            label="Estimation Effort *"
                            sx={{
                              width: "100%",
                              backgroundColor: "white",
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            focused
                            name="taskItem"
                            value={res.taskItem}
                            onChange={(e) =>
                              handleChange(e, idxProject, index, true)
                            }
                            className="input-field-crud"
                            placeholder='e.g Create Login Screen"'
                            label="Task Detail"
                            sx={{
                              width: "100%",
                              backgroundColor: "white",
                            }}
                            multiline
                            maxRows={4}
                          />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </>
              ))}
            </Grid>
            <Grid
              container
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid item xs={6} textAlign="left">
                <Button
                  onClick={() => AddTask(idxProject)}
                  variant="outlined"
                  className="button-text"
                  startIcon={<AddIcon />}
                >
                  Add Task
                </Button>
              </Grid>
              {idxProject > 0 && (
                <Grid item xs={6} textAlign="right">
                  <Button
                    onClick={() => RemoveProject(idxProject)}
                    variant="outlined"
                    color="error"
                    className="button-text"
                    startIcon={<Remove />}
                  >
                    Remove Project
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </div>
      ))}
    </>
  );
};

export default EditOvertime;
