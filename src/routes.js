import React, { lazy } from "react";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";

const LoginScreen = lazy(() => import("./Layouts/Login"));
const Dashboard = lazy(() => import("./Layouts/Dashboard"));
const DetailEmployee = lazy(() => import("./Layouts/DetailEmployee"));
const JobGroup = lazy(() => import("./Layouts/JobGroup"));
const Employee = lazy(() => import("./Layouts/masterEmployee"));
const CreateNewBacklog = lazy(() => import("./Layouts/CreateNewBacklog"));
const DetailBacklog = lazy(() => import("./Layouts/detailBacklog"));

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
    path: "/jobGroup",
    name: "Job Group",
    element: <JobGroup />,
    icon: <GroupAddOutlinedIcon />,
  },
  {
    path: "/masteremployee",
    element: <Employee />,
    name: "Employee",
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
];
