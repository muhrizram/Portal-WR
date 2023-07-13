import React from "react";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Breadcrumbs from "../../Component/BreadCumb";
import Header from "../../Component/Header";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BiodataDetailsTab from "./BiodataDetailsTab";
import EmployeeBiodataTab from "./EmployeeBiodataTab";
import SideBar from "../../Component/Sidebar";

//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//compinedit
import StatusEmployeeTab from "./StatusEmployeeTab";
import ProjectHistoryTab from "./ProjectHistoryTab";

const EditEmployee = () => {
  const [open, setOpen] = React.useState(false);
  const [Cancel, setCancel] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickCancel = () => {
    setCancel(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setCancel(false);
  };

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [value1, setValue1] = React.useState("one");

  const handleChange1 = (event1, newValue1) => {
    setValue1(newValue1);
  };

  return (
    <>
      <SideBar>
        <Breadcrumbs />
        <Grid container rowSpacing={2.5}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={9.9}>
                <Header judul="Edit" />
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
              <Box sx={{ width: "100%", marginBottom: "2%" }}>
                <Tabs value={value1} onChange={handleChange1}>
                  <Tab value="one" label="Employee Biodata"></Tab>
                  <Tab value="two" label="Biodata Details" />
                  <Tab value="three" label="Insurance Details" />
                </Tabs>
              </Box>
              {value1 === "one" && <EmployeeBiodataTab />}
              {value1 === "two" && <BiodataDetailsTab />}
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
            </Grid>

            <Grid container className="HeaderDetail">
              <Box sx={{ width: "100%" }}>
                <Tabs value={value} onChange={handleChange}>
                  <Tab value="one" label="Employee Status" />
                  <Tab value="two" label="Project History" />
                </Tabs>
              </Box>
              {value === "one" && <StatusEmployeeTab />}

              {value === "two" && <ProjectHistoryTab />}
            </Grid>
          </Grid>
        </Grid>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            sx={{ alignSelf: "center", fontSize: "30px", fontStyle: "Poppins" }}
            id="alert-dialog-title"
          >
            {"Save Data"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Save your progress: Don't forget to save your data before leaving
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Back
            </Button>
            <Button variant="contained" onClick={handleClose} autoFocus>
              Save Data
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={Cancel}
          onClose={handleClose1}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            sx={{ alignSelf: "center", fontSize: "30px", fontStyle: "Poppins" }}
            id="alert-dialog-title"
          >
            {"Cancel Data"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Warning: Canceling will result in data loss without saving!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel Without Saving
            </Button>
            <Button variant="contained" onClick={handleClose} autoFocus>
              Back
            </Button>
          </DialogActions>
        </Dialog>
      </SideBar>
    </>
  );
};

export default EditEmployee;
