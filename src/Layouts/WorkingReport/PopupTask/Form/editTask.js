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
import { getListTaskProject } from "../apiFunctions";
import { Controller } from "react-hook-form";
import {
  clearListTaskErrorsAndValues,
  getErrorArrayPosition,
} from "../../../../global/formFunctions";

const EditTask = ({
  control,
  errors,
  errorTextStyles,
  firstEditTask,
  openTask,
  addTaskinEdit,
  CekProjectEdit,
  listProject,
  setListTaskProject,
  handleChangeProject,
  setCheckAbsence,
  setOpenTask,
  onRemoveProject,
  setProjectColumn,
  setIdEffortTask,
  setFirstEditTask,
  projectColumn,
  deleteTask,
  addTask,
  selectedTask,
  listTaskProject,
  statusTask,
  handleChange,
  setValue,
  clearErrors,
  checkAbsence,
  addDisabled,
}) => {
  const selectedProjectIds = firstEditTask.listProject
    .map((project) => project.projectId)
    .concat(firstEditTask.listProject.map((project) => project.absenceId))
    .filter((id) => id !== undefined);

  const filteredOptProject = listProject.filter(
    (option) => !selectedProjectIds.includes(option.id)
  );

  const index = 0;
  const absence = 1;
  useEffect(() => {
    console.log(firstEditTask);
    firstEditTask.listProject.forEach((resProject, idxProject) => {
      if (checkAbsence[idxProject] || resProject.absenceId) {
        setValue(`listTask.${idxProject}.${index}.taskName`, "Absence");
        setValue(`listTask.${idxProject}.${index}.statusTaskId`, absence);
      }
    });
  }, [checkAbsence, firstEditTask, setValue, index]);
  return (
    <>
      {firstEditTask.listProject.length > 0 &&
        firstEditTask.listProject.map((resProject, idxProject) => (
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
                      disabled={
                        idxProject === 0
                          ? addTaskinEdit && CekProjectEdit[idxProject - 1]
                            ? false
                            : true
                          : false
                      }
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
                            const updatedCekAbsen = [...prevCekAbsen];
                            updatedCekAbsen[idxProject] = newValue.absen;
                            return updatedCekAbsen;
                          });
                          setOpenTask(true);
                        } else {
                          handleChangeProject(null, idxProject, null);
                          setProjectColumn(true);
                          setIdEffortTask("");
                          setCheckAbsence((prevCheckAbsence) => {
                            const updatedCheckAbsence = [...prevCheckAbsence];
                            updatedCheckAbsence[idxProject] = "";
                            return updatedCheckAbsence;
                          });
                        }
                      }}
                      value={
                        resProject !== undefined
                          ? resProject.projectName && resProject.projectId
                            ? {
                                name: resProject.projectName,
                                id: resProject.projectId,
                              }
                            : resProject.absenceName && resProject.absenceId
                            ? {
                                name: resProject.absenceName,
                                id: resProject.absenceId,
                              }
                            : null
                          : null
                      }
                      renderInput={(params) => (
                        <TextField
                          focused
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
                {resProject.absenceId ? (
                  <>
                    {resProject.listTask.map((res, index) => (
                      <Grid
                        container
                        rowSpacing={2}
                        key={`${index + 1}taskItem`}
                      >
                        <Grid item xs={12}>
                          <Controller
                            name={`listTask.${idxProject}.${index}.taskDuration`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                focused
                                name="taskDuration"
                                sx={{
                                  width: "100%",
                                  backgroundColor: "white",
                                }}
                                value={
                                  res.taskDuration == undefined
                                    ? ""
                                    : res.taskDuration
                                }
                                onChange={(event) => {
                                  field.onChange(
                                    event ? event.target.value : ""
                                  );
                                  handleChange(
                                    {
                                      value: event.target.value,
                                      name: "taskDuration",
                                    },
                                    idxProject,
                                    index
                                  );
                                }}
                                className="input-field-crud"
                                type="number"
                                placeholder='e.g Create Login Screen"'
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
                                  mb: 3,
                                }}
                                value={
                                  res.taskItem == undefined ? "" : res.taskItem
                                }
                                onChange={(event, newValue) => {
                                  field.onChange(
                                    event ? event.target.value : ""
                                  );
                                  const temp = { ...firstEditTask };
                                  temp.listProject[idxProject].listTask[
                                    index
                                  ].taskItem =
                                    event.target.value === ""
                                      ? null
                                      : event.target.value;
                                  setFirstEditTask(temp);
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
                          onChange={() =>
                            projectColumn
                              ? setListTaskProject([])
                              : getListTaskProject(
                                  resProject.projectId,
                                  setListTaskProject
                                )
                          }
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
                                        const temp = { ...firstEditTask };
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
                                        setFirstEditTask(temp);
                                      }}
                                      value={{
                                        taskName: res.taskName,
                                        id: res.taskId,
                                      }}
                                      isOptionEqualToValue={(option, value) =>
                                        option.value === value.value
                                      }
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          className="input-field-crud"
                                          placeholder='e.g Create "Login" Screen'
                                          label="Task Name"
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
                                      name="taskDuration"
                                      sx={{
                                        width: "100%",
                                        backgroundColor: "white",
                                      }}
                                      value={
                                        res.taskDuration == undefined
                                          ? ""
                                          : res.taskDuration
                                      }
                                      onChange={(event) => {
                                        field.onChange(
                                          event ? event.target.value : ""
                                        );
                                        handleChange(
                                          {
                                            value: event.target.value,
                                            name: "taskDuration",
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
                                        const temp = { ...firstEditTask };
                                        temp.listProject[idxProject].listTask[
                                          index
                                        ].taskItem =
                                          event.target.value === ""
                                            ? null
                                            : event.target.value;
                                        setFirstEditTask(temp);
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
                <Grid item xs={6} textAlign="left">
                  {!resProject.absenceId &&
                    (resProject.listTask.length > 0 ? (
                      <Grid item xs={6} textAlign="left">
                        <Button
                          disabled={addDisabled}
                          style={{
                            opacity: addDisabled ? 0.5 : 1,
                            cursor: addDisabled ? "not-allowed" : "pointer",
                          }}
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
                </Grid>
                <Grid item xs={6} textAlign="right">
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

export default EditTask;
