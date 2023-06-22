import React from "react";
import { Typography } from "@mui/material";
const index = (props) => {
  const { judul } = props;
  return (
    <div>
      <Typography variant="headerCardMenu">{judul}</Typography>
    </div>
  );
};

export default index;
