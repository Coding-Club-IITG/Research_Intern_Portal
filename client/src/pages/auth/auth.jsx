import React from "react";
import axios from "axios";
import authUrl from "../../auth.url";

const LoginPage = () => {
  function loginStudent() {
    const url = authUrl("student")
    window.location.href = url;
  }

  function loginAdmin() {
    const url = authUrl("admin")
    window.location.href = url;
  }
  
  function loginRecruiter() {
    const url = authUrl("recruiter")
    window.location.href = url;
  }

  return (
    <div className="flex gap-4">
        <div className="flex flex-col gap-2">
            <h2>Login as admin</h2>
            <button onClick={loginAdmin} className="py-1 px-4 bg-blue-500 rounded-md text-white">Login</button>
        </div>

        <div className="flex flex-col gap-2">
            <h2>Login as Student</h2>
            <button onClick={loginStudent} className="py-1 px-4 bg-blue-500 rounded-md text-white">Login</button>
        </div>

        <div className="flex flex-col gap-2">
            <h2>Login as recruiter</h2>
            <button onClick={loginRecruiter} className="py-1 px-4 bg-blue-500 rounded-md text-white">Login</button>
        </div>
    </div>
  )
};

export default LoginPage;