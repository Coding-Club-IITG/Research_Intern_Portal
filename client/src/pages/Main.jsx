



import React from 'react';
import { Link } from 'react-router-dom';

function MainLandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <header className="fixed top-0 left-0 right-0 bg-white p-5 shadow-md z-50">
        <nav className="flex items-center justify-between max-w-6xl mx-auto">
          <h1 className="font-bold text-blue-600 text-lg">Research Intern Portal</h1>

          <div className="flex-grow flex justify-center gap-6">
            <span className="font-bold text-black text-md hover:text-blue-500 hover:shadow-lg cursor-pointer px-4 py-2 rounded">
              For Recruiters
            </span>
            <span className="font-bold text-black text-md hover:text-blue-500 hover:shadow-lg cursor-pointer px-4 py-2 rounded">
              For Jobs
            </span>
          </div>

          <div>
            <button className="font-bold text-white bg-red-500 hover:bg-red-600 hover:shadow-lg cursor-pointer px-4 py-2 rounded-lg">
              <Link to="/login">Login</Link>
            </button>
          </div>
        </nav>
      </header>


      <main className="flex-grow pt-24 p-10 flex flex-col">
        <div className="flex flex-col gap-5">
     
          <section className="flex flex-col items-center text-center h-[60vh] justify-center">
            <h2 className="text-6xl font-bold text-gray-800">Find the job made for you.</h2>
            <p className="text-2xl text-gray-600 mt-2">We make it easy to find what's next.</p>
            <p className="text-2xl text-gray-600 mt-1">
              Browse over <span className="font-semibold">different opportunities</span> — from just fine professors of our country
            </p>
          </section>

          <section className="flex flex-col md:flex-row items-center justify-center p-10 bg-white mt-12 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
       
            <div className="flex-1 flex justify-center mb-6 md:mb-0">
              <div className="bg-green-100 p-8 rounded-lg flex items-center justify-center">
               
              </div>
            </div>

 
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Find work that works for you</h2>
              <p className="text-lg text-gray-600 mb-8">
                A personalized and private job search, with all the info you care about, all upfront
              </p>

              {/* Features */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-start gap-4">
       
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Stay in the know</h3>
                    <p className="text-gray-600">No guessing games. View stipend options before you apply.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
         
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Personalized search</h3>
                    <p className="text-gray-600">Personalized filters make it quick and easy to find the jobs you care about</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-red-500 text-2xl">⚙️</span>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Unique roles, exciting teams</h3>
                    <p className="text-gray-600">Discover unique jobs with future-defining teams</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col md:flex-row items-center justify-center p-10 bg-white mt-12 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
    
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Brand yourself for new opportunities</h2>
              <p className="text-lg text-gray-600 mb-8">Create a profile that highlights your unique skills and preferences, then apply to jobs with just one click.</p>

              {/* Features */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-start gap-4">
                
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">One click apply</h3>
                    <p className="text-gray-600">Say goodbye to cover letters - your profile is all you need. One click to apply, and you’re done.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
              
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Set your preferences</h3>
                    <p className="text-gray-600">Streamline the interview process by setting your expectations (salary, industry, culture, etc.) upfront.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center mb-6 md:mb-0">
              <div className="bg-green-100 p-8 rounded-lg flex items-center justify-center">
              
              </div>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-8 mt-10">
            <div className="flex-1 bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform transition-transform duration-300 ease-in-out hover:scale-105">
              <h2 className="text-xl font-bold text-blue-600 mb-4">Recruiter</h2>
              <p className="text-gray-700">Discover and connect with top candidates for your research projects and internship programs.</p>
              <button className="mt-4 font-semibold text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">
                Learn More
              </button>
            </div>

            <div className="flex-1 bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform transition-transform duration-300 ease-in-out hover:scale-105">
              <h2 className="text-xl font-bold text-blue-600 mb-4">Jobs</h2>
              <p className="text-gray-700">Explore job opportunities and internships to kickstart your career in research and academics.</p>
              <button className="mt-4 font-semibold text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">
                Explore Jobs
              </button>
            </div>
          </section>
        </div>
      </main>

    
<footer className="bg-gray-800 text-white p-4 mt-auto h-[20vh] flex flex-col justify-between">
  <div className="flex justify-between items-center">
    <h1 className="font-bold text-blue-600 text-lg">Research Intern Portal</h1>
    <p>&copy; 2024 Research Intern Portal. All rights reserved.</p>
  </div>
  <p className="text-right mt-auto">Developed and maintained by coding club</p> 
</footer>


    </div>
  );
}

export default MainLandingPage;
