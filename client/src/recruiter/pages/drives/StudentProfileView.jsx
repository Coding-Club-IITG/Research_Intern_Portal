import students from "./students";
import { useParams } from "react-router-dom";

function StudentProfileView() {
    const { roll } = useParams(); // Extract roll number from URL params
    const roll_no = parseInt(roll, 10); // Parse roll number as integer
    const student = students.find((s) => s.rollNo === roll_no); // Find the student by rollNo

    if (!student) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-bold text-red-500">Student Not Found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <div className="bg-white rounded-lg shadow-lg p-8 w-4/5 max-w-4xl">
                {/* Profile Picture and Personal Info */}
                <div className="flex flex-col md:flex-row items-center md:justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <img
                            src={`https://ui-avatars.com/api/?name=${student.name}&background=random&size=200`} 
                            alt="Profile"
                            className="rounded-full shadow-md mb-4 w-48 h-48 object-cover mx-auto"
                        />
                        <h1 className="text-3xl font-bold text-center text-gray-800">
                            {student.name}
                        </h1>
                        <p className="text-center text-gray-600">
                            {student.bio}
                        </p>
                    </div>

                    {/* Personal Info and Academic Details side by side */}
                    <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Personal Info */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Personal Info</h2>
                            <p className="text-gray-600 mb-2">
                                <strong>Email:</strong> {student.email}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Phone:</strong> {student.phoneNumber}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Roll No:</strong> {student.rollNo}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Date of Birth:</strong> {student.dob.toDateString()}
                            </p>
                        </div>

                        {/* Academic Details */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Academic Details</h2>
                            <p className="text-gray-600 mb-2">
                                <strong>College:</strong> {student.college}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Course:</strong> {student.course}, {student.department}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>CPI:</strong> {student.cpi}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Year of Graduation:</strong> {student.yearOfGrad}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Social Profiles */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Social Profiles</h2>
                    <div className="flex space-x-4">
                        {student.social.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                className="text-blue-500 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {social.platform}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Previous Education */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Previous Education</h2>
                    <ul className="list-disc list-inside text-gray-600">
                        {student.prevEducation.map((edu, index) => (
                            <li key={index}>
                                {edu.degree} from {edu.college}, {edu.year} (Grade:{" "}
                                {edu.grade})
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Previous Experience */}
                {student.prevExperience.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Previous Experience</h2>
                        <ul className="list-disc list-inside text-gray-600">
                            {student.prevExperience.map((exp, index) => (
                                <li key={index}>
                                    <strong>{exp.role}</strong> at {exp.company_college}
                                    <p>{exp.description}</p>
                                    <p>
                                        From: {exp.start_date.toDateString()} To:{" "}
                                        {exp.end_date.toDateString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Resume Link */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Resume</h2>
                    <p className="text-gray-600">
                        <a
                            href={student.resume}
                            className="text-blue-500 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Resume
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StudentProfileView;
