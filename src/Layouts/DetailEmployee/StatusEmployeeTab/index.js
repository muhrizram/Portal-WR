import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

const StatusEmployeeTab = () => {
  function createData(
    contractstatus,
    contractstart,
    contractend,
    contractfile,
    action
  ) {
    return { contractstatus, contractstart, contractend, contractfile, action };
  }
  const rows = [
    createData("On Job Training", "01/01/2019", "01/01/2020", "preview.pdf"),
    createData("Bootcamp", "01/01/2019", "01/01/2019", "preview.pdf"),
  ];

  return (
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
          {rows.map((row) => (
            <TableRow key={row.contractstatus}>
              <TableCell
                sx={{ color: "text.secondary", fontSize: "14px" }}
                scope="row"
              >
                {row.contractstatus}
              </TableCell>
              <TableCell
                sx={{ color: "text.secondary", fontSize: "14px" }}
                align="left"
              >
                {row.contractstart}
              </TableCell>
              <TableCell
                sx={{ color: "text.secondary", fontSize: "14px" }}
                align="left"
              >
                {row.contractend}
              </TableCell>
              <TableCell
                sx={{ color: "text.secondary", fontSize: "14px" }}
                align="left"
              >
                <Link href="">{row.contractfile}</Link>
              </TableCell>
              <TableCell
                sx={{ color: "text.secondary", fontSize: "14px" }}
                align="left"
              ></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatusEmployeeTab;
