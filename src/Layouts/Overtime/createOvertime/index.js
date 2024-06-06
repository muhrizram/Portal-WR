import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import "../../../App.css";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../../context";
import { calculateTimeDifference } from "./timeUtils";
import {
  getDataTask,
  getDataProject,
  getDataStatus,
  onSave,
  saveEdit,
} from "./apiFunctions";
import AddOvertime from "./Form/addOvertime";
import { overtimeSchema } from "../../../global/overtimeSchema";
import EditOvertime from "./Form/editOvertime";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import {
  clearTaskErrors,
} from "../../../global/formFunctions";

const CreateOvertime = ({
  open,
  firstPreview,
  setFirstPreview,
  closeTask,
  isEdit,
  closeOvertime,
  dataDetail,
  wrDate,
  setIsSubmit,
  isHoliday,
}) => {
  const [defaultEditData, setDefaultEditData] = useState([]);
  const navigate = useNavigate();
  const { setDataAlert } = useContext(AlertContext);
  const [dialogCancel, setDialogCancel] = useState(false);
  const [isLocalizationFilled, setIsLocalizationFilled] = useState(false);
  const [optProject, setOptProject] = useState([]);
  const [optTask, setOptTask] = useState([]);
  const [optStatus, setOptStatus] = useState([]);
  const [openTask, setOpenTask] = useState(false);
  const [dataDetailArray, setDataDetailArray] = useState({});
  const [projectEdit, setProjectEdit] = useState([]);
  const [addTaskInEdit, setAddTaskInEdit] = useState(false);
  const [file, setFile] = useState(null);

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
    listProject: [clearProject],
  });

  const [dataEditOvertime, setDataEditOvertime] = useState({
    workingReportOvertimeId: null,
    listProject: [clearProject],
  });

  const handleChangeFile = (file) => {
    setFile(file);
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
      setFile(dataDetail.attributes.file);
    }

    let tempProjects = dataDetail.attributes.listProject.map((data) => ({
      projectId: data.projectId,
    }));

    let tempTasks = dataDetail.attributes.listProject.map((data) =>
      data.listTask.map((task) => ({
        taskName: task.taskCode + " - " + task.taskName,
        statusTaskId: task.statusTaskId,
        taskDuration: String(task.duration),
        taskDetails: task.taskItem ? task.taskItem : "",
      }))
    );

    setDefaultEditData({
      time: {
        startTime: dataDetail.attributes.startTime,
        endTime: dataDetail.attributes.endTime,
      },
      task: {
        listProject: tempProjects,
        listTask: tempTasks,
      },
      holiday: "",
    });
  };

  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
    watch,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(overtimeSchema),
    mode: "onChange",
    defaultValues: defaultEditData || {
      time: {
        startTime: "",
        endTime: "",
      },
      task: {
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
      holiday: "",
    },
  });

  useEffect(() => {
    setValue("time.isHoliday", isHoliday);
  }, [open]);

  const time = getValues("time");

  useEffect(() => {
    if (defaultEditData) {
      reset({
        time: defaultEditData.time,
        task: defaultEditData.task,
      });
    }
  }, [defaultEditData, reset]);

  const addTask = (idxProject) => {
    const temp = isEdit ? { ...dataEditOvertime } : { ...dataOvertime };
    const newTask = { ...clearTask };

    temp.listProject[idxProject].listTask = [
      ...temp.listProject[idxProject].listTask,
      newTask,
    ];

    if (isEdit) {
      setDataEditOvertime(temp);
    } else {
      setDataOvertime(temp);
    }
  };

  const handleChange = (event, idxProject, index, isEdit, backlogId) => {
    const { name, value } = event.target;
    const isDuration = name === "duration";
    const isTaskName = name === "taskName";
    const isStatusId = name === "statusTaskId";

    const updateData = (data) => {
      if (isDuration) {
        const parsedValue = parseFloat(value);
        if (parsedValue < 0) {
          data.listProject[idxProject].listTask[index][name] = "0";
        } else {
          const calculatedValue = Math.min(
            parsedValue,
            calculateTimeDifference(time.startTime, time.endTime)
          );
          data.listProject[idxProject].listTask[index][name] = calculatedValue;
        }
      } else if (isTaskName) {
        data.listProject[idxProject].listTask[index].backlogId = backlogId;
      } else if (isStatusId) {
        data.listProject[idxProject].listTask[index][name] = value;
      } else {
        data.listProject[idxProject].listTask[index][name] = value;
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
  };

  const { remove: removeListTask } = useFieldArray({
    control,
    name: `task.listTask`,
  });

  const { remove: removeListProject } = useFieldArray({
    control,
    name: `task.listProject`,
  });

  const deleteTask = async (e, idxProject, index) => {
    e.preventDefault();
    if (isEdit) {
      const temp = { ...dataEditOvertime };
      temp.listProject[idxProject].listTask.splice(index, 1);
      setDataEditOvertime(temp);
    } else {
      const temp = { ...dataOvertime };
      temp.listProject[idxProject].listTask.splice(index, 1);
      setDataOvertime(temp);
    }

    clearTaskErrors(clearErrors, idxProject, index, true);
    removeListTask(`[${idxProject}][${index}]`);
  };

  const handleClose = () => {
    setDialogCancel(false);
  };

  const handleCancel = () => {
    setDialogCancel(true);
  };

  const handleCancelClick = () => {
    reset();
    if (isEdit) {
      setIsSubmit(true);
    }
    if (isEdit) {
      closeOvertime(false);
      setOpenTask(false);
      setDataOvertime([clearProject]);
      setIsLocalizationFilled(false);
      setDialogCancel(false);
    } else {
      closeTask(false);
      setOpenTask(false);
      setIsLocalizationFilled(false);
      setDialogCancel(false);
      setDataOvertime({
        listProject: [clearProject],
      });
    }
  };

  const setTimeTo = (timeString) => {
    const currentDate = dayjs();
    const formattedDate = currentDate.format("YYYY-MM-DD");
    return timeString ? dayjs(`${formattedDate}T${timeString}`) : null;
  };

  useEffect(() => {
    if (isEdit) {
      onEdit();
      setDataDetailArray(dataDetail);
      setOpenTask(true);
    }
    getDataProject(currentUserId, setOptProject);
    getDataStatus(setOptStatus);
  }, [dataOvertime, dataDetailArray, dataDetail]);

  const onSubmit = () => {
    if (isEdit) {
      console.log("Masuk edit");
      saveEdit(
        file,
        time.startTime,
        time.endTime,
        setIsSubmit,
        dataEditOvertime,
        currentUserId,
        setDataAlert,
        navigate,
        closeOvertime
      );
    } else {
      onSave(
        file,
        time.startTime,
        time.endTime,
        wrDate,
        currentUserId,
        dataOvertime,
        setDataAlert,
        closeTask,
        setOpenTask
      );
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
          <form onSubmit={handleSubmit(onSubmit)} id="overtime-form">
            <DialogContentText
              className="dialog-delete-text-content"
              id="alert-dialog-description"
            >
              Note: If an employee chooses to perform overtime for a spesific
              task, a notification will be sent to the Human Resources
              Department
            </DialogContentText>

            {isEdit ? (
              <EditOvertime
                control={control}
                clearErrors={clearErrors}
                setValue={setValue}
                addTaskInEdit={addTaskInEdit}
                projectEdit={projectEdit}
                errors={errors}
                errorTextStyles={errorTextStyles}
                currentUserId={currentUserId}
                setOptTask={setOptTask}
                dataEditOvertime={dataEditOvertime}
                setTimeTo={setTimeTo}
                openTask={openTask}
                setOpenTask={setOpenTask}
                optProject={optProject}
                optTask={optTask}
                optStatus={optStatus}
                handleChange={handleChange}
                handleChangeProject={handleChangeProject}
                addTask={addTask}
                deleteTask={deleteTask}
                setIsLocalizationFilled={setIsLocalizationFilled}
                handleChangeFile={handleChangeFile}
                file={file}
                firstPreview={firstPreview}
                setFirstPreview={setFirstPreview}
              />
            ) : (
              <AddOvertime
                control={control}
                errors={errors}
                setValue={setValue}
                clearErrors={clearErrors}
                handleChange={handleChange}
                handleChangeProject={handleChangeProject}
                dataOvertime={dataOvertime}
                optProject={optProject}
                optTask={optTask}
                optStatus={optStatus}
                isLocalizationFilled={isLocalizationFilled}
                setIsLocalizationFilled={setIsLocalizationFilled}
                openTask={openTask}
                setOpenTask={setOpenTask}
                deleteTask={deleteTask}
                addTask={addTask}
                errorTextStyles={errorTextStyles}
                getDataTask={getDataTask}
                currentUserId={currentUserId}
                setOptTask={setOptTask}
                handleChangeFile={handleChangeFile}
              />
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <div className="right-container">
            <Button
              variant="outlined"
              className="button-text"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              disabled={!file}
              variant="saveButton"
              className="button-text"
              type="submit"
              form="overtime-form"
            >
              Submit
            </Button>
          </div>
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
            <Button variant="outlined" onClick={handleCancelClick}>
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
