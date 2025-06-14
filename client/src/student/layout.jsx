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
