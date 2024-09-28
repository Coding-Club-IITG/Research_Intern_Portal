// InternshipCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function InternshipCard({ arr, index }) {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate(`internship/${index}`);
  };

  return (
    <div key={index} className="bg-white border border-gray-300 shadow-md mb-6">
      <div className="flex p-4 gap-4">
        <div className="w-40 flex-shrink-0">
          <img src={arr.image} alt={`${arr.proffName} Logo`} className="h-full" />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-bold text-lg">{arr.proffName}</h3>
              <p className="text-sm text-gray-500">{arr.department}</p>
              <p className="text-sm text-gray-500 mt-2">{arr.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {arr.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-gray-100 text-sm px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-500">
                <span>{arr.role}</span> <span>•</span>
                <span>Stipend: ₹{arr.stipend}</span>
              </div>
            </div>

            <div className="flex items-center">
              <button className="bg-gray-100 text-gray-700 px-4 py-1 text-sm rounded-lg hover:bg-gray-200">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 flex justify-between items-center p-4">
        <div className="text-sm text-gray-500">Applications: {arr.applications}</div>
        <button onClick={handleLearnMore} className="text-blue-600 font-semibold hover:underline">
          Learn more
        </button>
      </div>
    </div>
  );
}

export default InternshipCard;