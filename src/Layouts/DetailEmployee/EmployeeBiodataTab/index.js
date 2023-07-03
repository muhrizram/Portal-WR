import React, { useState } from "react";
import avatar from "../../../assets/_Avatar_.png";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";

const EmployeeBiodataTab = ({ isEdit, changeField, dataEdit }) => {
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
  ];
  const [Generation, setGeneration] = useState("");

  return (
    <>
      {isEdit ? (
        <>
          <Grid>
            <Typography>Profile Picture</Typography>
            <Grid container direction="row">
              <img src={avatar} style={{ marginTop: "20px" }} />
              <Grid item sx={{ margin: "35px 10px 0px 25px" }}>
                <Button
                  variant="outlined"
                  style={{ marginRight: "10px", height: "20px" }}
                >
                  Upload Image
                </Button>
              </Grid>
              <Grid item sx={{ marginTop: "35px" }}>
                <Typography>Profile Picture</Typography>
              </Grid>
            </Grid>
            <Typography
              color="text.secondary"
              style={{ fontSize: "12px", marginTop: "5px" }}
            >
              singleeee upload file should not be more 3MB. Only the .png/jpg
              file types are allowed
            </Typography>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid
                container
                direction="row"
                style={{ marginTop: "30px", padding: "20px" }}
              >
                <Grid item xs={6}>
                  <TextField
                    defaultValue="1010101010"
                    required
                    disabled
                    style={{ width: "100%", paddingRight: "10px" }}
                    id="outlined-error-helper-text"
                    label="NIP"
                  />
                </Grid>
                <Grid item xs={6}>
                  {Generation ? (
                    <TextField
                      required
                      style={{ width: "100%" }}
                      defaultValue="1010101010"
                      value={Generation}
                      onChange={(e) => setGeneration(e.target.value)}
                      id="outlined-error-helper-text"
                      label="Generation"
                    />
                  ) : (
                    <TextField
                      required
                      error
                      style={{ width: "100%" }}
                      id="outlined-error-helper-text"
                      value={Generation}
                      defaultValue="1010101010"
                      onChange={(e) => setGeneration(e.target.value)}
                      label="Generation"
                      helperText="Please Insert Generation."
                    />
                  )}
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "20px" }}>
                <Grid item xs={6}>
                  {dataEdit.firstName ? (
                    <TextField
                      required
                      style={{ width: "100%", paddingRight: "10px" }}
                      value={dataEdit.firstName}
                      onChange={(event) =>
                        changeField("firstName", event.target.value)
                      }
                      id="outlined-error-helper-text"
                      placeholder="Enter Employee First Name"
                      label="First Name"
                    />
                  ) : (
                    <TextField
                      required
                      error
                      style={{ width: "100%", paddingRight: "10px" }}
                      id="outlined-error-helper-text"
                      value={dataEdit.firstName}
                      onChange={(event) =>
                        changeField("firstName", event.target.value)
                      }
                      label="First Name"
                      helperText="Please insert Employee First Name."
                    />
                  )}
                </Grid>
                <Grid item xs={6}>
                  {dataEdit.lastName ? (
                    <TextField
                      required
                      style={{ width: "100%", paddingRight: "10px" }}
                      value={dataEdit.lastName}
                      onChange={(event) =>
                        changeField("lastName", event.target.value)
                      }
                      id="outlined-error-helper-text"
                      placeholder="Enter Employee First Name"
                      label="Last Name"
                    />
                  ) : (
                    <TextField
                      required
                      error
                      style={{ width: "100%", paddingRight: "10px" }}
                      id="outlined-error-helper-text"
                      value={dataEdit.lastName}
                      onChange={(event) =>
                        changeField("lastName", event.target.value)
                      }
                      label="Last Name"
                      helperText="Please insert Employee Last Name."
                    />
                  )}
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "20px" }}>
                <Grid item xs={6}>
                  <TextField
                    required
                    style={{ width: "100%", paddingRight: "10px" }}
                    id="outlined-error-helper-text"
                    label="NPWP"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    style={{ width: "100%" }}
                    id="outlined-error-helper-text"
                    label="Email"
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "20px" }}>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Contract Start Date"
                        sx={{ width: "100%", paddingRight: "10px" }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{ width: "100%", marginTop: "8px" }}
                    renderInput={(params) => (
                      <TextField required {...params} label="Placement Type" />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "20px" }}>
                <Grid item xs={6}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{
                      width: "100%",
                      marginTop: "8px",
                      paddingRight: "10px",
                    }}
                    renderInput={(params) => (
                      <TextField required {...params} label="Contract Status" />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{
                      width: "100%",
                      marginTop: "8px",
                    }}
                    renderInput={(params) => (
                      <TextField required {...params} label="Onsite Status" />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "20px" }}>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Contract Start Date"
                        sx={{ width: "100%", paddingRight: "10px" }}
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
              <Grid container direction="row" style={{ padding: "20px" }}>
                <Grid item xs={6}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{
                      width: "100%",
                      marginTop: "8px",
                      paddingRight: "10px",
                    }}
                    renderInput={(params) => (
                      <TextField required {...params} label="ision Group" />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{
                      width: "100%",
                      marginTop: "8px",
                    }}
                    renderInput={(params) => (
                      <TextField required {...params} label="Position" />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid>
            <Typography>Profile Picture</Typography>
            <Grid container direction="row">
              <img src={avatar} style={{ marginTop: "20px" }} />

              <Grid
                item
                sx={{
                  margin: "39px 0px 0px 25px",
                }}
              >
                <Typography sx={{ fontSize: "13px" }}>Image.jpeg</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid
                container
                direction="row"
                style={{ marginTop: "30px", padding: "30px" }}
              >
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    {" "}
                    NIP{" "}
                  </Typography>
                  <Typography variant="employeeDetail">
                    {dataEdit.nip}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Generation
                  </Typography>
                  <Typography variant="employeeDetail">Gen13</Typography>
                </Grid>
              </Grid>

              <Grid container direction="row" style={{ padding: "30px" }}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Employee First Name
                  </Typography>
                  <Typography variant="employeeDetail">
                    {dataEdit.firstName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Employee Last Name
                  </Typography>
                  <Typography variant="employeeDetail">
                    {dataEdit.lastName}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container direction="row" style={{ padding: "30px" }}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    NPWP
                  </Typography>
                  <Typography variant="employeeDetail">
                    {dataEdit.npwp}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Email
                  </Typography>
                  <Typography variant="employeeDetail">
                    {dataEdit.email}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "30px" }}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Start Join Date
                  </Typography>
                  <Typography variant="employeeDetail">01/01/2019</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Placement Type
                  </Typography>
                  <Typography variant="employeeDetail">
                    {dataEdit.placementType}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "30px" }}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Contract Start Date
                  </Typography>
                  <Typography variant="employeeDetail">01/02/2019</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Contract End Date
                  </Typography>
                  <Typography variant="employeeDetail">01/01/2020</Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "30px" }}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Contract Status
                  </Typography>
                  <Typography variant="employeeDetail">Fulltime</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Onsite Status
                  </Typography>
                  <Typography variant="employeeDetail">Project</Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "30px" }}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Onsite Status
                  </Typography>
                  <Typography variant="employeeDetail">ison Group</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Position
                  </Typography>
                  <Typography variant="employeeDetail">
                    Software Developer
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default EmployeeBiodataTab;
