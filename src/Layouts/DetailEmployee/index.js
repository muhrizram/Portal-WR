import React from "react";
import Grid from "@mui/material/Grid";
import { Typography, Button } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import avatar from "../../assets/_Avatar_.png";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Breadcrumbs from "../../Component/BreadCumb/";
import Header from "../../Component/Header/";

const DetailEmployee = () => {
  return (
    <>
      <Breadcrumbs />
      <Grid container rowSpacing={2.5}>
        <Grid item xs={12}>
          <Grid container>
            <div className="dividerHeader" />
            <Grid item xs={9.9}>
              <Header judul="Employee Details" />
            </Grid>
            <Grid item />

            <Grid item xs={2} alignSelf="center" textAlign="right">
              <Button
                variant="outlined"
                startIcon={<CreateIcon />}
                style={{ marginRight: "10px" }}
              >
                Edit Data Employee
              </Button>
            </Grid>
          </Grid>

          <Grid container className="HeaderDetail">
            <Grid>
              <Typography>Profile Picture</Typography>
              <img src={avatar} style={{ marginTop: "20px" }} />
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
                      style={{ width: "100%", paddingRight: "10px" }}
                      // error
                      id="outlined-error-helper-text"
                      label="Nip"
                      // defaultValue="Hello World"
                      // helperText="Incorrect entry."
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      style={{ width: "100%" }}
                      // error
                      id="outlined-error-helper-text"
                      label="Username"
                      // defaultValue="Hello World"
                      // helperText="Incorrect entry."
                    />
                  </Grid>
                </Grid>
                <Grid container direction="row" style={{ padding: "20px" }}>
                  <Grid item xs={6}>
                    <TextField
                      style={{ width: "100%", paddingRight: "10px" }}
                      // error
                      id="outlined-error-helper-text"
                      label="Employee First Name"
                      // defaultValue="Hello World"
                      // helperText="Incorrect entry."
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      style={{ width: "100%" }}
                      // error
                      id="outlined-error-helper-text"
                      label="Employee Last Name"
                      // defaultValue="Hello World"
                      // helperText="Incorrect entry."
                    />
                  </Grid>
                </Grid>
                <Grid container direction="row" style={{ padding: "20px" }}>
                  <Grid item xs={6}>
                    <TextField
                      style={{ width: "100%", paddingRight: "10px" }}
                      // error
                      id="outlined-error-helper-text"
                      label="Contract Status"
                      // defaultValue="Hello World"
                      // helperText="Incorrect entry."
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      style={{ width: "100%" }}
                      // error
                      id="outlined-error-helper-text"
                      label="Assignment Talent"
                      // defaultValue="Hello World"
                      // helperText="Incorrect entry."
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
                {/* <Typography variant="body2" color="text.primary">
                        Nama
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        style={{ marginLeft: "500px" }}
                      >
                        Role
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        style={{ marginLeft: "500px" }}
                      >
                        Email
                      </Typography> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* </Grid> */}
    </>
  );
};

export default DetailEmployee;
