import client from "../../../global/client";
import { calculateTimeDifference } from "./timeUtils";

export const getDataTask = async (id, currentUserId, setOptTask) => {
  const res = await client.requestAPI({
    method: "GET",
    endpoint: `/ol/taskProject?projectId=${id}&userId=${currentUserId}&search=`,
  });

  const data = res.data.map((item) => ({
    backlogId: parseInt(item.id),
    taskName: item.attributes.taskName,
    actualEffort: item.attributes.actualEffort,
  }));
  setOptTask(data);
};

export const getDataProject = async (currentUserId, setOptProject) => {
  const res = await client.requestAPI({
    method: "GET",
    endpoint: `/ol/projectTypeList?userId=${currentUserId}&search=`,
  });
  const data = res.data.map((item) => ({
    id: parseInt(item.id),
    name: item.attributes.projectName,
  }));
  setOptProject(data);
};

export const getDataStatus = async (setOptStatus) => {
  const res = await client.requestAPI({
    method: "GET",
    endpoint: `/ol/status?search=`,
  });
  const data = res.data.map((item) => ({
    id: parseInt(item.id),
    status: item.attributes.name,
  }));
  setOptStatus(data);
};

export const onSave = async (
  filePath,
  startTimeSave,
  endTimeSave,
  wrDate,
  currentUserId,
  dataOvertime,
  setDataAlert,
  closeTask,
  setOpenTask
) => {
  const data = {
    startTime: startTimeSave,
    endTime: endTimeSave,
    file: filePath,
    date: wrDate,
    listProject: [],
    createdBy: currentUserId,
    updatedBy: currentUserId,
  };

  let totalDuration = 0;
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
      totalDuration += duration;
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

  const maxDuration = calculateTimeDifference(data.startTime, data.endTime);

  if (totalDuration > maxDuration || totalDuration < maxDuration) {
    setDataAlert({
      severity: "error",
      message: `Total duration cannot be more or less than ${maxDuration} hour(s).`,
      open: true,
    });
    return;
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
    setOpenTask(false);
  } else {
    setDataAlert({
      severity: "error",
      message: res.error.detail,
      open: true,
    });
  }
};

export const saveEdit = async (
  filePath,
  startTimeSave,
  endTimeSave,
  setIsSubmit,
  dataEditOvertime,
  currentUserId,
  setDataAlert,
  navigate,
  closeOvertime
) => {
  const dataUpdate = {
    startTime: startTimeSave || dataEditOvertime.startTime,
    endTime: endTimeSave || dataEditOvertime.endTime,
    file: filePath,
    workingReportId: null,
    listProjectId: [],
    createdBy: currentUserId,
    updatedBy: currentUserId,
  };
  dataUpdate.workingReportId = dataEditOvertime.workingReportOvertimeId;
  let totalDuration = 0;
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
      totalDuration += duration;
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

  const maxDuration = calculateTimeDifference(dataUpdate.startTime, dataUpdate.endTime);

  if (totalDuration > maxDuration || totalDuration < maxDuration) {
    setDataAlert({
      severity: "error",
      message: `Total duration cannot be more or less than ${maxDuration} hour(s).`,
      open: true,
    });
    return;
  }

  const res = await client.requestAPI({
    method: "POST",
    endpoint: `/overtime`,
    data: dataUpdate,
  });
  if (!res.isError) {
    setIsSubmit(true);
    setDataAlert({
      severity: "success",
      open: true,
      message: res.data.meta.message,
    });
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
