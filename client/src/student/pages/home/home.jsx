import { Button } from "antd";
import React,{useState} from "react";
import { useFetch } from "../../../hooks/useFetch";
import Skeleton from "./skeleton";
import InternalServerErrorPage from "../../../errors/InternalServerErrorPage";

export default function StudentHome() {
  const recommendedJobs = [];
  const appliedJobs = [];
  const [recentlyPostedJobs,setRecentlyPostedJobs]= useState([]);

  const { loading, error } = useFetch("https://jsonplaceholder.typicode.com/todos/1");

  if (loading) return <Skeleton />;
  if (error) return <InternalServerErrorPage />;

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 items-center py-8">
      <div className="w-[80%] p-8 h-fit rounded-lg border dark:bg-zinc-900 dark:border-none bg-white border-gray-400">
        <div className="flex flex-col">
          <h2 className="font-bold text-base md:text-lg text-black dark:text-white m-0">
            Applied Jobs
          </h2>
          <p className="text-m text-gray-700 dark:text-white font-thin">
            Jobs where you're a top applicant based on your profile job search
          </p>
        </div>
        <div className="w-full h-full flex items-center justify-center flex-col">
          {appliedJobs.length === 0 ? (
            <img src="/student-home.png" alt="job" className="max-h-[30rem]" />
          ) : (
            <div>Add jobs card</div>
          )}
          <Button
            type="primary"
            size="large"
            className="bg-blue-500 dark:bg-white hover:bg-gray-400 transition duration-200 dark:text-black">
            View Jobs
          </Button>
        </div>
      </div>
      <div className="w-[80%] p-8 h-fit rounded-lg border dark:bg-zinc-900 dark:border-none bg-white border-gray-400">
          <div className="flex flex-col">
            <h2 className="font-bold text-base md:text-lg text-black dark:text-white m-0">
              Recently Posted Jobs
            </h2>
            <p className="text-m text-gray-700 dark:text-white font-thin">
              Jobs where you're a top applicant based on your profile job search
            </p>
          </div>
          <div className="w-full h-full flex items-center justify-center flex-col">
            {recentlyPostedJobs.length === 0 ? (
              <img src="/student-home.png" alt="job" className="max-h-[30rem]" />
            ) : (
              <div>Add jobs card</div>
            )}
          <Button
            type="primary"
            size="large"
            className="bg-blue-500 dark:bg-white hover:bg-gray-400 transition duration-200 dark:text-black">
            View Jobs
          </Button>
        </div>
      </div>
    </div>
  );
}
