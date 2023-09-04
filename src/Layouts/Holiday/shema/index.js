import * as yup from "yup";

const textPlease = 'Please Input'

const schemaholiday = yup.object({
    date: yup.string().required(`Please Select Holiday Date`),
    notes: yup.string().required(`${textPlease} Holiday Notes`),
  })

export default schemaholiday