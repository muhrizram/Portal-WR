import React from "react";
import { Hidden, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
const Index = (props) => {
  const { judul } = props;
  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Grid container className="containerHeader">
          <Grid item>
            <div className="dividerHeader" />
          </Grid>
          <Grid item xs={11}>
          <Hidden mdDown>
            <Typography variant="headerCardMenu" padding={2}>
              {`${judul}`}
            </Typography>
          </Hidden>

          <Hidden mdUp>
            <Typography variant="body2" padding={1} marginTop={1.5}>
              {`${judul}`}
            </Typography>
          </Hidden>
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
