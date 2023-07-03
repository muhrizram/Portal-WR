import React from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
const Index = (props) => {
  const { judul } = props;
  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Grid container className="containerHeader">
          <div className="dividerHeader" />
          <Grid item xs={11.9}>
            <Typography variant="headerCardMenu">{`${judul}`}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>


    // <div>
    //   <Typography variant="headerCardMenu">{judul}</Typography>
    // </div>
  );
};

export default Index;
