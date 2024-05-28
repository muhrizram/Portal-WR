import { z } from "zod";

const projectSchema = z.object({
  projectId: z
    .number({
      required_error: "Project ID is required",
      invalid_type_error: "Project ID must be a string",
    })
    .nullable()
    .refine((val) => val !== null && val >= 1, {
      message: "Project ID is required",
    }),
});

const listTaskSchema = z.object({
  taskName: z
    .string({
      required_error: "Task Name is required",
      invalid_type_error: "Task Name must be a string",
    })
    .min(1, "Task Name is required"),
  statusTaskId: z
    .number({
      required_error: "Status Task ID is required",
      invalid_type_error: "Status Task ID must be a string",
    })
    .nullable()
    .refine((val) => val !== null && val >= 1, {
      message: "Status Task ID is required",
    }),
  taskDuration: z
    .string({
      required_error: "Duration is required",
      invalid_type_error: "Duration must be a string",
    })
    .min(1, "Duration is required"),
  taskDetails: z
    .string({
      required_error: "Information Detail is required",
      invalid_type_error: "Information Detail must be a string",
    })
    .min(1, "Information Detail is required"),
});

export const taskSchema = z.object({
  listProject: z.array(projectSchema),
  listTask: z.array(z.array(listTaskSchema)),
});
