import * as yup from "yup";

const textPlease = 'Please Input'

const schemacompany = yup.object({
    companyProfile: yup.string().required(`${textPlease} Company Profile`),
    companyName: yup.string().matches(/^(?!\s)(?!.*\s$)(?=.*\S).+$/, `${textPlease} Company Name`).max(30).required(`${textPlease} Company Name`),
    companyEmail: yup.string().email(`Company Email must be xxx@xxxxx.xxx`).matches(/^.+\.(com|co\.id)$/i, `Company Email must be xxx@xxxxx.xxx`).required(`${textPlease} Company Email`),
    npwp: yup.string().matches(/^(?:\s*\d{2})[.](\d{3})[.](\d{3})[.](\d-)(\d{3})[.](\d{3}\s*)$/g, `${textPlease} NPWP`).required(`${textPlease} NPWP`),
    address: yup.string().matches(/^(?!\s)(?!.*\s$)(?=.*\S).+$/, `${textPlease} Address`).required(`${textPlease} Address`),
  })

export default schemacompany