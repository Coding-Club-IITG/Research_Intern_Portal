import { useEffect, useState } from "react";
import DriveCard from "./DriveCard";
import { getJobsOfRecruiter } from "../../../apis/recruiter";
import useAuthStore from "../../../store/authStore";
import { message } from "antd";

function Drives() {
  const [jobs, setJobs] = useState([]);
  const { getUser } = useAuthStore();
  const user = getUser();

  useEffect(() => {
    const fetchJobs = async () => {
      message.loading({ content: "Loading...", key: "loading" });
      const res = await getJobsOfRecruiter(user.connection_id);
      if(res.status === "success"){
        message.destroy("loading");
        setJobs(res.data);
      }
    };

    fetchJobs();
  }, [])

  return (
    <div className="max-sm:p-2 p-6">
      <h1 className="max-sm:text-xl text-3xl font-bold text-center mb-6">Your Internship Openings</h1>
      {jobs.map((drive, index) => (
        <DriveCard key={index} drive={drive} index={index} />
      ))}
    </div>
  );
}

export default Drives;
