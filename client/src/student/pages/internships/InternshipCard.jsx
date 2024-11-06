import React from "react";
import { useNavigate } from "react-router-dom";
import { applyToJobs } from "../../../apis/student";
import useAuthStore from "../../../store/authStore";
import { message } from "antd";

function InternshipCard({ arr }) {
  const navigate = useNavigate();
  const { getUser } = useAuthStore();
  const user = getUser();

  const handleLearnMore = () => {
    navigate(`/student/internships/internship/${arr._id}`);
  };

  const handleApply = async () => {
    const res = await applyToJobs(user.connection_id, arr._id, navigate);
    if (res.status === "success") {
      message.success("Applied Successfully");
      navigate(`/student/applied`);
    } else {
      // console.log(res);
      if (res.message === "Already applied") {
        return;
      }
      message.error("Failed to apply");
    }
  };

  // console.log(arr);

  return (
    <div className="bg-white border border-gray-300 dark:border-yellow-500 dark:bg-slate-800 mb-6 rounded-md">
      <div className="flex p-4 gap-4 max-sm:flex-col">
        <div className="w-40 flex-shrink-0">
          <img src={arr.image} alt={`${arr.prof_name} Logo`} className="h-full dark:text-white" />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-bold text-lg dark:text-white">{arr?.title}</h3>
              <p
                className="text-sm text-gray-500 mt-2 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: arr.description }}></p>

              {/* <div className="mt-4 flex flex-wrap items-center gap-2">
                {arr.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-gray-100 text-sm px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div> */}

              <div className="mt-4 text-sm text-gray-500 dark:text-gray-300">
                <div className="flex gap-4 dark:text-gray-300">
                  <p>Professor :</p>
                  <p>{arr.prof_name}</p>
                </div>
                <div className="flex gap-4 dark:text-gray-300">
                  <p>Stipend :</p>
                  <p>{arr.stipend} Rs</p>
                </div>
                <div className="flex gap-4 dark:text-gray-300">
                  <p>Hours Required :</p>
                  <p>{arr.hours_required} hrs</p>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <button
                className="bg-gray-100 text-gray-700 px-4 py-1 text-sm rounded-lg hover:bg-gray-200 dark:text-black dark:bg-yellow-400 dark:hover:bg-yellow-500"
                onClick={() => {
                  handleApply();
                }}>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-yellow-500 flex justify-between items-center p-4">
        <div className="text-sm text-gray-500 dark:text-gray-300">
          Applications: {arr?.applicants?.length || 0}
        </div>
        <button
          onClick={handleLearnMore}
          className="text-blue-600 dark:text-yellow-400 font-semibold hover:underline">
          Learn more
        </button>
      </div>
    </div>
  );
}

export default InternshipCard;
