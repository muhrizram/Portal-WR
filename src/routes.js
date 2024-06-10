import React, { lazy, useEffect } from "react";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import EmojiPeople from "@mui/icons-material/EmojiPeople";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import FestivalOutlinedIcon from "@mui/icons-material/FestivalOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DetailProject from "./Layouts/Project/Detail";
import CreateProject from "./Layouts/Project/Create";
import { useNavigate, Navigate } from "react-router-dom";

const LoginScreen = lazy(() => import("./Layouts/Login"));
const Dashboard = lazy(() => import("./Layouts/Dashboard"));
const DetailEmployee = lazy(() => import("./Layouts/DetailEmployee"));
const Employee = lazy(() => import("./Layouts/masterEmployee"));
const CreateNewBacklog = lazy(() =>
  import("./Layouts/Backlog/CreateNewBacklog")
);
const DetailBacklog = lazy(() => import("./Layouts/Backlog/detailBacklog"));
const MasterRoleUser = lazy(() => import("./Layouts/MasterUserRole"));
const DetailUserRole = lazy(() =>
  import("./Layouts/MasterUserRole/DetailUserRole")
);
const CreateUserRole = lazy(() =>
  import("./Layouts/MasterUserRole/CreatenewUserRole")
);
const WorkingReport = lazy(() => import("./Layouts/WorkingReport"));
const Backlog = lazy(() => import("./Layouts/Backlog/index"));
const Project = lazy(() => import("./Layouts/Project"));
const Company = lazy(() => import("./Layouts/Company"));
const CreateCompany = lazy(() => import("./Layouts/Company/Create"));
const DetailCompany = lazy(() => import("./Layouts/Company/Detail"));
const CreateMasterEmployee = lazy(() =>
  import("./Layouts/masterEmployee/Tabnya")
);
const RolePrivilege = lazy(() => import("./Layouts/RolePrivilege/index"));
const CreateRolePrivilege = lazy(() =>
  import("./Layouts/RolePrivilege/createRolePrivilege/index")
);
const DetailPrivilege = lazy(() =>
  import("./Layouts/RolePrivilege/detailRolePrivilege/index")
);

const ViewOvertime = lazy(() =>
  import("./Layouts/Overtime/detailEditOvertime/index")
);

const Holiday = lazy(() => import("./Layouts/Holiday"));

const closedRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    key: "dashboard",
    name: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: "/workingReport",
    element: <WorkingReport />,
    name: "Working Report",
    key: "working report",
    icon: <SummarizeOutlinedIcon />,
  },
  {
    path: "/overtime/detail-overtime",
    element: <ViewOvertime />,
    key: "working report",
  },
  {
    path: "/masteremployee",
    element: <Employee />,
    name: "Employee",
    key: "master employee",
    icon: <PersonPinOutlinedIcon />,
  },
  {
    path: "/masteremployee/detail",
    element: <DetailEmployee />,
    key: "master employee",
  },
  {
    path: "/masteremployee/create",
    element: <CreateMasterEmployee />,
    key: "master employee",
  },
  {
    path: "/master-company",
    element: <Company />,
    name: "Company",
    key: "master company",
    icon: <BusinessOutlinedIcon />,
  },
  {
    path: "/master-company/create",
    element: <CreateCompany />,
    key: "master company",
  },
  {
    path: "/master-company/detail",
    element: <DetailCompany />,
    key: "master company",
  },
  {
    path: "/masterProject",
    element: <Project />,
    name: "Project",
    key: "master project",
    icon: <AccountTreeOutlinedIcon />,
  },
  {
    path: "/master-project/detail",
    element: <DetailProject />,
    name: "Project",
    key: "master project",
  },
  {
    path: "/master-project/create",
    element: <CreateProject />,
    name: "Project",
    key: "master project",
  },
  {
    path: "/masterbacklog",
    element: <Backlog />,
    name: "Backlog",
    key: "master backlog",
    icon: <BookmarkBorderIcon />,
  },
  {
    path: "/masterbacklog/detail",
    element: <DetailBacklog />,
    key: "master backlog",
  },
  {
    path: "/masterbacklog/create",
    element: <CreateNewBacklog />,
    key: "master backlog",
  },
  {
    path: "masterbacklog/create",
    element: <CreateNewBacklog />,
    key: "master backlog",
  },
  {
    path: "masterbacklog/detail",
    element: <DetailBacklog />,
    key: "master backlog",
  },
  {
    path: "/masteruserrole",
    element: <MasterRoleUser />,
    name: "User Role",
    key: "master user role",
    icon: <EmojiPeople />,
  },
  {
    path: "/masteruserrole/create",
    element: <CreateUserRole />,
    key: "master user role",
  },
  {
    path: "/masteruserrole/detail",
    element: <DetailUserRole />,
    key: "master backlog",
  },
  {
    path: "/masterroleprivilege",
    element: <RolePrivilege />,
    name: "Role Privilege",
    key: "master role privilege",
    icon: <SettingsAccessibilityIcon />,
  },
  {
    path: "masterroleprivilege/create",
    element: <CreateRolePrivilege />,
    key: "master role privilege",
  },
  {
    path: "masterroleprivilege/detail",
    element: <DetailPrivilege />,
    key: "master role privilege",
  },
  {
    path: "/master-holiday",
    element: <Holiday />,
    name: "Holiday",
    key: "master holiday",
    icon: <FestivalOutlinedIcon />,
  },
  {
    path: "*",
    element: <Navigate to="/workingReport" />,
    key: "not found",
  },
];

// default all routes
// export const finalRoutes = temp

// final routes with controll
export const finalRoutes = () => {
  const navigate = useNavigate();

  const openRoutes = [{ path: "/login", element: <LoginScreen /> }];
  const userId = localStorage.getItem("userId") || null;
  const token = localStorage.getItem("token");
  // Comment if route user already exist
  // const tempRoute = ['master-holiday', 'master-company']
  useEffect(() => {
    if (!!token) {
      if (window.location.pathname === "/login") {
        navigate("/workingReport");
      }
    } else {
      if (window.location.pathname !== "/login") {
        navigate("/login");
      }
    }
  }, [token, navigate]);

  // localStorage.setItem('privilage', JSON.stringify(tempRoute))
  const userRoutes = JSON.parse(localStorage.getItem("privilage") || "[]");
  // console.log('app route: ', routes)
  let temp = closedRoutes.filter((res) => {
    let isSame = false;

    isSame = userRoutes.some(
      (privilege) => privilege.privilegeName === res.key
    );
    if (!isSame) {
      return;
    }
    return res;
  });

  temp = [...temp, ...openRoutes];
  temp = userId ? [...temp] : openRoutes;
  temp.push({
    path: "*",
    element: <Navigate to="/workingReport" />,
    key: "catch-all",
  });

  return temp;
};
