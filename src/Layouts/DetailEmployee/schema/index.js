import * as yup from "yup";

const textPlease = 'Please Input'

const schemacontract = yup.object({
    contractStatus: yup.object().required("Please Select Contract Status"),
    startDate: yup.date().typeError("Invalid Date").required("Please Select Start Date"),
    endDate: yup.date().typeError("Invalid Date").required("Please Select End Date"),
    file:yup.string().url(),
  })

export default schemacontract