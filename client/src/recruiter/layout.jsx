import React from "react";
import TopNav from "../root-components/TopNav";
import LeftNav from "./components/LeftNav";
import { Outlet } from "react-router-dom";
import "../../src/index.css";

const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div className="h-16 max-h-16 shadow-md bg-white dark:bg-slate-800">
        <TopNav />
      </div>
      <div className="flex md:flex-row flex-col-reverse custom-layout-height overflow-hidden">
        <div className="md:w-20 lg:w-28 shadow-md bg-white dark:bg-slate-800">
          <LeftNav />
        </div>
        <div className="flex-1 p-8 md:p-4 lg:p-8 overflow-y-scroll bg-slate-50 dark:bg-slate-700">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
