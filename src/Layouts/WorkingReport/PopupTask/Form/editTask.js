import React from "react";
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
import { getlistTaskProject } from "../apiFunctions";

const EditTask = ({
  datas,
  setDatas,
  errors,
  errorTextStyles,
  firstEditTask,
  openTask,
  addTaskinEdit,
  CekProjectEdit,
  listProject,
  setlistTaskProject,
  handleChangeProject,
  setCheckAbsence,
  setOpenTask,
  onRemoveProject,
  setKolomproject,
  setIdEffortTask,
  setFirstEditTask,
  Kolomproject,
  deleteTask,
  AddTask,
  selectedTask,
  listTaskProject,
  statusTask,
  handleChange,
}) => {
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
                <Autocomplete
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
                  options={listProject}
                  getOptionLabel={(option) => option.name}
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                    backgroundColor: "white",
                  }}
                  onChange={(_event, newValue) => {
                    if (newValue) {
                      getlistTaskProject(newValue.id, setlistTaskProject);
                      handleChangeProject(newValue, idxProject, newValue.absen);
                      setCheckAbsence((prevCekAbsen) => {
                        const updatedCekAbsen = [...prevCekAbsen];
                        updatedCekAbsen[idxProject] = newValue.absen;
                        return updatedCekAbsen;
                      });
                      setOpenTask(true);
                    } else {
                      onRemoveProject(_event, idxProject);
                      handleChangeProject(null, idxProject, null);
                      setKolomproject(true);
                      setIdEffortTask("");
                      setCheckAbsence((prevCekAbsen) => {
                        const updatedCekAbsen = [...prevCekAbsen];
                        updatedCekAbsen[idxProject] = "";
                        return updatedCekAbsen;
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
                      required
                      {...params}
                      className="input-field-crud"
                      label="Project"
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
                {resProject.absenceId ? (
                  <>
                    {resProject.listTask.map((res, index) => (
                      <Grid
                        container
                        rowSpacing={2}
                        key={`${index + 1}taskItem`}
                      >
                        <Grid item xs={12}>
                          <TextField
                            focused
                            required
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
                              const temp = { ...firstEditTask };
                              const inputValue = event.target.value;
                              const numericValue =
                                inputValue === ""
                                  ? null
                                  : parseFloat(inputValue);
                              temp.listProject[idxProject].listTask[
                                index
                              ].taskDuration = numericValue;
                              setFirstEditTask(temp);

                              let arrayProject = [...datas.projects];
                              let dataArray = [...datas.tasks];

                              arrayProject[idxProject] = { projectId: "Absen" };

                              if (!dataArray[idxProject]) {
                                dataArray[idxProject] = [];
                              }

                              dataArray[idxProject][index] = {
                                ...dataArray[idxProject][index],
                                taskName: "Absen",
                                statusTaskId: "Absen",
                                duration: String(
                                  event.target.value !== null
                                    ? event.target.value
                                    : ""
                                ),
                              };
                              setDatas({
                                ...datas,
                                projects: arrayProject,
                                tasks: dataArray,
                              });
                            }}
                            className="input-field-crud"
                            type="number"
                            placeholder='e.g Create Login Screen"'
                            label="Duration"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            focused
                            required
                            name="taskItem"
                            sx={{
                              width: "100%",
                              backgroundColor: "white",
                            }}
                            value={
                              res.taskItem == undefined ? "" : res.taskItem
                            }
                            onChange={(event, newValue) => {
                              let dataArray = [...datas.tasks];

                              if (!dataArray[idxProject]) {
                                dataArray[idxProject] = [];
                              }

                              dataArray[idxProject][index] = {
                                ...dataArray[idxProject][index],
                                taskDetails: String(
                                  event.target.value !== null
                                    ? event.target.value
                                    : ""
                                ),
                              };
                              setDatas({
                                ...datas,
                                tasks: dataArray,
                              });
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
                    ))}
                  </>
                ) : (
                  <>
                    {resProject.listTask.map((res, index) => (
                      <Accordion
                        key={res.id}
                        onChange={() =>
                          Kolomproject
                            ? setlistTaskProject([])
                            : getlistTaskProject(
                                resProject.projectId,
                                setlistTaskProject
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
                              onClick={(e) => deleteTask(e, idxProject, index)}
                            />
                          )}
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container rowSpacing={2}>
                            <Grid item xs={12}>
                              <Autocomplete
                                required
                                disablePortal
                                name="taskName"
                                className="autocomplete-input autocomplete-on-popup"
                                defaultValue={
                                  res.backlogId
                                    ? {
                                        backlogId: res.backlogId,
                                        taskName:
                                          res.taskCode + " - " + res.taskName,
                                        actualEffort: res.duration,
                                      } || null
                                    : selectedTask[index]
                                }
                                options={listTaskProject}
                                getOptionLabel={(option) => option.taskName}
                                sx={{
                                  width: "100%",
                                  marginTop: "20px",
                                  backgroundColor: "white",
                                }}
                                onChange={(_event, newValue) => {
                                  let dataArray = [...datas.tasks];

                                  if (!dataArray[idxProject]) {
                                    dataArray[idxProject] = [];
                                  }

                                  dataArray[idxProject][index] = {
                                    ...dataArray[idxProject][index],
                                    taskName: String(
                                      newValue ? newValue.taskName : ""
                                    ),
                                  };
                                  setDatas({
                                    ...datas,
                                    tasks: dataArray,
                                  });
                                  const temp = { ...firstEditTask };
                                  temp.listProject[idxProject].listTask[
                                    index
                                  ].taskName =
                                    newValue !== null ? newValue.taskName : "";
                                  temp.listProject[idxProject].listTask[
                                    index
                                  ].backlogId =
                                    newValue !== null ? newValue.backlogId : "";
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
                                    required
                                    {...params}
                                    className="input-field-crud"
                                    placeholder='e.g Create "Login" Screen'
                                    label="Task Name"
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
                                defaultValue={
                                  res.statusTaskName == undefined
                                    ? null
                                    : {
                                        id: res.statusTaskId,
                                        name: res.statusTaskName,
                                      }
                                }
                                options={statusTask}
                                getOptionLabel={(option) => option.name}
                                sx={{
                                  width: "100%",
                                  backgroundColor: "white",
                                }}
                                onChange={(_event, newValue) => {
                                  if (newValue) {
                                    handleChange(
                                      {
                                        value: { ...newValue },
                                        name: "statusTask",
                                      },
                                      idxProject,
                                      index
                                    );
                                  } else {
                                    let dataArray = [...datas.tasks];

                                    if (!dataArray[idxProject]) {
                                      dataArray[idxProject] = [];
                                    }

                                    dataArray[idxProject][index] = {
                                      ...dataArray[idxProject][index],
                                      statusTaskId: "",
                                    };
                                    setDatas({
                                      ...datas,
                                      tasks: dataArray,
                                    });
                                  }
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    required
                                    className="input-field-crud"
                                    label="Status Task"
                                    placeholder='e.g Create "Login" Screen'
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
                                required
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
                                  let dataArray = [...datas.tasks];

                                  if (!dataArray[idxProject]) {
                                    dataArray[idxProject] = [];
                                  }

                                  dataArray[idxProject][index] = {
                                    ...dataArray[idxProject][index],
                                    duration: String(
                                      event.target.value !== null
                                        ? event.target.value
                                        : ""
                                    ),
                                  };
                                  setDatas({
                                    ...datas,
                                    tasks: dataArray,
                                  });
                                  const temp = { ...firstEditTask };
                                  const inputValue = event.target.value;
                                  const numericValue =
                                    inputValue === ""
                                      ? ""
                                      : parseFloat(inputValue);
                                  temp.listProject[idxProject].listTask[
                                    index
                                  ].taskDuration = numericValue;
                                  setFirstEditTask(temp);
                                }}
                                className="input-field-crud"
                                type="number"
                                placeholder="e.g 1 or 3 (hour)"
                                label="Estimation Effort"
                                error={
                                  errors[
                                    `tasks,${idxProject},${index},duration`
                                  ]
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
                                sx={{
                                  width: "100%",
                                  backgroundColor: "white",
                                }}
                                value={
                                  res.taskItem == undefined ? "" : res.taskItem
                                }
                                onChange={(event, newValue) => {
                                  let dataArray = [...datas.tasks];

                                  if (!dataArray[idxProject]) {
                                    dataArray[idxProject] = [];
                                  }

                                  dataArray[idxProject][index] = {
                                    ...dataArray[idxProject][index],
                                    taskDetails: String(
                                      event.target.value !== null
                                        ? event.target.value
                                        : ""
                                    ),
                                  };
                                  setDatas({
                                    ...datas,
                                    tasks: dataArray,
                                  });

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
                                error={
                                  errors[
                                    `tasks,${idxProject},${index},taskDetails`
                                  ]
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
                    ))}
                  </>
                )}
              </Grid>
              <Grid container>
                <Grid item xs={6} textAlign="left">
                  {!resProject.absenceId && (
                    <Button
                      onClick={() => AddTask(idxProject)}
                      variant="outlined"
                      className="button-text"
                      startIcon={<AddIcon />}
                    >
                      Add Task
                    </Button>
                  )}
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
