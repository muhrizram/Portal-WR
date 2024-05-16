import { z } from "zod";
import moment from "moment";

export const timeSchema = z
  .object({
    startTime: z
      .string()
      .refine(
        (value) => {
          return moment(value, "HH:mm:ss").isValid();
        },
        { message: "Start Time is invalid" }
      )
      .refine((value) => value !== "", {
        message: "Start Time is required",
        path: ["startTime"],
      }),
    endTime: z.string().refine(
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
  })
  .refine((data) => data.endTime !== "", {
    message: "End Time is required",
    path: ["endTime"],
  });
