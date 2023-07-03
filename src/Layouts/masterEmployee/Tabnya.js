import React from "react";
import TabsMenu from "../../Component/menu/tabs";
import Index from "../../Component/Header";
import Breadcrumbs from "../../Component/BreadCumb";
import SideBar from "../../Component/Sidebar";
import { Grid, Button } from "@mui/material";

function Tabnya({
  onCancel
}) {
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

  // const onSave = async () => {
  //   const data = {};

  //   //atribut
  //   data.ssoId = '';
  //   data.nip = '';
  //   data.placementType = '';
  //   data.group = '';
  //   try {
  //     const response = await fetch('http://localhost:4000/create', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log('Data created successfully');
  //     } else {
  //       console.error('Failed to create data');
  //     }
  //   } catch (error) {
  //     console.error('Error creating data:', error);
  //   }
  // };

  return (
    <>
      <SideBar>
        <Breadcrumbs breadcrumbs={dataBread} />
        <Index judul="Create" />
        <TabsMenu />

        {/* <Grid item md={11.5} alignSelf="center" textAlign="right">
          <Button variant="outlined" color="warning" style={{ marginRight: 3 }} onClick={() => onCancel()}>
            Cancel Data
          </Button>
          <Button variant="contained" onClick={() => onSave()}>
            Save Data
          </Button>
        </Grid> */}
      </SideBar>
    </>
  );
}

export default Tabnya;
