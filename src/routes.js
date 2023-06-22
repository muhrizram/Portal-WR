import React, { lazy } from "react";

const LoginScreen = lazy(() => import("./Layouts/Login"));
const Dashboard = lazy(() => import("./Layouts/Dashboard"));
const DetailEmployee = lazy(() => import("./Layouts/DetailEmployee"));
const Employee = lazy(() => import("./Layouts/masterEmployee"));
const CBiodataEmployee = lazy(() => import("./Layouts/masterEmployee/EBiodata"));
const CDetailBiodataEmployee = lazy(() => import("./Layouts/masterEmployee/detailBiodata"));
const CInsuranceDetail = lazy(() => import("./Layouts/masterEmployee/detailInsurance"))


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
    path: "/masteremployee",
    element: <Employee />,
  },
  {
    path: "/masteremployee/create/employebiodata",
    element: <CBiodataEmployee />,
  },
  {
    path: "/masteremployee/create/detailbiodata",
    element: <CDetailBiodataEmployee />,
  },
  {
    path: "/masteremployee/create/detailinsurance",
    element: <CInsuranceDetail />,
  },
];
