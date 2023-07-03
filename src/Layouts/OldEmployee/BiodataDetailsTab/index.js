import React from "react";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";

const BiodataDetailsTab = () => {
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
  ];
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs container direction="column" spacing={2}>
          <Grid container direction="row" style={{ padding: "20px" }}>
            <Grid item xs={6}>
              <TextField
                required
                style={{ width: "100%", paddingRight: "10px" }}
                id="outlined-error-helper-text"
                label="Place of Birth"
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    required
                    label="Date of Birth"
                    sx={{
                      width: "100%",
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ padding: "20px" }}>
            <Grid item xs={6}>
              <TextField
                required
                style={{ width: "100%", paddingRight: "10px" }}
                id="outlined-error-helper-text"
                label="National ID Number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                style={{ width: "100%" }}
                type="number"
                id="outlined-error-helper-text"
                label="Phone Number"
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ padding: "20px" }}>
            <Grid item xs={6}>
              <TextField
                required
                style={{ width: "100%", paddingRight: "10px" }}
                id="outlined-error-helper-text"
                label="Address"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                style={{ width: "100%" }}
                id="outlined-error-helper-text"
                label="Postal Code"
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ padding: "20px" }}>
            <Grid item xs={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: "100%", paddingRight: "10px" }}
                renderInput={(params) => (
                  <TextField required {...params} label="Family Contact" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                style={{ width: "100%" }}
                id="outlined-error-helper-text"
                label="Contact Name"
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ padding: "20px" }}>
            <Grid item xs={6}>
              <TextField
                required
                style={{ width: "100%", paddingRight: "10px" }}
                id="outlined-error-helper-text"
                label="Contact Number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                style={{ width: "100%" }}
                id="outlined-error-helper-text"
                label="School of Origin"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BiodataDetailsTab;
