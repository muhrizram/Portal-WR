import { z } from "zod";
import moment from "moment";

export const projectSchema = z.object({
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
        taskDetails: z.string().min(1, {
          message: "Information Detail is required",
        }),
      })
    )
  ),
});
