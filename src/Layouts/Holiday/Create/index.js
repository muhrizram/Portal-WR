import React, { useContext } from "react";
import {
  Accordion,
  AccordionDetails,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import "../../../App.css";
import client from "../../../global/client";
import { AlertContext } from "../../../context";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schemaholiday from "../shema";

const CreateHoliday = ({ openAdd, setOpenAdd, onSaveSuccess }) => {
  const { control, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schemaholiday),
  });

  const { setDataAlert } = useContext(AlertContext);

  const onSave = async (data) => {
    const res = await client.requestAPI({
      method: "POST",
      endpoint: "/holiday/addHoliday",
      data,
    });

    if (!res.isError) {
      setDataAlert({
        severity: "success",
        open: true,
        message: res.data.meta.message,
      });
      onSaveSuccess();
      setOpenAdd(false);
      reset(); // Clear the form after successful submission
    } else {
      setDataAlert({
        severity: "error",
        message: res.error.detail,
        open: true,
      });
    }
  };

  const handleClose = () => {
    setOpenAdd(false);
    reset(); // Reset the form on close
  };

  return (
    <div>
      <Dialog
        open={openAdd}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-delete dialog-task"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" className="dialog-delete-header">
          Select Holiday
        </DialogTitle>
        <DialogContent className="dialog-task-content">
          <DialogContentText className="dialog-delete-text-content" id="alert-dialog-description">
            Grant administrators the authority to manually select holidays for employees.
          </DialogContentText>

          <Grid item xs={12}>
            <Accordion sx={{ boxShadow: "none", width: "100%", marginTop: 2 }}>
              <AccordionDetails>
                <form onSubmit={handleSubmit(onSave)}>
                  <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                      <Controller
                        name="date"
                        control={control}
                        defaultValue={null}
                        render={({ field, fieldState }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              {...field}
                              label="Holiday Date"
                              placeholder="Select Date"
                              className="input-field-crud"
                              value={field.value}
                              onChange={(value) => field.onChange(value.format("YYYY-MM-DD"))}
                              sx={{
                                width: "100%",
                              }}
                            />
                          </LocalizationProvider>
                        )}
                      />
                      {formState.errors.date && (
                        <Typography color="#d32f2f" textAlign={"left"} fontSize={12} fontStyle={"italic"}>
                          {formState.errors.date.message}
                        </Typography>
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <Controller
                        name="notes"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            focused
                            name="notes"
                            className="input-field-crud"
                            placeholder="e.g New Year's Day"
                            label="Notes"
                            multiline
                            maxRows={4}
                          />
                        )}
                      />
                      {formState.errors.notes && (
                        <Typography color="#d32f2f" textAlign={"left"} fontSize={12} fontStyle={"italic"}>
                          {formState.errors.notes.message}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>

                  <DialogActions>
                    <Grid container justifyContent="center" spacing={2} marginTop={2}>
                      <Grid item>
                        <Button variant="outlined" className="button-text" onClick={handleClose}>
                          Back
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          type="submit"
                          variant="contained"
                          className="button-text"
                          disabled={formState.isSubmitting}
                        >
                          Save Data
                        </Button>
                      </Grid>
                    </Grid>
                  </DialogActions>
                </form>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateHoliday;
