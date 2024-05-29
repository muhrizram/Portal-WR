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
import { AlertContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import {
  SubmitSave,
  UpdateTask,
  getlistProject,
  getListTaskProject,
  getstatusTask,
} from "./apiFunctions";
import EditTask from "./Form/editTask";
import CreateTask from "./Form/addTask";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../../../global/taskSchema";
import {
  clearProjectTaskErrors,
  clearTaskErrors,
  resetFormValues,
} from "../../../global/formFunctions";

const PopupTask = ({
  open,
  closeTask,
  isEdit,
  selectedWrIdanAbsenceId,
  dataDetail,
  setIsSubmit,
}) => {
  const { setDataAlert } = useContext(AlertContext);
  const [listTaskProject, setListTaskProject] = useState([]);
  const [listProject, setlistProject] = useState([]);
  const [idEffortTask, setIdEffortTask] = useState();
  const [openTask, setOpenTask] = useState(false);
  const [statusTask, setStatusTask] = useState([]);
  const [openPopUpMoretask, setPopUpMoretask] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [defaultEditData, setDefaultEditData] = useState([]);
  const [checkAbsence, setCheckAbsence] = useState([]);
  const [openConfirmCancel, setOpenConfirmCancel] = useState(false);
  const [dataDetailArray, setDataDetailArray] = useState([]);
  const [addTaskinEdit, setAddTaskinEdit] = useState(false);
  const [CekProjectEdit, setCheckProjectEdit] = useState([]);
  const [DurationTask, setDurationTask] = useState();
  const [projectColumn, setProjectColumn] = useState(false);
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

  const [dataProject, setDataProject] = useState({
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

    let tempProjects = dataDetail.map((data) => ({
      projectId: data.attributes.projectId
        ? data.attributes.projectId
        : data.attributes.absenceId,
    }));

    let tempTasks = dataDetail.map((data) =>
      data.attributes.listTask.map((task) => ({
        taskName: data.attributes.projectId ? task.taskName : "Absence",
        statusTaskId: data.attributes.projectId
          ? task.statusTaskId
          : data.attributes.absenceId,
        taskDuration: String(task.taskDuration),
        taskDetails: task.taskItem,
      }))
    );

    setDefaultEditData({
      listProject: tempProjects,
      listTask: tempTasks,
    });
  };

  useEffect(() => {
    if (isEdit) {
      setDataDetailArray(dataDetail);
      refreshDataDetail();
      setOpenTask(true);
      setSelectedTask([]);
    }
    getlistProject(setlistProject);
    getstatusTask(setStatusTask);
  }, [dataProject, dataDetailArray, dataDetail]);

  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
    defaultValues: defaultEditData || {
      listProject: [{ projectId: null }],
      listTask: [
        [
          {
            taskName: "",
            statusTaskId: "",
            taskDuration: "",
            taskDetails: "",
          },
        ],
      ],
    },
  });

  const pemantau = watch();
  useEffect(() => {
    console.log("Pemantau", pemantau);
    console.log("Errornya", errors);
  }, [pemantau, errors]);

  useEffect(() => {
    if (defaultEditData) {
      reset({
        listProject: defaultEditData.listProject,
        listTask: defaultEditData.listTask,
      });
    }
  }, [defaultEditData, reset]);

  const onAddProject = (checkProject) => {
    if (isEdit) {
      setCheckProjectEdit(checkProject);
      setAddTaskinEdit(true);
      setFirstEditTask((prevState) => ({
        ...prevState,
        listProject: [...prevState.listProject, clearProject],
      }));
    } else {
      setDataProject((prevState) => ({
        ...prevState,
        listProject: [...prevState.listProject, clearProject],
      }));
    }
  };

  const onRemoveProject = (e, idxProject) => {
    clearProjectTaskErrors(errors, clearErrors, idxProject, false);

    resetFormValues(setValue, watch, idxProject, false);
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
      setDataProject(updatedDataProject);
      const updatedselectedProject = [...selectedProject];
      updatedselectedProject.splice(idxProject, 1);
      setSelectedProject(updatedselectedProject);
    }
  };

  const addTask = (idxProject) => {
    let temp = null;
    if (isEdit) {
      temp = { ...firstEditTask };
    } else {
      temp = { ...dataProject };
    }
    if (isEdit) {
      temp.listProject[idxProject].listTask.push({ ...clearTask });
      setFirstEditTask(temp);
    } else {
      temp.listProject[idxProject].listTask.push({ ...clearTask });
      setDataProject(temp);
    }
  };

  const handleChange = (event, idxProject, index, backlogId) => {
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
      setDataProject(temp);
    }
  };

  const handleChangeProject = (newValue, idxProject, absen) => {
    if (newValue === null) {
      newValue = { id: null, name: "" };
    }

    if (isEdit) {
      const temp = { ...firstEditTask };
      if (absen) {
        temp.listProject[idxProject].absenceId = newValue.id;
        temp.listProject[idxProject].projectId = null;
        temp.listProject[idxProject].projectName = newValue.name;
      } else {
        temp.listProject[idxProject].absenceId = null;
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
        temp.listProject[idxProject].projectId = null;
        temp.listProject[idxProject].projectName = newValue.name;
      } else {
        temp.listProject[idxProject].absenceId = null;
        temp.listProject[idxProject].projectId = newValue.id;
        temp.listProject[idxProject].projectName = newValue.name;
      }
      temp.listProject[idxProject].listTask = [clearTask];
      setDataProject(temp);
    }
  };

  const deleteTask = (e, idxProject, index) => {
    if (isEdit) {
      const tempEdit = { ...firstEditTask };
      tempEdit.listProject[idxProject].listTask.splice(index, 1);
      setFirstEditTask(tempEdit);
    } else {
      const tempAdd = { ...dataProject };
      tempAdd.listProject[idxProject].listTask.splice(index, 1);
      setDataProject(tempAdd);
    }
    clearTaskErrors(clearErrors, idxProject, index);

    const updatedTasks = watch(`listTask.${idxProject}`).filter(
      (_, i) => i !== index
    );
    setValue(`listTask.${idxProject}`, updatedTasks);
  };

  const onSubmit = () => {
    if (isEdit) {
      UpdateTask(
        firstEditTask,
        setPopUpMoretask,
        setDurationTask,
        closeTask,
        setDataAlert,
        setIsSubmit,
        navigate
      );
    } else {
      SubmitSave(
        dataProject,
        setDataProject,
        setPopUpMoretask,
        setDurationTask,
        closeTask,
        setOpenTask,
        setDataAlert,
        clearProject,
        setIdEffortTask
      );
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
          <form onSubmit={handleSubmit(onSubmit)} id="task-form">
            <DialogContentText
              className="dialog-delete-text-content"
              id="alert-dialog-description"
            >
              Assign and track employee tasks easily
            </DialogContentText>
            {isEdit ? (
              <EditTask
                control={control}
                errors={errors}
                errorTextStyles={errorTextStyles}
                listProject={listProject}
                listTaskProject={listTaskProject}
                firstEditTask={firstEditTask}
                onRemoveProject={onRemoveProject}
                handleChangeProject={handleChangeProject}
                setProjectColumn={setProjectColumn}
                setIdEffortTask={setIdEffortTask}
                setCheckAbsence={setCheckAbsence}
                setOpenTask={setOpenTask}
                setListTaskProject={setListTaskProject}
                projectColumn={projectColumn}
                setFirstEditTask={setFirstEditTask}
                selectedTask={selectedTask}
                statusTask={statusTask}
                handleChange={handleChange}
                addTask={addTask}
                openTask={openTask}
                setValue={setValue}
                clearErrors={clearErrors}
                checkAbsence={checkAbsence}
                deleteTask={deleteTask}
              />
            ) : (
              <CreateTask
                control={control}
                clearErrors={clearErrors}
                errors={errors}
                setValue={setValue}
                dataProject={dataProject}
                errorTextStyles={errorTextStyles}
                checkAbsence={checkAbsence}
                setDataProject={setDataProject}
                openTask={openTask}
                listProject={listProject}
                getListTaskProject={getListTaskProject}
                setListTaskProject={setListTaskProject}
                handleChangeProject={handleChangeProject}
                setCheckAbsence={setCheckAbsence}
                setOpenTask={setOpenTask}
                onRemoveProject={onRemoveProject}
                deleteTask={deleteTask}
                selectedTask={selectedTask}
                listTaskProject={listTaskProject}
                statusTask={statusTask}
                handleChange={handleChange}
                addTask={addTask}
              />
            )}
          </form>
        </DialogContent>
        <DialogActions>
          {(isEdit || dataProject.workingReportId !== undefined) && (
            <div className="left-container">
              <Button
                variant="outlined"
                className="green-button button-text"
                onClick={() => {
                  if (isEdit) {
                    let checkProject = [];
                    for (let i = 0; i < listProject.length; i++) {
                      if (dataDetailArray[i]) {
                        if (dataDetailArray[i].attributes.projectName) {
                          checkProject[i] = true;
                        } else {
                          checkProject[i] = false;
                        }
                      }
                    }
                    onAddProject(checkProject);
                  } else {
                    onAddProject();
                  }
                }}
                startIcon={<AddIcon />}
              >
                Add Project
              </Button>
            </div>
          )}
          <div className="right-container">
            <Button
              onClick={() => {
                setOpenConfirmCancel(true);
                if (isEdit) {
                  refreshDataDetail();
                }
              }}
              variant="outlined"
              className="button-text"
              type="button"
            >
              Cancel
            </Button>
            <Button
              disabled={!isEdit && dataProject.workingReportId === undefined}
              variant="saveButton"
              className="button-text"
              type="submit"
              form="task-form"
            >
              Submit
            </Button>
          </div>
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
              setDataProject({
                workingReportTaskId: undefined,
                listProject: [clearProject],
              });
              setIdEffortTask("");
              setOpenConfirmCancel(false);
              if (isEdit) {
                setIsSubmit(true);
              }
              reset();
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
