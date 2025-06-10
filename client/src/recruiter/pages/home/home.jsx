// export default function RecuriterHome() {
//   return <div className="dark:text-white">Recuriter Page</div>;
// }
import React from "react";
import { Link } from "react-router-dom";

export default function RecruiterHome() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-white transition-colors duration-300">
      <header className="bg-white dark:bg-black shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recruiter Page</h1>
        <nav className="space-x-4">
       
        <Link to="/recruiter/newdrives">
         <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            Post Job
          </button>
          </Link>
         
          <Link to="/recruiter/drives">
          <button className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition">
            View Applicants
          </button>
          </Link>
         
          <Link to="/recruiter/profile/overview">
          <button className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition">
            Profile
          </button>
          </Link>
         
        </nav>
      </header>

      <main className="p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Welcome Back, Recruiter!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Manage your job postings, view applicants, and track progress all in one place.
          </p>
          
        </div>
      </main>

    </div>
  );
}

