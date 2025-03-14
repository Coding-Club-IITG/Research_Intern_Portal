import React from "react";
import TopNav from "../root-components/TopNav";
import LeftNav from "./components/LeftNav";
import { Outlet } from "react-router-dom";
import "../../src/index.css";

const AppLayout = () => {
  return (
    <div className="flex flex-col h-dvh md:h-screen max-h-screen bg-white dark:bg-slate-800">
      <div className="max-h-16">
        <TopNav />
      </div>
      <div className="flex-col-reverse flex md:flex-row h-full overflow-hidden">
        <LeftNav />
        <div className="flex-1 px-8 max-sm:p-4 h-full w-full overflow-y-scroll bg-gray-100 dark:bg-black">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
