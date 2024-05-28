import { z } from "zod";
import moment from "moment";
import { taskSchema } from "./taskSchema";

const timeSchema = z
  .object({
    startTime: z
      .string()
      .min(1, { message: "Start Time is required" })
      .refine(
        (value) => {
          return moment(value, "HH:mm:ss").isValid();
        },
        { message: "Start Time is invalid" }
      ),
    endTime: z
      .string()
      .min(1, { message: "End Time is required" })
      .refine(
        (value) => {
          return moment(value, "HH:mm:ss").isValid();
        },
        { message: "End Time is invalid" }
      ),
  })
  .refine((data) => data.startTime <= data.endTime, {
    message: "End time can not be earlier than start time",
    path: ["endTime"],
  })
  .refine((data) => data.startTime !== data.endTime, {
    message: "End time can not be same with start time",
    path: ["endTime"],
  });

export const overtimeSchema = z.object({
  time: timeSchema,
  task: taskSchema,
});
