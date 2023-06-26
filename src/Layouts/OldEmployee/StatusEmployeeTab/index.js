import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StatusEmployeeTab = () => {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
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
            <TableCell sx={{ color: "#004881", fontSize: "20px" }}>
              Contract Status
            </TableCell>
            <TableCell align="left" sx={{ color: "#004881", fontSize: "20px" }}>
              Contract Start Date
            </TableCell>
            <TableCell align="left" sx={{ color: "#004881", fontSize: "20px" }}>
              Contract End Date
            </TableCell>
            <TableCell align="left" sx={{ color: "#004881", fontSize: "20px" }}>
              Contract File
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell
                sx={{ color: "text.secondary", fontSize: "20px" }}
                scope="row"
              >
                {row.name}
              </TableCell>
              <TableCell
                sx={{ color: "text.secondary", fontSize: "20px" }}
                align="left"
              >
                {row.calories}
              </TableCell>
              <TableCell
                sx={{ color: "text.secondary", fontSize: "20px" }}
                align="left"
              >
                {row.fat}
              </TableCell>
              <TableCell
                sx={{ color: "text.secondary", fontSize: "20px" }}
                align="left"
              >
                {row.carbs}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatusEmployeeTab;
