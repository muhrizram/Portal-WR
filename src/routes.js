import React, { lazy } from "react";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';

const LoginScreen = lazy(() => import("./Layouts/Login"));
const Dashboard = lazy(() => import("./Layouts/Dashboard"));
const DetailEmployee = lazy(() => import("./Layouts/DetailEmployee"));
const JobGroup = lazy(() => import("./Layouts/JobGroup"))

const Employee = lazy(() => import("./Layouts/masterEmployee"));
// const CBiodataEmployee = lazy(() =>
//   import("./Layouts/masterEmployee/EBiodata")
// );
// const CDetailBiodataEmployee = lazy(() =>
//   import("./Layouts/masterEmployee/detailBiodata")
// );
// const CInsuranceDetail = lazy(() =>
//   import("./Layouts/masterEmployee/detailInsurance")
// );
// const App = lazy(() => import("./Layouts/masterEmployee/uploadImg"));
const CreateMasterEmployee = lazy(() => import("./Layouts/masterEmployee/Tabnya"));

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
    path: '/jobGroup',
    name: 'Job Group',
    element: <JobGroup />,
    icon: <GroupAddOutlinedIcon />
  },
  {
    path: "/masteremployee",
    element: <Employee />,
    name: 'Employee',
    icon: <PersonPinOutlinedIcon />
  },
  {
    path: '/masteremployee/detail',
    element: <DetailEmployee />,
  },
  {
    path: "/masteremployee/create",
    element: <CreateMasterEmployee />,
  },
];
