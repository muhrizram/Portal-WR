import React, { lazy } from "react";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

const LoginScreen = lazy(() => import("./Layouts/Login"));
const Dashboard = lazy(() => import("./Layouts/Dashboard"));
const DetailEmployee = lazy(() => import("./Layouts/DetailEmployee"));
const MasterCompany = lazy(() => import("./Layouts/Company"));
const CreateCompany = lazy(() => import("./Layouts/Company/Create"));
const Employee = lazy(() => import("./Layouts/masterEmployee"));
const WorkingReport = lazy(() => import("./Layouts/WorkingReport"));

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
    path: "/master-company",
    name: "Company",
    element: <MasterCompany />,
    icon: <BusinessOutlinedIcon />,
  },
  {
    path: "/master-company/create",
    element: <CreateCompany />,
  },
];
