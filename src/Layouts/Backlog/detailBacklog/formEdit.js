import React from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import Header from "../../../Component/Header";
import TaskItemEditBacklog from "./taskItem";

const FormEdit = ({
  handleSubmit,
  handleClickOpenSave,
  projectList,
  dataDetail,
  dataTasks,
  errors,
  control,
  statusBacklogOl,
  assignedToOl,
  handleChangeTask,
  setValue,
  handleClickOpenCancel,
  openDialog,
  handleClose,
  isSave,
  handleCloseOpenCancelData,
  submitSave,
}) => {
  return (
    <Grid container rowSpacing={2.5}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={9.9}>
            <Header judul="Edit Backlog" />
          </Grid>
          <Grid item />
        </Grid>
        <Grid className="HeaderDetail">
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(handleClickOpenSave)}>
              <Grid container direction="column" spacing={3.75}>
                <Grid item xs={12}>
                  <Autocomplete
                    disablePortal
                    disabled
                    id="combo-box-demo"
                    name="ProjectName"
                    options={projectList}
                    defaultValue={
                      projectList.find(
                        (option) =>
                          option.id ===
                          (dataDetail.projectInitial && dataDetail.projectId)
                      ) || null
                    }
                    sx={{
                      width: "100%",
                      marginTop: "8px",
                      backgroundColor: "#EDEDED",
                    }}
                    getOptionLabel={(option) =>
                      option.projectInitial + " - " + option.name
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Project Name *"
                        placeholder="Select Backlog"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  {dataTasks.map((task, index) => (
                    <TaskItemEditBacklog
                      key={index}
                      errors={errors}
                      control={control}
                      data={task}
                      number={index}
                      statusBacklogOl={statusBacklogOl}
                      assignedToOl={assignedToOl}
                      onTaskChange={handleChangeTask}
                      setValue={setValue}
                    />
                  ))}
                </Grid>

                <Grid
                  item
                  container
                  spacing={2}
                  justifyContent="flex-end"
                  mt={3.5}
                >
                  <Grid item xs={12} sm={2} textAlign="right">
                    <Button
                      fullWidth
                      variant="cancelButton"
                      onClick={() => handleClickOpenCancel()}
                    >
                      Cancel Data
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={2} textAlign="right">
                    <Button
                      fullWidth
                      disabled={dataTasks.length === 0}
                      variant="saveButton"
                      type="submit"
                    >
                      Save Data
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
            <Dialog
              open={openDialog}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className="dialog-delete"
            >
              <DialogTitle
                sx={{
                  alignSelf: "center",
                  fontSize: "30px",
                  fontStyle: "Poppins",
                }}
                id="alert-dialog-title"
              >
                {isSave ? "Save Data" : "Cancel Data"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {isSave
                    ? "Save your progress: Don't forget to save your data before leaving"
                    : "Warning: Canceling will result in data loss without saving!"}
                </DialogContentText>
              </DialogContent>
              <DialogActions className="dialog-delete-actions">
                <Button
                  variant="cancelButton"
                  onClick={handleCloseOpenCancelData}
                >
                  {isSave ? "Back" : "Cancel without saving"}
                </Button>
                <Button
                  variant="saveButton"
                  onClick={handleSubmit(submitSave)}
                  autoFocus
                >
                  {isSave ? "Save Data" : "Back"}
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormEdit;
