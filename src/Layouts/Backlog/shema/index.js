// import * as yup from "yup";

// const textPlease = 'Please Input'
// const textPleaseSelect = 'Please Select'

// const shemabacklog = yup.object({
//     taskName: yup.string().required(`${textPlease} Task Name`),
//     // statusBacklog: yup.string().required(`${textPlease} Status Backog`),
//     estimationTime: yup.string().required(`${textPlease} Estimation Time`).matches(/^[0-9\.]+$/, ('Invalid Estimation Time')),
//     statusBacklog: yup.string().required(`${textPleaseSelect} Status Backlog`),
//     priority:yup.string().required(`${textPlease} Priority`),
//     assignedTo:yup.string().required(`${textPleaseSelect} Assigned To`),
//   })
// export default shemabacklog

import * as yup from 'yup';
const createTaskSchema = (tasks) => {
  const taskSchema = {};
  
  tasks.forEach((task) => {
    taskSchema[`taskName-${task.id}`] = yup.string().required('Task Name is required').matches(/\S+/g, ('Whitespace only. Task Name is Required'));
    taskSchema[`estimationTime-${task.id}`] = yup.string().required('Estimation Time is required').matches(/^(\d)+(.\d+){0,1}$/, ('Invalid Estimation Time'));
    taskSchema[`priority-${task.id}`] = yup.string().required('Priority is required');
    taskSchema[`statusBacklog-${task.id}`] = yup.string().required('Status Backlog is required');
    taskSchema[`assignedTo-${task.id}`] = yup.string().required('Assigned To is required');
  });
  
  return yup.object().shape(taskSchema);
};

export default createTaskSchema;
