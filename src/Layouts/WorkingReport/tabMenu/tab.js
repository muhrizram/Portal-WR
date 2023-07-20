import React from "react";
import ViewTask from "../ViewTask";
import ViewOvertime from "../../Overtime/detailEditOvertime";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

export default function TabsMenuWR() {
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <>
     <Grid item xs={12}>
       <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
          >
            <Tab value="one" label="Regular Task" />
            <Tab value="two" label="Overtime Task" />
          </Tabs>
        </Box>
      {value === "one" && <ViewTask />} 
      {value === "two" && <ViewOvertime />}
      </Grid>
        </> 
    );
}