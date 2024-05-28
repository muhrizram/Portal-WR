export const getErrorArrayPosition = (errors, path) => {
  return path.reduce((acc, key) => acc && acc[key], errors);
};

export const clearTaskErrors = (clearErrors, idxProject, index, isOvertime) => {
  const taskPath = isOvertime
    ? `task.listTask.${idxProject}.${index}`
    : `listTask.${idxProject}.${index}`;
  clearErrors(`${taskPath}.taskName`);
  clearErrors(`${taskPath}.statusTaskId`);
  clearErrors(`${taskPath}.taskDuration`);
  clearErrors(`${taskPath}.taskDetails`);
};

export const clearProjectTaskErrors = (
  errors,
  clearErrors,
  idxProject,
  isOvertime
) => {
  const overtimeErrorsPath = errors.task;
  const taskErrorsPath = errors;

  clearErrors(
    isOvertime
      ? `task.listProject.${idxProject}.projectId`
      : `listProject.${idxProject}.projectId`
  );
  if (
    (overtimeErrorsPath &&
      overtimeErrorsPath.listTask &&
      overtimeErrorsPath.listTask[idxProject]) ||
    (taskErrorsPath &&
      taskErrorsPath.listTask &&
      taskErrorsPath.listTask[idxProject])
  ) {
    const listTaskErrors = isOvertime
      ? overtimeErrorsPath.listTask[idxProject]
      : taskErrorsPath.listTask[idxProject];
    listTaskErrors.forEach((_, taskIndex) => {
      isOvertime
        ? clearTaskErrors(clearErrors, idxProject, taskIndex, true)
        : clearTaskErrors(clearErrors, idxProject, taskIndex, false);
    });
  }
};

export const resetFormValues = (setValue, watch, idxProject, isOvertime) => {
  const updatedProjects = watch(
    isOvertime ? "task.listProject" : "listProject"
  ).filter((_, i) => i !== idxProject);
  const updatedTasks = watch(isOvertime ? "task.listTask" : "listTask").filter(
    (_, i) => i !== idxProject
  );

  setValue(isOvertime ? "task.listProject" : "listProject", updatedProjects);
  setValue(isOvertime ? "task.listTask" : "listTask", updatedTasks);
};

export const clearListTaskErrorsAndValues = (
  clearErrors,
  setValue,
  idxProject,
  isOvertime
) => {
  clearErrors(
    isOvertime ? `task.listTask.${idxProject}` : `listTask.${idxProject}`
  );
  setValue(
    isOvertime ? `task.listTask.${idxProject}` : `listTask.${idxProject}`,
    Array.from({ length: 1 }, () => ({
      taskName: "",
      statusTaskId: "",
      taskDuration: "",
      taskDetails: "",
    }))
  );
};
