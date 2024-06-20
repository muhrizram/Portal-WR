import { z } from "zod";

const listTaskSchema = z.object({
  taskName: z
    .string({
      required_error: "Task Name is required",
      invalid_type_error: "Task Name must be a string",
    })
    .min(1, "Task Name is required"),
  estimationTime: z
    .number({
      required_error: "Estimation Time is required",
      invalid_type_error: "Estimation Time must be a number",
    })
    .nullable()
    .refine((val) => val !== null && val >= 1, {
      message: "Estimation Time is required",
    }),
  priority: z
    .number({
      required_error: "Priority is required",
      invalid_type_error: "Priority must be a number",
    })
    .nullable()
    .refine((val) => val !== null && val >= 1, {
      message: "Priority is required",
    }),
  statusBacklog: z
    .string({
      required_error: "Status Backlog is required",
      invalid_type_error: "Status Backlog must be a string",
    })
    .min(1, "Status Backlog is required"),
  assignedTo: z
    .number({
      required_error: "Assigned to is required",
      invalid_type_error: "Assigned to must be a number",
    })
    .nullable()
    .refine((val) => val !== null && val >= 1, {
      message: "Assigned is required",
    }),
});

export const addBacklogSchema = z.object({
  listTask: z.array(listTaskSchema),
});
