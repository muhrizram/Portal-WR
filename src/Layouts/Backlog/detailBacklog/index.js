import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import {
  Autocomplete,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import SideBar from "../../../Component/Sidebar";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import client from "../../../global/client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AlertContext } from "../../../context";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBacklogSchema } from "../schema";
import FormTextField from "../form";

//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//acordion
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

//rating
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { getErrorArrayPosition } from "../../../global/formFunctions";

const TaskItem = ({
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

const DetailBacklog = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [ProjectName, setProjectName] = useState([]);
  const [dataTasks, setDataTasks] = useState([]);
  const [valueproject, setValueproject] = useState();
  const [isSave, setIsSave] = useState(false);
  const { setDataAlert } = useContext(AlertContext);
  const [initialProject, setInitialProject] = useState();
  const [statusBacklogOl, setStatusBacklogOl] = useState([]);
  const [assignedToOl, setAssignedToOl] = useState([]);
  const [defaultEditData, setDefaultEditData] = useState([]);
  const navigate = useNavigate();

  const dataBreadDetailBacklog = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masterbacklog",
      title: "Master Project Backlog",
      current: false,
    },
    {
      href: "/masterbacklog/listBacklog",
      title: "Backlog",
      current: false,
    },
    {
      href: "/masterbacklog/detail",
      title: "Detail Backlog",
      current: true,
    },
  ];

  const dataBreadEditBacklog = [
    {
      href: "/",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masterbacklog",
      title: "Master Project Backlog",
      current: false,
    },
    {
      href: "/masterbacklog/listBacklog",
      title: "Backlog",
      current: false,
    },
    {
      href: "/masterbacklog/detail",
      title: "Edit Backlog",
      current: true,
    },
  ];

  const getStatusColor = (status) => {
    const statusColors = {
      "to do": "#FDECEB",
      Backlog: "#7367F029",
      "In Progress": "#E6F2FB",
      Completed: "#EBF6EE",
      Done: "#EBF6EE",
    };
    return statusColors[status] || "#ccc";
  };

  const getStatusFontColor = (status) => {
    const statusFontColors = {
      "to do": "#EE695D",
      Backlog: "#4C4DDC",
      "In Progress": "#3393DF",
      Completed: "#5DB975",
      Done: "#5DB975",
    };
    return statusFontColors[status] || "#fff";
  };

  const getProjectName = async () => {
    const res = await client.requestAPI({
      method: "GET",
      endpoint: "/ol/project?search=",
    });
    const data = res.data.map((item) => ({
      id: parseInt(item.id),
      name: item.attributes.name,
      projectInitial: item.attributes.projectInitial,
    }));
    setProjectName(data);
  };

  const getAssignedTo = async () => {
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/ol/backlogUser?search=${dataDetail.projectId}`,
    });
    const data = res.data.map((item) => ({
      id: parseInt(item.id),
      fullName: item.attributes.userName,
    }));
    setAssignedToOl(data);
  };

  const getStatusBacklog = async () => {
    const res = await client.requestAPI({
      method: "GET",
      endpoint: "/ol/status?search=",
    });
    const data = res.data.map((item) => ({
      id: parseInt(item.id),
      name: item.attributes.name,
    }));
    setStatusBacklogOl(data);
  };

  const getDataDetail = async () => {
    const idDetail = localStorage.getItem("idBacklog");
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/backlog/${idDetail}`,
    });
    rebuildDataDetail(res);
  };

  const rebuildDataDetail = (resData) => {
    const idInt = parseInt(resData.data.id);
    let tempDetail = {
      id: idInt,
      projectId: resData.data.attributes.projectId,
      statusBacklog: resData.data.attributes.statusBacklog,
      userId: resData.data.attributes.userId,
      projectName: resData.data.attributes.projectName,
      status: resData.data.attributes.status,
      assignedTo: resData.data.attributes.assignedTo,
      taskName: resData.data.attributes.taskName,
      taskDescription: resData.data.attributes.taskDescription,
      estimationTime: resData.data.attributes.estimationTime,
      actualTime: resData.data.attributes.actualTime,
      createdBy: resData.data.attributes.createdBy,
      updatedBy: resData.data.attributes.updatedBy,
      createdOn: resData.data.attributes.createdOn,
      updatedOn: resData.data.attributes.updatedOn,
      priority: resData.data.attributes.priority,
      taskCode: resData.data.attributes.taskCode,
      projectInitial: resData.data.attributes.projectInitial,
    };
    setDataDetail(tempDetail);
    setInitialProject(resData.data.attributes.projectInitial);
    setDataTasks([tempDetail]);
    setDefaultEditData({ listTask: [tempDetail] });
  };

  const clickEdit = () => {
    getAssignedTo();
    getStatusBacklog();
    setIsEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenSave = () => {
    setIsSave(true);
    setOpen(true);
  };

  const handleClickOpenCancel = () => {
    setIsSave(false);
    setOpen(true);
  };

  const handleCloseOpenCancelData = () => {
    if (!isSave) {
      setIsEdit(false);
    }
    setOpen(false);
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(addBacklogSchema),
    mode: "onChange",
  });

  const SubmitSave = async () => {
    let saveData = null;
    dataTasks.map((task) => {
      saveData = {
        projectId: task.projectId,
        statusBacklog: task.statusBacklog,
        userId: task.userId,
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        estimationTime: task.estimationTime,
        actualTime: task.actualTime,
        priority: task.priority,
        assignedTo: task.assignedTo,
        taskCode: task.taskCode,
      };
    });
    console.log(saveData);
    if (!isSave) {
      setOpen(false);
    } else {
      try {
        const res = await client.requestAPI({
          method: "PUT",
          endpoint: `/backlog/${dataTasks[0].id}`,
          data: saveData,
        });
        if (!res.isError) {
          setDataAlert({
            severity: "success",
            open: true,
            message: res.data.meta.message,
          });
          setTimeout(() => {
            navigate("/masterbacklog/listBacklog");
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

  useEffect(() => {
    getProjectName();
    getDataDetail();
  }, [valueproject]);

  return (
    <SideBar>
      <Breadcrumbs
        breadcrumbs={isEdit ? dataBreadEditBacklog : dataBreadDetailBacklog}
      />
      {isEdit ? (
        <Grid container rowSpacing={2.5}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={9.9}>
                <Header judul="Edit Backlog" />
              </Grid>
              <Grid item />
            </Grid>
            <Grid className="HeaderDetail">
              <Grid item xs={12}>
                <form onSubmit={handleSubmit(handleClickOpenSave)}>
                  <Grid container direction="column" spacing={3.75}>
                    <Grid item xs={12}>
                      <Autocomplete
                        disablePortal
                        disabled
                        id="combo-box-demo"
                        name="ProjectName"
                        options={ProjectName}
                        defaultValue={
                          ProjectName.find(
                            (option) =>
                              option.id ===
                              (dataDetail.projectInitial &&
                                dataDetail.projectId)
                          ) || null
                        }
                        sx={{
                          width: "100%",
                          marginTop: "8px",
                          backgroundColor: "#EDEDED",
                        }}
                        getOptionLabel={(option) =>
                          option.projectInitial + " - " + option.name
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Project Name *"
                            placeholder="Select Backlog"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      {dataTasks.map((task, index) => (
                        <TaskItem
                          key={index}
                          errors={errors}
                          control={control}
                          data={task}
                          number={index}
                          statusBacklogOl={statusBacklogOl}
                          assignedToOl={assignedToOl}
                          onTaskChange={handleChangeTask}
                          setValue={setValue}
                        />
                      ))}
                    </Grid>

                    <Grid
                      item
                      container
                      spacing={2}
                      justifyContent="flex-end"
                      mt={3.5}
                    >
                      <Grid item xs={12} sm={2} textAlign="right">
                        <Button
                          fullWidth
                          variant="cancelButton"
                          onClick={() => handleClickOpenCancel()}
                        >
                          Cancel Data
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={2} textAlign="right">
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
                      onClick={handleSubmit(SubmitSave)}
                      autoFocus
                    >
                      {isSave ? "Save Data" : "Back"}
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container rowSpacing={2.5}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} sm={8}>
                <Header judul="Detail Backlog" />
              </Grid>
              <Grid item />
              <Grid
                item
                xs={12}
                sm={4}
                alignSelf="center"
                sx={{ textAlign: { xs: "start", sm: "end" } }}
              >
                <Button
                  variant="outlined"
                  startIcon={<CreateIcon />}
                  style={{ marginRight: "10px" }}
                  onClick={clickEdit}
                >
                  Edit Data Backlog
                </Button>
              </Grid>
            </Grid>
            <Grid container className="HeaderDetail">
              <Grid item xs={12} container direction="row">
                <Grid
                  container
                  direction="row"
                  borderBottom="solid 1px #0000001F"
                >
                  <Grid item xs={12} sm={6}>
                    <Typography variant="backlogDetail">
                      {dataDetail.projectInitial} - {dataDetail.projectName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Accordion defaultExpanded elevation={0} disableGutters>
                    <Grid container direction="row">
                      <Grid item paddingY={3}>
                        <AccordionSummary
                          expandIcon={<ArrowDropDownOutlined />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          style={{ padding: 0 }}
                        >
                          <Typography
                            variant="backlogDetailText"
                            marginRight="12px"
                          >
                            {!isEdit && `${dataDetail.taskName} :: `}
                            {dataDetail.taskCode}
                          </Typography>
                        </AccordionSummary>
                      </Grid>
                    </Grid>
                    <AccordionDetails style={{ padding: 0 }}>
                      <Grid container direction="row" spacing={3.75}>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            sx={{ color: "text.secondary", fontSize: "12px" }}
                          >
                            Task Description
                          </Typography>
                          <Typography
                            variant="descBaklog"
                            maxWidth="100%"
                            sx={{
                              overflowWrap: "break-word",
                              wordBreak: "break-word",
                              hyphens: "auto",
                            }}
                          >
                            {dataDetail.taskDescription}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            sx={{ color: "text.secondary", fontSize: "12px" }}
                          >
                            Backlog Status
                          </Typography>
                          <Typography
                            variant="descBaklog"
                            sx={{
                              backgroundColor: getStatusColor(
                                dataDetail.status
                              ),
                              color: getStatusFontColor(dataDetail.status),
                              padding: "5px 10px",
                              gap: "10px",
                              borderRadius: "4px",
                              fontSize: "12px",
                            }}
                          >
                            {dataDetail.status}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            sx={{ color: "text.secondary", fontSize: "12px" }}
                          >
                            Priority
                          </Typography>
                          {dataDetail && dataDetail.priority && (
                            <Rating
                              name="rating"
                              value={parseFloat(dataDetail.priority)}
                              readOnly
                              precision={0.5}
                            />
                          )}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            sx={{ color: "text.secondary", fontSize: "12px" }}
                          >
                            Assigned To
                          </Typography>
                          <Typography variant="descBaklog">
                            {dataDetail.assignedTo}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            sx={{ color: "text.secondary", fontSize: "12px" }}
                          >
                            Estimation Duration
                          </Typography>
                          <Typography variant="descBaklog">
                            {dataDetail.estimationTime}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            sx={{ color: "text.secondary", fontSize: "12px" }}
                          >
                            Actual Duration
                          </Typography>
                          <Typography variant="descBaklog">
                            {dataDetail.actualTime}
                          </Typography>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Grid item xs={12} mt={5}>
                    <Divider />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </SideBar>
  );
};

export default DetailBacklog;
