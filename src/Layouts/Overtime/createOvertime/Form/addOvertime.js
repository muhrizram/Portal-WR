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
import { Controller } from "react-hook-form";
import moment from "moment";
import {
  clearListTaskErrorsAndValues,
  getErrorArrayPosition,
} from "../../../../global/formFunctions";

const AddOvertime = ({
  control,
  errors,
  clearErrors,
  setValue,
  handleChange,
  handleChangeProject,
  dataOvertime,
  optProject,
  optTask,
  optStatus,
  isLocalizationFilled,
  setIsLocalizationFilled,
  openTask,
  setOpenTask,
  deleteTask,
  addTask,
  RemoveProject,
  errorTextStyles,
  getDataTask,
  currentUserId,
  setOptTask,
}) => {
  const selectedProjectIds = dataOvertime.listProject.map(
    (project) => project.projectId
  );

  const filteredOptProject = optProject.filter(
    (option) => !selectedProjectIds.includes(option.id)
  );
  return (
    <>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <Grid item>
              <Controller
                name={`time.startTime`}
                control={control}
                render={({ field }) => (
                  <TimePicker
                    {...field}
                    label="Start Time *"
                    slotProps={{
                      textField: {
                        error:
                          errors && errors.time && errors.time.startTime
                            ? true
                            : false,
                      },
                    }}
                    value={field.value ? moment(field.value, "HH:mm:ss") : null}
                    onChange={(e) => {
                      field.onChange(e ? e.format("HH:mm:ss") : "");
                    }}
                    ampm={false}
                  />
                )}
              />
              {errors && errors.time && errors.time.startTime && (
                <Typography sx={errorTextStyles}>
                  {errors.time.startTime.message}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Controller
                name={`time.endTime`}
                control={control}
                render={({ field }) => (
                  <TimePicker
                    {...field}
                    label="End Time *"
                    slotProps={{
                      textField: {
                        error:
                          errors && errors.time && errors.time.endTime
                            ? true
                            : false,
                      },
                    }}
                    value={field.value ? moment(field.value, "HH:mm:ss") : null}
                    onChange={(e) => {
                      if (e) {
                        field.onChange(e ? e.format("HH:mm:ss") : "");
                        setIsLocalizationFilled(true);
                      }
                    }}
                    ampm={false}
                  />
                )}
              />
              {errors && errors.time && errors.time.endTime && (
                <Typography sx={errorTextStyles}>
                  {errors.time.endTime.message}
                </Typography>
              )}
            </Grid>
          </DemoContainer>
        </LocalizationProvider>
      </Grid>

      {isLocalizationFilled &&
        dataOvertime.listProject.length > 0 &&
        dataOvertime.listProject.map((resProject, idxProject) => (
          <div
            className={openTask ? "card-project" : ""}
            key={`${idxProject + 1}-project`}
          >
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Controller
                  name={`task.listProject.${idxProject}.projectId`}
                  control={control}
                  render={({ field }) => {
                    const selectedProject =
                      optProject.find((option) => option.id === field.value) ||
                      null;
                    return (
                      <Autocomplete
                        {...field}
                        disablePortal
                        name="project"
                        className="autocomplete-input autocomplete-on-popup"
                        options={filteredOptProject}
                        getOptionLabel={(option) => option.name}
                        sx={{
                          width: "100%",
                          marginTop: "20px",
                          backgroundColor: "white",
                        }}
                        onChange={(_event, newValue) => {
                          field.onChange(newValue ? newValue.id : null);
                          clearListTaskErrorsAndValues(
                            clearErrors,
                            setValue,
                            idxProject,
                            true
                          );
                          if (newValue) {
                            getDataTask(newValue.id, currentUserId, setOptTask);
                            handleChangeProject(newValue.id, idxProject);
                            setOpenTask(true);
                          } else {
                            handleChangeProject(null, idxProject);
                          }
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value
                        }
                        value={selectedProject}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            className="input-field-crud"
                            label="Project *"
                            InputLabelProps={{ shrink: true }}
                            placeholder="Select Project"
                            error={Boolean(
                              getErrorArrayPosition(errors, [
                                "task",
                                "listProject",
                                idxProject,
                                "projectId",
                              ])
                            )}
                          />
                        )}
                      />
                    );
                  }}
                />
                {Boolean(
                  getErrorArrayPosition(errors, [
                    "task",
                    "listProject",
                    idxProject,
                    "projectId",
                  ])
                ) && (
                  <Typography sx={errorTextStyles}>
                    {errors.task.listProject[idxProject].projectId.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                {resProject.listTask &&
                  resProject.listTask.map((res, index) => {
                    const selectedTaskId = resProject.listTask.map(
                      (task) => task.backlogId
                    );
                    const filteredOptTask = optTask.filter(
                      (option) => !selectedTaskId.includes(option.backlogId)
                    );

                    return (
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
                              <Controller
                                name={`task.listTask.${idxProject}.${index}.taskName`}
                                control={control}
                                render={({ field }) => {
                                  const selectedTask =
                                    optTask.find(
                                      (option) =>
                                        option.taskName === field.value
                                    ) || null;
                                  return (
                                    <Autocomplete
                                      {...field}
                                      disablePortal
                                      name="taskName"
                                      className="autocomplete-input autocomplete-on-popup"
                                      options={filteredOptTask}
                                      getOptionLabel={(option) =>
                                        option.taskName
                                      }
                                      sx={{
                                        width: "100%",
                                        marginTop: "20px",
                                        backgroundColor: "white",
                                      }}
                                      onChange={(_event, newValue) => {
                                        field.onChange(
                                          newValue ? newValue.taskName : ""
                                        );
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
                                        option.taskName === value
                                      }
                                      value={selectedTask}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          className="input-field-crud"
                                          placeholder='e.g Create "Login" Screen'
                                          label="Task Name *"
                                          InputLabelProps={{ shrink: true }}
                                          error={Boolean(
                                            getErrorArrayPosition(errors, [
                                              "task",
                                              "listTask",
                                              idxProject,
                                              index,
                                              "taskName",
                                            ])
                                          )}
                                        />
                                      )}
                                    />
                                  );
                                }}
                              />
                              {Boolean(
                                getErrorArrayPosition(errors, [
                                  "task",
                                  "listTask",
                                  idxProject,
                                  index,
                                  "taskName",
                                ])
                              ) && (
                                <Typography sx={errorTextStyles}>
                                  {
                                    errors.task.listTask[idxProject][index]
                                      .taskName.message
                                  }
                                </Typography>
                              )}
                            </Grid>
                            <Grid item xs={12}>
                              <Controller
                                name={`task.listTask.${idxProject}.${index}.statusTaskId`}
                                control={control}
                                render={({ field }) => {
                                  const selectedStatus =
                                    optStatus.find(
                                      (option) => option.id === field.value
                                    ) || null;
                                  return (
                                    <Autocomplete
                                      {...field}
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
                                        field.onChange(
                                          newValue ? newValue.id : null
                                        );
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
                                        option.id === value
                                      }
                                      value={selectedStatus}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          className="input-field-crud"
                                          placeholder="e.g In Progress"
                                          label="Status Task *"
                                          InputLabelProps={{ shrink: true }}
                                          error={Boolean(
                                            getErrorArrayPosition(errors, [
                                              "task",
                                              "listTask",
                                              idxProject,
                                              index,
                                              "statusTaskId",
                                            ])
                                          )}
                                        />
                                      )}
                                    />
                                  );
                                }}
                              />
                              {Boolean(
                                getErrorArrayPosition(errors, [
                                  "task",
                                  "listTask",
                                  idxProject,
                                  index,
                                  "statusTaskId",
                                ])
                              ) && (
                                <Typography sx={errorTextStyles}>
                                  {
                                    errors.task.listTask[idxProject][index]
                                      .statusTaskId.message
                                  }
                                </Typography>
                              )}
                            </Grid>
                            <Grid item xs={12}>
                              <Controller
                                name={`task.listTask.${idxProject}.${index}.taskDuration`}
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    focused
                                    name="duration"
                                    value={res.duration}
                                    onChange={(e) => {
                                      field.onChange(e ? e.target.value : "");
                                      if (e) {
                                        handleChange(e, idxProject, index);
                                      } else {
                                        handleChange(null, idxProject, index);
                                      }
                                    }}
                                    type="number"
                                    className="input-field-crud"
                                    placeholder="e.g 1 or 3 (hour)"
                                    label="Estimation Effort *"
                                    sx={{
                                      width: "100%",
                                      backgroundColor: "white",
                                    }}
                                    error={Boolean(
                                      getErrorArrayPosition(errors, [
                                        "task",
                                        "listTask",
                                        idxProject,
                                        index,
                                        "taskDuration",
                                      ])
                                    )}
                                  />
                                )}
                              />
                              {Boolean(
                                getErrorArrayPosition(errors, [
                                  "task",
                                  "listTask",
                                  idxProject,
                                  index,
                                  "taskDuration",
                                ])
                              ) && (
                                <Typography sx={errorTextStyles}>
                                  {
                                    errors.task.listTask[idxProject][index]
                                      .taskDuration.message
                                  }
                                </Typography>
                              )}
                            </Grid>
                            <Grid item xs={12}>
                              <Controller
                                name={`task.listTask.${idxProject}.${index}.taskDetails`}
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    focused
                                    name="taskItem"
                                    onChange={(e) => {
                                      field.onChange(e ? e.target.value : "");
                                      handleChange(e, idxProject, index);
                                    }}
                                    className="input-field-crud"
                                    placeholder='e.g Create "Login" Screen'
                                    label="Task Detail *"
                                    sx={{
                                      width: "100%",
                                      backgroundColor: "white",
                                    }}
                                    multiline
                                    maxRows={4}
                                    error={Boolean(
                                      getErrorArrayPosition(errors, [
                                        "task",
                                        "listTask",
                                        idxProject,
                                        index,
                                        "taskDetails",
                                      ])
                                    )}
                                  />
                                )}
                              />
                              {Boolean(
                                getErrorArrayPosition(errors, [
                                  "task",
                                  "listTask",
                                  idxProject,
                                  index,
                                  "taskDetails",
                                ])
                              ) && (
                                <Typography sx={errorTextStyles}>
                                  {
                                    errors.task.listTask[idxProject][index]
                                      .taskDetails.message
                                  }
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
              </Grid>
              <Grid
                container
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                {resProject.listTask.length > 0 ? (
                  <Grid item xs={6} textAlign="left">
                    <Button
                      onClick={() => addTask(idxProject)}
                      variant="outlined"
                      className="button-text"
                      startIcon={<AddIcon />}
                    >
                      Add Task
                    </Button>
                  </Grid>
                ) : (
                  <Grid item xs={6} />
                )}
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
