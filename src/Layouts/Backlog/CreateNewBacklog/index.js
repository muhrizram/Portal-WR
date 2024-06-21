import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Button, CircularProgress, Typography } from "@mui/material";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router";
import { useFieldArray, useForm } from "react-hook-form";
import client from "../../../global/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertContext } from "../../../context";
import dayjs from "dayjs";
import { addBacklogSchema } from "../schema";
import SideBar from "../../../Component/Sidebar";

//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TaskItemAddBacklog from "./taskItem";

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
                    <TaskItemAddBacklog
                      key={index}
                      number={index}
                      data={task}
                      onDelete={handleDeleteTask}
                      onTaskChange={handleChangeTask}
                      initialProject={initialProject}
                      idProject={valueproject}
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
