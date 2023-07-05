import React from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";

const BiodataDetailsTab = ({ isEdit, changeField, dataEdit }) => {
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
  ];
  return (
    <>
      {isEdit ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid container direction="row" style={{ padding: "20px" }}>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    style={{ paddingRight: "10px" }}                    
                    id="outlined-error-helper-text"
                    label="Place of Birth"
                  />
                </Grid>
                <Grid item xs={6} sx={{ marginBottom: "20px" }}>
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
                    fullWidth
                    style={{ paddingRight: "10px" }}
                    id="outlined-error-helper-text"
                    label="National ID Number"
                    value={dataEdit.nip}
                    onChange={(event) => changeField("nip", event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required                    
                    fullWidth
                    type="number"
                    id="outlined-error-helper-text"
                    label="Phone Number"
                    onChange={(event) =>
                      changeField("phonenumber", event.target.value)
                    }
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "20px" }}>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    style={{ paddingRight: "10px" }}
                    id="outlined-error-helper-text"
                    label="Address"
                    onChange={(event) =>
                      changeField("address", event.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="outlined-error-helper-text"
                    label="Postal Code"
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "20px" }}>
                <Grid item xs={6}>
                  <Autocomplete
                    disablePortal
                    fullWidth
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{ paddingRight: "10px" }}
                    renderInput={(params) => (
                      <TextField required {...params} label="Family Contact" />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="outlined-error-helper-text"
                    label="Contact Name"
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "20px" }}>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    style={{ paddingRight: "10px" }}
                    id="outlined-error-helper-text"
                    label="Contact Number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="outlined-error-helper-text"
                    label="School of Origin"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid container direction="row" style={{ padding: "30px" }}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Place of Birth
                  </Typography>
                  <Typography variant="employeeDetail">Bandung</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Date of Birth
                  </Typography>
                  <Typography variant="employeeDetail">05/09/1998</Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "30px" }}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    National ID Number
                  </Typography>
                  <Typography variant="employeeDetail">311245591924</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Phone Number
                  </Typography>
                  <Typography variant="employeeDetail">
                    +628123658132
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "30px" }}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Address
                  </Typography>
                  <Typography variant="employeeDetail">
                    Jl.Cihampelas No 37 A
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Postal Code
                  </Typography>
                  <Typography variant="employeeDetail">445821</Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "30px" }}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Family Contact
                  </Typography>
                  <Typography variant="employeeDetail">Mother</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Contact Name
                  </Typography>
                  <Typography variant="employeeDetail">Rodiah</Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "30px" }}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Contact Number
                  </Typography>
                  <Typography variant="employeeDetail">
                    +628412356347
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    School of Origin
                  </Typography>
                  <Typography variant="employeeDetail">Bandung</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default BiodataDetailsTab;
