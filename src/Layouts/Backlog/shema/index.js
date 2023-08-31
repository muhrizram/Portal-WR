import * as yup from "yup";

const textPlease = 'Please Input'

const schemacompany = yup.object({
    taskName: yup.string().max(30).required(`${textPlease} Task Name`),
    // taskDescription: yup.string().max(255).required(`${textPlease} Task Description`),
    estimationTime: yup.number().required(`${textPlease} Estimation Time`),
    // statusBacklog: yup.string().required(`${textPlease} Status Backlog`),
  })

export default schemacompany