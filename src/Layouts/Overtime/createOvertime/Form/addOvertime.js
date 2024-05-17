import React from "react";
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { Remove } from "@mui/icons-material";

const AddOvertime = ({
  errors,
  handleChange,
  handleChangeProject,
  datas,
  setDatas,
  dataOvertime,
  optProject,
  optTask,
  optStatus,
  isLocalizationFilled,
  setIsLocalizationFilled,
  opentask,
  setOpentask,
  deleteTask,
  AddTask,
  RemoveProject,
  errorTextStyles,
  getDataTask,
  currentUserId,
  setOptTask,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <Grid item>
              <TimePicker
                label="Start Time *"
                slotProps={{
                  textField: {
                    error: errors.startTime ? true : false,
                  },
                }}
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
            </Grid>
            <Grid item>
              <TimePicker
                label="End Time *"
                slotProps={{
                  textField: {
                    error: errors.endTime ? true : false,
                  },
                }}
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

      {isLocalizationFilled &&
        dataOvertime.listProject.length > 0 &&
        dataOvertime.listProject.map((resProject, idxProject) => (
          <div
            className={opentask ? "card-project" : ""}
            key={`${idxProject + 1}-project`}
          >
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  name="project"
                  className="autocomplete-input autocomplete-on-popup"
                  options={optProject}
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
                      setOpentask(true);
                    } else {
                      handleChangeProject(null, idxProject);
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
                {resProject.value !== "" &&
                  resProject.listTask.map((res, index) => (
                    <Accordion
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
                                    false,
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
                                    index
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
                            {errors[
                              `tasks,${idxProject},${index},taskName`
                            ] && (
                              <Typography sx={errorTextStyles}>
                                {
                                  errors[
                                    `tasks,${idxProject},${index},taskName`
                                  ]
                                }
                              </Typography>
                            )}
                          </Grid>
                          <Grid item xs={12}>
                            <Autocomplete
                              disablePortal
                              name="statusTaskId"
                              className="autocomplete-input autocomplete-on-popup"
                              options={optStatus}
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
                                    index
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
                                    index
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
                                  handleChange(e, idxProject, index);
                                } else {
                                  handleChange(null, idxProject, index);
                                }
                              }}
                              type="number"
                              className="input-field-crud"
                              placeholder="e.g Create Login Screen"
                              label="Estimation Effort *"
                              sx={{
                                width: "100%",
                                backgroundColor: "white",
                              }}
                              error={
                                errors[`tasks,${idxProject},${index},duration`]
                              }
                            />
                            {errors[
                              `tasks,${idxProject},${index},duration`
                            ] && (
                              <Typography sx={errorTextStyles}>
                                {
                                  errors[
                                    `tasks,${idxProject},${index},duration`
                                  ]
                                }
                              </Typography>
                            )}
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              focused
                              name="taskItem"
                              onChange={(e) =>
                                handleChange(e, idxProject, index)
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

export default AddOvertime;
