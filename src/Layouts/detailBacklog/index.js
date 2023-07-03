import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Breadcrumbs from "../../Component/BreadCumb";
import Header from "../../Component/Header";
import SideBar from "../../Component/Sidebar";


const DetailBacklog = () => {
    const [isEdit, setIsEdit] = React.useState(false);

    const clickEdit = () => {
        setIsEdit(true);
    };

    return (
        <>
            <SideBar>
                <Grid container rowSpacing={2.5}>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={9.9}>
                                <Header judul="Detail Backlog" />
                            </Grid>

                            <Grid item />

                            <Grid item xs={2} alignSelf="center" textAlign="right">
                                <Button
                                    variant="outlined"
                                    startIcon={<CreateIcon />}
                                    style={{ marginRight: "10px" }}
                                    onClick={clickEdit}
                                >
                                    Edit Data Backlog
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container className="HeaderDetail">
                            <>
                                <Grid container spacing={2}>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid
                                            container
                                            direction="row"
                                            style={{ padding: "20px" }}
                                        >
                                            <Grid item xs={12}>
                                                <Typography
                                                    variant="backlogDetail"
                                                >Electronic Health Record
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" style={{ padding: "20px" }}>
                                            <Grid item xs={5}>
                                                <Typography variant="backlogDetail">Create Mockup Screen Dashboard</Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography variant="backlogDetail">::</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="backlogDetail">Task 1 / T-WR-0011</Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" style={{ padding: "30px" }}>
                                            <Grid item xs={4}>
                                                <Typography
                                                    sx={{ color: "text.secondary", fontSize: "12px" }}
                                                >
                                                    Task Description
                                                </Typography>
                                                <Typography variant="employeeDetail">
                                                    Create Mockup Screen Dashboard - UI/UX
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography
                                                    sx={{ color: "text.secondary", fontSize: "12px" }}
                                                >
                                                    Backlog Status
                                                </Typography>
                                                <Typography variant="employeeDetail">
                                                    Todo
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography
                                                    sx={{ color: "text.secondary", fontSize: "12px" }}
                                                >
                                                    Priority
                                                </Typography>
                                                <Typography variant="employeeDetail">
                                                   abc
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" style={{ padding: "30px" }}>
                                            <Grid item xs={4}>
                                                <Typography
                                                    sx={{ color: "text.secondary", fontSize: "12px" }}
                                                >
                                                    Assigned To
                                                </Typography>
                                                <Typography variant="employeeDetail">
                                                    Abdan Hafidzul
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography
                                                    sx={{ color: "text.secondary", fontSize: "12px" }}
                                                >
                                                    Estimation Duration
                                                </Typography>
                                                <Typography variant="employeeDetail">
                                                    3 Hours
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography
                                                    sx={{ color: "text.secondary", fontSize: "12px" }}
                                                >
                                                    Actual Duration
                                                </Typography>
                                                <Typography variant="employeeDetail">
                                                   3 Hours
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        </Grid>
                    </Grid>
                </Grid>
            </SideBar>
        </>
    );
};

export default DetailBacklog;
