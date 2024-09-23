function Achievements() {
  return (
    <div className="flex w-full space-x-4 flex-wrap">
      <div className="basis-full md:basis-1/3 p-4">
        <div className="font-bold">Achievements</div>
        <div>
          Sharing more details about yourself will help you stand out more.
        </div>
      </div>
      <div className="flex-col grow shrink">
        <textarea
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows="4"
          placeholder="Write your bio here"
        />
        <br></br>
      </div>
    </div>
  );
}

export default Achievements;
