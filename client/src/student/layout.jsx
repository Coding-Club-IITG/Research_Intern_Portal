import React from "react";

const StudentLayout = ({ children }) => {
  return (
    <div className="student-layout">
      <header>Student Header</header>
      <main>{children}</main>
      <footer>Student Footer</footer>
    </div>
  );
};

export default StudentLayout;
