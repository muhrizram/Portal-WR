import React, { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import { TextField, Box, IconButton } from "@mui/material";
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {useSortable} from '@dnd-kit/sortable';

const ColumnConfiguration = () => {
    const field = [
        {id: 'date', label: 'Date'},
        {id: 'start', label: 'Start Time'},
        {id: 'end', label: 'End Time'},
        {id: 'location', label: 'Location'}
    ]

    const [showField, setShow] = useState(false)
    const handleShow = () => setShow((show) => !show)
  return (
        <Grid container direction="row" sx={{marginTop: '10px'}}>
            <Grid item xs={12}>
                <TextField
                    className='input-field-crud'
                    label='No'
                    sx={{marginBottom:'10px'}}
                    />
            </Grid>
            {/* <Draggable label="Drag with the handle" handle /> */}
            {field.map((form) => (
                <Grid container direction="row" key={form.id} display="flex" alignItems="center" >
                    <Grid item xs={12}>
                    <DragIndicatorOutlinedIcon />
                    <TextField 
                        className="field-config"
                        sx={{marginBottom:'10px'}}
                        label={form.label} id={form.id}
                        type={showField ? 'text' : 'field'}
                    />
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShow}
                    >
                        {showField ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </Grid>
                </Grid>
            ))}
        </Grid>
  );
};

export default ColumnConfiguration;
