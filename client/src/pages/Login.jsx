import { Button, Segmented } from "antd";
import React, { useState } from "react";
import authUrl from "../auth.url";

const LoginPage = () => {
  const [role, setRole] = useState("student");

  function handleLogin() {
    const targetUrl = authUrl(role);
    window.location.href = targetUrl;
  }

  function handleAdminLogin(){
    const targetUrl = authUrl('admin');
    window.location.href = targetUrl;
  }

  return (
    <div className="w-screen h-screen flex flex-1">
      <div className="p-4 md:p-16 flex flex-col justify-between items-center md:items-start w-full md:w-[50%] h-full">
        <div className="flex flex-col gap-4">
          <header>
            <h1 className="font-bold text-blue-600 text-lg text-center md:text-left">
              Research Intern Portal
            </h1>
          </header>
          <img src="login-bg.png" alt="education" className="max-w-[150%] md:hidden mt-10" />
          <p className="text-xl md:text-3xl lg:text-4xl font-bold text-blue-600 mt-20 md:mt-44 text-center md:text-left">
            A platform for students to apply for internships and for recruiters to post internship
            opportunities.
          </p>
          <p className="text-black md:text-sm lg:text-base text-xs text-center md:text-left">
            Welcome back please login with your credentials
          </p>
          <Segmented
            options={["student", "recruiter"]}
            block
            className="w-full mt-8 capitalize text-sm md:text-base"
            onChange={(value) => setRole(value)}
            size="large"
          />
          <Button size="large" onClick={handleLogin}>
            Login with Microsoft Account
          </Button>
        </div>
        <div className="w-full flex justify-between md:justify-start gap-4 items-center text-xs md:text-base">
          <p className="text-slate-800 text-sm hover:cursor-pointer hover:text-blue-600" onClick={handleAdminLogin}>Admin Login</p>
          <p className="text-blue-600">Facebook</p>
          <p className="text-blue-600">Instagram</p>
          <p className="text-blue-600">Coding Club</p>
        </div>
      </div>
      <div className="p-4 w-[50%] md:p-16 h-full bg-slate-100 md:flex items-center justify-center relative hidden ">
        <p className="absolute top-16 left-10 underline text-slate-600">Home Page</p>
        <img src="login-bg.png" alt="education" className="max-w-[150%]" />
      </div>
    </div>
  );
};

export default LoginPage;
