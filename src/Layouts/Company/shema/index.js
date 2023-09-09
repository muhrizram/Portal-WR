import * as yup from "yup";

const textPlease = 'Please Input'

const schemacompany = yup.object({
    // companyProfile: yup.string().required(`${textPlease} Company Profile`),
    companyName: yup.string().matches(/^[A-Za-z0-9\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, `${textPlease} Company Name`).required(`${textPlease} Company Name`),
    companyEmail: yup.string().email(`Company Email must be xxx@xxxxx.xx`).matches(/^.+\.([a-zA-Z]{2,})$/i, `Company Email must be xxx@xxxxx.xx`).required(`${textPlease} Company Email`),
    npwp: yup.string().matches(/^(?:\s*\d{2})[.](\d{3})[.](\d{3})[.](\d-)(\d{3})[.](\d{3}\s*)$/g, `${textPlease} NPWP must be xx.xxx.xxx.x-xxx.xxx`).required(`${textPlease} NPWP`),
    address: yup.string().matches(/^[A-Za-z0-9\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, `${textPlease} Address`).required(`${textPlease} Address`),
  })

export default schemacompany