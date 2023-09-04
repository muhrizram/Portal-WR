import * as yup from "yup";

const textPlease = 'Please Input'

const schemacompany = yup.object({
    companyName: yup.string().matches(/^\s*\S+\s*$/, `${textPlease} Company Name`).max(30).required(`${textPlease} Company Name`),
    companyEmail: yup.string().email(`${textPlease} Valid Email`).matches(/^.+\.(com|co\.id)$/i, `${textPlease} Company Email, Company Email must be .com or .co.id`).required(`${textPlease} Company Email`),
    npwp: yup.string().matches(/^(\d{2})[.](\d{3})[.](\d{3})[.](\d-)(\d{3})[.](\d{3})$/g, `${textPlease} NPWP, NPWP must be XX.XXX.XXX.X-XXX.XXX`).required(`${textPlease} NPWP`),
    address: yup.string().matches(/^\s*\S+\s*$/, `${textPlease} Address`).required(`${textPlease} Address`),
  })

export default schemacompany