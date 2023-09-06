import * as yup from "yup";

const textPlease = "Please Input";

const schemacontract = yup.object({
  contractStatus: yup.object().required("Please Select Contract Status"),
  startDate: yup
    .date()
    .typeError("Invalid Date")
    .required("Please Select Start Date")
    .test(
      "start-date",
      "Start Date must be before Contract End Date",
      function (startDate) {
        const endDate = this.parent.endDate;
        if (!startDate || !endDate) return true;

        return new Date(startDate) <= new Date(endDate);
      }
    ),
  endDate: yup
    .date()
    .typeError("Invalid Date")
    .required("Please Select End Date")
    .test("end-date", "End Date must be after Contract Start Date", function (endDate) {
      const startDate = this.parent.startDate;
      if (!startDate || !endDate) return true;

      return new Date(endDate) >= new Date(startDate);
    }),
  file: yup.string().url(),
});

export default schemacontract;
