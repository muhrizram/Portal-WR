import React from "react";
import avatar from "../../../assets/_Avatar_.png";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const EmployeeBiodataTab = () => {
  return (
    <>
      <Grid>
        <Typography>Profile Picture</Typography>
        <Grid container direction="row">
          <img src={avatar} style={{ marginTop: "20px" }} />

          <Grid
            item
            sx={{
              margin: "39px 0px 0px 25px",
              color: "text.secondary",
            }}
          >
            <Typography sx={{ fontSize: "13px" }}>Images.jpeg</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs container direction="column" spacing={2}>
          <Grid
            container
            direction="row"
            style={{ marginTop: "30px", padding: "30px" }}
          >
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}> NIP </Typography>
              <Typography sx={{ fontSize: "20px" }}>1010101010</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Generation
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>Gen13</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ padding: "30px" }}>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Employee First Name
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>Jhon</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Employee Last Name
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>Doe</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ padding: "30px" }}>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>NPWP</Typography>
              <Typography sx={{ fontSize: "20px" }}>
                08.178.554.2-123.321
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>Email</Typography>
              <Typography sx={{ fontSize: "20px" }}>
                johndoe@mail.com
              </Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ padding: "30px" }}>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Start Join Date
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>01/01/2019</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Placement Type
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>Bandung</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ padding: "30px" }}>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Contract Start Date
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>01/02/2019</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Contract End Date
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>01/01/2020</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ padding: "30px" }}>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Contract Status
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>Fulltime</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Onsite Status
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>Project</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ padding: "30px" }}>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>
                Onsite Status
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>Divison Group</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.secondary" }}>Position</Typography>
              <Typography sx={{ fontSize: "20px" }}>
                Software Developer
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EmployeeBiodataTab;
