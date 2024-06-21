import React, { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { getErrorArrayPosition } from "../../../global/formFunctions";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import FormTextField from "../form";
import { Controller } from "react-hook-form";

const TaskItemEditBacklog = ({
  errors,
  control,
  data,
  number,
  statusBacklogOl,
  assignedToOl,
  onTaskChange,
  setValue,
}) => {
  useEffect(() => {
    setValue(`listTask.${number}.taskName`, data.taskName);
    setValue(`listTask.${number}.priority`, parseFloat(data.priority));
    setValue(`listTask.${number}.taskDescription`, data.taskDescription);
    setValue(`listTask.${number}.statusBacklog`, String(data.statusBacklog));
    setValue(
      `listTask.${number}.estimationTime`,
      parseInt(data.estimationTime)
    );
    setValue(`listTask.${number}.actualTime`, data.actualTime);
    setValue(`listTask.${number}.assignedTo`, data.userId);
  }, [data]);

  return (
    <Accordion defaultExpanded key={number} elevation={0}>
      <Grid
        container
        direction="row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid item>
          <AccordionSummary
            expandIcon={<ArrowDropDownOutlined />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ padding: 0 }}
          >
            <Typography fontSize="1.5rem" marginRight="12px">
              {data.taskCode}
            </Typography>
          </AccordionSummary>
        </Grid>
      </Grid>
      <AccordionDetails style={{ padding: 0 }}>
        <Grid container direction="row" spacing={3.75}>
          <Grid item xs={12} sm={6}>
            <FormTextField
              style={{ paddingRight: "10px" }}
              control={control}
              errors={errors}
              onTaskChange={onTaskChange}
              position={{ list: "listTask", number, name: "taskName" }}
              focused
              name={`listTask.${number}.taskName`}
              className="input-field-crud"
              placeholder='e.g Create Login Screen"'
              label="Task Name *"
              value={data.taskName ? data.taskName : ""}
              inputProps={{
                maxLength: 100,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ width: "100%" }}>
              <Typography
                component="legend"
                sx={{
                  color: Boolean(
                    getErrorArrayPosition(errors, [
                      "listTask",
                      number,
                      "priority",
                    ])
                  )
                    ? "#D32F2F"
                    : "grey",
                }}
              >
                Priority *
              </Typography>
              <Controller
                control={control}
                name={`listTask.${number}.priority`}
                render={({ field }) => (
                  <Rating
                    variant="outlined"
                    name={`listTask.${number}.priority`}
                    value={data.priority ? parseFloat(data.priority) : 0}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                      onTaskChange(number, "priority", newValue);
                    }}
                  />
                )}
              />
              {Boolean(
                getErrorArrayPosition(errors, ["listTask", number, "priority"])
              ) && (
                <Typography
                  color="#d32f2f"
                  textAlign={"left"}
                  fontSize={12}
                  paddingY={"3px"}
                  paddingX={"6px"}
                >
                  {errors.listTask[number].priority.message}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              focused
              control={control}
              errors={errors}
              position={{ list: "listTask", number, name: "taskDescription" }}
              name={`listTask.${number}.taskDescription`}
              value={data.taskDescription ? data.taskDescription : ""}
              onTaskChange={onTaskChange}
              className="input-field-crud"
              placeholder="e.g Create Login Screen - Front End"
              label="Task Decription"
              inputProps={{
                maxLength: 255,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name={`listTask.${number}.statusBacklog`}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  name="statusBacklog"
                  options={statusBacklogOl}
                  value={
                    statusBacklogOl.find(
                      (option) => option.id === data.statusBacklog
                    ) || null
                  }
                  getOptionLabel={(option) => option.name}
                  onChange={(_, newValue) => {
                    onTaskChange(
                      number,
                      "statusBacklog",
                      newValue ? newValue.id : ""
                    );
                    field.onChange(newValue ? String(newValue.id) : "");
                  }}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Backlog Status *"
                      placeholder="Select Status"
                      error={Boolean(
                        getErrorArrayPosition(errors, [
                          "listTask",
                          number,
                          "statusBacklog",
                        ])
                      )}
                      helperText={
                        Boolean(
                          getErrorArrayPosition(errors, [
                            "listTask",
                            number,
                            "statusBacklog",
                          ])
                        )
                          ? errors.listTask[number].statusBacklog.message
                          : ""
                      }
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name={`listTask.${number}.estimationTime`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  style={{ paddingRight: "10px" }}
                  focused
                  className="input-field-crud"
                  placeholder="e.g 1 Hour"
                  label="Estimation Duration *"
                  type="number"
                  inputProps={{
                    maxLength: 5,
                  }}
                  value={data.estimationTime ? data.estimationTime : ""}
                  onChange={(e) => {
                    if (e.target.value < 1 && e.target.value) {
                      e.target.value = 1;
                    }
                    field.onChange(
                      e.target.value ? parseInt(e.target.value) : null
                    );
                    onTaskChange(number, "estimationTime", e.target.value);
                  }}
                  error={Boolean(
                    getErrorArrayPosition(errors, [
                      "listTask",
                      number,
                      "estimationTime",
                    ])
                  )}
                  helperText={
                    Boolean(
                      getErrorArrayPosition(errors, [
                        "listTask",
                        number,
                        "estimationTime",
                      ])
                    )
                      ? errors.listTask[number].estimationTime.message
                      : ""
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              focused
              disabled
              control={control}
              errors={errors}
              name={`listTask.${number}.actualTime`}
              position={("listTask", number, "actualTime")}
              value={data.actualTime ? data.actualTime : ""}
              className="input-field-crud"
              placeholder="e.g 1 Hour"
              label="Actual Duration"
            />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={12} mt={2}>
            <Controller
              name={`listTask.${number}.assignedTo`}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  name={`listTask.${number}.assignedTo`}
                  options={assignedToOl}
                  getOptionLabel={(option) => option.fullName}
                  value={
                    assignedToOl.find((option) => option.id === data.userId) ||
                    null
                  }
                  onChange={(_, newValue) => {
                    onTaskChange(
                      number,
                      "assignedTo",
                      newValue ? newValue.id : null,
                      true
                    );

                    field.onChange(newValue ? newValue.id : null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assigned To *"
                      placeholder="Select Talent"
                      error={Boolean(
                        getErrorArrayPosition(errors, [
                          "listTask",
                          number,
                          "assignedTo",
                        ])
                      )}
                      helperText={
                        Boolean(
                          getErrorArrayPosition(errors, [
                            "listTask",
                            number,
                            "assignedTo",
                          ])
                        )
                          ? errors.listTask[number].assignedTo.message
                          : ""
                      }
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default TaskItemEditBacklog;
