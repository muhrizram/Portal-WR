import React from 'react';
import SideBar from '../../Component/Sidebar';
import Jobgroup from '../JobGroup';
const Dashboard = () => {
  return (
    <div>
      <SideBar>
        {/* <div> */}
        <Jobgroup />
        {/* </div> */}
      </SideBar>
    </div>
  )
}

export default Dashboard

