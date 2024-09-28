import React, { useState } from "react";
import { z } from "zod";
import authUrl from "../../auth.url";

const loginSchema = z.object({
  role: z.enum(["student", "admin", "recruiter"]),
});

const LoginPage = () => {
  const [error, setError] = useState("");

  function handleLogin(role) {
    try {
      loginSchema.parse({ role });
      const url = authUrl(role);
      window.location.href = url;
    } catch (e) {
      setError(e.errors[0].message);
    }
  }

  return (
    <div className="flex gap-4">
      {error && <p className="text-red-500">{error}</p>}
      {["admin", "student", "recruiter"].map((role) => (
        <div key={role} className="flex flex-col gap-2">
          <h2>Login as {role}</h2>
          <button
            onClick={() => handleLogin(role)}
            className="py-1 px-4 bg-blue-500 rounded-md text-white"
          >
            Login
          </button>
        </div>
      ))}
    </div>
  );
};

export default LoginPage;
