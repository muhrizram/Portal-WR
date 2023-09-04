import React, { useCallback, useContext, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  Box,
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
import "../../../App.css";
import client from "../../../global/client";
import { UploadFileOutlined } from "@mui/icons-material";
import { AlertContext } from "../../../context";
const MAX_SIZE_FILE = 1048576; // bytes
const UploadHoliday = ({ openUpload, setOpenUpload, onSaveSuccess }) => {
  const downloadUrl = `${process.env.REACT_APP_BASE_API}/holiday/download?bucketName=workingreport-dev&objectName=template_import_holiday.xlsx`;
  const { setDataAlert } = useContext(AlertContext);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSave = async (event) => {
    event.preventDefault();
    if(uploadedFile === null){
      return;
    }
    if (uploadedFile.size >= MAX_SIZE_FILE) {
      setDataAlert({
        severity: "error",
        open: true,
        message: "Max file size is 1 MB",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);

    setLoading(true);
    const res = await client.requestAPI({
      method: "POST",
      endpoint: "/holiday/upload",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!res.isError) {
      setDataAlert({
        severity: "success",
        open: true,
        message: res.meta.message,
      });
      onSaveSuccess();
      setUploadedFile(null);
      setOpenUpload(false);
    } else {
      setDataAlert({
        severity: "error",
        message: res.error.detail,
        open: true,
      });
    }
    setLoading(false);
  };

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDraggingOver(false);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setIsDraggingOver(false);
    const file = event.dataTransfer.files[0];
    setUploadedFile(file);
  }, []);

  const handleClose = () => {
    setUploadedFile(null);
    setOpenUpload(false);
  };

  return (
    <div>
      <Dialog
        open={openUpload}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-delete dialog-task"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" className="dialog-delete-header">
          Upload Holiday
        </DialogTitle>

        <form onSubmit={onSave} encType="multipart/formData">
          <DialogContent className="dialog-task-content">
            <DialogContentText
              className="dialog-delete-text-content"
              id="alert-dialog-description"
              sx={{ marginBottom: 2 }}
            >
              Grant administrators the authority to manually Upload holidays for
              employees.
            </DialogContentText>

            <Grid item xs={12}>
              <Accordion
                sx={{ boxShadow: "none", width: "100%", marginTop: 2 }}
              >
                <AccordionDetails>
                  <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                      <label
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <div
                          style={{
                            border: isDraggingOver
                              ? "2px dashed #0078D7"
                              : "2px dashed #ddd",
                            borderRadius: "4px",
                            padding: "20px",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                        >
                          <TextField
                            type="file"
                            name="file"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                          <UploadFileOutlined
                            fontSize="large"
                            style={{ color: "#0078D7" }}
                          />

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ color: "#0078D7", marginRight: "3px" }}
                            >
                              {uploadedFile != null
                                ? uploadedFile.name
                                : "Click to Upload"}
                            </Typography>
                            <Typography variant="subtitle1">
                              {uploadedFile != null
                                ? " - Selected"
                                : "or Drag and Drop"}
                            </Typography>
                          </Box>

                          {uploadedFile == null && (
                            <Typography color="textSecondary">
                              XLS or XSLX (max. 1MB)
                            </Typography>
                          )}
                        </div>
                      </label>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <a
                  href={downloadUrl}
                  download="template_import_holiday.xlsx"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  <Typography
                    component="span"
                    alignItems={"center"}
                    color={"#0078D7"}
                  >
                    DOWNLOAD TEMPLATE
                  </Typography>
                </a>
              </Grid>
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
                  type="submit"
                  disabled={loading ? true : false || uploadedFile === null}
                >
                  {loading ? <CircularProgress size="16px" /> : "Upload File"}
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default UploadHoliday;
