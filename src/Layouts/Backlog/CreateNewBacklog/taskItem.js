import React, { useState, useEffect } from "react";
import { getErrorArrayPosition } from "../../../global/formFunctions";
import FormTextField from "../form";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { Controller } from "react-hook-form";
import client from "../../../global/client";
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

//acordion
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//rating
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const Circle = styled("span")(({ theme }) => ({
  display: "inline-block",
  width: "24px",
  height: "24px",
  lineHeight: "24px",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  textAlign: "center",
  marginRight: "8px",
  fontSize: "16px",
  fontWeight: "bold",
}));

const TaskItemAddBacklog = ({
  number,
  data,
  onDelete,
  onTaskChange,
  initialProject,
  idProject,
  errors,
  control,
}) => {
  const [AssignedTo, setAssignedTo] = useState([]);
  const getAssignedTo = async () => {
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/ol/backlogUser?search=${idProject}`,
    });
    const data = res.data.map((item) => ({
      id: parseInt(item.id),
      fullName: item.attributes.userName,
    }));
    setAssignedTo(data);
  };
  const [StatusBacklog, setStatusBacklog] = useState([]);

  const getStatusBacklog = async () => {
    const res = await client.requestAPI({
      method: "GET",
      endpoint: "/ol/status?search=",
    });
    const data = res.data.map((item) => ({
      id: item.id,
      name: item.attributes.name,
    }));

    setStatusBacklog(data);
  };

  useEffect(() => {
    getAssignedTo();
    getStatusBacklog();
  }, []);

  return (
    <Accordion
      key={number}
      defaultExpanded
      sx={{
        boxShadow: "none",
        width: "100%",
        borderTop: number + 1 > 1 ? "" : "solid 1px rgba(0, 0, 0, 0.12)",
        borderBottom: "solid 1px rgba(0, 0, 0, 0.12)",
      }}
    >
      <Grid
        container
        direction="row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: "80%",
        }}
      >
        <Grid item>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Circle>{number + 1}</Circle>
            <Typography sx={{ fontSize: "24px" }}>
              T - {initialProject}
            </Typography>
          </AccordionSummary>
        </Grid>
        <Grid item>
          <Button
            variant="cancelButton"
            color="error"
            onClick={() => onDelete(number)}
            startIcon={<DeleteOutline />}
            style={{ marginRight: "10px" }}
          >
            Delete Task
          </Button>
        </Grid>
      </Grid>

      <AccordionDetails>
        <Grid container direction="row">
          <Grid item xs={12} sm={6} mt={2}>
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
              inputProps={{
                maxLength: 100,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} mt={2}>
            <Controller
              name={`listTask.${number}.priority`}
              control={control}
              render={({ field }) => (
                <Box sx={{ width: "100%", paddingLeft: "10px" }}>
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
                  <Rating
                    variant="outlined"
                    name={`listTask.${number}.priority}`}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                      onTaskChange(number, "priority", newValue);
                    }}
                  />
                  {Boolean(
                    getErrorArrayPosition(errors, [
                      "listTask",
                      number,
                      "priority",
                    ])
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
              )}
            />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={12} sm={6} mt={2}>
            <FormTextField
              style={{ paddingRight: "10px" }}
              focused
              control={control}
              errors={errors}
              position={{ list: "listTask", number, name: "taskDescription" }}
              name={`listTask.${number}.taskDescription`}
              onTaskChange={onTaskChange}
              className="input-field-crud"
              placeholder="e.g Create Login Screen - Front End"
              label="Task Decription"
              inputProps={{
                maxLength: 255,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} mt={2}>
            <Controller
              name={`listTask.${number}.statusBacklog`}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  name={`listTask.${number}.statusBacklog`}
                  options={StatusBacklog}
                  onChange={(event, newValue) => {
                    onTaskChange(
                      number,
                      "statusBacklog",
                      newValue ? newValue.id : ""
                    );
                    field.onChange(newValue ? newValue.id : "");
                  }}
                  sx={{ width: "100%" }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputLabelProps={{ shrink: true }}
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
        </Grid>
        <Grid container direction="row">
          <Grid item xs={12} sm={6} mt={2}>
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
          <Grid item xs={12} sm={6} mt={2}>
            <Controller
              name={`listTask.${number}.assignedTo`}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  name={`listTask.${number}.assignedTo`}
                  options={AssignedTo}
                  value={
                    AssignedTo.find(
                      (option) => option.id === data.assignedTo
                    ) || null
                  }
                  getOptionLabel={(option) => option.fullName}
                  onChange={(event, newValue) => {
                    onTaskChange(
                      number,
                      "assignedTo",
                      newValue ? newValue.id : "",
                      true
                    );

                    field.onChange(newValue ? newValue.id : "");
                  }}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputLabelProps={{ shrink: true }}
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

export default TaskItemAddBacklog;
