import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Breadcrumbs from "../../Component/BreadCumb";
import Header from "../../Component/Header";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BiodataDetailsTab from "./BiodataDetailsTab";
import EmployeeBiodataTab from "./EmployeeBiodataTab";
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
import InsuranceTab from "./InsuranceTab";

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
  const [value, setValue] = React.useState("one");
  const [isEdit, setIsEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [Cancel, setCancel] = React.useState(false);
  const [AddContract, setAddContract] = React.useState(false);
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
  const [dataEdit, setDataEdit] = useState(dataFix);

  const onChangeField = (nameObj, value) => {
    const temp = {
      ...dataEdit,
      [nameObj]: value,
    };
    setDataEdit(temp);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickCancel = () => {
    setCancel(true);
  };
  const handleClickAddContract = () => {
    setAddContract(true);
  };
  const handleClose1 = () => {
    setCancel(false);
  };
  const handleCloseOpenCancelData = () => {
    setCancel(false);
    setDataEdit(dataFix);
    setIsEdit(false);
  };
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

              <Grid item />

              <Grid item xs={2} alignSelf="center" textAlign="right">
                <Button
                  variant="outlined"
                  startIcon={<CreateIcon />}
                  style={{ marginRight: "10px" }}
                  onClick={clickEdit}
                >
                  Edit Data Employee
                </Button>
              </Grid>
            </Grid>

            <Grid container className="HeaderDetail">
              <Box sx={{ width: "100%" }}>
                <Tabs value={value1} onChange={handleChange1}>
                  <Tab value="one" label="Employee Biodata"></Tab>
                  <Tab value="two" label="Biodata Details" />
                  <Tab value="three" label="Insurance Details" />
                </Tabs>
              </Box>
              {value1 === "one" && (
                <EmployeeBiodataTab
                  isEdit={isEdit}
                  changeField={onChangeField}
                  dataEdit={dataEdit}
                />
              )}
              {value1 === "two" && (
                <BiodataDetailsTab
                  isEdit={isEdit}
                  dataEdit={dataEdit}
                  changeField={onChangeField}
                />
              )}
              {value1 === "three" && (
                <InsuranceTab
                  isEdit={isEdit}
                  dataEdit={dataEdit}
                  changeField={onChangeField}
                />
              )}
              {isEdit && (
                <>
                  <Grid
                    item
                    xs={12}
                    alignSelf="center"
                    textAlign="right"
                    sx={{ marginTop: "20px" }}
                  >
                    <Button
                      onClick={handleClickCancel}
                      variant="outlined"
                      style={{ marginRight: "10px" }}
                      color="error"
                    >
                      Cancel Data
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleClickOpen}
                      style={{ marginRight: "10px" }}
                    >
                      Save Data
                    </Button>
                  </Grid>

                  <Dialog
                    open={Cancel}
                    onClose={handleClose1}
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
                      {"Cancel Save Data"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Warning: canceling with result in data loss without
                        saving!
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="outlined"
                        onClick={handleCloseOpenCancelData}
                      >
                        Cancel Without Saving
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleClose1}
                        autoFocus
                      >
                        Back
                      </Button>
                    </DialogActions>
                  </Dialog>

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
                      {"Save Data"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Save your progress: Don't forget to save your data
                        before leaving
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button variant="outlined" onClick={handleClose}>
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        onClick={SubmitSave}
                        autoFocus
                      >
                        Save Data
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              )}
            </Grid>
            <Grid container className="HeaderDetail">
              <Grid item xs={12} alignSelf="center" textAlign="right">
                <Grid sx={{ alignContent: "center" }}>
                  <Button
                    variant="outlined"
                    startIcon={<CreateIcon />}
                    style={{ marginRight: "10px" }}
                    onClick={handleClickAddContract}
                  >
                    <Typography sx={{ fontSize: "14px" }}>
                      {" "}
                      Add Contract Status{" "}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{ width: "100%" }}>
                <Tabs value={value} onChange={handleChange}>
                  <Tab value="one" label="Employee Status" />
                  <Tab value="two" label="Project History" />
                </Tabs>
              </Box>
              {value === "one" && <StatusEmployeeTab />}
              {value === "two" && <ProjectHistoryTab />}

              <Dialog
                maxWidth="xl"
                maxHeight="xl"
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
                <DialogContent>
                  <DialogContentText
                    id="alert-dialog-description"
                    sx={{ fontSize: "16px" }}
                  >
                    Add Contract Status: Streamline employee contract management
                    with ease by assigning and tracking various contract
                    statuses.
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={ContractStatus}
                      sx={{ width: "100%", marginTop: "20px" }}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          label="Placement Type"
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
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ alignSelf: "center" }}>
                  <Button variant="outlined" onClick={handleCloseContract}>
                    Back
                  </Button>
                  <Button variant="contained" onClick={handleCloseContract} autoFocus>
                    Save Data
                  </Button>
                </DialogActions>
              </Dialog>
              {/* <DialogBox open={AddContract} title="Test" deskripsi="Test" /> */}
            </Grid>
          </Grid>
        </Grid>
      </SideBar>
    </>
  );
};

export default DetailEmployee;
