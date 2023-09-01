import * as yup from "yup";

const textPlease = 'Please Input'

const schemareset = yup.object({
    currentPassword: yup.string().max(30).required(`${textPlease} Company Name`),
    newPassword: yup.string().email(`${textPlease} Valid Email`).required(`${textPlease} Company Email`),
    confirmPassword: yup.string().matches(/^(\d{2})[.](\d{3})[.](\d{3})[.](\d-)(\d{3})[.](\d{3})$/g, 'NPWP must be XX.XXX.XXX.X-XXX.XXX').required(`${textPlease} NPWP`),
    // picName: yup.string().required(`${textPlease} PIC Name`),
    // picPhone: yup.number().positive().required(`${textPlease} PIC Name`),
    // picEmail: yup.string().email(`${textPlease} Valid Email`).required(`${textPlease} PIC Email`)
  })

export default schemareset