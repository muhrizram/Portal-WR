import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import client from "../../../global/client";
import blanktable from "../../../assets/blanktable.png";

const StatusEmployeeTab = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState("");

  const getData = async (id) => {
    setLoading(true);
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/users/contractHistory?id=${105}`,
    });
    if (!res.isError) {
      setData(res.data);
    } else {
      setNoDataMessage(res.error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData(id);
  }, []);

  const handleDelete = (id) => {
    // console.log("ID", id);
  };

  const intlDate = Intl.DateTimeFormat("id", {day:'2-digit', month:'2-digit', year:'numeric'});

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
                <Link href="">preview pdf</Link>
              </TableCell>
              <TableCell
                sx={{ color: "text.secondary", fontSize: "14px" }}
                align="left"
              >
                <IconButton
                  onClick={() => {
                    handleDelete(row.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
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
        <Typography variant="noDataTable">{noDataMessage}</Typography>
      </Grid>
    </Grid>
  );
};

export default StatusEmployeeTab;
