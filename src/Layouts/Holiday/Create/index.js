import React, { useContext, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  Button,
  CircularProgress,
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
import moment from"moment";
import { AlertContext } from "../../../context";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schemaholiday from "../shema";

const CreateHoliday = ({ openAdd, setOpenAdd, onSaveSuccess }) => {
  const {
    control,
    handleSubmit,
    formState,
    reset,
    setError,
    getValues,
  } = useForm({
    resolver: yupResolver(schemaholiday),
    mode: "onBlur",
  });

  const { setDataAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const cleanNotes = (string) =>{
    return string.replace(/\s+/g, " ").trim();
  }

  const onSave = async (data) => {
    setLoading(true);
    data = {
      ...data,
      notes: cleanNotes(data.notes),
      date: moment(data.date).format("YYYY-MM-DD"),
    };
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
      setOpenValidation(false);
      reset(); // Clear the form after successful submission
    } else {
      setDataAlert({
        severity: "error",
        message: res.error.detail,
        open: true,
      });
    }
    setLoading(false);
  };

  const handleClose = () => {
    setOpenAdd(false);
    reset(); // Reset the form on close
  };

  const [openValidation, setOpenValidation] = useState(false);
  const handleValidateForm = async () => {
    await schemaholiday
      .validate(getValues(), { abortEarly: false })
      .then(() => {
        setOpenValidation(true);
      })
      .catch((err) => {
        Object.entries(err.inner).forEach(([key, value]) => {
          setError(value.path, { type: "manual", message: value.message });
        });
      });
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
          <DialogContentText
            className="dialog-delete-text-content"
            id="alert-dialog-description"
          >
            Grant administrators the authority to manually select holidays for
            employees.
          </DialogContentText>

          <Grid item xs={12}>
            <Accordion sx={{ boxShadow: "none", width: "100%", marginTop: 2 }}>
              <AccordionDetails>
                <form>
                  <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                      <Controller
                        name="date"
                        control={control}
                        defaultValue={null}
                        render={({ field, fieldState }) => {
                          return (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                {...field}
                                label="Holiday Date"
                                className="input-field-crud"
                                format="DD/MM/YYYY"
                                value={field.value}
                                onChange={(value) =>
                                  field.onChange(
                                    value ? value : null
                                  )
                                }
                                onAccept={field.onBlur}
                                sx={{
                                  width: "100%",
                                }}
                                slotProps={{
                                  textField: {
                                    focused:true,
                                    placeholder:"Select Date",
                                    error: formState.errors.date !== undefined,
                                    required: true,
                                  },
                                }}
                              />
                            </LocalizationProvider>
                          );
                        }}
                      />
                      {formState.errors.date && (
                        <Typography
                          color="#d32f2f"
                          textAlign={"left"}
                          fontSize={12}
                          fontStyle={"italic"}
                        >
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
                            label="Holiday Description"
                            multiline
                            error={formState.errors.notes !== undefined}
                            maxRows={4}
                            required
                            inputProps={{maxLength:50}}
                          />
                        )}
                      />
                      {formState.errors.notes && (
                        <Typography
                          color="#d32f2f"
                          textAlign={"left"}
                          fontSize={12}
                          fontStyle={"italic"}
                        >
                          {formState.errors.notes.message}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>

                  <DialogActions>
                    <Grid
                      container
                      justifyContent="center"
                      spacing={2}
                      marginTop={2}
                    >
                      <Grid item>
                        <Button
                          variant="outlined"
                          className="button-text"
                          onClick={handleClose}
                        >
                          Back
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          className="button-text"
                          onClick={handleValidateForm}
                        >
                          Save Data
                        </Button>
                      </Grid>
                    </Grid>
                  </DialogActions>
                  <Dialog
                    open={openValidation}
                    onClose={() => setOpenValidation(false)}
                    aria-labelledby="validation-dialog-title"
                    aria-describedby="validation-dialog-description"
                    className="dialog-delete"
                    fullWidth
                  >
                    <DialogTitle
                      id="validation-dialog-title"
                      className="dialog-delete-header"
                    >
                      Save Data
                    </DialogTitle>
                    <DialogContent className="dialog-task-content">
                      <DialogContentText
                        className="dialog-delete-text-content"
                        id="validation-dialog-description"
                      >
                        Save your progress: Don't forget to save your data
                        before leaving
                      </DialogContentText>
                      <DialogActions>
                        <Grid
                          container
                          justifyContent="center"
                          spacing={2}
                          marginTop={2}
                        >
                          <Grid item>
                            <Button
                              variant="outlined"
                              className="button-text"
                              onClick={() => setOpenValidation(false)}
                            >
                              Back
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="contained"
                              className="button-text"
                              onClick={handleSubmit(onSave)}
                              disabled={loading}
                            >
                              {loading ? (
                                <React.Fragment>
                                  <CircularProgress size={14} />
                                  <Typography marginLeft={1}>Loading...</Typography>
                                </React.Fragment>
                              ) : (
                                "Save Data"
                              )}
                            </Button>
                          </Grid>
                        </Grid>
                      </DialogActions>
                    </DialogContent>
                  </Dialog>
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
