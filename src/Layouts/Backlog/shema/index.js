import * as yup from "yup";

const textPlease = 'Please Input'

const shemabacklog = yup.object({
    taskName: yup.string().matches(/^\s*\S+\s*$/, `${textPlease} Task Name`).required(`${textPlease} Task Name`),
    statusBacklog: yup.string().required(`${textPlease} Status Backog`),
    estimationTime: yup.string().matches(/^[0-9\[\]:;<>,.?~\\/-]+$/).required(`${textPlease} Estimation Time`),
    statusBacklog: yup.string().required(`${textPlease} Status Backlog`),
    priority:yup.string().required(`${textPlease} Priority`),
  })
export default shemabacklog