import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Typography, Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
function BreadCumbComp() {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      style={{ fontSize: "120%" }}
    >
      Dashboard
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      style={{ fontSize: "120%" }}
    >
      Master Employee
    </Link>,
    <Typography key="3" color="#2196F3" style={{ fontSize: "120%" }}>
      DetailEmployee
    </Typography>,
  ];
  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        style={{ marginBottom: "20px" }}
      >
        {" "}
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
}

export default BreadCumbComp;
