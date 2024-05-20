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

const CreateTask = ({
  datas,
  setDatas,
  dataProject,
  errorTextStyles,
  errors,
  checkAbsence,
  setProject,
  opentask,
  listProject,
  getlistTaskProject,
  setlistTaskProject,
  handleChangeProject,
  setCheckAbsence,
  setOpenTask,
  onRemoveProject,
  deleteTask,
  selectedTask,
  listTaskProject,
  statusTask,
  handleChange,
  AddTask,
}) => {
  return (
    <>
      {dataProject.listProject.length > 0 &&
        dataProject.listProject.map((resProject, idxProject) => (
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
                      handleChangeProject(null, idxProject, null);
                      setCheckAbsence((prevCekAbsen) => {
                        const updatedCekAbsen = [...prevCekAbsen];
                        updatedCekAbsen[idxProject] = "";
                        return updatedCekAbsen;
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
                      required
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
                {checkAbsence[idxProject] ? (
                  <>
                    {resProject.listTask.map((res, index) => (
                      <Grid
                        container
                        rowSpacing={2}
                        key={`${index + 1}task-duration`}
                      >
                        <Grid item xs={12}>
                          <TextField
                            focused
                            required
                            name="duration"
                            sx={{
                              width: "100%",
                              backgroundColor: "white",
                            }}
                            onChange={(event) => {
                              const temp = { ...dataProject };
                              const inputValue = event.target.value;
                              const numericValue =
                                inputValue === ""
                                  ? null
                                  : parseFloat(inputValue);
                              temp.listProject[idxProject].listTask[
                                index
                              ].duration = numericValue;
                              setProject(temp);

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
                            value={
                              res.duration == undefined ? "" : res.duration
                            }
                            className="input-field-crud"
                            type="number"
                            placeholder="e.g 0,5 or 3 (hour)"
                            label="Duration"
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
                            required
                            name="taskItem"
                            sx={{
                              width: "100%",
                              backgroundColor: "white",
                            }}
                            value={
                              res.taskItem == undefined ? "" : res.taskItem
                            }
                            onChange={(_event, newValue) => {
                              const temp = { ...dataProject };
                              temp.listProject[idxProject].listTask[
                                index
                              ].taskItem =
                                _event.target.value === ""
                                  ? null
                                  : _event.target.value;
                              setProject(temp);
                            }}
                            className="input-field-crud"
                            placeholder="e.g Rest for a while"
                            label="Information Details"
                            multiline
                            maxRows={4}
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </>
                ) : (
                  <>
                    {resProject.listTask.map((res, index) => (
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
                                options={listTaskProject}
                                getOptionLabel={(option) => option.taskName}
                                sx={{
                                  width: "100%",
                                  backgroundColor: "white",
                                }}
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
                                onChange={(_event, newValue) => {
                                  let dataArray = [...datas.tasks];
                                  if (!dataArray[idxProject]) {
                                    dataArray[idxProject] = [];
                                  }
                                  dataArray[idxProject][index] = {
                                    ...dataArray[idxProject][index],
                                    taskName: String(
                                      newValue !== null ? newValue.taskName : ""
                                    ),
                                  };
                                  setDatas({
                                    ...datas,
                                    tasks: dataArray,
                                  });
                                  const temp = { ...dataProject };
                                  temp.listProject[idxProject].listTask[
                                    index
                                  ].taskName =
                                    newValue !== null ? newValue.taskName : "";
                                  temp.listProject[idxProject].listTask[
                                    index
                                  ].backlogId =
                                    newValue !== null ? newValue.backlogId : "";
                                  setProject(temp);
                                }}
                                value={{
                                  taskName: res.taskName,
                                  id: res.taskId,
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    required
                                    className="input-field-crud"
                                    label="Task Name"
                                    placeholder="e.g Create Login Screen"
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
                                options={statusTask}
                                getOptionLabel={(option) => option.name}
                                sx={{
                                  width: "100%",
                                  backgroundColor: "white",
                                }}
                                onChange={(_event, newValue) =>
                                  handleChange(
                                    {
                                      value: { ...newValue },
                                      name: "statusTask",
                                    },
                                    idxProject,
                                    index
                                  )
                                }
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
                                    required
                                    className="input-field-crud"
                                    label="Status Task"
                                    placeholder="e.g Create Login Screen"
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
                                name="duration"
                                sx={{
                                  width: "100%",
                                  backgroundColor: "white",
                                }}
                                value={
                                  res.duration == undefined ? "" : res.duration
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
                                  const temp = { ...dataProject };
                                  const inputValue = event.target.value;
                                  const numericValue =
                                    inputValue === ""
                                      ? null
                                      : parseFloat(inputValue);
                                  temp.listProject[idxProject].listTask[
                                    index
                                  ].duration = numericValue;
                                  setProject(temp);
                                }}
                                className="input-field-crud"
                                type="number"
                                placeholder='e.g Create Login Screen"'
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
                                onChange={(_event, newValue) => {
                                  const temp = { ...dataProject };
                                  temp.listProject[idxProject].listTask[
                                    index
                                  ].taskItem =
                                    _event.target.value === ""
                                      ? null
                                      : _event.target.value;
                                  setProject(temp);
                                }}
                                className="input-field-crud"
                                placeholder='e.g Create Login Screen"'
                                label="Task Detail"
                                multiline
                                maxRows={4}
                              />
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </>
                )}
              </Grid>
              {!checkAbsence[idxProject] &&
                dataProject.workingReportId !== undefined && (
                  <Grid container>
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
                )}
            </Grid>
          </div>
        ))}
    </>
  );
};

export default CreateTask;
