import React, { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import MinIcon from "@mui/icons-material/Remove";
import { Controller } from "react-hook-form";
import {
  clearListTaskErrorsAndValues,
  getErrorArrayPosition,
} from "../../../../global/formFunctions";

const CreateTask = ({
  control,
  clearErrors,
  errors,
  setValue,
  dataProject,
  errorTextStyles,
  checkAbsence,
  setDataProject,
  openTask,
  listProject,
  getListTaskProject,
  setListTaskProject,
  handleChangeProject,
  setCheckAbsence,
  setOpenTask,
  onRemoveProject,
  deleteTask,
  selectedTask,
  listTaskProject,
  statusTask,
  handleChange,
  addTask,
}) => {
  const selectedProjectIds = dataProject.listProject
    .map((project) => project.projectId)
    .concat(dataProject.listProject.map((project) => project.absenceId))
    .filter((id) => id !== undefined);

  const filteredOptProject = listProject.filter(
    (option) => !selectedProjectIds.includes(option.id)
  );

  const absence = 1;
  const index = 0;
  useEffect(() => {
    dataProject.listProject.forEach((resProject, idxProject) => {
      if (checkAbsence[idxProject] || resProject.absenceId) {
        setValue(`listTask.${idxProject}.${index}.taskName`, "Absence");
        setValue(`listTask.${idxProject}.${index}.statusTaskId`, absence);
      }
    });
  }, [checkAbsence, dataProject, setValue, index]);

  return (
    <>
      {dataProject.listProject.length > 0 &&
        dataProject.listProject.map((resProject, idxProject) => (
          <div
            className={openTask ? "card-project" : ""}
            key={`${idxProject + 1}-project`}
          >
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Controller
                  name={`listProject.${idxProject}.projectId`}
                  control={control}
                  render={({ field }) => (
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
                          false
                        );
                        if (newValue) {
                          getListTaskProject(newValue.id, setListTaskProject);
                          handleChangeProject(
                            newValue,
                            idxProject,
                            newValue.absen
                          );
                          setCheckAbsence((prevCekAbsen) => {
                            const updatedCheckAbsence = [...prevCekAbsen];
                            updatedCheckAbsence[idxProject] = newValue.absen;
                            return updatedCheckAbsence;
                          });
                          setOpenTask(true);
                        } else {
                          handleChangeProject(null, idxProject, null);
                          setCheckAbsence((prevCekAbsen) => {
                            const updatedCheckAbsence = [...prevCekAbsen];
                            updatedCheckAbsence[idxProject] = "";
                            return updatedCheckAbsence;
                          });
                        }
                      }}
                      value={
                        resProject !== undefined
                          ? resProject.projectName !== undefined
                            ? {
                                name: resProject.projectName,
                                id: resProject.id,
                              }
                            : resProject.absenceName !== undefined
                            ? {
                                name: resProject.absenceName,
                                id: resProject.absenceId,
                              }
                            : null
                          : null
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="input-field-crud"
                          label="Project"
                          placeholder="Select Project"
                          error={Boolean(
                            getErrorArrayPosition(errors, [
                              "listProject",
                              idxProject,
                              "projectId",
                            ])
                          )}
                        />
                      )}
                    />
                  )}
                />
                {Boolean(
                  getErrorArrayPosition(errors, [
                    "listProject",
                    idxProject,
                    "projectId",
                  ])
                ) && (
                  <Typography sx={errorTextStyles}>
                    {errors.listProject[idxProject].projectId.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                {checkAbsence[idxProject] ? (
                  <>
                    {resProject.listTask.map((res, index) => (
                      <Grid
                        container
                        rowSpacing={2}
                        key={`${index + 1}task-duration`}
                      >
                        <Grid item xs={12}>
                          <Controller
                            name={`listTask.${idxProject}.${index}.taskDuration`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                focused
                                name="duration"
                                sx={{
                                  width: "100%",
                                  backgroundColor: "white",
                                }}
                                onChange={(event) => {
                                  field.onChange(
                                    event ? event.target.value : ""
                                  );
                                  handleChange(
                                    {
                                      value: event.target.value,
                                      name: "duration",
                                    },
                                    idxProject,
                                    index
                                  );
                                }}
                                value={
                                  res.duration == undefined ? "" : res.duration
                                }
                                className="input-field-crud"
                                type="number"
                                placeholder="e.g 0,5 or 3 (hour)"
                                label="Duration"
                                error={Boolean(
                                  getErrorArrayPosition(errors, [
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
                              "listTask",
                              idxProject,
                              index,
                              "taskDuration",
                            ])
                          ) && (
                            <Typography sx={errorTextStyles}>
                              {
                                errors.listTask[idxProject][index].taskDuration
                                  .message
                              }
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={12} mb={3}>
                          <Controller
                            name={`listTask.${idxProject}.${index}.taskDetails`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                focused
                                name="taskItem"
                                sx={{
                                  width: "100%",
                                  backgroundColor: "white",
                                }}
                                value={
                                  res.taskItem == undefined ? "" : res.taskItem
                                }
                                onChange={(event, newValue) => {
                                  field.onChange(
                                    event ? event.target.value : ""
                                  );
                                  const temp = { ...dataProject };
                                  temp.listProject[idxProject].listTask[
                                    index
                                  ].taskItem =
                                    event.target.value === ""
                                      ? null
                                      : event.target.value;
                                  setDataProject(temp);
                                }}
                                className="input-field-crud"
                                placeholder="e.g Rest for a while"
                                label="Information Details"
                                multiline
                                maxRows={4}
                                error={Boolean(
                                  getErrorArrayPosition(errors, [
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
                              "listTask",
                              idxProject,
                              index,
                              "taskDetails",
                            ])
                          ) && (
                            <Typography sx={errorTextStyles}>
                              {
                                errors.listTask[idxProject][index].taskDetails
                                  .message
                              }
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    ))}
                  </>
                ) : (
                  <>
                    {resProject.listTask.map((res, index) => {
                      const selectedTaskId = resProject.listTask.map(
                        (task) => task.backlogId
                      );
                      const filteredOptTask = listTaskProject.filter(
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
                            {index > 0 && (
                              <DeleteIcon
                                className="icon-trash"
                                onClick={(e) =>
                                  deleteTask(e, idxProject, index)
                                }
                              />
                            )}
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid container rowSpacing={2}>
                              <Grid item xs={12}>
                                <Controller
                                  name={`listTask.${idxProject}.${index}.taskName`}
                                  control={control}
                                  render={({ field }) => (
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
                                        backgroundColor: "white",
                                      }}
                                      defaultValue={
                                        res.backlogId
                                          ? {
                                              backlogId: res.backlogId,
                                              taskName:
                                                res.taskCode +
                                                " - " +
                                                res.taskName,
                                              actualEffort: res.duration,
                                            } || null
                                          : selectedTask[index]
                                      }
                                      onChange={(_event, newValue) => {
                                        field.onChange(
                                          newValue ? newValue.taskName : ""
                                        );
                                        const temp = { ...dataProject };
                                        temp.listProject[idxProject].listTask[
                                          index
                                        ].taskName =
                                          newValue !== null
                                            ? newValue.taskName
                                            : "";
                                        temp.listProject[idxProject].listTask[
                                          index
                                        ].backlogId =
                                          newValue !== null
                                            ? newValue.backlogId
                                            : "";
                                        setDataProject(temp);
                                      }}
                                      value={{
                                        taskName: res.taskName,
                                        id: res.taskId,
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          className="input-field-crud"
                                          label="Task Name"
                                          placeholder='e.g Create "Login" Screen'
                                          InputLabelProps={{ shrink: true }}
                                          error={Boolean(
                                            getErrorArrayPosition(errors, [
                                              "listTask",
                                              idxProject,
                                              index,
                                              "taskName",
                                            ])
                                          )}
                                        />
                                      )}
                                    />
                                  )}
                                />
                                {Boolean(
                                  getErrorArrayPosition(errors, [
                                    "listTask",
                                    idxProject,
                                    index,
                                    "taskName",
                                  ])
                                ) && (
                                  <Typography sx={errorTextStyles}>
                                    {
                                      errors.listTask[idxProject][index]
                                        .taskName.message
                                    }
                                  </Typography>
                                )}
                              </Grid>
                              <Grid item xs={12}>
                                <Controller
                                  name={`listTask.${idxProject}.${index}.statusTaskId`}
                                  control={control}
                                  render={({ field }) => (
                                    <Autocomplete
                                      {...field}
                                      disablePortal
                                      name="statusTaskId"
                                      className="autocomplete-input autocomplete-on-popup"
                                      options={statusTask}
                                      getOptionLabel={(option) => option.name}
                                      sx={{
                                        width: "100%",
                                        backgroundColor: "white",
                                      }}
                                      onChange={(_event, newValue) => {
                                        field.onChange(
                                          newValue ? newValue.id : null
                                        );
                                        handleChange(
                                          {
                                            value: { ...newValue },
                                            name: "statusTask",
                                          },
                                          idxProject,
                                          index
                                        );
                                      }}
                                      value={
                                        res.statusTaskName == undefined
                                          ? null
                                          : {
                                              id: res.statusTaskId,
                                              name: res.statusTaskName,
                                            }
                                      }
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          className="input-field-crud"
                                          label="Status Task"
                                          placeholder="e.g In Progress"
                                          InputLabelProps={{ shrink: true }}
                                          error={Boolean(
                                            getErrorArrayPosition(errors, [
                                              "listTask",
                                              idxProject,
                                              index,
                                              "statusTaskId",
                                            ])
                                          )}
                                        />
                                      )}
                                    />
                                  )}
                                />
                                {Boolean(
                                  getErrorArrayPosition(errors, [
                                    "listTask",
                                    idxProject,
                                    index,
                                    "statusTaskId",
                                  ])
                                ) && (
                                  <Typography sx={errorTextStyles}>
                                    {
                                      errors.listTask[idxProject][index]
                                        .statusTaskId.message
                                    }
                                  </Typography>
                                )}
                              </Grid>
                              <Grid item xs={12}>
                                <Controller
                                  name={`listTask.${idxProject}.${index}.taskDuration`}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      {...field}
                                      focused
                                      name="duration"
                                      sx={{
                                        width: "100%",
                                        backgroundColor: "white",
                                      }}
                                      value={
                                        res.duration == undefined
                                          ? ""
                                          : res.duration
                                      }
                                      onChange={(event) => {
                                        field.onChange(
                                          event ? event.target.value : ""
                                        );
                                        handleChange(
                                          {
                                            value: event.target.value,
                                            name: "duration",
                                          },
                                          idxProject,
                                          index
                                        );
                                      }}
                                      className="input-field-crud"
                                      type="number"
                                      placeholder="e.g 1 or 3 (hour)"
                                      label="Estimation Effort"
                                      error={Boolean(
                                        getErrorArrayPosition(errors, [
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
                                    "listTask",
                                    idxProject,
                                    index,
                                    "taskDuration",
                                  ])
                                ) && (
                                  <Typography sx={errorTextStyles}>
                                    {
                                      errors.listTask[idxProject][index]
                                        .taskDuration.message
                                    }
                                  </Typography>
                                )}
                              </Grid>
                              <Grid item xs={12}>
                                <Controller
                                  name={`listTask.${idxProject}.${index}.taskDetails`}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      {...field}
                                      focused
                                      name="taskItem"
                                      sx={{
                                        width: "100%",
                                        backgroundColor: "white",
                                      }}
                                      value={
                                        res.taskItem == undefined
                                          ? ""
                                          : res.taskItem
                                      }
                                      onChange={(event, newValue) => {
                                        field.onChange(
                                          event ? event.target.value : ""
                                        );
                                        const temp = { ...dataProject };
                                        temp.listProject[idxProject].listTask[
                                          index
                                        ].taskItem =
                                          event.target.value === ""
                                            ? null
                                            : event.target.value;
                                        setDataProject(temp);
                                      }}
                                      className="input-field-crud"
                                      placeholder='e.g Create "Login" Screen'
                                      label="Task Detail *"
                                      multiline
                                      maxRows={4}
                                      error={Boolean(
                                        getErrorArrayPosition(errors, [
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
                                    "listTask",
                                    idxProject,
                                    index,
                                    "taskDetails",
                                  ])
                                ) && (
                                  <Typography sx={errorTextStyles}>
                                    {
                                      errors.listTask[idxProject][index]
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
                  </>
                )}
              </Grid>
              <Grid container>
                {!checkAbsence[idxProject] &&
                  dataProject.workingReportId !== undefined &&
                  (resProject.listTask.length > 0 ? (
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
                  ))}

                <Grid
                  item
                  xs={6}
                  textAlign={checkAbsence[idxProject] ? "left" : "right"}
                >
                  {idxProject > 0 && (
                    <Button
                      onClick={(e) => onRemoveProject(e, idxProject)}
                      variant="outlined"
                      color="error"
                      startIcon={<MinIcon />}
                    >
                      Remove Project
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </div>
        ))}
    </>
  );
};

export default CreateTask;
