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

  // console.log(drive);

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
            className="border bg-gray-400 border-black dark:border-gray-600 hover:bg-gray-500 px-4 py-2 max-sm:py-1 rounded-md"
            onClick={handleView}>
            View
          </button>

          {new Date(drive?.last_date) > currentdate ? (
            drive?.accepting ? (
              <button
                onClick={handleStop}
                className="border border-black bg-red-400 dark:border-gray-600 hover:bg-red-500 px-4 py-2 max-sm:py-1 rounded-md">
                Stop Accepting Applications
              </button>
            ) : (
              <button
                onClick={handleReopen}
                className="border border-black bg-green-400 dark:border-gray-600 hover:bg-green-500 px-4 py-2 max-sm:py-1 rounded-md">
                Reopen Applications
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
          {new Date(drive?.last_date) > currentdate && (
            <button
              className="border bg-gray-400 border-black dark:border-gray-600 hover:bg-gray-500 px-4 py-2 max-sm:py-1 rounded"
              onClick={handleEdit}>
              Edit
            </button>
          )}
          <button
            className="border border-black bg-blue-500 hover:bg-blue-600 dark:border-gray-600 px-4 py-2 max-sm:py-1 rounded"
            onClick={handleApplied}>
            Applied Students: {drive?.applicants?.length}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DriveCard;
