import React, { useState, useCallback, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Breadcrumbs from "../../Component/BreadCumb";
import Header from "../../Component/Header";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

//date
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SideBar from "../../Component/Sidebar";

//compinedit
import StatusEmployeeTab from "./StatusEmployeeTab";
import ProjectHistoryTab from "./ProjectHistoryTab";

import { AlertContext } from "../../context";
import { useLocation } from "react-router-dom";
import { UploadFileOutlined } from "@mui/icons-material";
import client from "../../global/client";

const DetailEmployee = () => {
  const ContractStatus = [
    { label: "Fulltime" },
    { label: "On Job Training" },
    { label: "Bootcamp" },
  ];

  const dataBread = [
    {
      href: "/dashboard",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masteremployee",
      title: "Master Employee",
      current: false,
    },
    {
      href: "/",
      title: "Detail Employee",
      current: true,
    },
  ];
  const dataBreadEdit = [
    {
      href: "/dashboard",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masteremployee",
      title: "Master Employee",
      current: false,
    },
    {
      href: "/",
      title: "Edit Employee",
      current: true,
    },
  ];
  const [value, setValue] = useState("one");
  const [isEdit, setIsEdit] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [AddContract, setAddContract] = useState(false);
  
  const [dataFix, setDataFix] = useState({
    jobTypeId: "",
    nip: "12345555",
    placementType: "Bandung",
    ssoId: "",
    group: "",
    position: "",
    statusOnsite: "",
    userName: "",
    email: "johndoe@mail.com",
    lastContractStatus: "",
    lastContractDate: "",
    firstName: "Jhon",
    lastName: "Doe",
    joinDate: "",
    endContractThisMonth: "",
    photoProfile: "",
    lastModifiedOn: "",
    lastModifiedBy: "",
    createdBy: "",
    createdOn: "",
    placeOfBirth: "",
    dateOfBirth: "",
    identityNumber1234567890: "",
    postalCode: "",
    familyRelationship: "",
    familyRelationshipNumber: "",
    school: "",
    education: "",
    bpjsKesehatan: "",
    numberOfDependents: "",
    bpjsClass: "",
    carrerStartDate: "",
    ptkpStatus: "",
    npwp: "08.178.554.2-123.321",
    no: "",
    department: "",
    isActive: "",
  });
  const { setDataAlert } = useContext(AlertContext);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const userId = useLocation().state.userId;
  const [dataEdit, setDataEdit] = useState(dataFix);
  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDraggingOver(false);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setIsDraggingOver(false);
    const file = event.dataTransfer.files[0];
    setUploadedFile(file);
  }, []);

  const MAX_SIZE_FILE = 10485760;

  const onSave = async (event) => {
    event.preventDefault();
    if (uploadedFile.size >= MAX_SIZE_FILE) {
      setDataAlert({
        severity: "error",
        open: true,
        message: "Max file size is 10 MB",
      });
      return;
    }

    // const formData = new FormData();
    // formData.append("file", uploadedFile);
    // const res = await client.requestAPI({
    //   method: "POST",
    //   endpoint: "/",
    //   data: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    // if (!res.isError) {
    //   setDataAlert({
    //     severity: "success",
    //     open: true,
    //     message: res.meta.message,
    //   });
    //   setUploadedFile(null);
    //   // getData();
    //   setAddContract(false);
    // } else {
    //   setDataAlert({
    //     severity: "error",
    //     message: res.error.detail,
    //     open: true,
    //   });
    // }
  };

  const handleClickAddContract = () => {
    setAddContract(true);
  };
  const [open, setOpen] = useState(false);
  const handleCloseContract = () => {
    setAddContract(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const SubmitSave = () => {
    setOpen(false);
    setIsEdit(false);
    setDataFix(dataEdit);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [value1, setValue1] = React.useState("one");

  const handleChange1 = (event1, newValue1) => {
    setValue1(newValue1);
  };
  const clickEdit = () => {
    setIsEdit(true);
  };

  return (
    <>
      <SideBar>
        {isEdit ? (
          <Breadcrumbs breadcrumbs={dataBreadEdit} />
        ) : (
          <Breadcrumbs breadcrumbs={dataBread} />
        )}
        <Grid container rowSpacing={2.5}>
          <Grid item xs={12}>
            <Grid container>
              {isEdit ? (
                <Grid item xs={9.9}>
                  <Header judul="Edit Employee" />
                </Grid>
              ) : (
                <Grid item xs={9.9}>
                  <Header judul="Detail Employee" />
                </Grid>
              )}
              <Grid item xs={2} alignSelf="center" textAlign="right">
                <Button
                  variant="outlined"
                  startIcon={<CreateIcon />}
                  style={{ marginRight: "10px" }}
                  onClick={handleClickAddContract}
                >
                  Add Contract Status
                </Button>
              </Grid>
            </Grid>

            <Grid container className="HeaderDetail">
              <Box sx={{ width: "100%" }}>
                <Tabs value={value} onChange={handleChange}>
                  <Tab
                    value="one"
                    label="Contract History"
                    sx={{ textTransform: "none" }}
                  />
                  <Tab
                    value="two"
                    label="Project History"
                    sx={{ textTransform: "none" }}
                  />
                </Tabs>
              </Box>
              {value === "one" && <StatusEmployeeTab id={userId} />}
              {value === "two" && <ProjectHistoryTab id={userId} />}

              <Dialog
                maxWidth="xl"
                open={AddContract}
                onClose={handleCloseContract}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="dialog-delete"
              >
                <DialogTitle
                  sx={{
                    alignSelf: "center",
                    fontSize: "24px",
                    fontStyle: "Poppins",
                  }}
                  id="alert-dialog-title"
                >
                  {"Add Contract Status"}
                </DialogTitle>
                <form onSubmit={onSave} encType="multipart/formData">
                  <DialogContent>
                    <DialogContentText
                      id="alert-dialog-description"
                      sx={{ fontSize: "16px" }}
                    >
                      Add Contract Status: Streamline employee contract
                      management with ease by assigning and tracking various
                      contract statuses.
                    </DialogContentText>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={ContractStatus}
                      sx={{ width: "100%", marginTop: "20px" }}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          label="Contract Status"
                        />
                      )}
                    />
                    <Grid container direction="row" sx={{ marginTop: "20px" }}>
                      <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              label="Contract Start Date"
                              sx={{ width: "100%", paddingRight: "20px" }}
                              slotProps={{
                                textField: {
                                  required: true,
                                },
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              label="Contract End Date"
                              sx={{ width: "100%" }}
                              slotProps={{
                                textField: {
                                  required: true,
                                },
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" sx={{ marginTop: "20px" }}>
                      <Grid item xs={12}>
                        <label
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          <div
                            style={{
                              border: isDraggingOver
                                ? "2px dashed #0078D7"
                                : "2px dashed #ddd",
                              borderRadius: "4px",
                              padding: "20px",
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            <TextField
                              type="file"
                              name="file"
                              style={{ display: "none" }}
                              onChange={handleFileChange}
                            />
                            <UploadFileOutlined
                              fontSize="large"
                              style={{ color: "#0078D7" }}
                            />
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  color: "#0078D7",
                                  marginRight: "3px",
                                  textDecoration: "underline",
                                }}
                              >
                                {uploadedFile != null
                                  ? uploadedFile.name
                                  : "Click to upload"}
                              </Typography>
                              <Typography variant="subtitle1">
                                {uploadedFile != null
                                  ? " - Selected"
                                  : "or drag and drop"}
                              </Typography>
                            </Box>
                            {uploadedFile == null && (
                              <Typography color="textSecondary">
                                e.g., DOCX or PDF &#40;max. 10MB&#41;
                              </Typography>
                            )}
                          </div>
                        </label>
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions sx={{ alignSelf: "center", justifyContent:"center" }}>
                    <Button
                      variant="outlined"
                      className="button-text"
                      onClick={handleCloseContract}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      autoFocus
                      className="button-text"
                      type="submit"
                    >
                      Save Data
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </SideBar>
    </>
  );
};

export default DetailEmployee;
