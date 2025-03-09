import { useEffect, useState } from "react";
import DriveCard from "./DriveCard";
import { getJobsOfRecruiter } from "../../../apis/recruiter";
import useAuthStore from "../../../store/authStore";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function Drives() {
  const [jobs, setJobs] = useState([]);
  const { getUser } = useAuthStore();
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      message.loading({ content: "Loading...", key: "loading" });
      const res = await getJobsOfRecruiter(user.connection_id, navigate);
      console.log(res);
      if (res.status === "success") {
        message.destroy("loading");
        setJobs(res.data);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-sm:p-2 p-6">
      <h1 className="max-sm:text-xl text-3xl font-bold text-center mb-6 dark:text-white">
        Your Internship Openings
      </h1>
      {jobs.length === 0 ? (
        <div>
          <img src="/no-data.png" alt="empty" className="mx-auto w-1/3 mt-20" />
          <p className="text-center dark:text-white">You do not create internship yet </p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2">
          {jobs.map((job) => (
            <DriveCard key={job.id} drive={job} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Drives;
