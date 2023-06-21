import React from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
const index = (props) => {
  const { judul } = props;
  return (
    <div>
      <Typography variant="headerCardMenu">{judul}</Typography>
    </div>
  );
};

export default index;
