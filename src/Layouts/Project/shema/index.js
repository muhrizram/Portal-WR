import * as yup from "yup";

const textPlease = "Please Input";

const schemacompany = yup.object({
  projectName: yup.string().max(30).required(`${textPlease} Project Name`),
  companyName: yup.string().max(30).required(`${textPlease} Company Name`),
  picProjectName: yup.string().max(30).required(`${textPlease} PIC Project Name`),
  picProjectPhone: yup.string().max(14).required(`${textPlease} PIC Project Phone`),
  projectType: yup.string().max(30).required(`${textPlease} Project Type`),
  projectDescription: yup.string().max(30).required(`${textPlease} Project Description`),
  initialProject: yup.string().max(50).required(`${textPlease} Initial Project`),
  npwp: yup
    .string()
    .matches(
      /^(\d{2})[.](\d{3})[.](\d{3})[.](\d-)(\d{3})[.](\d{3})$/g,
      "NPWP must be XX.XXX.XXX.X-XXX.XXX"
    )
    .required(`${textPlease} NPWP`),
  address: yup.string().required(`${textPlease} Adress`),
  // picName: yup.string().required(`${textPlease} PIC Name`),
  // picPhone: yup.number().positive().required(`${textPlease} PIC Name`),
  // picEmail: yup.string().email(`${textPlease} Valid Email`).required(`${textPlease} PIC Email`)
});

export default schemacompany;
