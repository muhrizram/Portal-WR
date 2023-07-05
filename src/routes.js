import React, { lazy } from "react";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const LoginScreen = lazy(() => import("./Layouts/Login"));
const Dashboard = lazy(() => import("./Layouts/Dashboard"));
const DetailEmployee = lazy(() => import("./Layouts/DetailEmployee"));
const Employee = lazy(() => import("./Layouts/masterEmployee"));
const DetailBacklog = lazy(() => import("./Layouts/detailBacklog/index"));
const WorkingReport = lazy(() => import("./Layouts/WorkingReport"));
const Backlog = lazy(() => import("./Layouts/Backlog/index"));
const Project = lazy(() => import("./Layouts/Project"));

const CreateMasterEmployee = lazy(() =>
  import("./Layouts/masterEmployee/Tabnya")
);

export const routes = [
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/",
    element: <DetailBacklog />,
  },
  {
    path: "/masteremployee",
    element: <Employee />,
    name: "Employee",
    icon: <PersonPinOutlinedIcon />,
  },
  {
    path: "/masterProject",
    element: <Project />,
    name: "Project",
    icon: <PersonPinOutlinedIcon />,
  },
  {
    path: "/workingReport",
    element: <WorkingReport />,
    name: "Working Report",
    icon: <PersonPinOutlinedIcon />,
  },
  {
    path: "/masteremployee/detail",
    element: <DetailEmployee />,
  },
  {
    path: "/masteremployee/create",
    element: <CreateMasterEmployee />,
  },
  {
    path: "/masterbacklog",
    element: <Backlog />,
    name: "Backlog",
    icon: <BookmarkBorderIcon />,
  },
];
