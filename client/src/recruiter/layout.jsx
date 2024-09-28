import React from "react";
import TopNav from "./components/TopNav";
import LeftNav from "./components/LeftNav";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <div className="flex flex-grow gap-1">
        <LeftNav />
        <div className="flex-1 pl-4 pr-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
