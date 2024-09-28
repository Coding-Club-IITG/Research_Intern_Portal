function ExperienceCard() {
  return (
    <div className="bg-gray-50 shadow border border-b-4 border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10 border-2 border-gray-500 mt-2 mr-4 p-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
          />
        </svg>

        <div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Web Developer</h3>
              <p className="text-gray-600">Coding Club </p>
              <p>May 2024 - Present</p>
            </div>
          </div>
          <p className="text-gray-800 mt-3">
            I have designed a MERN course for students. Created a Research Intern Portal for Indian
            Institute of Technology.
          </p>
        </div>
        <button className="text-blue-500 hover:underline">Edit</button>
      </div>
    </div>
  );
}

export default ExperienceCard;