import React from 'react'
import TabsMenu from '../../Component/menu/tabs'
import Index from '../../Component/Header';
import BreadCumbComp from '../../Component/BreadCumb';
import SideBar from "../../Component/Sidebar";

function Tabnya() {
    return (
        <>
            <SideBar>
                <BreadCumbComp />
                <Index judul="Create" />
                <TabsMenu />
            </SideBar>
        </>
    )
}

export default Tabnya