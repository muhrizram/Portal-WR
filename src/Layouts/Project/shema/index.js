import * as yup from "yup";

const textPlease = "Please Input";

const schemacompany = yup.object({
  projectName: yup.string().max(100).required(`${textPlease} Project Name`),
  companyId: yup.string().max(30).required(`Please Select Company`),
  picProjectName: yup.string().max(100).required(`${textPlease} PIC Project Name`),
  picProjectPhone: yup.string().max(15).required(`${textPlease} PIC Project Phone`),
  projectType: yup.string().max(30).required(`Please Select Project Type`),
  initialProject: yup.string().max(20).required(`${textPlease} Initial Project`),
  startDate: yup
    .date()
    .typeError("Invalid Date")
    .required("Please Select Project Start Date")
    .test(
      "start-date",
      "Start Date must be before Project End Date",
      function (startDate) {
        const endDate = this.parent.endDate;
        if (!startDate || !endDate) return true;
        return new Date(startDate) <= new Date(endDate);
      }
    ),
  endDate: yup
    .date()
    .typeError("Invalid Date")
    .required("Please Select Project End Date")
    .test("end-date", "End Date must be after Project Start Date", function (endDate) {
      const startDate = this.parent.startDate;
      if (!startDate || !endDate) return true;

      return new Date(endDate) >= new Date(startDate);
    }),
});

export default schemacompany;
