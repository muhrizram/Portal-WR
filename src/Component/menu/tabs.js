import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function TabsMenu() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
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
  );
}