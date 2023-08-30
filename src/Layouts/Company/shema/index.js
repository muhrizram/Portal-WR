import * as yup from "yup";

const textPlease = 'Please Input'

const schemacompany = yup.object({
    companyName: yup.string().max(30).required(`${textPlease} Company Name`),
    companyEmail: yup.string().email(`${textPlease} Valid Email`).required(`${textPlease} Company Email`),
    npwp: yup.string().matches(/^(\d{2})[.](\d{3})[.](\d{3})[.](\d-)(\d{3})[.](\d{3})$/g, 'NPWP must be XX.XXX.XXX.X-XXX.XXX').required(`${textPlease} NPWP`),
    address: yup.string().required(`${textPlease} Address`),
    // picName: yup.string().required(`${textPlease} PIC Name`),
    // picPhone: yup.number().positive().required(`${textPlease} PIC Name`),
    // picEmail: yup.string().email(`${textPlease} Valid Email`).required(`${textPlease} PIC Email`)
  })

export default schemacompany