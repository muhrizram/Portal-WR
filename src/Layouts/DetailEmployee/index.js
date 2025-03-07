import React, { useState, useCallback, useContext, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Button, CircularProgress, Typography, Paper,IconButton } from "@mui/material";
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
import { Clear, UploadFileOutlined } from "@mui/icons-material";
import client from "../../global/client";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schemacontract from "./schema";
import "../../index.css"

const DetailEmployee = () => {
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
  const [AddContract, setAddContract] = useState(false);
  const [isContractAdded, setIsContractAdded] = useState(false);
  const [contractStatusOL, setContractStatusOL] = useState([]);
  const [contractOLValue, setContractOLValue] = useState({
    id: null,
    name: "",
  });
  const { setDataAlert } = useContext(AlertContext);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const userId = useLocation().state.userId;
  const fileInputRef = useRef(null);
  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
    event.target.value = "";
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
    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      setUploadedFile(file);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, []);

  const { formState, handleSubmit, reset, control } = useForm({
    resolver: yupResolver(schemacontract),
    mode: "onBlur",
    defaultValues: {
      startDate: null,
      endDate: null,
      file: "",
    },
  });

  const MAX_SIZE_FILE = 3145728;
  const convertBytesToString = (bytes) => {
    const kb = bytes / 1024;
    const mb = kb / 1024;
    const gb = mb / 1024;
  
    if (gb >= 1) {
      return gb.toFixed(2) + " GB";
    } else if (mb >= 1) {
      return mb.toFixed(2) + " MB";
    } else if (kb >= 1) {
      return kb.toFixed(2) + " KB";
    } else {
      return bytes + " Bytes";
    }
  };
  const onSave = async (data) => {
    if (uploadedFile) {
      if (uploadedFile.size >= MAX_SIZE_FILE) {
        setDataAlert({
          severity: "error",
          open: true,
          message: "Max file size is 3 MB",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", uploadedFile);
      const res = await client.requestAPI({
        method: "POST",
        endpoint: "/minio/uploadFile?path=contract",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res.isError) {
        data.file = res.data.attributes.filePath;
      } else {
        setDataAlert({
          severity: "error",
          open: true,
          message: res.error.detail,
        });
        return;
      }
    }
    const bodyRequest = {
      ...data,
      userId: userId,
      createdBy: parseInt(localStorage.getItem("userId")), // Current logged in user
      contractStatus: data.contractStatus.id,
    };
    const res = await client.requestAPI({
      method: "POST",
      endpoint: "/users/add/contractUser",
      data: bodyRequest,
    });
    if (!res.isError) {
      setDataAlert({
        severity: "success",
        open: true,
        message: res.data.meta.message,
      });
      setContractOLValue({ id: null, name: "" });
      setUploadedFile(null);
      reset();
      setAddContract(false);
      setIsContractAdded(!isContractAdded);
    } else {
      setDataAlert({
        severity: "error",
        open: true,
        message: res.error.detail,
      });
    }
  };

  const getContractStatusOL = async () => {
    const res = await client.requestAPI({
      endpoint: "/ol/contractStatus?search=",
      method: "GET",
    });
    const options = res.data.map((value) => ({
      id: value.id,
      name: value.attributes.name,
    }));
    if (!res.isError) {
      setContractStatusOL(options);
    }
  };

  const handleClickAddContract = () => {
    setAddContract(true);
  };

  const handleCloseContract = () => {
    setAddContract(false);
    setContractOLValue({ id: null, name: "" });
    setUploadedFile(null);
    reset();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const validateUploadedFile = () => {
    if (uploadedFile) {
      if (
        uploadedFile.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        uploadedFile.type !== "application/msword" &&
        uploadedFile.type !== "application/pdf"
      ) {
        setUploadedFile(null);
      }
    }
  };
  useEffect(() => {
    validateUploadedFile();
  }, [uploadedFile]);

  useEffect(() => {
    getContractStatusOL();
  }, []);

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
                <Grid item xs={9.9} sm={6}>
                  <Header judul="Edit Employee" />
                </Grid>
              ) : (
                <Grid item xs={9.9} sm={6}>
                  <Header judul="Detail Employee" />
                </Grid>
              )}
              <Grid item xs={12} sm={6} alignSelf="center" sx={{textAlign: {xs: 'start', sm: 'end'}}}>
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
              {value === "one" && (
                <StatusEmployeeTab id={userId} dataChange={isContractAdded} />
              )}
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
                <form
                  onSubmit={handleSubmit(onSave)}
                  encType="multipart/formData"
                  noValidate
                >
                  <DialogContent>
                    <DialogContentText
                      id="alert-dialog-description"
                      sx={{ fontSize: "16px" }}
                    >
                      Add Contract Status: Streamline employee contract
                      management with ease by assigning and tracking various
                      contract statuses.
                    </DialogContentText>
                    <Controller
                      name="contractStatus"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          disablePortal
                          id="combo-box-demo"
                          options={contractStatusOL}
                          getOptionLabel={(option) => option.name}
                          sx={{ width: "100%", marginTop: "20px" }}
                          value={contractOLValue}
                          onChange={(_, newVal) => {
                            setContractOLValue(newVal);
                            field.onChange(newVal);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Contract Status"
                              error={!!formState.errors.contractStatus}
                              required
                            />
                          )}
                        />
                      )}
                    />
                    {formState.errors.contractStatus && (
                      <Typography
                        color="#d32f2f"
                        textAlign={"left"}
                        fontSize={12}
                        fontStyle={"italic"}
                      >
                        {formState.errors.contractStatus.message}
                      </Typography>
                    )}
                    <Grid container spacing={1} direction="row" sx={{ marginTop: "20px" }}>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="startDate"
                          control={control}
                          render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DatePicker"]}>
                                <DatePicker
                                  {...field}
                                  format="DD/MM/YYYY"
                                  label="Contract Start Date"
                                  sx={{ width: "100%" }}
                                  value={field.value}
                                  onChange={(value) => {
                                    field.onChange(
                                      value ? value.format("YYYY-MM-DD") : null
                                    );
                                  }}
                                  onAccept={field.onBlur}
                                  slotProps={{
                                    textField: {
                                      error: !!formState.errors.startDate,
                                      required: true,
                                    },
                                  }}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                          )}
                        />
                        {formState.errors.startDate && (
                          <Typography
                            color="#d32f2f"
                            textAlign={"left"}
                            fontSize={12}
                            fontStyle={"italic"}
                          >
                            {formState.errors.startDate.message}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="endDate"
                          control={control}
                          render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DatePicker"]}>
                                <DatePicker
                                  {...field}
                                  format="DD/MM/YYYY"
                                  label="Contract End Date"
                                  sx={{ width: "100%" }}
                                  value={field.value}
                                  onChange={(value) => {
                                    field.onChange(
                                      value ? value.format("YYYY-MM-DD") : null
                                    );
                                  }}
                                  onAccept={field.onBlur}
                                  slotProps={{
                                    textField: {
                                      error: !!formState.errors.endDate,
                                      required: true,
                                    },
                                  }}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                          )}
                        />
                        {formState.errors.endDate && (
                          <Typography
                            color="#d32f2f"
                            textAlign={"left"}
                            fontSize={12}
                            fontStyle={"italic"}
                          >
                            {formState.errors.endDate.message}
                          </Typography>
                        )}
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
                              inputProps={{ accept: ".doc, .docx, .pdf" }}
                              ref={fileInputRef}
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
                                Click to upload
                              </Typography>
                              <Typography variant="subtitle1">
                                or drag and drop
                              </Typography>
                            </Box>
                            <Typography color="textSecondary">
                              e.g., DOCX or PDF &#40;max. 3MB&#41;
                            </Typography>
                          </div>
                        </label>
                      </Grid>
                      {uploadedFile && (
                        <Grid item xs={12} component={Paper} mt={1} display="flex" p={2}>
                          <Box display="flex" flexDirection="column" textAlign="start" flex={1}>
                            <span className='text-files-name'>{uploadedFile.name}</span>
                            <Box display="flex" gap={1} alignItems="center">
                            <span className='text-files-sizes'>
                              {convertBytesToString(uploadedFile.size)}
                            </span>
                            <Box width="3px" height="3px" borderRadius="999px" backgroundColor="#00000099"/>
                            <span className='text-files-sizes'>
                              Completed
                            </span>
                            </Box>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <IconButton
                              disabled={formState.isSubmitting}
                              onClick={() => {
                                setUploadedFile(null);
                              }}
                            >
                              <Clear />
                            </IconButton>
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </DialogContent>
                  <DialogActions
                    sx={{ alignSelf: "center", justifyContent: "center" }}
                  >
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
                      disabled={formState.isSubmitting}
                    >
                      {formState.isSubmitting ? (
                        <>
                          <CircularProgress size={14} color="inherit" />
                          <Typography marginLeft={1}>Saving...</Typography>
                        </>
                      ) : (
                        "Save Data"
                      )}
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
