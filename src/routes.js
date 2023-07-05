import React, { lazy } from "react";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';

const LoginScreen = lazy(() => import("./Layouts/Login"));
const Dashboard = lazy(() => import("./Layouts/Dashboard"));
const DetailEmployee = lazy(() => import("./Layouts/DetailEmployee"));
// const JobGroup = lazy(() => import("./Layouts/JobGroup"));
const Employee = lazy(() => import("./Layouts/masterEmployee"));
const WorkingReport = lazy(() => import("./Layouts/WorkingReport"));
const Backlog = lazy(() => import("./Layouts/Backlog/index"));
const DetailBacklog = lazy(() => import("./Layouts/Backlog/detailBacklog/index"));
const CreateNewBacklog = lazy(() => import("./Layouts/Backlog/CreateNewBacklog/index"))
const CreateMasterEmployee = lazy(() =>
  import("./Layouts/masterEmployee/Tabnya")
);
const RolePrivilege = lazy(() => import("./Layouts/RolePrivilege/index"))
const DetailPrivilege = lazy(() => import("./Layouts/RolePrivilege/detailRolePrivilege/index"))

export const routes = [
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/masteremployee",
    element: <Employee />,
    name: "Employee",
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
  {
    path: "masterbacklog/create",
    element: <CreateNewBacklog />
  },
  {
    path: "masterbacklog/detail",
    element: <DetailBacklog />
  },
  {
    path: "/masterroleprivilege",
    element: <RolePrivilege />,
    name: "Role Privilege",
    icon: <SettingsAccessibilityIcon />,
  },
  {
    path: "masterroleprivilege/detail",
    element: <DetailPrivilege />
  },
];
