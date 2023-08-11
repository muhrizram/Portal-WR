import React, { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid";

//form
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const TaskConfiguration = ({taskConfig, setTaskConfig}) => {
  const listTask =[
    {label : "Include Absence Type", id : 1},
    {label : "Include Duration", id : 2},
    {label : "Include Project Name", id : 3}
  ]

  const handleChangeCheckbox = (value) => {
    if (taskConfig.includes(value)) {
      setTaskConfig(taskConfig.filter((task) => task !== value))
    }
    else {
      setTaskConfig([...taskConfig, value])
    }
  }

  return (
    <Grid container direction="row">
        <Grid item xs={6}>
          <FormGroup>
            {listTask.map((task) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={taskConfig.includes(task.id)}
                    onChange={() => handleChangeCheckbox(task.id)}
                  />
                }
                label={task.label}
                key={task.id}
              />
            ))}
          </FormGroup>
        </Grid>
    </Grid>
  );
};

export default TaskConfiguration;
