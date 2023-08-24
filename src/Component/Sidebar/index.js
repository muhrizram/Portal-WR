import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "./index.css";
import logo from "../../assets/logo.png";
import logoMini from "../../assets/logo-mini.png";
// import { useAuth } from "react-oidc-context";
import { Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { finalRoutes } from "../../routes";
import CustomAlert from "../Alert";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(9)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar({ children }) {
  const navigate = useNavigate();
  // const auth = useAuth();

  // const username = auth.user ? auth.user.profile.name : "";
  const username = ''
  const handleDrawerClose = () => {
    setOpen(!open);
  };
  const currentMenu = JSON.parse(localStorage.getItem("currentMenu") || null);
  const [open, setOpen] = useState(currentMenu ? currentMenu.open : false);
  const [selectedIndex, setSelectedIndex] = React.useState(
    parseInt(currentMenu ? currentMenu.idx : 0)
  );
  const dataRoute = finalRoutes().filter((res) => res.icon);

  const handleLogout = () => {
    // auth.signoutSilent();
    localStorage.clear()
    navigate("/login");
  };

  const handleDirectPath = (path, idx) => {
    const obj = {
      idx,
      open,
    };
    localStorage.setItem("currentMenu", JSON.stringify(obj));
    setSelectedIndex(idx);
    navigate(path);
  };

  return (
    <Box sx={{ display: "-webkit-box" }}>
      <CssBaseline />
      <Drawer className="drawer-container" variant="permanent" open={open}>
        <DrawerHeader className="drawer-header-container">
          <div className="drawer-header">
            <Grid container>
              <Grid item xs={12}>
                <div
                  className={
                    open ? "container-img margin-img" : "container-img"
                  }
                >
                  <img
                    className="drawer-logo"
                    src={open ? logo : logoMini}
                    alt="logo 79"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="container-chevron">
                  <Grid container>
                    <Grid item xs={open ? 4 : 12}>
                      <Avatar
                        variant="square"
                        className={open ? "mini-avatar" : "lg-avatar"}
                        onClick={handleDrawerClose}
                      />
                    </Grid>
                    {open && (
                      <Grid item container xs={8}>
                        <Grid item container xs={8}>
                          <Grid item container xs={12}>
                            <Typography variant="drawerNameUser">
                              {username}
                            </Typography>
                          </Grid>
                          <Grid item container xs={12}>
                            <Typography variant="drawerPostion">
                              UI/UX
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={4} textAlign="end">
                          <IconButton onClick={handleDrawerClose}>
                            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                          </IconButton>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
        </DrawerHeader>
        <List className="list-menu-container">
          {dataRoute.map((res, index) => (
            <ListItem
              key={`idlist-${index + 1}`}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => handleDirectPath(res.path, index)}
                sx={{
                  // minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  className="button-list-icon"
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {res.icon}
                </ListItemIcon>
                <ListItemText
                  primary={res.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List className="list-menu-container-footer">
          <ListItem className="footer-logout-container">
            <ListItemButton
              className="footer-logout-button"
              onClick={() => handleLogout()}
            >
              <ListItemIcon
                className="logout-button"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PowerSettingsNewIcon />
              </ListItemIcon>
              {open && <span className="logout-text">Log Out</span>}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" className='drawer-main-children' sx={{ flexGrow: 1, px: 2.5, py: 5 }}>
        <CustomAlert />
        {children}
      </Box>
    </Box>
  );
}
