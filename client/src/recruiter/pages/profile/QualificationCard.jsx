function QualificationCard({ qualification, onDelete, deletable }) {
  console.log(qualification);
  const {
    college = "college not specified",
    degree = "Degree not specified",
    startYear = "Start date not specified"
  } = qualification;

  const endYear = qualification.endYear || "Present";

  return (
    <div className="bg-gray-50 border border-b-4 border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-4 w-full dark:bg-zinc-900">
      <div className="flex justify-between dark:text-white">
        <div className="flex items-start">
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

          <div>
            <div className="flex-col items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{college}</h3>
              <p className="text-gray-600 dark:text-gray-300">{degree}</p>
              <p className="text-gray-500 dark:text-gray-300">{`${startYear} - ${endYear}`}</p>
            </div>
          </div>
        </div>
        {deletable && (
          <button
            className="text-red-500 hover:underline self-start ml-4 dark:text-red-500"
            onClick={onDelete}
            aria-label={`Delete qualification at ${college}`}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default QualificationCard;
