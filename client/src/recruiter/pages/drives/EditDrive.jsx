import React, { useState, useEffect } from "react";
import { Select, message } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getJobById, updateJob } from "../../../apis/recruiter";

const EditDrive = () => {
  const { driveIndex } = useParams();
  const [formData, setFormData] = useState({
    prof_name: "",
    title: "",
    description: "",
    isActive: true,
    tags: "",
    type: "",
    stipend: "",
    hours_required: "",
    applicants: [],
    requirements: {
      cpi: "",
      branch: [],
      study_year: ""
    },
    accepting: true,
    last_date: ""
  });
  
  const navigate=useNavigate();

  useEffect(() => {
    async function fetchDrive() {
      message.loading({ content: "Loading...", key: "loading" });
      const res = await getJobById(driveIndex);
      if(res.status === "success"){
        message.destroy("loading");
        setFormData(res.data);
      }
    }

    fetchDrive();
  }, [driveIndex]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRequirementChange = (selectedBranches) => {
    setFormData({
      ...formData,
      requirements: {
        ...formData.requirements,
        branch: selectedBranches
      }
    });
  };

  const handleSubmit = async (e) => {
    message.loading({ content: "Updating...", key: "updating" });
    e.preventDefault();
    
    const res = await updateJob(driveIndex, formData);
    if(res.status === "success"){
      message.destroy("updating");
      message.success("Drive updated successfully");
      navigate(-1);
    }else{
      message.destroy("updating");
      message.error("Failed to update drive");
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
    <form onSubmit={handleSubmit} className="py-4 px-8 bg-white rounded-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">Edit Internship Opportunity</h2>

      {/* Internship Details Section */}
      <div className="border-b pb-2">
        <h3 className="text-xl font-semibold mb-2">Internship Details</h3>

        <div className="flex flex-col sm:flex-row flex-wrap mb-2 gap-2">
          <div className="flex flex-col flex-grow mb-2">
            <label className="font-semibold">
              Professor Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="prof_name"
              value={formData.prof_name}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 mt-1 w-full"
              required
            />
          </div>

          <div className="flex flex-col flex-grow mb-2">
            <label className="font-semibold">
              Internship Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 mt-1 w-full"
              required
            />
          </div>

          <div className="flex flex-col flex-grow mb-2 w-full">
            <label className="font-semibold">
              Internship Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 mt-1 ml-0 w-full"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap mb-2 gap-2">
          <div className="flex flex-col flex-grow mb-2">
            <label className="font-semibold">
              Internship Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 mt-1 w-full"
              required
            />
          </div>

          <div className="flex flex-col flex-grow mb-2">
            <label className="font-semibold">
              Stipend <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stipend"
              value={formData.stipend}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 mt-1 w-full"
              required
            />
          </div>

          <div className="flex flex-col flex-grow mb-2">
            <label className="font-semibold">
              Hours Required <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="hours_required"
              value={formData.hours_required}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 mt-1 w-full"
              required
            />
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="border-b pb-2">
        <h3 className="text-xl font-semibold mb-2">Requirements</h3>

        <div className="flex flex-wrap mb-2 gap-2">
          <div className="flex flex-col flex-grow mb-2">
            <label className="font-semibold">
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
              className="border border-gray-300 rounded p-2 mt-1 w-full"
              required
            />
          </div>

          <div className="flex flex-col flex-grow mb-2">
            <label className="font-semibold">
              Study Year Requirement <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="study_year"
              value={formData.requirements.study_year}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  requirements: { ...formData.requirements, study_year: e.target.value }
                })
              }
              className="border border-gray-300 rounded p-2 mt-1 w-full"
              required
            />
          </div>
        </div>

        <div className="flex flex-col mb-2">
          <label className="font-semibold">
            Branch Requirement <span className="text-red-500">*</span>
          </label>
          <Select
            mode="multiple"
            value={formData.requirements.branch}
            onChange={handleRequirementChange}
            placeholder="Please select branches"
            style={{ width: "100%" }}
            options={branchOptions}
          />
        </div>
      </div>

      {/* Application Details Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Application Details</h3>
        <div className="flex flex-col mb-2">
          <label className="font-semibold">
            Last Date to Apply <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="last_date"
            value={formData.last_date}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mt-1 w-full"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-between">
      <button
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all mt-4"
        onClick={() => navigate(-1)} // This navigates to the previous page
      >
        &larr; Back
      </button> 
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-gray-800 mb-4 mt-4">Save</button>
      </div>
    </form>
  );
};

export default EditDrive;
