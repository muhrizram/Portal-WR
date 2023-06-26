import React, { useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function BreadCumbComp({ breadcrumbs }) {
  const currentIndex = breadcrumbs.findIndex(
    (breadcrumb) => breadcrumb.current
  );
  const filteredBreadcrumbs =
    currentIndex !== -1 ? breadcrumbs.slice(0, currentIndex + 1) : breadcrumbs;

  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        style={{ marginBottom: "20px" }}
      >
        {filteredBreadcrumbs.map((res, index) => (
          <Link
            underline="hover"
            key={index + 1}
            color="inherit"
            href={res.href}
            style={{ fontSize: "120%", color: res.current && "#2196F3" }}
          >
            {res.title}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}

export default BreadCumbComp;
