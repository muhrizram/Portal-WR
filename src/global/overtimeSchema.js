import { z } from "zod";
import moment from "moment";
import { taskSchema } from "./taskSchema";

const timeSchema = z
  .object({
    startTime: z
      .string()
      .min(1, { message: "Start Time is required" })
      .refine((value) => moment(value, "HH:mm:ss").isValid(), {
        message: "Start Time is invalid",
      }),
    endTime: z
      .string()
      .min(1, { message: "End Time is required" })
      .refine((value) => moment(value, "HH:mm:ss").isValid(), {
        message: "End Time is invalid",
      }),
    isHoliday: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const { startTime, endTime, isHoliday } = data;
    const startMoment = moment(startTime, "HH:mm:ss");
    const endMoment = moment(endTime, "HH:mm:ss");
    const startRange = moment("08:00:00", "HH:mm:ss");
    const endRange = moment("17:00:00", "HH:mm:ss");

    if (!isHoliday && startMoment.isBetween(startRange, endRange, null, "[)")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Start Time cannot be between 08:00 and 17:00",
        path: ["startTime"],
      });
    }

    if (!isHoliday && endMoment.isBetween(startRange, endRange, null, "[)")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End Time cannot be between 08:00 and 17:00",
        path: ["endTime"],
      });
    }

    if (startMoment.isAfter(endMoment)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End time cannot be earlier than start time",
        path: ["endTime"],
      });
    }

    if (startMoment.isSame(endMoment)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End time cannot be the same as start time",
        path: ["endTime"],
      });
    }
  });

export const overtimeSchema = z.object({
  time: timeSchema,
  task: taskSchema,
});
