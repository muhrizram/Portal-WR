import client from "../../../global/client";

export const getstatusTask = async (setStatusTask) => {
  const res = await client.requestAPI({
    method: "GET",
    endpoint: `/ol/status?search=`,
  });
  if (res.data) {
    const dataStatusTask = res.data.map((item) => ({
      id: parseInt(item.id),
      name: item.attributes.name,
    }));
    setStatusTask(dataStatusTask);
  }
};

export const UpdateTask = async (
  firstEditTask,
  setPopUpMoretask,
  setDurationTask,
  closeTask,
  setDataAlert,
  setIsSubmit,
  navigate
) => {
  const readyUpdate = {
    workingReportId: null,
    listProject: [],
  };
  readyUpdate.workingReportId = firstEditTask.workingReportTaskId;

  for (const project of firstEditTask.listProject) {
    const newProject = {};

    newProject.projectId = project.projectId;
    newProject.absenceId = project.absenceId;

    newProject.listTask = [];
    for (const task of project.listTask) {
      if (task.taskId === null) {
        task.backlogId = null;
      }
      const newTask = {};

      newTask.taskId = task.taskId;
      newTask.backlogId = task.backlogId;
      newTask.taskName = task.taskName;
      newTask.statusTaskId = task.statusTaskId;
      newTask.duration = parseFloat(task.taskDuration);
      newTask.taskItem = task.taskItem;
      newProject.listTask.push(newTask);
    }
    readyUpdate.listProject.push(newProject);
  }
  let tempEffort = 0;
  for (const data of readyUpdate.listProject) {
    for (const resTask of data.listTask) {
      tempEffort = tempEffort + resTask.duration;
    }
  }
  if (tempEffort < 8) {
    setPopUpMoretask(true);
    setDurationTask(true);
  } else if (tempEffort > 8) {
    setPopUpMoretask(true);
    setDurationTask(false);
  } else {
    const res = await client.requestAPI({
      method: "PUT",
      endpoint: `/task/update`,
      data: readyUpdate,
    });
    if (!res.isError) {
      closeTask(false);
      setDataAlert({
        severity: "success",
        open: true,
        message: "Task edited successfully. Let's get things done!",
      });
      setIsSubmit(true);
      setTimeout(() => {
        navigate("/workingReport");
      }, 3000);
    } else {
      setDataAlert({
        severity: "error",
        open: true,
        message: res.error.detail,
      });
    }
  }
};

export const getListTaskProject = async (id, setListTaskProject) => {
  const res = await client.requestAPI({
    method: "GET",
    endpoint: `/ol/taskProject?projectId=${id}&userId=${localStorage.getItem(
      "userId"
    )}&search=`,
  });
  if (res.data) {
    const datalisttask = res.data.map((item) => ({
      backlogId: parseInt(item.id),
      taskName: item.attributes.taskName,
      actualEffort: item.attributes.actualEffort,
    }));
    setListTaskProject(datalisttask);
  }
};

export const getlistProject = async (setlistProject) => {
  const res = await client.requestAPI({
    method: "GET",
    endpoint: `/ol/projectTypeList?userId=${localStorage.getItem(
      "userId"
    )}&search=`,
  });
  const resabsen = await client.requestAPI({
    method: "GET",
    endpoint: `/ol/absenceTask?search=`,
  });
  const datalist = res.data.map((item) => ({
    id: parseInt(item.id),
    name: item.attributes.projectName,
  }));
  const dataabsen = resabsen.data.map((item) => ({
    id: parseInt(item.id),
    name: item.attributes.name,
    absen: true,
  }));

  if (res.data && resabsen.data) {
    const mergedList = [...datalist, ...dataabsen];
    setlistProject(mergedList);
  }
};

export const SubmitSave = async (
  dataProject,
  setDataProject,
  setPopUpMoretask,
  setDurationTask,
  closeTask,
  setOpenTask,
  setDataAlert,
  clearProject,
  setIdEffortTask
) => {
  try {
    let tempEffort = 0;
    for (const data of dataProject.listProject) {
      for (const resTask of data.listTask) {
        tempEffort = tempEffort + resTask.duration;
      }
    }
    if (tempEffort < 8) {
      setPopUpMoretask(true);
      setDurationTask(true);
    } else if (tempEffort > 8) {
      setPopUpMoretask(true);
      setDurationTask(false);
    } else {
      const res = await client.requestAPI({
        method: "POST",
        endpoint: `/task/addTask`,
        data: dataProject,
      });
      if (!res.isError) {
        closeTask(false);
        setOpenTask(false);
        setDataAlert({
          severity: "success",
          open: true,
          message: res.data.meta.message,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);

        setDataProject({
          workingReportTaskId: undefined,
          listProject: [clearProject],
        });
        setIdEffortTask("");
      } else {
        setDataAlert({
          severity: "error",
          message: res.error.detail,
          open: true,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};
