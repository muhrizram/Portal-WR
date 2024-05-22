import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../../../App.css";
import { AlertContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import {
  SubmitSave,
  UpdateTask,
  getlistProject,
  getlistTaskProject,
  getstatusTask,
} from "./apiFunctions";
import EditTask from "./Form/editTask";
import CreateTask from "./Form/addTask";

const PopupTask = ({
  open,
  closeTask,
  isEdit,
  selectedWrIdanAbsenceId,
  dataDetail,
}) => {
  const [datas, setDatas] = useState({
    projects: [{ projectId: "" }],
    tasks: [
      [{ taskName: "", statusTaskId: "", duration: "", taskDetails: "" }],
    ],
  });
  const [errors, setErrors] = useState({});
  const { setDataAlert } = useContext(AlertContext);
  const [listTaskProject, setlistTaskProject] = useState([]);
  const [listProject, setlistProject] = useState([]);
  const [idEffortTask, setIdEffortTask] = useState();
  const [openTask, setOpenTask] = useState(false);
  const [statusTask, setstatusTask] = useState([]);
  const [openPopUpMoretask, setPopUpMoretask] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [taskDurations, setTaskDurations] = useState([
    listTaskProject.find((item) => item.backlogId === idEffortTask),
  ]);
  const [checkAbsence, setCheckAbsence] = useState([]);
  const [openConfirmCancel, setOpenConfirmCancel] = useState(false);
  const [dataDetailArray, setDataDetailArray] = useState([]);
  const [addTaskinEdit, setAddtaskinEdit] = useState(false);
  const [CekProjectEdit, setCekProjectEdit] = useState([]);
  const [DurationTask, setDurationTask] = useState();
  const [Kolomproject, setKolomproject] = useState(false);
  const navigate = useNavigate();

  const errorTextStyles = {
    color: "#d32f2f",
    textAlign: "left",
    fontSize: 12,
    paddingY: "3px",
    marginLeft: "16px",
  };

  const clearProject = {
    absenceId: null,
    projectId: null,
    listTask: [],
  };

  const [dataProject, setProject] = useState({
    workingReportId: undefined,
    listProject: [clearProject],
  });

  const clearTask = {
    backlogId: "",
    taskName: "",
    statusTaskId: "",
    duration: "",
    taskItem: "",
  };

  const [firstEditTask, setFirstEditTask] = useState({
    workingReportTaskId: null,
    listProject: [],
  });

  const refreshDataDetail = () => {
    let tempProject = [];
    for (const data of dataDetail) {
      tempProject.push(data.attributes);
      setFirstEditTask((prevfirstEditTask) => ({
        ...prevfirstEditTask,
        workingReportTaskId: parseInt(data.id),
        listProject: tempProject,
      }));
    }

    const newProjects = [];
    const newTasks = [];

    dataDetail.forEach((data, projectIndex) => {
      newProjects.push({
        projectId: data.attributes.projectId
          ? String(data.attributes.projectId)
          : String(data.attributes.absenceId),
      });
      data.attributes.listTask.forEach((task) => {
        newTasks[projectIndex] = newTasks[projectIndex] || [];
        newTasks[projectIndex].push({
          taskName: task.taskName ? task.taskName : task.taskCode,
          statusTaskId: task.statusTaskId
            ? String(task.statusTaskId)
            : task.taskCode,
          duration: String(task.taskDuration),
          taskDetails: task.taskItem !== null ? task.taskItem : "",
        });
      });
    });
    setDatas((prevDatas) => ({
      ...prevDatas,
      projects: newProjects,
      tasks: newTasks,
    }));
  };

  useEffect(() => {
    if (isEdit) {
      setDataDetailArray(dataDetail);
      refreshDataDetail();
      setOpenTask(true);
      setSelectedTask([]);
    }
    getlistProject(setlistProject);
    getstatusTask(setstatusTask);
  }, [dataProject, dataDetailArray, dataDetail]);

  const onAddProject = (CekProject) => {
    setDatas({
      ...datas,
      projects: [...datas.projects, { projectId: "" }],
      tasks: [
        ...datas.tasks,
        [{ taskName: "", statusTaskId: "", duration: "", taskDetails: "" }],
      ],
    });
    if (isEdit) {
      setCekProjectEdit(CekProject);
      setAddtaskinEdit(true);
      setFirstEditTask((prevState) => ({
        ...prevState,
        listProject: [...prevState.listProject, clearProject],
      }));
    } else {
      setProject((prevState) => ({
        ...prevState,
        listProject: [...prevState.listProject, clearProject],
      }));
    }
  };

  const onRemoveProject = (e, idxProject) => {
    datas.projects.splice(idxProject, 1);
    datas.tasks.splice(idxProject, 1);
    if (isEdit) {
      const updatedDataProject = { ...firstEditTask };
      const updatedListProject = [...updatedDataProject.listProject];
      updatedListProject.splice(idxProject, 1);
      updatedDataProject.listProject = updatedListProject;
      setFirstEditTask(updatedDataProject);
      const updatedselectedProject = [...selectedProject];
      updatedselectedProject.splice(idxProject, 1);
      setSelectedProject(updatedselectedProject);
    } else {
      const updatedDataProject = { ...dataProject };
      const updatedListProject = [...updatedDataProject.listProject];
      updatedListProject.splice(idxProject, 1);
      updatedDataProject.listProject = updatedListProject;
      setProject(updatedDataProject);
      const updatedselectedProject = [...selectedProject];
      updatedselectedProject.splice(idxProject, 1);
      setSelectedProject(updatedselectedProject);
    }
  };

  const AddTask = (idxProject) => {
    let temp = null;
    if (isEdit) {
      temp = { ...firstEditTask };
    } else {
      temp = { ...dataProject };
    }
    let dataArray = [...datas.tasks];
    const taskLength = temp.listProject[idxProject].listTask.length;
    dataArray[idxProject][taskLength] = {
      taskName: "",
      statusTaskId: "",
      duration: "",
      taskDetails: "",
    };
    setDatas({
      ...datas,
      tasks: dataArray,
    });
    if (isEdit) {
      temp.listProject[idxProject].listTask.push({ ...clearTask });
      setFirstEditTask(temp);
    } else {
      temp.listProject[idxProject].listTask.push({ ...clearTask });
      setProject(temp);
    }
  };

  const handleChange = (event, idxProject, index, backlogId) => {
    let dataArray = [...datas.tasks];

    if (!dataArray[idxProject]) {
      dataArray[idxProject] = [];
    }

    dataArray[idxProject][index] = {
      ...dataArray[idxProject][index],
      statusTaskId: String(event.value.id),
    };
    setDatas({
      ...datas,
      tasks: dataArray,
    });
    if (isEdit) {
      const temp = { ...firstEditTask };
      temp.listProject[idxProject].listTask[index][`${event.name}Id`] =
        event.value.id;
      temp.listProject[idxProject].listTask[index][`${event.name}Name`] =
        event.value.name;
      setFirstEditTask(temp);
    } else {
      const temp = { ...dataProject };
      temp.listProject[idxProject].listTask[index][`${event.name}Id`] =
        event.value.id;
      temp.listProject[idxProject].listTask[index][`${event.name}Name`] =
        event.value.name;
      setProject(temp);
    }
  };

  const handleChangeProject = (newValue, idxProject, absen) => {
    if (newValue === null) {
      newValue = { id: null, name: "" };
    }

    let dataArray = [...datas.projects];
    dataArray[idxProject] = {
      projectId: newValue ? String(newValue.name) : "",
    };

    setDatas({
      ...datas,
      projects: dataArray,
    });

    if (isEdit) {
      const temp = { ...firstEditTask };
      if (absen) {
        temp.listProject[idxProject].absenceId = newValue.id;
        temp.listProject[idxProject].projectName = newValue.name;
      } else {
        temp.listProject[idxProject].projectId = newValue.id;
        temp.listProject[idxProject].projectName = newValue.name;
      }
      temp.listProject[idxProject].listTask = [clearTask];
      setFirstEditTask(temp);
    } else {
      const temp = { ...dataProject };
      temp.workingReportId = selectedWrIdanAbsenceId.workingReportTaskId;
      if (absen) {
        temp.listProject[idxProject].absenceId = newValue.id;
        temp.listProject[idxProject].projectName = newValue.name;
      } else {
        temp.listProject[idxProject].projectId = newValue.id;
        temp.listProject[idxProject].projectName = newValue.name;
      }
      temp.listProject[idxProject].listTask = [clearTask];
      setProject(temp);
    }
  };

  const deleteTask = (e, idxProject, index) => {
    datas.tasks.splice(idxProject, 1);
    if (isEdit) {
      const tempEdit = { ...firstEditTask };
      tempEdit.listProject[idxProject].listTask.splice(index, 1);
      setFirstEditTask(tempEdit);
    } else {
      datas.tasks[idxProject].splice(index, 1);
      const tempAdd = { ...dataProject };
      tempAdd.listProject[idxProject].listTask.splice(index, 1);
      setProject(tempAdd);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-delete dialog-task"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" className="dialog-delete-header">
          {isEdit ? "Edit Task" : "Add Task"}
        </DialogTitle>
        <DialogContent className="dialog-task-content">
          <DialogContentText
            className="dialog-delete-text-content"
            id="alert-dialog-description"
          >
            Assign and track employee tasks easily
          </DialogContentText>
          {isEdit ? (
            <EditTask
              datas={datas}
              setDatas={setDatas}
              errors={errors}
              errorTextStyles={errorTextStyles}
              firstEditTask={firstEditTask}
              openTask={openTask}
              addTaskinEdit={addTaskinEdit}
              CekProjectEdit={CekProjectEdit}
              listProject={listProject}
              setlistTaskProject={setlistTaskProject}
              handleChangeProject={handleChangeProject}
              setCheckAbsence={setCheckAbsence}
              setOpenTask={setOpenTask}
              onRemoveProject={onRemoveProject}
              setKolomproject={setKolomproject}
              setIdEffortTask={setIdEffortTask}
              setFirstEditTask={setFirstEditTask}
              Kolomproject={Kolomproject}
              deleteTask={deleteTask}
              AddTask={AddTask}
              selectedTask={selectedTask}
              listTaskProject={listTaskProject}
              statusTask={statusTask}
              handleChange={handleChange}
            />
          ) : (
            <CreateTask
              datas={datas}
              setDatas={setDatas}
              dataProject={dataProject}
              errorTextStyles={errorTextStyles}
              errors={errors}
              checkAbsence={checkAbsence}
              setProject={setProject}
              openTask={openTask}
              listProject={listProject}
              getlistTaskProject={getlistTaskProject}
              setlistTaskProject={setlistTaskProject}
              handleChangeProject={handleChangeProject}
              setCheckAbsence={setCheckAbsence}
              setOpenTask={setOpenTask}
              onRemoveProject={onRemoveProject}
              deleteTask={deleteTask}
              selectedTask={selectedTask}
              listTaskProject={listTaskProject}
              statusTask={statusTask}
              handleChange={handleChange}
              AddTask={AddTask}
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
                    for (let i = 0; i < listProject.length; i++) {
                      if (dataDetailArray[i]) {
                        if (dataDetailArray[i].attributes.projectName) {
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
                  onClick={() => {
                    setOpenConfirmCancel(true);
                    refreshDataDetail();
                  }}
                  variant="outlined"
                  className="button-text"
                >
                  Cancel
                </Button>
                <Button
                  variant="saveButton"
                  className="button-text"
                  onClick={() => {
                    UpdateTask(
                      datas,
                      setErrors,
                      firstEditTask,
                      setPopUpMoretask,
                      setDurationTask,
                      closeTask,
                      setDataAlert,
                      navigate
                    );
                  }}
                >
                  Submit
                </Button>
              </div>
            </>
          ) : (
            <>
              {dataProject.workingReportId !== undefined && (
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
                </>
              )}
              <div className="right-container">
                <Button
                  onClick={() => {
                    setOpenConfirmCancel(true);
                  }}
                  variant="outlined"
                  className="button-text"
                >
                  Cancel
                </Button>
                <Button
                  disabled={dataProject.workingReportId === undefined}
                  variant="saveButton"
                  className="button-text"
                  onClick={() =>
                    SubmitSave(
                      datas,
                      setErrors,
                      dataProject,
                      setPopUpMoretask,
                      setDurationTask,
                      setDataAlert,
                      closeTask,
                      setOpenTask,
                      setProject,
                      clearProject,
                      setIdEffortTask,
                      navigate
                    )
                  }
                >
                  Submit
                </Button>
              </div>
            </>
          )}
        </DialogActions>
      </Dialog>
      <Dialog
        open={openConfirmCancel}
        onClose={() => setOpenConfirmCancel(false)}
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
            onClick={() => {
              closeTask(false);
              setOpenTask(false);
              setProject({
                workingReportTaskId: undefined,
                listProject: [clearProject],
              });
              setIdEffortTask("");
              setOpenConfirmCancel(false);
              setErrors("");
            }}
          >
            {"Cancel without saving"}
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenConfirmCancel(false)}
          >
            {"Back"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPopUpMoretask}
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
          {DurationTask ? "New to the Work Crew" : "Oops! You Work So Hard"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {DurationTask
              ? "Duration is less than 8 hours, preventing task submission"
              : "Task exceeds 8-hour duration and cannot be submitted"}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialog-delete-actions">
          <Button variant="contained" onClick={() => setPopUpMoretask(false)}>
            {"Back To Task"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PopupTask;
