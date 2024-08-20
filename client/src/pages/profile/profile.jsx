import About from "./About";

import Social from "./Social";

function Profile() {
  const profile = {
    name: "Aditya Samal",
    img: null,
    roll: 230123002,
    courses: [
      "BTech",
      "MTech",
      "BDes",
      "MDes",
      "MA",
      "MSR",
      "MSc",
      "Phd",
      "MBA",
    ],
    departments: [
      "Chemistry",
      "Chemical Enginerring",
      "Computer Science",
      "Design",
      "Humanities and Social Science",
      "Physics",
      "Mathematics",
      "Mehta School of Data Science",
      "Mechanical Engineering",
      "Electrical and Electronics Enginnering",
      "Civil Engineering",
      "Bioscience and Bioengineering",
      "Energy Engineering",
    ],
    interests: ["software dev", "machine learning"],
    social: {
      website: "https://aditya-samal/Portfolio",
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/in/",
    },
  };

  return (
    <div className="flex flex-col space-y-4 min-h-screen">
      <About profile={profile} />
      <hr></hr>
      <Social profile={profile} />
      <hr></hr>
    </div>
  );
}

export default Profile;

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, time: true, required: true },
//     contact: { type: Number, required: true },
//     rollNo: { type: Number, required: true },
//     college: {
//       type: String,
//       default: "Indian Instituition of Technology, Guwahati",
//     },
//     password: { type: String, required: true },
//     //keeping a default value unless we outsource it for other colleges
//     course: {
//       type: String,
//       required: true,
//       enum: [
//         "BTech",
//         "MTech",
//         "BDes",
//         "MDes",
//         "MA",
//         "MSR",
//         "MSc",
//         "Phd",
//         "MBA",
//       ],
//     },
//     department: {
//       type: String,
//       required: true,
//       enum: [
//         "Chemistry",
//         "Chemical Enginerring",
//         "Computer Science",
//         "Design",
//         "Humanities and Social Science",
//         "Physics",
//         "Mathematics",
//         "Mehta School of Data Science",
//         "Mechanical Engineering",
//         "Electrical and Electronics Enginnering",
//         "Civil Engineering",
//         "Bioscience and Bioengineering",
//         "Energy Engineering",
//       ],
//     },
//     cpi: { type: Number, required: true },
//     social: [socialSchema],
//     dob: { type: Date, trim: true, required: true },
//     yearOfGrad: { type: Number, required: true },
//     resume: { type: String, trim: true, default: "" },
//     interest: [{ type: String }],
//   },
//   { timestamps: true }
// );

// const socialSchema = new mongoose.Schema({
//   platform: { type: String, required: true },
//   url: { type: String, required: true },
// });
/* eslint-disable react/no-array-index-key */
