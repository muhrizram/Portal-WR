import * as yup from "yup";

const textPlease = 'Please Input'

const shemabacklog = yup.object({
    taskName: yup.string().matches(/^\s*\S+\s*$/, `${textPlease} Task Name`).max(30).required(`${textPlease} Task Name`),
    taskDescription: yup.string().matches(/^\s*\S+\s*$/, `${textPlease} Task Description`).max(255).required(`${textPlease} Task Description`),
    estimationTime: yup.number().required(`${textPlease} Estimation Time`),
    // statusBacklog: yup.string().required(`${textPlease} Status Backlog`),
  })
export default shemabacklog