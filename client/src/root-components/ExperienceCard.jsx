function ExperienceCard({ experience, onDelete, deletable = true }) {
  const {
    role = "Role not specified",
    name = "Organization not specified",
    startDate = "Start date not specified",
    description = "Description not specified"
  } = experience;

  const endDate = experience.endDate || "Present";

  return (
    <div className="bg-gray-50 border border-b-4 border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-4 w-full dark:bg-zinc-900">
      <div className="flex dark:text-white">
        <div className="h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 border-2 border-gray-500 dark:border-gray-300 mt-2 mr-4 p-1 w-10 h-10">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
            />
          </svg>
        </div>

        <div className="flex-grow">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white">{role}</h3>
              <p className="text-black dark:text-gray-300">{name}</p>
              <p className="text-black dark:text-gray-300">
                {startDate} - {endDate}
              </p>
            </div>
          </div>
          <p className="text-black mt-3 dark:text-gray-300">{description}</p>
        </div>

        {deletable && (
          <button
            className="text-red-500 hover:underline self-start ml-4"
            onClick={onDelete}
            aria-label={`Delete experience at ${name}`}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default ExperienceCard;
