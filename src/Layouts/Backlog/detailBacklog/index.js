import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Button, Divider, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import SideBar from "../../../Component/Sidebar";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import client from "../../../global/client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AlertContext } from "../../../context";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBacklogSchema } from "../schema";

//acordion
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

//rating
import Rating from "@mui/material/Rating";
import FormEdit from "./formEdit";

const DetailBacklog = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
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

  const submitSave = async () => {
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
    getDataDetail();
  }, [valueproject]);

  return (
    <SideBar>
      <Breadcrumbs
        breadcrumbs={isEdit ? dataBreadEditBacklog : dataBreadDetailBacklog}
      />
      {isEdit ? (
        <FormEdit
          handleSubmit={handleSubmit}
          handleClickOpenSave={handleClickOpenSave}
          dataDetail={dataDetail}
          dataTasks={dataTasks}
          errors={errors}
          control={control}
          statusBacklogOl={statusBacklogOl}
          assignedToOl={assignedToOl}
          handleChangeTask={handleChangeTask}
          setValue={setValue}
          handleClickOpenCancel={handleClickOpenCancel}
          openDialog={open}
          handleClose={handleClose}
          isSave={isSave}
          handleCloseOpenCancelData={handleCloseOpenCancelData}
          submitSave={submitSave}
        />
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
