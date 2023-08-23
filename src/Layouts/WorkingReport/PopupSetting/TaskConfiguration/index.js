import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid } from '@mui/material';

function TaskConfiguration({ taskConfig, setTaskConfig }) {

  const handleCheckboxChange = (name) => (event) => {
    const { checked } = event.target;
    setTaskConfig((prevTaskConfig) => ({
      ...prevTaskConfig,
      [name]: checked,
    }));
  };

  const checkboxes = [
    { name: 'includeAbsenceType', label: 'Include Absence Type' },
    { name: 'includeDuration', label: 'Include Duration' },
    { name: 'includeProjectName', label: 'Include Project Name' },
  ];

  return (
    <Grid container direction="row">
      <Grid xs={6}>
        {checkboxes.map((checkbox) => (
          <FormControlLabel
            key={checkbox.name}
            control={
              <Checkbox
                checked={taskConfig[checkbox.name]}
                onChange={handleCheckboxChange(checkbox.name)}
                name={checkbox.name}
              />
            }
            label={checkbox.label}
          />
        ))}
      </Grid>
    </Grid>
  );
}

export default TaskConfiguration;
