import About from "./About";
import Achievements from "./Achievements";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
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
    skills: ["React", "Node", "MongoDB"],
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
      <Experience profile={profile} />
      <hr></hr>
      <Education profile={profile} />
      <hr></hr>
      <Skills profile={profile} />
      <hr></hr>
      <Achievements />
    </div>
  );
}

export default Profile;
