import { z } from "zod";
import moment from "moment";

export const createOvertimeSchema = z
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
    projects: z.array(
      z.object({
        projectId: z.string().min(1, {
          message: "Project ID is required",
        }),
      })
    ),
    tasks: z.array(
      z.array(
        z.object({
          taskName: z.string().min(1, {
            message: "Task Name is required",
          }),
          statusTaskId: z.string().min(1, {
            message: "Status Task ID is required",
          }),
          duration: z.string().min(1, {
            message: "Duration is required",
          }),
        })
      )
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
