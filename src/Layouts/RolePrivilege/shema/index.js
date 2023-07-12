import * as yup from "yup";

const textPlease = 'Please Input'

const schemaprivilege = yup.object({
    roleName: yup.string().required(`${textPlease} Role Name`),
    listPrivilege: yup.string().required(`${textPlease} Privilege`),
  })

export default schemaprivilege