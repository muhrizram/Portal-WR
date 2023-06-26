import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";

const InsuranceTab = ({ isEdit }) => {
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
  ];
  const [NoD, setNoD] = useState("");

  return (
    <>
      {isEdit ? (
        <>
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
                    style={{ width: "100%", paddingRight: "10px" }}
                    id="outlined-error-helper-text"
                    label="No Health Insurance (BPJS)"
                  />
                </Grid>
                <Grid item xs={6}>
                  {NoD ? (
                    <TextField
                      required
                      style={{ width: "100%" }}
                      value={NoD}
                      onChange={(e) => setNoD(e.target.value)}
                      id="outlined-error-helper-text"
                      label="Number of Dependents"
                    />
                  ) : (
                    <TextField
                      required
                      error
                      style={{ width: "100%" }}
                      id="outlined-error-helper-text"
                      value={NoD}
                      defaultValue="1010101010"
                      onChange={(e) => setNoD(e.target.value)}
                      label="Number of Dependents"
                      helperText="Please Insert NoD."
                    />
                  )}
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
                      <TextField required {...params} label="BPJS Class" />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    style={{ width: "100%" }}
                    id="outlined-error-helper-text"
                    label="Worker's Social Security (BPJS TK)"
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "20px" }}>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Start Date of Career"
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
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField required {...params} label="PTKP Status" />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "20px" }}>
                <Grid item xs={12}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Number of Employee Dependents"
                      />
                    )}
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
                    No Health Insurance(BPJS){" "}
                  </Typography>
                  <Typography variant="employeeDetail">-</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Number of Dependents
                  </Typography>
                  <Typography variant="employeeDetail">-</Typography>
                </Grid>
              </Grid>

              <Grid container direction="row" style={{ padding: "30px" }}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    BPJS Class
                  </Typography>
                  <Typography variant="employeeDetail">-</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Worker's Social Security(BPJS TK)
                  </Typography>
                  <Typography variant="employeeDetail">-</Typography>
                </Grid>
              </Grid>

              <Grid container direction="row" style={{ padding: "30px" }}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Starter Date
                  </Typography>
                  <Typography variant="employeeDetail">-</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    PTKP Status
                  </Typography>
                  <Typography variant="employeeDetail">-</Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "30px" }}>
                <Grid item xs={12}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Number of Employee Dependents
                  </Typography>
                  <Typography variant="employeeDetail">-</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default InsuranceTab;
