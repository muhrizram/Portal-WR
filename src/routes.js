import React, { lazy } from "react";

const LoginScreen = lazy(() => import("./Layouts/Login"));
const Dashboard = lazy(() => import("./Layouts/Dashboard"));
const DetailEmployee = lazy(() => import("./Layouts/DetailEmployee"));
const EditEmployee = lazy(() => import("./Layouts/EditEmployee/index"))
const Employee = lazy(() => import("./Layouts/masterEmployee"));
const CBiodataEmployee = lazy(() => import("./Layouts/masterEmployee/EBiodata"));
const CDetailBiodataEmployee = lazy(() => import("./Layouts/masterEmployee/detailBiodata"));
const CInsuranceDetail = lazy(() => import("./Layouts/masterEmployee/detailInsurance"))
const App = lazy(() => import("./Layouts/masterEmployee/uploadImg"))
const Tabnya = lazy(() => import("./Layouts/masterEmployee/Tabnya"));


export const routes = [
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/detail",
    element: <DetailEmployee />,
  },
  {
    path: "/edit",
    element: <EditEmployee />,
  },
  {
    path: "/masteremployee",
    element: <Employee />,
  },
  {
    path: "/create",
    element: <Tabnya />,
  },
];
