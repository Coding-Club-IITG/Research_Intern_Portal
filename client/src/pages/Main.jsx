import React from "react";
import { Link } from "react-router-dom";

function MainLandingPage() {
  const programs = [
    {
      title: "Mathematics",
      description:
        "Explore advanced mathematical concepts, problem-solving techniques, and research methodologies.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="blue"
          class="size-10">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
      )
    },
    {
      title: "Machine Learning",
      description:
        "Work with cutting-edge algorithms and AI models to solve real-world challenges using data.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="blue"
          class="size-10">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
          />
        </svg>
      )
    },
    {
      title: "Computer Architecture",
      description:
        "Gain hands-on experience in designing and analyzing computer hardware and system performance.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="blue"
          class="size-10">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
          />
        </svg>
      )
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineering Intern, 2024",
      image: "/path-to-user1.svg",
      rating: 5,
      feedback:
        "My internship was an incredible learning experience. I worked on real projects that are now in production, and the mentorship I received was invaluable for my career growth."
    },
    {
      name: "Michael Chen",
      role: "Business Development Intern, 2023",
      image: "/path-to-user2.svg",
      rating: 5,
      feedback:
        "The connections I made during my internship led directly to my current job. The team treated me like a full-time employee and gave me responsibilities that helped me grow."
    },
    {
      name: "Aisha Patel",
      role: "Marketing Intern, 2024",
      image: "/path-to-user3.svg",
      rating: 5,
      feedback:
        "I was able to lead creative campaigns and see my ideas come to life. The feedback and guidance I received helped me refine my skills and build confidence in my abilities."
    }
  ];
  // console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white p-3 shadow-md z-50">
        <nav className="flex items-center justify-between mx-auto">
          <img src="/rip_logo_light.png" className="h-[7vh]" alt="Research Intern Portal Logo" />
          <div>
            <button className="font-bold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg cursor-pointer px-4 py-2 rounded-lg">
              <Link to="/login">Apply Now</Link>
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow pt-[12vh] flex flex-col bg-slate-100">
        <div className="flex flex-col sm:flex-row items-center h-auto sm:h-[90vh] px-6 sm:px-10 gap-5">
          <section className="w-full sm:w-1/2 flex flex-col items-start text-left">
            <h2 className="text-3xl sm:text-5xl font-bold text-black">
              Find the perfect research internship for you.
            </h2>
            <p className="text-lg sm:text-2xl text-black mt-4">
              Connecting students with groundbreaking research opportunities.
            </p>
            <p className="text-lg sm:text-2xl text-black mt-2">
              Explore <span className="font-semibold">various research domains</span> under top
              professors at IIT Guwahati.
            </p>
            <button className="mt-8 font-bold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg cursor-pointer px-4 py-2 rounded-lg">
              <Link to="/login">Apply Now</Link>
            </button>
          </section>
          <div className="w-full sm:w-1/2 flex justify-center sm:justify-start">
            <img
              src="/bg-landing.png"
              alt="Research Internship"
              className="w-[80%] sm:w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        <section className="flex flex-col justify-center items-center h-[90vh] bg-white text-center">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-600">
              Internship Programs
            </h4>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Find Your Perfect Program</h2>
            <p className="text-lg text-gray-600 mt-4">
              We offer a variety of internship programs across different departments to help you
              gain experience in your field of interest.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 mx-10 gap-6 px-2">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition text-left">
                <div className="text-2xl">{program.icon}</div>
                <h3 className="text-3xl font-semibold font-sans mt-4">{program.title}</h3>
                <p className="text-gray-600 mt-2 mb-4">{program.description}</p>
                <Link to="/login" className="mt-4 block text-blue-600 text-lg font-semibold">
                  Learn More &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className=" bg-gray-50 h-[90vh] flex flex-col items-center justify-center">
          <div className="text-center">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-600">
              Testimonials
            </h4>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Hear From Our Past Interns</h2>
            <p className="text-lg text-gray-600 mt-4">
              Don't just take our word for it. Here's what our past interns have to say about their
              experience.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition duration-300">
                <div className="flex items-center gap-4">
                  <img
                    src={"/avatar.webp"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border border-gray-300"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex justify-start mt-4 gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="gold"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="gold"
                      className="h-5 w-5">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700 mt-4 leading-relaxed">{testimonial.feedback}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <section className="flex flex-col bg-blue-600 text-white p-4 mt-auto h-[75vh] items-center justify-center">
        <div className="max-w-6xl mx-auto py-12">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-sm font-medium border-white border px-3 py-1 rounded-full">
                Contact Us
              </span>
              <h2 className="text-4xl font-bold mt-4">Have Questions?</h2>
              <p className="text-gray-50 text-xl mt-3">
                We're here to help. Reach out to our team with any questions about our internship
                programs.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>

                  <p className="text-gray-50">(123) 456-7890</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>

                  <p className="text-white">internships@example.com</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>

                  <p className="text-white">123 Innovation Drive, Tech City, TC 12345</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg text-black font-semibold mb-4">Send Us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="border text-black border-gray-300 p-2 rounded w-full"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="border text-black border-gray-300 p-2 rounded w-full"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter subject"
                  className="border text-black border-gray-300 p-2 rounded w-full"
                />
                <textarea
                  rows="4"
                  placeholder="Enter your message"
                  className="border text-black border-gray-300 p-2 rounded w-full"></textarea>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-white py-6 border-t border-gray-200 h-[15vh] flex flex-col items-center justify-center">
        <p className="text-gray-600 text-sm text-center">
          &copy; 2024 Research Intern Portal. All rights reserved.
        </p>

        <p className="text-center text-gray-500 text-sm mt-4">
          Developed and Maintained by <span className="font-medium">Coding Club</span>
        </p>
      </footer>
    </div>
  );
}

export default MainLandingPage;
