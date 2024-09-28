function Skills({ profile }) {
  return (
    <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-4">
      <div className="md:basis-1/3 p-4 pb-0">
        <div className="font-bold">Skills</div>
        <div>What are you skilled at?</div>
      </div>
      <div className="flex-col grow shrink ml-4">
        <div className="flex gap-2 flex-wrap py-2 mb-4">
          {profile.skills.map((skill, index) => (
            <span key={index} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Add Interest"
          />
          <button
            type="submit"
            className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Skills;
