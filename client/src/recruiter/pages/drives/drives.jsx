import DriveCard from "./DriveCard";
import my_drives from "./my_drives";

function Drives() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Internship Openings</h1>
      {my_drives.map((drive, index) => (
        <DriveCard key={index} drive={drive} index={index} />
      ))}
    </div>
  );
}

export default Drives;
