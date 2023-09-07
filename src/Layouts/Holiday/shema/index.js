import * as yup from "yup";

const textPlease = 'Please Input'

const schemaholiday = yup.object({
    date: yup.date().typeError("Invalid date").required(`Please Select Holiday Date`),
    notes: yup.string().max(50, "The maximum length for holiday notes is 50 characters").required(`${textPlease} Holiday Notes`),
  })

export default schemaholiday