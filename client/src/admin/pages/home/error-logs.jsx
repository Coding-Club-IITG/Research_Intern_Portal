import React from "react";

const errors = [
  {
    level: "error",
    message:
      "Updating student is not succesfull because student with 66f9462a6359af1dedb19b7c does not exisits in database",
    timestamp: "2024-10-04T04:25:22.141Z"
  },
  {
    level: "error",
    message:
      "Updating student is not succesfull because student with 66f9462a6359af1dedb19b7c does not exisits in database",
    timestamp: "2024-10-04T04:25:22.141Z"
  },
  {
    level: "error",
    message:
      "Updating student is not succesfull because student with 66f9462a6359af1dedb19b7c does not exisits in database",
    timestamp: "2024-10-04T04:25:22.141Z"
  },
  {
    level: "error",
    message:
      "Updating student is not succesfull because student with 66f9462a6359af1dedb19b7c does not exisits in database",
    timestamp: "2024-10-04T04:25:22.141Z"
  }
];

export default function ErrorLogPage() {
  return (
    <div className="w-full p-4">
      {errors.map((error, index) => (
        <div className="flex gap-4" key={index}>
          <h2>{error.level}</h2>
          <p>{error.message}</p>
          <p>{new Date(error.timestamp).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
