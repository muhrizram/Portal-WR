import React, { lazy } from "react";

const LoginScreen = lazy(() => import("./Layouts/Login"));
const Dashboard = lazy(() => import("./Layouts/Dashboard"));
const DetailEmployee = lazy(() => import("./Layouts/DetailEmployee"));
const EditEmployee = lazy(() => import("./Layouts/EditEmployee"));

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
    path: "/edit-employee",
    element: <EditEmployee />,
  },
];
