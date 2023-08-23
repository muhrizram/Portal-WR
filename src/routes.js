import React, { lazy } from "react";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import EmojiPeople from "@mui/icons-material/EmojiPeople";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import DetailProject from "./Layouts/Project/Detail";
import CreateProject from "./Layouts/Project/Create";

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

const routes = [
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/masterbacklog/detail",
    element: <DetailBacklog />,
  },
  {
    path: "/masterbacklog/create",
    element: <CreateNewBacklog />,
  },
  {
    path: "/masteruserrole/detail",
    element: <DetailUserRole />,
  },
  {
    path: "/masteruserrole/create",
    element: <CreateUserRole />,
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
    icon: <WorkOutlineIcon />,
  },
  {
    path: "/masterProject",
    element: <Project />,
    name: "Project",
    icon: <AccountTreeIcon />,
  },
  {
    path: "/master-project/detail",
    element: <DetailProject />,
    name: "Project",
  },
  {
    path: "/master-project/create",
    element: <CreateProject />,
    name: "Project",
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
    element: <CreateNewBacklog />,
  },
  {
    path: "masterbacklog/detail",
    element: <DetailBacklog />,
  },
  {
    path: "/masterroleprivilege",
    element: <RolePrivilege />,
    name: "Role Privilege",
    icon: <SettingsAccessibilityIcon />,
  },
  {
    path: "masterroleprivilege/create",
    element: <CreateRolePrivilege />,
  },
  {
    path: "masterroleprivilege/detail",
    element: <DetailPrivilege />,
  },
  {
    path: "/master-company",
    element: <Company />,
    key: 'master-company',
    name: "Company",
    icon: <BusinessOutlinedIcon />,
  },
  {
    path: "/master-company/create",
    element: <CreateCompany />,
  },
  {
    path: "/master-company/detail",
    element: <DetailCompany />,
  },
  {
    path: "/overtime/detail-overtime",
    element: <ViewOvertime />,
  },
  {
    path: "/master-holiday",
    key: 'master-holiday',
    element: <Holiday />,
    name: "Holiday",
    icon: <AccountBalanceOutlinedIcon />,
  },
];

// Comment if route user already exist
const tempRoute = ['master-holiday', 'master-company']

localStorage.setItem('privilage', JSON.stringify(tempRoute))
const userRoutes = JSON.parse(localStorage.getItem('privilage'))
// console.log('user route: ', userRoutes)
// console.log('app route: ', routes)
const temp = routes.filter((res) => {
  let isSame = false
  isSame = userRoutes.includes(res.key)
  if (!isSame) {
    return
  }
  return res
})

console.log('final route: ', temp)

// final routes with controll
// export const finalRoutes = temp

// default all routes
export const finalRoutes = routes