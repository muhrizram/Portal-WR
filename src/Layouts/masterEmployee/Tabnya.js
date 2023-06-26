import React from "react";
import TabsMenu from "../../Component/menu/tabs";
import Index from "../../Component/Header";
import Breadcrumbs from "../../Component/BreadCumb";
import SideBar from "../../Component/Sidebar";

function Tabnya() {
  const dataBread = [
    {
      href: "/dashboard",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/masteremployee",
      title: "Master Employee",
      current: false,
    },
    {
      href: "/",
      title: "Create Employee",
      current: true,
    },
  ];
  return (
    <>
      <SideBar>
        <Breadcrumbs breadcrumbs={dataBread} />
        <Index judul="Create" />
        <TabsMenu />
      </SideBar>
    </>
  );
}

export default Tabnya;
