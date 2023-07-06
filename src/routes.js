import React, { lazy } from "react";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import EmojiPeople from "@mui/icons-material/EmojiPeople";
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';

const LoginScreen = lazy(() => import("./Layouts/Login"));
const Dashboard = lazy(() => import("./Layouts/Dashboard"));
const DetailEmployee = lazy(() => import("./Layouts/DetailEmployee"));
const Employee = lazy(() => import("./Layouts/masterEmployee"));
const CreateNewBacklog = lazy(() => import("./Layouts/Backlog/CreateNewBacklog"));
const DetailBacklog = lazy(() => import("./Layouts/Backlog/detailBacklog"));
const MasterRoleUser = lazy(() => import("./Layouts/MasterUserRole"));
const DetailUserRole = lazy(() => import("./Layouts/MasterUserRole/DetailUserRole"));
const CreateUserRole = lazy(() => import("./Layouts/MasterUserRole/CreatenewUserRole"));
const WorkingReport = lazy(() => import("./Layouts/WorkingReport"));
const Backlog = lazy(() => import("./Layouts/Backlog/index"));
const Project = lazy(() => import("./Layouts/Project"));

const CreateMasterEmployee = lazy(() =>
  import("./Layouts/masterEmployee/Tabnya")
);
const RolePrivilege = lazy(() => import("./Layouts/RolePrivilege/index"))
const CreateRolePrivilege = lazy(() => import("./Layouts/RolePrivilege/createRolePrivilege/index"))
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
    path:"/masterbacklog/detail",
    element: <DetailBacklog />,
  },
  {
    path:"/masterbacklog/create",
    element: <CreateNewBacklog />,
  },
  {
    path:"/masteruserrole/detail",
    element: <DetailUserRole />,
  },
  {
    path:"/masteruserrole/create",
    element: <CreateUserRole />,
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
    path: "/masteruserrole",
    element: <MasterRoleUser />,
    name: "Master User Role",
    icon: <EmojiPeople />,
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
    path: "masterroleprivilege/create",
    element: <CreateRolePrivilege />
  },
  {
    path: "masterroleprivilege/detail",
    element: <DetailPrivilege />
  },
];
