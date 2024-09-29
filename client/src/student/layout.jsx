import React from "react";
import TopNav from "../root-components/TopNav";
import LeftNav from "./components/LeftNav";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div className="h-16 max-h-16">
        <TopNav />
      </div>
      <div className="flex h-[100vh-4rem] min-h-[100vh-4rem] overflow-hidden">
        <LeftNav />
        <div className="flex-1 pl-4 pr-4 h-full w-full overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
