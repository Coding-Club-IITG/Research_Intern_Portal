import React from "react";
import { useNavigate } from "react-router-dom";
import { reopenApplications, stopAcceptingJob } from "../../../apis/job";
import { message } from "antd";

function DriveCard({ drive }) {
  const navigate = useNavigate();
  const currentdate = new Date();

  const handleView = () => {
    navigate(`/recruiter/drive/${drive._id}`);
  };

  const handleEdit = () => {
    navigate(`/recruiter/edit-drive/${drive._id}`);
  };

  const handleApplied = () => {
    navigate(`/recruiter/student-list/${drive._id}`);
  };

  const handleStop = async () => {
    await stopAcceptingJob(drive._id, navigate);
    message.success("Applications are closed for this drive");
    window.location.reload();
  };

  const handleReopen = async () => {
    await reopenApplications(drive._id, navigate);
    message.success("Applications are reopened for this drive");
    window.location.reload();
  };

  const handleExtend = async () => {
    navigate(`/recruiter/edit-drive/${drive._id}`);
  };

  return (
    <div className="border rounded-md p-4 flex justify-between items-center mb-4 max-sm:flex-col max-sm:gap-4 w-full bg-white dark:bg-zinc-800 dark:border-gray-600">
      <div className="flex flex-col gap-2">
        <h2 className="max-sm:text-lg text-xl font-bold capitalize dark:text-white">
          {drive?.title}
        </h2>
        <p className="text-gray-800 font-semibold dark:text-gray-300">Stipend: ₹{drive?.stipend}</p>
        <p
          className={`text-sm ${new Date(drive?.last_date) > currentdate ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
          Closing Date: {new Date(drive.last_date).toLocaleDateString()}
        </p>
      </div>

      <div className="flex flex-col space-y-2 max-sm:w-full">
        <div className="flex gap-2">
          <button
            className="relative group dark:hover:bg-blue-600 shadow-md dark:bg-blue-500 dark:border-gray-600 hover:bg-gray-300 px-3 py-2 max-sm:py-1 rounded-md"
            onClick={handleView}>
            <img src="/icons8-view-24 (1).png"/>
            <span className="absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2 rounded-md bg-gray-800 text-white text-xs p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View
            </span>
          </button>

          {new Date(drive?.last_date) > currentdate && drive?.accepting && (
            <button
              className="relative group dark:hover:bg-blue-600 shadow-md dark:bg-blue-500 dark:border-gray-600 hover:bg-gray-300 px-3 py-2 max-sm:py-1 rounded"
              onClick={handleEdit}>
                <img src="/icons8-edit-30.png" className="h-6"/>
                <span className="absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2 rounded-md bg-gray-800 text-white text-xs p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Edit
                </span>
            </button>
          )}
          {new Date(drive?.last_date) > currentdate ? (
            drive?.accepting ? (
              <button
                onClick={handleStop}
                className="relative group dark:bg-gray-600 dark:hover:bg-red-500 dark:border-gray-600 hover:bg-red-500 px-3 py-2 max-sm:py-1 shadow-md rounded-md">
                <img src="/icons8-stop-64.png" className="h-5"/>
                <span className="absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2 rounded-md bg-gray-800 text-white text-xs p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Stop Accepting Applications
                </span>
              </button>
            ) : (
              <button
                onClick={handleReopen}
                className=" relative group shadow-md dark:bg-gray-600 dark:hover:bg-gray-700 hover:bg-green-400 px-3 py-2 max-sm:py-1 rounded-md">
                <img src="/icons8-play-50.png" className="h-6"/>
                <span className="absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2 rounded-md bg-gray-800 text-white text-xs p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Reopen Applications
                </span>
              </button>
            )
          ) : (
            <button
              onClick={handleExtend}
              className="border border-black bg-green-400 dark:border-gray-600 hover:bg-green-500 px-4 py-2 max-sm:py-1 rounded-md">
              Extend Closing Date
            </button>
          )}
        </div>
        <div className="flex gap-2 items-center justify-center">
          <button
            className="bg-blue-500 shadow-md hover:bg-blue-600 dark:border-gray-600 px-4 py-2 max-sm:py-1 rounded"
            onClick={handleApplied}>
            Applied Students: {drive?.applicants?.length}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DriveCard;
