import React,{ useState } from "react";
import TopNav from "../root-components/TopNav";
import LeftNav from "./components/LeftNav";
import { Outlet } from "react-router-dom";
import { FaBug } from "react-icons/fa";
import BugReportForm from "./components/BugReportForm";
import "../../src/index.css";

const AppLayout = () => {
  const [showBugForm, setShowBugForm] = useState(false);

  return (
    <div className="flex flex-col h-dvh md:h-screen max-h-screen">
      <div className="max-h-16 bg-white dark:bg-zinc-900">
        <TopNav />
      </div>
      <div className="flex md:flex-row flex-col-reverse h-full overflow-hidden">
        <div className="md:w-20 lg:w-28 shadow-md bg-white dark:bg-zinc-900">
          <LeftNav />
        </div>
        <div className="flex-1 p-8 md:p-4 lg:p-8 overflow-y-scroll bg-slate-50 dark:bg-black">
          <Outlet />
        </div>
      </div>
      <button
        className="fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-700 text-red-600 border border-gray-300 rounded-full p-3 shadow-md hover:bg-red-100 dark:hover:bg-slate-600 transition-colors"
        onClick={() => setShowBugForm(true)}
        title="Report a Bug"
      >
        <FaBug size={20} />
      </button>

      {/* Bug Form Modal */}
      <BugReportForm isOpen={showBugForm} onClose={() => setShowBugForm(false)} />
    </div>
  );
};

export default AppLayout;
