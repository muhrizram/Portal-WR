import React from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const BiodataDetailsTab = () => {
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
  ];
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs container direction="column" spacing={2}>
          <Grid container direction="row" style={{ padding: "30px" }}>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Place of Birth
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>Bandung</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Date of Birth
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>05/09/1998</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ padding: "30px" }}>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                National ID Number
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>311245591924</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Phone Number
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>+628123658132</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ padding: "30px" }}>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>Address</Typography>
              <Typography sx={{ fontSize: "20px" }}>
                Jl.Cihampelas No 37 A
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Postal Code
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>445821</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ padding: "30px" }}>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Family Contact
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>Mother</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Contact Name
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>Rodiah</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ padding: "30px" }}>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Contact Number
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>+628412356347</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                School of Origin
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>Bandung</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BiodataDetailsTab;
