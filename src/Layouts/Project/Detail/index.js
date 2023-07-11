import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import SideBar from "../../../Component/Sidebar";
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from "../../../Component/Header";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Avatar,
} from "@mui/material";
import "../../../App.css";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import FormInputText from "../../../Component/FormInputText";
import schemacompany from "../shema";
import client from "../../../global/client";
import uploadFile from "../../../global/uploadFile";
import CustomAlert from "../../../Component/Alert";
import TableNative from "../../../Component/DataTable/Native";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const DetailProject = () => {
  const [dataProject, setDataProject] = useState([
    {
      id: 1,
      no: 1,
      nip: "0213819",
      name: "Iqbal",
      joinDate: "02/02/2023",
      assignment: "Project",
    },
  ]);
  const columnsProject = [
    {
      field: "no",
      headerName: "No",
      flex: 1,
    },
    {
      field: "nip",
      headerName: "NIP",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => {
        const urlMinio = params.row.photoProfile
          ? `${process.env.REACT_APP_BASE_API}/${params.row.photoProfile}`
          : "";
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={urlMinio}
              className="img-master-employee"
              alt="Profile Image"
            />
            <div style={{ marginLeft: "0.5rem" }}>
              <span className="text-name">{params.row.name}</span>
            </div>
          </div>
        );
      },
    },
    {
      field: "joinDate",
      headerName: "Join Date",
      flex: 1,
    },
    {
      field: "assignment",
      headerName: "Assignment",
      flex: 1,
    },
  ];

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sendData, setData] = useState({});
  const [isSave, setIsSave] = useState(false);
  const [dataAlert, setDataAlert] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState({
    companyName: "",
    companyEmail: "",
    npwp: "",
    address: "",
  });
  const dataBread = [
    {
      href: "/dashboard",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masterProject",
      title: "Master Project",
      current: false,
    },
    {
      href: "/master-project/edit",
      title: isEdit ? "Edit Project" : "Detail Project",
      current: true,
    },
  ];

  const cancelData = () => {
    setIsSave(false);
    setOpen(true);
  };

  const confirmSave = async (data) => {
    setIsSave(true);
    setOpen(true);
    setData(data);
  };

  let methods = useForm({
    resolver: yupResolver(schemacompany),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      npwp: "",
      address: "",
    },
  });

  const handleClose = () => {
    if (!isSave) {
      setIsEdit(false);
    }
    setOpen(false);
  };
  const onSave = async () => {
    setOpen(false);
  };

  return (
    <SideBar>
      <CustomAlert
        open={dataAlert.open}
        message={dataAlert.message}
        severity={dataAlert.severity}
      />
      <Breadcrumbs breadcrumbs={dataBread} />
      <Grid container>
        <Grid item xs={8} pb={2}>
          <Header judul={isEdit ? "Edit Project" : "Detail Project"} />
        </Grid>
        {!isEdit && (
          <Grid item xs={4} alignSelf="center" textAlign="end">
            <Button
              variant="outlined"
              className="button-text"
              startIcon={<EditOutlinedIcon />}
              onClick={() => setIsEdit(true)}
            >
              Edit Data Project
            </Button>
          </Grid>
        )}
        <Grid item xs={12}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(confirmSave)}>
              <div className="card-container-detail">
                <Grid
                  item
                  container
                  columnSpacing={3.79}
                  rowSpacing={3.79}
                  xs={12}
                >
                  <Grid item xs={6}>
                    {isEdit ? (
                      <FormInputText
                        focused
                        name="projectName"
                        className="input-field-crud"
                        placeholder="e.g PT. ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                        label="Project Name"
                      />
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            Project Name
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            Project ABC
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {isEdit ? (
                      <FormInputText
                        focused
                        name="company"
                        className="input-field-crud"
                        placeholder="e.g PT. company"
                        label="Company Name"
                      />
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            Company Name
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            PT. Company
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {isEdit ? (
                      <FormInputText
                        focused
                        name="picProject"
                        className="input-field-crud"
                        placeholder="e.g Selfi Muji Lestari"
                        label="PIC Project Name"
                      />
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            PIC Project Name
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            Selfi Muji Lestari
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {isEdit ? (
                      <FormInputText
                        focused
                        name="picProjectPhone"
                        className="input-field-crud"
                        placeholder="e.g PT. Jalan Gatot Subroto no 122"
                        label="PIC Project Phone"
                      />
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            PIC Project Phone
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            082141323123
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {isEdit ? (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="Start Date Project"
                            sx={{ width: "100%", paddingRight: "20px" }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            Start Date Project
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            01/01/2023
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {isEdit ? (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="End Date Project"
                            sx={{ width: "100%", paddingRight: "20px" }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            End Date Project
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            02/01/2023
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {isEdit ? (
                      <FormInputText
                        focused
                        name="picProject"
                        className="input-field-crud"
                        placeholder="e.g Selfi Muji Lestari"
                        label="PIC Project Name"
                      />
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            Initial Project
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            T-PR-WR-01
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {isEdit ? (
                      <FormInputText
                        focused
                        name="picProjectPhone"
                        className="input-field-crud"
                        placeholder="e.g PT. Jalan Gatot Subroto no 122"
                        label="PIC Project Phone"
                      />
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            Project Type
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">Project</Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {isEdit ? (
                      <FormInputText
                        focused
                        name="projectDescription"
                        className="input-field-crud"
                        placeholder="e.g PT. Jalan Gatot Subroto no 122"
                        label="Project Description"
                      />
                    ) : (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="labelHeaderDetail">
                            Project Description
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="inputDetail">
                            To overcome the challenge and create Podcast, our
                            team implemented the following solutions
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {isEdit && (
                  <Grid item container xs={12} justifyContent="end" mt={3.5}>
                    <Grid item xs={9} />
                    <Grid item xs textAlign="right">
                      <Button
                        style={{ marginRight: "16px" }}
                        variant="cancelButton"
                        onClick={() => cancelData()}
                      >
                        Cancel Data
                      </Button>
                      <Button variant="saveButton" type="submit">
                        Save Data
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </div>
            </form>
          </FormProvider>
        </Grid>
        <Grid item container mt={2} xs={12}>
          <div className="card-container-detail">
            <Grid item xs={12} mb={3}>
              <Typography variant="inputDetail">Teams Member</Typography>
            </Grid>
            <Grid item xs={12}>
              <TableNative
                data={dataProject}
                columns={columnsProject}
                checkboxSelection={isEdit}
                disableRowSelectionOnClick={isEdit}
              />
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-delete"
      >
        <DialogTitle id="alert-dialog-title" className="dialog-delete-header">
          {isSave ? "Save Data" : "Cancel Data"}
        </DialogTitle>
        <DialogContent className="dialog-delete-content">
          <DialogContentText
            className="dialog-delete-text-content"
            id="alert-dialog-description"
          >
            {isSave
              ? "Save your progress: Don't forget to save your data before leaving"
              : "Warning: Canceling will result in data loss without saving!"}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialog-delete-actions">
          <Button
            onClick={handleClose}
            variant="outlined"
            className="button-text"
          >
            {isSave ? "Back" : "Cancel without saving"}
          </Button>
          <Button onClick={onSave} variant="saveButton">
            {isSave ? "Save Data" : "Back"}
          </Button>
        </DialogActions>
      </Dialog>
    </SideBar>
  );
};

export default DetailProject;
