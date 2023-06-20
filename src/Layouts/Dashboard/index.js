import React from 'react';
import SideBar from '../../Component/Sidebar';
import Jobgroup from '../JobGroup';
import WorkingReport from '../WorkingReport';
const Dashboard = () => {
  return (
    <div>
      <SideBar>
        {/* <div> */}
          {/* <Jobgroup /> */}
          <WorkingReport />
        {/* </div> */}
      </SideBar>
    </div>
  )
}

export default Dashboard