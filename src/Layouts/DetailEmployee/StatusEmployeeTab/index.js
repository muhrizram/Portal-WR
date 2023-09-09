import React, { useEffect, useState, useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";
import client from "../../../global/client";
import blanktable from "../../../assets/blanktable.png";
import { AlertContext } from "../../../context";

const StatusEmployeeTab = ({ id, dataChange }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeletedId] = useState(null);
  const { setDataAlert } = useContext(AlertContext);

  const getData = async (id) => {
    setLoading(true);
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/users/contractHistory?id=${id}`,
    });
    if (!res.isError) {
      setData(res.data);
    } else {
      setDataAlert({
        severity: "error",
        open: true,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getData(id);
  }, [dataChange]);

  const handleDelete = async () => {
    setLoadingDelete(true);
    const res = await client.requestAPI({
      method: "DELETE",
      endpoint: `/users/contractHistory?id=${deleteId}`,
    });
    if (!res.isError) {
      setDataAlert({
        severity: "warning",
        open: true,
        message: res.meta.message,
      });
    } else {
      setDataAlert({
        severity: "error",
        open: true,
        message: res.error.detail,
      });
    }
    setLoadingDelete(false);
    setOpenDeleteDialog(false);
    getData(id);
  };

  const intlDate = Intl.DateTimeFormat("id", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return loading ? (
    <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </div>
  ) : data.length > 0 ? (
    <TableContainer component={Paper}>
      <Table aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#004881", fontSize: "14px" }}>
              Contract Status
            </TableCell>
            <TableCell align="left" sx={{ color: "#004881", fontSize: "14px" }}>
              Contract Start Date
            </TableCell>
            <TableCell align="left" sx={{ color: "#004881", fontSize: "14px" }}>
              Contract End Date
            </TableCell>
            <TableCell align="left" sx={{ color: "#004881", fontSize: "14px" }}>
              Contract File
            </TableCell>
            <TableCell align="left" sx={{ color: "#004881", fontSize: "14px" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell
                sx={{ color: "text.secondary", fontSize: "14px" }}
                scope="row"
              >
                {row.attributes.codeName}
              </TableCell>
              <TableCell
                sx={{ color: "text.secondary", fontSize: "14px" }}
                align="left"
              >
                {intlDate.format(new Date(row.attributes.startDate))}
              </TableCell>
              <TableCell
                sx={{ color: "text.secondary", fontSize: "14px" }}
                align="left"
              >
                {intlDate.format(new Date(row.attributes.endDate))}
              </TableCell>
              <TableCell
                sx={{ color: "text.secondary", fontSize: "14px" }}
                align="left"
              >
                {row.attributes.file ? (
                  <Link
                    href={`https://portalwr-dev.cloudias79.com/apis/minio/view?file=${row.attributes.file}`}
                    target="_blank"
                  >
                    preview pdf
                  </Link>
                ) : (
                  <Typography>-</Typography>
                )}
              </TableCell>
              <TableCell
                sx={{ color: "text.secondary", fontSize: "14px" }}
                align="left"
              >
                <IconButton
                  onClick={() => {
                    setDeletedId(row.id);
                    setOpenDeleteDialog(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <Dialog
                  open={openDeleteDialog}
                  onClose={() => setOpenDeleteDialog(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  className="dialog-delete"
                >
                  <DialogTitle
                    id="alert-dialog-title"
                    className="dialog-delete-header"
                  >
                    {"Delete Data"}
                  </DialogTitle>
                  <DialogContent className="dialog-delete-content">
                    <DialogContentText
                      className="dialog-delete-text-content"
                      id="alert-dialog-description"
                    >
                      Warning: Deleting this data is irreversible. Are you sure
                      you want to proceed?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions className="dialog-delete-actions">
                    <Button
                      onClick={() => setOpenDeleteDialog(false)}
                      variant="outlined"
                      className="button-text"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDelete}
                      className="delete-button button-text"
                      disabled={loadingDelete}
                    >
                      {loadingDelete ? (
                        <>
                          <CircularProgress size={14} color="inherit" />
                          <Typography marginLeft={1}>Deleting...</Typography>
                        </>
                      ) : (
                        "Delete Data"
                      )}
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Grid
      container
      item
      xs={12}
      alignContent="center"
      alignItems="center"
      display="flex"
      justifyContent="center"
      textAlign="center"
    >
      <Grid item xs={12} pb={3.75}>
        <img src={blanktable} alt="blank-table" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="noDataTable">
          Sorry, the data you are looking for could not be found.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default StatusEmployeeTab;
