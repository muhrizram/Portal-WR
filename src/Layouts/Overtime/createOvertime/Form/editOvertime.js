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
import { getDataTask } from "../apiFunctions";

const EditOvertime = ({
  addTaskInEdit,
  projectEdit,
  errors,
  errorTextStyles,
  currentUserId,
  setOptTask,
  datas,
  setDatas,
  dataEditOvertime,
  setEndTime,
  setTimeTo,
  openTask,
  setOpenTask,
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
              slotProps={{
                textField: {
                  error: errors.startTime ? true : false,
                },
              }}
              defaultValue={setTimeTo(dataEditOvertime.startTime) || null}
              onChange={(e) => {
                if (e) {
                  setDatas({
                    ...datas,
                    startTime: e.format("HH:mm:ss"),
                  });
                } else {
                  setDatas({
                    ...datas,
                    startTime: "",
                  });
                }
              }}
              ampm={false}
            />
            {errors.startTime && (
              <Typography sx={errorTextStyles}>{errors.startTime}</Typography>
            )}
            <Grid item>
              <TimePicker
                label="End Time *"
                slotProps={{
                  textField: {
                    error: errors.endTime ? true : false,
                  },
                }}
                defaultValue={setTimeTo(dataEditOvertime.endTime) || null}
                onChange={(e) => {
                  if (e) {
                    setDatas({
                      ...datas,
                      endTime: e.format("HH:mm:ss"),
                    });
                    setIsLocalizationFilled(true);
                  } else {
                    setDatas({
                      ...datas,
                      endTime: "",
                    });
                  }
                }}
                ampm={false}
              />
              {errors.endTime && (
                <Typography sx={errorTextStyles}>{errors.endTime}</Typography>
              )}
            </Grid>
          </DemoContainer>
        </LocalizationProvider>
      </Grid>

      {dataEditOvertime.listProject.map((resProject, idxProject) => (
        <div
          className={openTask ? "card-project" : ""}
          key={`${idxProject + 1}-project`}
        >
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                disabled={
                  idxProject === 0 &&
                  !(addTaskInEdit && projectEdit[idxProject - 1])
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
                    getDataTask(newValue.id, currentUserId, setOptTask);
                    handleChangeProject(newValue.id, idxProject);
                    setOpenTask(true);
                  } else {
                    setOpenTask(false);
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
                    error={errors[`projects,${idxProject},projectId`]}
                  />
                )}
              />
              {errors[`projects,${idxProject},projectId`] && (
                <Typography sx={errorTextStyles}>
                  {errors[`projects,${idxProject},projectId`]}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {resProject.listTask.map((res, index) => (
                <>
                  <Accordion
                    onChange={() =>
                      getDataTask(
                        resProject.projectId,
                        currentUserId,
                        setOptTask
                      )
                    }
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
                      {index > 0 && (
                        <DeleteIcon
                          className="icon-trash"
                          onClick={(e) => deleteTask(e, idxProject, index)}
                        />
                      )}
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
                              res.taskName
                                ? { taskName: res.taskName, id: res.taskId }
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
                              } else {
                                handleChange(
                                  {
                                    target: {
                                      name: "taskName",
                                      value: null,
                                    },
                                  },
                                  idxProject,
                                  index,
                                  true
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
                                error={
                                  errors[
                                    `tasks,${idxProject},${index},taskName`
                                  ]
                                }
                              />
                            )}
                          />
                          {errors[`tasks,${idxProject},${index},taskName`] && (
                            <Typography sx={errorTextStyles}>
                              {errors[`tasks,${idxProject},${index},taskName`]}
                            </Typography>
                          )}
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
                            onChange={(_event, newValue) => {
                              if (newValue) {
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
                                );
                              } else {
                                handleChange(
                                  {
                                    target: {
                                      name: "statusTaskId",
                                      value: null,
                                    },
                                  },
                                  idxProject,
                                  index,
                                  true
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
                                placeholder="e.g In Progress"
                                label="Status Task *"
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors[
                                    `tasks,${idxProject},${index},statusTaskId`
                                  ]
                                }
                              />
                            )}
                          />
                          {errors[
                            `tasks,${idxProject},${index},statusTaskId`
                          ] && (
                            <Typography sx={errorTextStyles}>
                              {
                                errors[
                                  `tasks,${idxProject},${index},statusTaskId`
                                ]
                              }
                            </Typography>
                          )}
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            focused
                            name="duration"
                            value={res.duration}
                            onChange={(e) => {
                              if (e) {
                                handleChange(e, idxProject, index, true);
                              } else {
                                handleChange(null, idxProject, index, true);
                              }
                            }}
                            className="input-field-crud"
                            placeholder="e.g Create Login Screen"
                            type="number"
                            label="Estimation Effort *"
                            sx={{
                              width: "100%",
                              backgroundColor: "white",
                            }}
                            error={
                              errors[`tasks,${idxProject},${index},duration`]
                            }
                          />
                          {errors[`tasks,${idxProject},${index},duration`] && (
                            <Typography sx={errorTextStyles}>
                              {errors[`tasks,${idxProject},${index},duration`]}
                            </Typography>
                          )}
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
                            error={
                              errors[`tasks,${idxProject},${index},taskDetails`]
                            }
                          />
                          {errors[
                            `tasks,${idxProject},${index},taskDetails`
                          ] && (
                            <Typography sx={errorTextStyles}>
                              {
                                errors[
                                  `tasks,${idxProject},${index},taskDetails`
                                ]
                              }
                            </Typography>
                          )}
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
