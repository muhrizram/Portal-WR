import * as yup from "yup";

const textPlease = 'Please Input'

const shemabacklog = yup.object({
    taskName: yup.string().required(`${textPlease} Task Name`).matches(/^\s*\S+\s*$/, `${textPlease} Task Name`),
    statusBacklog: yup.string().required(`${textPlease} Status Backog`),
    estimationTime: yup.string().required(`${textPlease} Estimation Time`).matches(/^[0-9\.]+$/, ('Invalid Estimation Time')),
    statusBacklog: yup.string().required(`${textPlease} Status Backlog`),
    priority:yup.string().required(`${textPlease} Priority`),
  })
export default shemabacklog