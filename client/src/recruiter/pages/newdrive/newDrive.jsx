import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DatePicker, Select } from "antd";
import { createJob } from "../../../apis/recruiter";
import { message } from "antd";
import useAuthStore from "../../../store/authStore";
import daysjs from "dayjs";

export default function NewDrive() {
  const { getUser } = useAuthStore();
  const user = getUser();
  const [activeBranches, setActiveBranches] = useState([]);

  const [formData, setFormData] = useState({
    prof_name: user.name,
    title: "",
    description: "",
    tags: "",
    type: "",
    stipend: "",
    hours_required: "",
    requirements: {
      cpi: "",
      branch: [],
      study_year: ""
    },
    last_date: "",
    recruiter: user.connection_id
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      last_date: daysjs(date)
    });
  };

  const handleRequirementChange = (selectedBranches) => {
    // console.log(selectedBranches);
    if (selectedBranches.includes("") || selectedBranches.includes("All branches are allowed")) {
      // console.log("All branches are allowed");
      selectedBranches = ["All branches are allowed"];
      // console.log(selectedBranches);
    }
    setFormData({
      ...formData,
      requirements: {
        ...formData.requirements,
        branch: selectedBranches
      }
    });
    setActiveBranches(selectedBranches);
  };

  const handleSubmit = async (e) => {
    message.loading({ content: "Creating job listing...", key: "create-job" });
    e.preventDefault();

    const res = await createJob(formData);
    if (res.status === "success") {
      message.destroy("create-job");
      message.success("Job listing created successfully");
    } else {
      message.destroy("create-job");
      message.error("Failed to create job listing");
    }
  };

  const branchOptions = [
    { value: "", label: "All branches are allowed" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "Mechanical", label: "Mechanical" },
    { value: "Electrical", label: "Electrical" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Physics", label: "Physics" },
    { value: "Civil", label: "Civil" },
    { value: "Other", label: "Other" }
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="py-4 px-8 bg-white dark:bg-slate-700 rounded-lg space-y-4">
      <h2 className="text-2xl font-bold text-center mb-8 mt-4 dark:text-white">
        Create New Internship Opportunity
      </h2>

      <div className="flex flex-col">
        <div className="flex border-b-2 dark:border-yellow-500 py-8 md:py-12 flex-col md:flex-row gap-16">
          <div className="flex flex-col gap-1 md:w-2/4 w-full">
            <h3 className="text-xl font-semibold dark:text-white">Internship Headers</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 w-full">
              Enter basic details of internship, it helps the user to locate the jobs easily
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col flex-grow mb-2">
              <label className="font-medium text-sm dark:text-white">
                Professor Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="prof_name"
                value={formData.prof_name}
                onChange={handleChange}
                placeholder="Enter Professor Name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
                required
              />
            </div>
            <div className="flex flex-col flex-grow mb-2">
              <label className="font-medium text-sm dark:text-white">
                Internship Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter Internship Title"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex border-b-2 dark:border-yellow-500 py-8 md:py-12 flex-col md:flex-row gap-16">
          <div className="flex flex-col gap-1 md:w-2/4 w-full">
            <h3 className="text-xl font-semibold dark:text-white">Description</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-80">
              Enter basic details of internship, it helps the user to locate the jobs easily
            </p>
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium text-sm dark:text-white">
              Internship Description <span className="text-red-500">*</span>
            </label>
            <div className="my-4 h-80">
              <ReactQuill
                name="description"
                required
                theme="snow"
                value={formData.description}
                onChange={(value) => setFormData({ ...formData, description: value })}
                className="h-[90%] rounded-sm dark:bg-slate-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex border-b-2 dark:border-yellow-500 py-8 md:py-12 flex-col md:flex-row gap-16">
          <div className="flex flex-col gap-1 md:w-2/4 w-full">
            <h3 className="text-xl font-semibold dark:text-white">Requirements</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-80">
              Enter basic details of internship, it helps the user to locate the jobs easily
            </p>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-sm dark:text-white">
                Internship Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Enter Internship Type"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm dark:text-white">
                Stipend <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stipend"
                value={formData.stipend}
                onChange={handleChange}
                placeholder="Enter Stipend Amount"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm dark:text-white">
                Hours Required <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="hours_required"
                value={formData.hours_required}
                onChange={handleChange}
                placeholder="Enter Hours Required"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm dark:text-white">
                Minimum CPI Requirement <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="cpi"
                value={formData.requirements.cpi}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    requirements: { ...formData.requirements, cpi: e.target.value }
                  })
                }
                placeholder="Enter Minimum CPI"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm dark:text-white">
                Branch <span className="text-red-500">*</span>
              </label>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Select Branches"
                onChange={handleRequirementChange}
                options={branchOptions}
                value={activeBranches}
                className="mt-1 block rounded-md shadow-sm multi"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm dark:text-white">
                Study Year <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="study_year"
                value={formData.requirements.study_year}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    requirements: { ...formData.requirements, study_year: e.target.value }
                  })
                }
                placeholder="Enter Study Year"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex py-8 md:py-12 flex-col md:flex-row gap-16">
          <div className="flex flex-col gap-1 md:w-2/4 w-full">
            <h3 className="text-xl font-semibold dark:text-white">Last Date</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-80">
              Enter the last date for applying to the internship
            </p>
          </div>
          <div className="flex flex-col w-full">
            <DatePicker
              name="last_date"
              value={formData.last_date ? daysjs(formData.last_date) : null}
              onChange={handleDateChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:text-white dark:border-yellow-500 focus:outline-none focus:ring-1 dark:focus:ring-yellow-400 sm:text-sm"
              required
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out dark:text-black">
            Create Job Listing
          </button>
        </div>
      </div>
    </form>
  );
}
