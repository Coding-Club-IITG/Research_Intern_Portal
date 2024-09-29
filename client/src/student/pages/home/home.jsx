import { Button } from "antd";

export default function StudentHome() {
  const recommendedJobs = [];
  const appliedJobs = [];
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 items-center py-8">
      <div className="w-[80%] p-8 h-fit rounded-lg border border-gray-400">
          <div className="flex flex-col">
            <h2 className="font-bold text-base md:text-lg m-0">Recomemded Jobs</h2>
            <p className="text-sm text-slate-400 font-thin">Jobs where you're a top applicant based on your profile job search</p>
          </div>
          <div className="w-full h-full flex items-center justify-center flex-col">
              {recommendedJobs.length === 0 ? (
                <img src="/student-home.png" alt="job" className="max-h-[30rem]"/>
                ): (
                 <div>Add jobs card</div>
                )}
              <Button 
                type="primary" 
                size="large" 
                style={{
                    backgroundColor: "black"
                }}>
                View Jobs
              </Button>
          </div>
      </div>
      <div className="w-[80%] p-8 h-fit rounded-lg border border-gray-400">
          <div className="flex flex-col">
            <h2 className="font-bold text-base md:text-lg m-0">Applied Jobs</h2>
            <p className="text-sm text-slate-400 font-thin">Jobs where you're a top applicant based on your profile job search</p>
          </div>
          <div className="w-full h-full flex items-center justify-center flex-col">
          {appliedJobs.length === 0 ? (
                <img src="/student-home.png" alt="job" className="max-h-[30rem]"/>
                ): (
                 <div>Add jobs card</div>
                )}
              <Button 
                type="primary" 
                size="large" 
                style={{
                    backgroundColor: "black"
                }}>
                View Jobs
              </Button>
          </div>
      </div>
    </div>
  )
}
