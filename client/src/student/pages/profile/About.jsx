import { Select } from "antd";
import ProfilePic from "./ProfilePic";
function About({ profile }) {
  return (
    <>
      <div className="flex w-full space-x-4 flex-wrap">
        <div className="basis-full md:basis-1/3 p-4">
          <div className="font-bold">About</div>
          <div>Tell us about yourself so startups know who you are.</div>
        </div>

        <div className="flex-col grow shrink">
          <form>
            <div className="flex w-full justify-between items-center flex-wrap">
              <div className="flex-col basis-80 grow shrink">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={profile.name}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={profile.roll}
                  />
                </div>
              </div>
              <div className="basis-32 px-8 py-2 justify-center items-center">
                <ProfilePic />
              </div>
            </div>

            <div className="flex justify-between gap-4 flex-wrap">
              <div className="basis-32 grow shrink">
                <label className="block text-sm font-medium text-gray-700">
                  Course Type
                </label>
                <Select
                  defaultValue="Select"
                  style={{
                    width: "100%",
                  }}
                  options={profile.courses.map((course) => {
                    return {
                      value: course,
                      label: course,
                    };
                  })}
                />
              </div>
              <div className="mb-4 basis-72 grow shrink">
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <Select
                  defaultValue="Select"
                  style={{
                    width: "100%",
                  }}
                  options={profile.departments.map((course) => {
                    return {
                      value: course,
                      label: course,
                    };
                  })}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Fields of Interest
              </label>
              <div className="flex gap-2 flex-wrap py-2">
                {profile.interests.map((interest) => {
                  return (
                    <span
                      className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md"
                      key={interest}
                    >
                      {interest}
                    </span>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="mt-1 grow shrink p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Add Interest"
                />
                <button
                  type="submit"
                  className="basis-28 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Your bio
              </label>
              <textarea
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="4"
                placeholder="Write your bio here"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default About;
