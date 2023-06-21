import React, { lazy } from "react";

const LoginScreen = lazy(() => import("./Layouts/Login"));
const Dashboard = lazy(() => import("./Layouts/Dashboard"));
const DetailEmployee = lazy(() => import("./Layouts/DetailEmployee"));

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
];
