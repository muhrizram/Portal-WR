import React from "react";
import avatar from "../../../assets/_Avatar_.png";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import { Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

const EmployeeBiodataTab = () => {
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
  ];
  return (
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
        <Typography color="text.secondary" style={{ fontSize: "15px" }}>
          single upload file should not be more 3MB. Only the .png/jpg file
          types are allowed
        </Typography>
      </Grid>

      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm container> */}
        <Grid item xs container direction="column" spacing={2}>
          <Grid
            container
            direction="row"
            style={{ marginTop: "30px", padding: "20px" }}
          >
            <Grid item xs={6}>
              <TextField
                required
                disabled
                style={{ width: "100%", paddingRight: "10px" }}
                id="outlined-error-helper-text"
                label="NIP"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                style={{ width: "100%" }}
                id="outlined-error-helper-text"
                label="Generation"
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ padding: "20px" }}>
            <Grid item xs={6}>
              <TextField
                required
                style={{ width: "100%", paddingRight: "10px" }}
                id="outlined-error-helper-text"
                label="Employee First Name"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                style={{ width: "100%" }}
                id="outlined-error-helper-text"
                label="Employee Last Name"
              />
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
                  <TextField required {...params} label="Division Group" />
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
  );
};

export default EmployeeBiodataTab;
