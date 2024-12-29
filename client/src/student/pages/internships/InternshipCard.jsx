import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { applyToJobs } from "../../../apis/student";
import useAuthStore from "../../../store/authStore";
import { message } from "antd";
import { useTheme } from "../../../store/themeStore";

function InternshipCard({ arr }) {
  const navigate = useNavigate();
  const { getUser } = useAuthStore();
  const [applied, setApplied] = useState(false);
  const [theme] = useTheme();
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

  useEffect(() => {
    if (arr.applicants) {
      console.log(arr.applicants);
      const applied = arr.applicants.find(
        (applicant) => applicant.applicant === user.connection_id
      );
      if (applied) {
        setApplied(true);
      }
    }
  }, [arr.applicants, user.connection_id]);

  // console.log(arr);

  return (
    <div className="bg-white border border-gray-300 dark:border-none dark:bg-zinc-900 mb-6 rounded-md relative">
      <div className="flex p-4 gap-6 max-sm:flex-col">
        <div className="w-32 h-32 flex-shrink-0">
          <img
            src={arr.image ? arr.image : theme === "light" ? "/avatar.webp" : "/avatar-dark.png"}
            alt={`${arr.prof_name} Logo`}
            className="dark:text-white rounded-full w-full h-full object-cover"
          />
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

            <div className="flex absolute right-4 top-4 items-center">
              {applied ? (
                <button
                  className="bg-gray-100 text-gray-700 px-4 py-1 text-sm rounded-lg hover:bg-gray-200 dark:text-black"
                  disabled>
                  Applied
                </button>
              ) : (
                <button
                  className="bg-gray-100 text-gray-700 px-4 py-1 text-sm rounded-lg hover:bg-gray-200 dark:text-black"
                  onClick={handleApply}>
                  Apply
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200  flex justify-between items-center p-4">
        <div className="text-sm text-gray-500 dark:text-gray-300">
          Applications: {arr?.applicants?.length || 0}
        </div>
        <button
          onClick={handleLearnMore}
          className="text-blue-600 dark:text-white font-semibold hover:underline">
          Learn more
        </button>
      </div>
    </div>
  );
}

export default InternshipCard;
