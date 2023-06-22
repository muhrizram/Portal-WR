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

//compinedit
import StatusEmployeeTab from "./StatusEmployeeTab";
import ProjectHistoryTab from "./ProjectHistoryTab";

const DetailEmployee = () => {
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
      <Breadcrumbs />
      <Grid container rowSpacing={2.5}>
        <Grid item xs={12}>
          <Grid container>
            <div className="dividerHeader" />
            <Grid item xs={9.9}>
              <Header judul="Detail Employee" />
            </Grid>
            <Grid item />

            <Grid item xs={2} alignSelf="center" textAlign="right">
              <Button
                variant="outlined"
                startIcon={<CreateIcon />}
                style={{ marginRight: "10px" }}
                href="/edit-employee"
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
    </>
  );
};

export default DetailEmployee;
