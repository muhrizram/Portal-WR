import * as yup from "yup";

const textPlease = 'Please Input'

const schemacompany = yup.object({
    companyName: yup.string().matches(/^[A-Za-z0-9\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, `${textPlease} Company Name`).required(`${textPlease} Company Name`).max(50),
    companyEmail: yup.string().email(`Company Email must be xxx@xxxxx.xx`).required(`${textPlease} Company Email`).matches(/^.+\.([a-zA-Z]{2,})$/i, `Company Email must be xxx@xxxxx.xx`).max(100),
    npwp: yup.string().required(`${textPlease} NPWP`).matches(/^(?:\s*\d{2})[.](\d{3})[.](\d{3})[.](\d-)(\d{3})[.](\d{3}\s*)$/g, `${textPlease} NPWP must be xx.xxx.xxx.x-xxx.xxx`).max(25),
    address: yup.string().matches(/^[A-Za-z0-9\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, `${textPlease} Address`).required(`${textPlease} Address`).max(100),
  })

export default schemacompany