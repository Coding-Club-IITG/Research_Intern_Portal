import DriveCard from "./DriveCard";
import my_drives from "./my_drives";

function Drives() {
  return (
    <div className="max-sm:p-2 p-6">
      <h1 className="max-sm:text-xl text-3xl font-bold text-center mb-6">Your Internship Openings</h1>
      {my_drives.map((drive, index) => (
        <DriveCard key={index} drive={drive} index={index} />
      ))}
    </div>
  );
}

export default Drives;
