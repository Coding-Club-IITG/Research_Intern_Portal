import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DatePicker, Select } from "antd";
import { createJob } from "../../../apis/recruiter";
import { message } from "antd";
import useAuthStore from "../../../store/authStore";
import daysjs from "dayjs";
import { getAllDepartments } from "../../../apis/courses-departments";
import { useNavigate } from "react-router-dom";

export default function NewDrive() {
  const { getUser } = useAuthStore();
  const user = getUser();
  const [activeDepartments, setActiveDepartments] = useState([]);
  const navigate = useNavigate();

  const [departmentOptions, setDepartmentOptions] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      const res = await getAllDepartments(navigate);
      if (res.status === "success") {
        const departments = res.data.map((department) => ({
          value: department._id,
          label: department.name
        }));
        setDepartmentOptions([{ value: "", label: "All departments are allowed" }, ...departments]);
      }
    };
    getDepartments();
  }, [navigate]);

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
      department: [],
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

  const handleRequirementChange = (selectedDepartments) => {
    // console.log(selectedDepartments);
    if (
      selectedDepartments.includes("") ||
      selectedDepartments.includes("All departments are allowed")
    ) {
      // console.log("All departments are allowed");
      selectedDepartments = ["All departments are allowed"];
      // console.log(selectedDepartments);
    }
    setFormData({
      ...formData,
      requirements: {
        ...formData.requirements,
        department: selectedDepartments
      }
    });
    setActiveDepartments(selectedDepartments);
  };

  const handleSubmit = async (e) => {
    message.loading({ content: "Creating job listing...", key: "create-job" });
    e.preventDefault();

    const res = await createJob(formData);
    if (res.status === "success") {
      message.destroy("create-job");
      message.success("Job listing created successfully");
      navigate("/recruiter/home");
    } else {
      message.destroy("create-job");
      message.error(res.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="py-4 px-8 bg-white dark:bg-zinc-900 rounded-lg space-y-4">
      <h2 className="text-2xl font-bold text-center mb-8 mt-4 dark:text-white">
        Create New Internship Opportunity
      </h2>

      <div className="flex flex-col">
        <div className="flex border-b-2 dark:border-gray-600 py-8 md:py-12 flex-col md:flex-row gap-16">
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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex border-b-2 dark:border-gray-600 py-8 md:py-12 flex-col md:flex-row gap-16">
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
                className="h-[90%] rounded-sm dark:bg-zinc-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex border-b-2 dark:border-gray-600 py-8 md:py-12 flex-col md:flex-row gap-16">
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
              <div className="text-slate-400 text-xs mt-1">Examples : Remote / On-site </div>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Enter Internship Type"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm dark:text-white">
                Stipend <span className="text-red-500">*</span>
              </label>
              <div className="text-slate-400 text-xs mt-1">If there is no stipend write NA</div>
              <input
                type="number"
                name="stipend"
                value={formData.stipend}
                onChange={handleChange}
                placeholder="Enter Stipend Amount"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm dark:text-white">
                Minimum CPI Requirement <span className="text-red-500">*</span>
              </label>
              <div className="text-slate-400 text-xs mt-1">If there is no cpi criteria write 0</div>
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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm dark:text-white">
                Department <span className="text-red-500">*</span>
              </label>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Select Departments"
                onChange={handleRequirementChange}
                options={departmentOptions}
                value={activeDepartments}
                className="mt-1 block rounded-md shadow-sm multi"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm dark:text-white">
                Study Year <span className="text-red-500">*</span>
              </label>
              <div className="text-slate-400 text-xs mt-1">Example 2026, 2027, 2028</div>
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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
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
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 dark:focus:ring-gray-400 sm:text-sm"
              required
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-indigo-500 dark:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-black">
            Create Job Listing
          </button>
        </div>
      </div>
    </form>
  );
}
