function Social({ profile }) {
  return (
    <>
      <div className="flex w-full space-x-4">
        <div className="w-1/3 p-4">
          <div className="font-bold">Social Profiles</div>
          <div>Where can people find you online?</div>
        </div>

        <div className="flex-col w-2/3 p-4">
          <form>
            <div className="flex-col basis-80 grow shrink">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={profile.social.website}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Linkedin
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={profile.social.linkedin}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Github
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={profile.social.github}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Social;
