import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Button, CircularProgress, Typography } from "@mui/material";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import client from "../../../global/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertContext } from "../../../context";
import dayjs from "dayjs";
import { addBacklogSchema } from "../schema";
import { getErrorArrayPosition } from "../../../global/formFunctions";
import FormTextField from "../form";

//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SideBar from "../../../Component/Sidebar";

//acordion
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//rating
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const TaskItem = ({
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
            <Typography sx={{ fontSize: "24px" }}>
              T - {initialProject} - 00{number + 1}
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

const CreateNewBacklog = () => {
  const { setDataAlert } = useContext(AlertContext);
  const [ProjectName, setProjectName] = useState([]);
  const [isSave, setIsSave] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [valueproject, setValueproject] = useState();
  const [initialProject, setInitialProject] = useState();
  const [taskCode, setTaskCode] = useState();
  const [dataTasks, setDataTasks] = useState([]);
  const clearTask = {
    projectId: valueproject,
    statusBacklog: null,
    userId: null,
    taskName: "",
    taskDescription: "",
    estimationTime: null,
    actualDate: dayjs(new Date()).add(1, "day").format("YYYY-MM-DD"),
    estimationDate: dayjs(new Date()).add(1, "day").format("YYYY-MM-DD"),
    createdBy: parseInt(localStorage.getItem("userId")),
    updatedBy: parseInt(localStorage.getItem("userId")),
    priority: "",
    taskCode: "",
  };

  const navigate = useNavigate();

  const dataBread = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masterbacklog",
      title: "Master Backlog",
      current: false,
    },
    {
      href: "/masterbacklog/create",
      title: "Create New Backlog",
      current: true,
    },
  ];

  const handleClickOpenCancel = () => {
    setIsSave(false);
    setOpen(true);
  };

  const handleClickOpenSave = () => {
    setIsSave(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseOpenCancelData = () => {
    if (!isSave) {
      navigate("/masterbacklog");
    }
    setOpen(false);
  };

  const handleDeleteTask = (index) => {
    clearErrors(`listTask.${index}`);
    removeListTask(index);
    const temp = [...dataTasks];
    temp.splice(index, 1);
    setDataTasks(temp);
  };

  const handleChangeTask = (index, key, value, assigning) => {
    const temp = [...dataTasks];

    temp[index] = {
      ...temp[index],
      [key]: value,
      ...(assigning && { userId: value }),
    };

    setDataTasks(temp);
  };

  const handleClickTask = () => {
    setDataTasks((prevState) => {
      const updatedTasks = Array.isArray(prevState) ? [...prevState] : [];
      updatedTasks.push(clearTask);
      return updatedTasks;
    });
  };

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
    watch,
    isSubmitting,
  } = useForm({
    resolver: zodResolver(addBacklogSchema),
    mode: "onChange",
  });

  const { remove: removeListTask } = useFieldArray({
    control,
    name: `listTask`,
  });

  const SubmitSave = async () => {
    if (!isSave) {
      setOpen(false);
    } else {
      try {
        const res = await client.requestAPI({
          method: "POST",
          endpoint: "/backlog/addBacklog",
          data: dataTasks,
        });

        if (!res.isError) {
          setDataAlert({
            severity: "success",
            open: true,
            message: res.meta.message,
          });
          setTimeout(() => {
            navigate("/masterbacklog");
          }, 3000);
        } else {
          setDataAlert({
            severity: "error",
            message: res.error.detail,
            open: true,
          });
        }
        setOpen(false);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const getProjectName = async () => {
    const res = await client.requestAPI({
      method: "GET",
      endpoint: "/ol/project?search=",
    });
    const data = res.data.map((item) => ({
      id: `${item.id} - ${item.attributes.taskCode}`,
      name: item.attributes.name,
      projectInitial: item.attributes.projectInitial,
      taskCode: item.attributes.taskCode,
    }));
    setProjectName(data);
  };

  useEffect(() => {
    getProjectName();
  }, []);

  return (
    <>
      <SideBar>
        <Breadcrumbs breadcrumbs={dataBread} />
        <Grid container rowSpacing={2.5}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={9.9}>
                <Header judul="Create New Backlog" />
              </Grid>
              <Grid item />
            </Grid>
            <Grid className="HeaderDetail">
              <Grid item xs={12}>
                <form onSubmit={handleSubmit(handleClickOpenSave)}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    name="projectName"
                    options={ProjectName}
                    sx={{ width: "100%", marginTop: "8px" }}
                    getOptionLabel={(option) =>
                      option.projectInitial + " - " + option.name
                    }
                    onChange={(event, newValue) => {
                      setDataTasks([]);
                      clearErrors();
                      setValueproject(parseInt(newValue.id));
                      setInitialProject(newValue.projectInitial);
                      setTaskCode(newValue.taskCode);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputLabelProps={{ shrink: true }}
                        label="Project Name *"
                        placeholder="Select Project"
                      />
                    )}
                  />
                  {dataTasks.map((task, index) => (
                    <TaskItem
                      key={index}
                      number={index}
                      data={task}
                      onDelete={handleDeleteTask}
                      onTaskChange={handleChangeTask}
                      initialProject={initialProject}
                      idProject={valueproject}
                      taskCode={taskCode}
                      control={control}
                      errors={errors}
                    />
                  ))}
                  <Grid
                    container
                    spacing={2}
                    mt={3.5}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs={12} sm={3}>
                      <Button
                        disabled={!valueproject}
                        color="success"
                        variant="contained"
                        onClick={handleClickTask}
                        fullWidth
                      >
                        + Add Task
                      </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Button
                            fullWidth
                            variant="cancelButton"
                            onClick={() => handleClickOpenCancel()}
                          >
                            Cancel Data
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Button
                            fullWidth
                            disabled={dataTasks.length === 0}
                            variant="saveButton"
                            type="submit"
                          >
                            Save Data
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  className="dialog-delete"
                >
                  <DialogTitle
                    sx={{
                      alignSelf: "center",
                      fontSize: "30px",
                      fontStyle: "Poppins",
                    }}
                    id="alert-dialog-title"
                  >
                    {isSave ? "Save Data" : "Cancel Data"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {isSave
                        ? "Save your progress: Don't forget to save your data before leaving"
                        : "Warning: Canceling will result in data loss without saving!"}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions className="dialog-delete-actions">
                    <Button
                      variant="cancelButton"
                      onClick={handleCloseOpenCancelData}
                    >
                      {isSave ? "Back" : "Cancel without saving"}
                    </Button>
                    <Button
                      variant="saveButton"
                      disabled={isSave && isSubmitting}
                      onClick={isSave ? handleSubmit(SubmitSave) : handleClose}
                      autoFocus
                    >
                      {isSave ? (
                        isSubmitting ? (
                          <>
                            <CircularProgress size={14} color="inherit" />
                            <Typography marginLeft={1}>Saving...</Typography>
                          </>
                        ) : (
                          "Save Data"
                        )
                      ) : (
                        "Back"
                      )}
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SideBar>
    </>
  );
};

export default CreateNewBacklog;
