import React, { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid";

//form
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const TaskConfiguration = () => {
  return (
        <Grid container direction="row">
            <Grid item xs={6}>
            <FormGroup>
                <FormControlLabel control={<Checkbox/>}label="Include Absence Type"/>
                <FormControlLabel control={<Checkbox/>}label="Include Duration"/>
                <FormControlLabel control={<Checkbox/>}label="Include Project Name"/>
            </FormGroup>
            </Grid>
        </Grid>
  );
};

export default TaskConfiguration;
