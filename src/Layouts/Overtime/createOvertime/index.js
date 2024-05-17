import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../../../App.css";
import { useNavigate } from "react-router-dom";
import client from "../../../global/client";
import { AlertContext } from "../../../context";
import { calculateTimeDifference, parseTime } from "./timeUtils";
import { getDataTask, getDataProject, getDataStatus } from "./apiFunctions";
import AddOvertime from "./Form/addOvertime";
import { timeSchema } from "../../../global/timeSchema";
import { projectSchema } from "../../../global/projectSchema";
import EditOvertime from "./Form/editOvertime";
import dayjs from "dayjs";

const CreateOvertime = ({
  open,
  closeTask,
  isEdit,
  closeOvertime,
  onEditSuccess,
  dataDetail,
  wrDate,
}) => {
  const navigate = useNavigate();
  const { setDataAlert } = useContext(AlertContext);
  const [dialogCancel, setDialogCancel] = useState(false);
  const [datas, setDatas] = useState({
    startTime: "",
    endTime: "",
    projects: [{ projectId: "" }],
    tasks: [[{ taskName: "", statusTaskId: "", duration: "" }]],
  });
  const [isLocalizationFilled, setIsLocalizationFilled] = useState(false);
  const [optProject, setOptProject] = useState([]);
  const [optTask, setOptTask] = useState([]);
  const [optStatus, setOptStatus] = useState([]);
  const [opentask, setOpentask] = useState(false);
  const [errors, setErrors] = useState({});
  const [dataDetailnya, setdataDetailnya] = useState({});
  const [projectEdit, setProjectEdit] = useState([]);
  const [addtaskinEdit, setAddtaskinEdit] = useState(false);

  const currentUserId = parseInt(localStorage.getItem("userId"));

  const errorTextStyles = {
    color: "#d32f2f",
    textAlign: "left",
    fontSize: 12,
    paddingY: "3px",
    marginLeft: "16px",
  };

  const clearProject = {
    projectId: "",
    listTask: [],
  };

  const clearTask = {
    backlogId: null,
    taskName: null,
    statusTaskId: null,
    duration: null,
    taskItem: null,
  };

  const [dataOvertime, setDataOvertime] = useState({
    listProject: [
      {
        projectId: "",
        listTask: [
          {
            backlogId: null,
            taskName: "",
            statusTaskId: "",
            duration: "",
            taskItem: "",
          },
        ],
      },
    ],
  });

  const [dataEditOvertime, setDataEditOvertime] = useState({
    workingReportOvertimeId: null,
    listProject: [clearProject],
  });

  const onAddProject = (checkProject) => {
    setDatas({
      ...datas,
      projects: [...datas.projects, { projectId: "" }],
      tasks: [
        ...datas.tasks,
        [{ taskName: "", statusTaskId: "", duration: "" }],
      ],
    });
    if (isEdit) {
      setProjectEdit(checkProject);
      setAddtaskinEdit(true);
      const temp = { ...dataEditOvertime };
      temp.listProject = [
        ...dataEditOvertime.listProject,
        {
          projectId: null,
          listTask: [{ ...clearProject }],
        },
      ];
      setDataEditOvertime(temp);
    } else {
      const temp = { ...dataOvertime };
      temp.listProject = [
        ...dataOvertime.listProject,
        {
          projectId: null,
          listTask: [{ ...clearProject }],
        },
      ];
      setDataOvertime(temp);
    }
  };

  const RemoveProject = (projectIndex) => {
    datas.projects.splice(projectIndex, 1);
    datas.tasks.splice(projectIndex, 1);
    if (isEdit) {
      const temp = { ...dataEditOvertime };
      temp.listProject.splice(projectIndex, 1);
      setDataEditOvertime(temp);
    } else {
      const temp = { ...dataOvertime };
      temp.listProject.splice(projectIndex, 1);
      setDataOvertime(temp);
    }
  };

  const onEdit = () => {
    let temp = [];
    let data = dataDetail.attributes.listProject.length;
    let time = dataDetail.attributes;
    for (let i = 0; i < data; i++) {
      temp.push(dataDetail.attributes.listProject[i]);
      setDataEditOvertime((prevDataEditOvertime) => ({
        ...prevDataEditOvertime,
        workingReportOvertimeId: dataDetail.id,
        listProject: temp,
        startTime: time.startTime,
        endTime: time.endTime,
        createdBy: currentUserId,
        updatedBy: currentUserId,
      }));

      const newProjects = [];
      const newTasks = [];

      const newStartTime = dataDetail.attributes.startTime;
      const newEndTime = dataDetail.attributes.endTime;

      dataDetail.attributes.listProject.forEach((data, projectIndex) => {
        newProjects.push({
          projectId: String(data.projectId),
        });
        data.listTask.forEach((task) => {
          newTasks[projectIndex] = newTasks[projectIndex] || [];
          newTasks[projectIndex].push({
            taskName: task.taskName,
            statusTaskId: String(task.statusTaskId),
            duration: String(task.taskDuration),
          });
        });
      });
      setDatas((prevDatas) => ({
        ...prevDatas,
        startTime: newStartTime,
        endTime: newEndTime,
        projects: newProjects,
        tasks: newTasks,
      }));
    }
  };

  const AddTask = (idxProject) => {
    let temp = null;
    if (isEdit) {
      temp = { ...dataEditOvertime };
    } else {
      temp = { ...dataOvertime };
    }
    const taskLength = temp.listProject[idxProject].listTask.length;
    let dataArray = [...datas.tasks];
    dataArray[idxProject][taskLength] = {
      taskName: "",
      statusTaskId: "",
      duration: "",
    };
    setDatas({
      ...datas,
      tasks: dataArray,
    });
    if (isEdit) {
      temp.listProject[idxProject].listTask.push({
        ...clearTask,
      });
      setDataEditOvertime(temp);
    } else {
      temp.listProject[idxProject].listTask.push({
        ...clearTask,
      });
      setDataOvertime(temp);
    }
  };

  const handleChange = (event, idxProject, index, isEdit, backlogId) => {
    const { name, value } = event.target;
    const isDuration = name === "duration";
    const isTaskName = name === "taskName";

    let dataArray = [...datas.tasks];

    if (!dataArray[idxProject]) {
      dataArray[idxProject] = [];
    }

    const updateData = (data) => {
      if (isDuration) {
        if (value !== "") {
          dataArray[idxProject][index] = {
            ...dataArray[idxProject][index],
            duration: value,
          };
          setDatas({
            ...datas,
            tasks: dataArray,
          });
          const parsedValue = parseFloat(value);
          if (parsedValue < 0) {
            data.listProject[idxProject].listTask[index][name] = "0";
          } else {
            const calculatedValue = Math.min(
              parsedValue,
              calculateTimeDifference(
                datas.startTime || data.startTime,
                datas.endTime || data.endTime
              )
            );
            data.listProject[idxProject].listTask[index][name] =
              calculatedValue;
          }
        } else {
          dataArray[idxProject][index] = {
            ...dataArray[idxProject][index],
            duration: "",
          };
          setDatas({
            ...datas,
            tasks: dataArray,
          });
        }
      } else if (isTaskName) {
        if (value === null) {
          dataArray[idxProject][index] = {
            ...dataArray[idxProject][index],
            taskName: "",
          };
          setDatas({
            ...datas,
            tasks: dataArray,
          });
        } else {
          dataArray[idxProject][index] = {
            ...dataArray[idxProject][index],
            taskName: String(value),
          };
          setDatas({
            ...datas,
            tasks: dataArray,
          });
          data.listProject[idxProject].listTask[index].backlogId = backlogId;
        }
      } else {
        if (value === null) {
          dataArray[idxProject][index] = {
            ...dataArray[idxProject][index],
            statusTaskId: "",
          };
          setDatas({
            ...datas,
            tasks: dataArray,
          });
        } else {
          dataArray[idxProject][index] = {
            ...dataArray[idxProject][index],
            statusTaskId: String(value),
          };
          setDatas({
            ...datas,
            tasks: dataArray,
          });
          data.listProject[idxProject].listTask[index][name] = value;
        }
      }

      return data;
    };

    if (isEdit) {
      const updatedData = updateData({ ...dataEditOvertime });
      setDataEditOvertime(updatedData);
    } else {
      const updatedData = updateData({ ...dataOvertime });
      setDataOvertime(updatedData);
    }
  };

  const handleChangeProject = (value, idxProject) => {
    let dataArray = [...datas.projects];
    dataArray[idxProject] = { projectId: String(value) };
    setDatas({
      ...datas,
      projects: dataArray,
    });
    if (value !== null) {
      if (isEdit) {
        const temp = { ...dataEditOvertime };
        temp.listProject[idxProject].projectId = value;
        temp.listProject[idxProject].listTask = [clearTask];
        setDataEditOvertime(temp);
      } else {
        const temp = { ...dataOvertime };
        temp.listProject[idxProject].projectId = value;
        temp.listProject[idxProject].listTask = [clearTask];
        setDataOvertime(temp);
      }
    } else {
      let dataArray = [...datas.projects];
      dataArray[idxProject] = { projectId: "" };
      setDatas({
        ...datas,
        projects: dataArray,
      });
    }
  };

  const deleteTask = async (e, idxProject, index) => {
    e.preventDefault();
    if (isEdit) {
      const temp = { ...dataEditOvertime };
      temp.listProject[idxProject].listTask.splice(index, 1);
      setDataEditOvertime(temp);
    } else {
      datas.tasks[idxProject].splice(index, 1);
      const temp = { ...dataOvertime };
      temp.listProject[idxProject].listTask.splice(index, 1);
      setDataOvertime(temp);
    }
  };

  const handleClose = () => {
    setDialogCancel(false);
  };

  const setTimeTo = (timeString) => {
    const currentDate = dayjs();
    const formattedDate = currentDate.format("YYYY-MM-DD");
    return timeString ? dayjs(`${formattedDate}T${timeString}`) : null;
  };

  useEffect(() => {
    if (isEdit) {
      onEdit();
      setdataDetailnya(dataDetail);
      setOpentask(true);
    }
    getDataProject(currentUserId, setOptProject);
    getDataStatus(setOptStatus);
  }, [dataOvertime, dataDetailnya, dataDetail]);

  const onSave = async () => {
    const data = {
      startTime: datas.startTime,
      endTime: datas.endTime,
      date: wrDate,
      listProject: [],
      createdBy: currentUserId,
      updatedBy: currentUserId,
    };

    for (const project of dataOvertime.listProject) {
      const updateFilled = {
        projectId: project.projectId,
        listTask: [],
      };
      for (const task of project.listTask) {
        let duration;
        const wholeHours = Math.floor(parseFloat(task.duration));
        if (parseFloat(task.duration) >= wholeHours + 0.75) {
          duration = Math.ceil(parseFloat(task.duration));
        } else {
          duration = parseFloat(task.duration);
        }
        const updateTask = {
          backlogId: task.backlogId,
          taskName: task.taskName,
          statusTaskId: task.statusTaskId,
          duration: parseFloat(duration),
          taskItem: task.taskItem,
        };
        updateFilled.listTask.push(updateTask);
      }
      data.listProject.push(updateFilled);
    }

    const res = await client.requestAPI({
      method: "POST",
      endpoint: `/overtime/addOvertime`,
      data,
    });

    if (!res.isError) {
      setDataAlert({
        severity: "success",
        open: true,
        message: res.data.meta.message,
      });
      window.location.href = "/workingReport";
      closeTask(false);
      setOpentask(false);
    } else {
      setDataAlert({
        severity: "error",
        message: res.error.detail,
        open: true,
      });
    }
  };

  const saveEdit = async () => {
    const dataUpdate = {
      startTime: datas.startTime || dataEditOvertime.startTime,
      endTime: datas.endTime || dataEditOvertime.endTime,
      workingReportId: null,
      listProjectId: [],
      createdBy: currentUserId,
      updatedBy: currentUserId,
    };
    dataUpdate.workingReportId = dataEditOvertime.workingReportOvertimeId;
    for (const project of dataEditOvertime.listProject) {
      const updateFilled = {
        projectId: project.projectId,
        listTask: [],
      };
      for (const task of project.listTask) {
        if (task.taskId === null) {
          task.backlogId = null;
        }
        let duration;
        const wholeHours = Math.floor(parseFloat(task.duration));
        if (parseFloat(task.duration) >= wholeHours + 0.75) {
          duration = Math.ceil(parseFloat(task.duration));
        } else {
          duration = parseFloat(task.duration);
        }
        const updateTask = {
          taskId: task.taskId,
          workingReportId: dataUpdate.workingReportOvertimeId,
          backlogId: task.backlogId,
          taskName: task.taskName,
          statusTaskId: task.statusTaskId,
          duration: parseFloat(duration),
          taskItem: task.taskItem,
        };
        updateFilled.listTask.push(updateTask);
      }
      dataUpdate.listProjectId.push(updateFilled);
    }

    const res = await client.requestAPI({
      method: "POST",
      endpoint: `/overtime`,
      data: dataUpdate,
    });
    if (!res.isError) {
      setDataAlert({
        severity: "success",
        open: true,
        message: res.data.meta.message,
      });
      onEditSuccess();
      setTimeout(() => {
        navigate("/workingReport");
      }, 3000);
    } else {
      setDataAlert({
        severity: "error",
        message: res.error.detail,
        open: true,
      });
    }
    closeOvertime(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationTime = timeSchema.safeParse(datas);
    const validationProject = projectSchema.safeParse(datas);
    if (validationTime.success && validationProject.success) {
      setErrors("");
      if (isEdit) {
        saveEdit();
      } else {
        onSave();
      }
    } else {
      const validationErrors = {};
      if (validationTime.error && Array.isArray(validationTime.error.errors)) {
        validationTime.error.errors.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      }

      if (
        validationProject.error &&
        Array.isArray(validationProject.error.errors)
      ) {
        validationProject.error.errors.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      }
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={isEdit ? () => closeOvertime(false) : () => closeTask(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-delete dialog-task"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" className="dialog-delete-header">
          {isEdit ? "Edit Overtime" : "Add Overtime"}
        </DialogTitle>
        <DialogContent className="dialog-task-content">
          <DialogContentText
            className="dialog-delete-text-content"
            id="alert-dialog-description"
          >
            Note: If an employee chooses to perform overtime for a spesific
            task, a notification will be sent to the Human Resources Department
          </DialogContentText>

          {isEdit ? (
            <EditOvertime
              addTaskinEdit={addtaskinEdit}
              projectEdit={projectEdit}
              errors={errors}
              errorTextStyles={errorTextStyles}
              currentUserId={currentUserId}
              setOptTask={setOptTask}
              datas={datas}
              setDatas={setDatas}
              dataEditOvertime={dataEditOvertime}
              setTimeTo={setTimeTo}
              opentask={opentask}
              setOpentask={setOpentask}
              optProject={optProject}
              optTask={optTask}
              optStatus={optStatus}
              handleChange={handleChange}
              handleChangeProject={handleChangeProject}
              AddTask={AddTask}
              RemoveProject={RemoveProject}
              deleteTask={deleteTask}
              setIsLocalizationFilled={setIsLocalizationFilled}
            />
          ) : (
            <AddOvertime
              errors={errors}
              handleChange={handleChange}
              handleChangeProject={handleChangeProject}
              datas={datas}
              setDatas={setDatas}
              dataOvertime={dataOvertime}
              optProject={optProject}
              optTask={optTask}
              optStatus={optStatus}
              isLocalizationFilled={isLocalizationFilled}
              setIsLocalizationFilled={setIsLocalizationFilled}
              opentask={opentask}
              setOpentask={setOpentask}
              deleteTask={deleteTask}
              AddTask={AddTask}
              RemoveProject={RemoveProject}
              errorTextStyles={errorTextStyles}
              getDataTask={getDataTask}
              currentUserId={currentUserId}
              setOptTask={setOptTask}
            />
          )}
        </DialogContent>
        <DialogActions>
          {isEdit ? (
            <>
              <div className="left-container">
                <Button
                  variant="outlined"
                  className="green-button button-text"
                  onClick={() => {
                    let CekProject = [];
                    for (let i = 0; i < optProject.length; i++) {
                      if (dataDetailnya[i]) {
                        if (dataDetailnya[i].attributes.projectName) {
                          CekProject[i] = true;
                        } else {
                          CekProject[i] = false;
                        }
                      }
                    }
                    onAddProject(CekProject);
                  }}
                  startIcon={<AddIcon />}
                >
                  Add Project
                </Button>
              </div>
              <div className="right-container">
                <Button
                  variant="outlined"
                  className="button-text"
                  onClick={() => setDialogCancel(true)}
                >
                  Cancel
                </Button>
                <Button
                  variant="saveButton"
                  className="button-text"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="left-container">
                <Button
                  variant="outlined"
                  className="green-button button-text"
                  onClick={() => onAddProject()}
                  startIcon={<AddIcon />}
                >
                  Add Project
                </Button>
              </div>
              <div className="right-container">
                <Button
                  variant="outlined"
                  className="button-text"
                  onClick={() => setDialogCancel(true)}
                >
                  Cancel
                </Button>
                <Button
                  variant="saveButton"
                  className="button-text"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </>
          )}
        </DialogActions>

        <Dialog
          open={dialogCancel}
          onClose={isEdit ? () => closeOvertime(false) : () => closeTask(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            sx={{
              alignSelf: "center",
              fontSize: "30px",
              fontStyle: "Poppins",
            }}
            id="alert-dialog-title"
            className="dialog-delete-header"
          >
            {"Cancel Data"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {"Warning: Canceling will result in data loss without saving!"}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions">
            <Button
              variant="outlined"
              onClick={
                isEdit
                  ? () => {
                      closeOvertime(false);
                      setOpentask(false);
                      setDataOvertime([clearProject]);
                      setIsLocalizationFilled(false);
                      setDialogCancel(false);
                      setErrors({});
                    }
                  : () => {
                      setDatas({
                        startTime: "",
                        endTime: "",
                        projects: [{ projectId: "" }],
                        tasks: [
                          [{ taskName: "", statusTaskId: "", duration: "" }],
                        ],
                      });
                      closeTask(false);
                      setOpentask(false);
                      setIsLocalizationFilled(false);
                      setDialogCancel(false);
                      setErrors({});
                      setDataOvertime({
                        listProject: [
                          {
                            projectId: "",
                            listTask: [
                              {
                                backlogId: null,
                                taskName: "",
                                statusTaskId: "",
                                duration: "",
                                taskItem: "",
                              },
                            ],
                          },
                        ],
                      });
                    }
              }
            >
              {"Cancel without saving"}
            </Button>
            <Button
              variant="contained"
              className="button-text"
              onClick={handleClose}
            >
              {"Back"}
            </Button>
          </DialogActions>
        </Dialog>
      </Dialog>
    </>
  );
};

export default CreateOvertime;
