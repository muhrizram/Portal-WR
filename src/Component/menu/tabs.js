import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import CInsuranceDetail from '../../Layouts/masterEmployee/detailInsurance'
import CBiodataEmployee from '../../Layouts/masterEmployee/EBiodata';
import CDetailBiodataEmployee from '../../Layouts/masterEmployee/detailBiodata';

export default function TabsMenu() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Grid container className="HeaderDetail">
      <Box sx={{ width: "100%", marginBottom: "2%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          // aria-label="wrapped label tabs example"
        >
          <Tab value="one" label="Employee Biodata" />
          <Tab value="two" label="Biodata Details" />
          <Tab value="three" label="Insurance Details" />
        </Tabs>
      </Box>
      {value === "one" && <CBiodataEmployee />}
      {value === "two" && <CDetailBiodataEmployee />}
      {value === "three" && <CInsuranceDetail />}
    </Grid>
      </> 
  );
}