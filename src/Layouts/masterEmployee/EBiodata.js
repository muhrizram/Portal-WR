import React, { useState } from "react";
// import Index from '../../Component/Header';
// import BreadCumbComp from '../../Component/BreadCumb';
import Grid from "@mui/material/Grid";
import { Avatar, Button, Typography } from "@mui/material";
// import TabsMenu from '../../Component/menu/tabs';
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";

const placement = [
  {
    value: "wfo",
    label: "WFO",
  },
  {
    value: "wfh",
    label: "WFH",
  },
];

const positions = [
  {
    value: "ceo",
    label: "Chief Executive Officer",
  },
  {
    value: "coo",
    label: "Chief Operation Officer",
  },
  {
    value: "cco",
    label: "Chief Customer Officer",
  },
];

const contractStatus = [
  {
    value: "fulltime",
    label: "Fulltime",
  },
  {
    value: "parttime",
    label: "PartTime",
  },
];

const CBiodataEmployee = ({ onCancel, onSave }) => {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <Grid container rowSpacing={3}>
        <Grid item xs container direction="column" spacing={2}>
          <Grid container className="containerHeader">
            <Grid container direction="row">
              <Grid item xs={12}>
                <Typography style={{ marginTop: 20, marginLeft: 30 }}>
                  Profile Picture
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Avatar src={file} className="img-master-employee-create" />
              </Grid>
              <Grid item xs={10}>
                <input
                  type="file"
                  accept=".png, .jpg"
                  onChange={handleChange}
                />
              </Grid>
              {/* <img src={file}  /> */}
              {/* <Button variant="outlined" onClick={handleChange} style={{marginTop:10, marginLeft:30}}>Upload Image</Button> */}
              <Typography className="text" style={{ marginLeft: 30 }}>
                Single upload file should not be more 3MB. Only the .png/jpg
                file types are allowed
              </Typography>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-number"
                  style={{ width: "100%", paddingRight: "10px" }}
                  label="NIP"
                  // value={nip}
                  // onChange={(e) => setNip(e.target.value)}
                  // onChange={handleNipChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  style={{ width: "100%" }}
                  label="Generation"
                  // value={generation}
                  // onChange={(e) => setGeneration(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  style={{ width: "100%", paddingRight: "10px" }}
                  label="Employee First Name"
                  // value={firstName}
                  // onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  style={{ width: "100%" }}
                  label="Employee Last Name"
                  // value={lastName}
                  // onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-number"
                  style={{ width: "100%", paddingRight: "10px" }}
                  label="NPWP"
                  // value={npwp}
                  // onChange={(e) => setNPWP(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  style={{ width: "100%" }}
                  label="Email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Join Date"
                    sx={{
                      width: "100%",
                      paddingRight: "10px",
                    }}
                    // value={joinDate}
                    // onChange={(e) => setJoinDate(e.target.value)}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  required
                  id="outlined-placement-type"
                  style={{ width: "100%" }}
                  options={placement}
                  renderInput={(params) => (
                    <TextField {...params} label="Placement Type" required />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <Autocomplete
                  required
                  id="outlined-contract-status"
                  style={{ width: "100%", paddingRight: "10px" }}
                  options={contractStatus}
                  renderInput={(params) => (
                    <TextField {...params} label="Contract Status" required />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  required
                  id="outlined-onsite-status"
                  style={{ width: "100%" }}
                  options={placement}
                  renderInput={(params) => (
                    <TextField {...params} label="Onsite Status" required />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  style={{ width: "100%", paddingRight: "10px" }}
                >
                  <DatePicker
                    label="Contract Start Date"
                    sx={{
                      width: "100%",
                      paddingRight: "10px",
                    }}
                    // value={carrerStartDate}
                    // onChange={(e) => setCarrerStartDate(e.target.value)}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Contract End Date"
                    sx={{
                      width: "100%",
                    }}
                    // value={contractEndDate}
                    // onChange={(e) => setConntractEndDate(date)}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <Autocomplete
                  required
                  id="outlined-division-group"
                  style={{ width: "100%", paddingRight: "10px" }}
                  options={placement}
                  renderInput={(params) => (
                    <TextField {...params} label="Division Group" required />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Select Division Group First">
                  <Autocomplete
                    required
                    id="outlined-position"
                    style={{ width: "100%" }}
                    options={positions}
                    renderInput={(params) => (
                      <TextField {...params} label="Position" required />
                    )}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={11.5} alignSelf="center" textAlign="right">
        <Button
          variant="outlined"
          color="warning"
          style={{ marginRight: 3 }}
          onClick={() => onCancel()}
        >
          Cancel Data
        </Button>
        <Button variant="contained" onClick={() => onSave()}>
          Save Data
        </Button>
      </Grid>
    </>
  );
};

export default CBiodataEmployee;
