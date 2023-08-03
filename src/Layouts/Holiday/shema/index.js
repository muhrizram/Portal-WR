import * as yup from "yup";

const textPlease = 'Please Input'

const schemaholiday = yup.object({
    date: yup.string().required(`${textPlease} Holiday Date`),
    notes: yup.string().required(`${textPlease} Holiday Notes`),
  })

export default schemaholiday