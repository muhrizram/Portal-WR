import React from "react";
import SideBar from "../../Component/Sidebar";
import DetailEmployee from "../DetailEmployee";
const Dashboard = () => {
  return (
    <div>
      <SideBar>
        {/* <div> */}
        {/* <Jobgroup /> */}
        <DetailEmployee />
        {/* </div> */}
      </SideBar>
    </div>
  );
};

export default Dashboard;
