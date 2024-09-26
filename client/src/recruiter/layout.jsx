import React from "react";
const ProfessorLayout = ({ children }) => {
  return (
    <div className="professor-layout">
      <header>Professor Header</header>
      <main>{children}</main>
      <footer>Professor Footer</footer>
    </div>
  );
};

export default ProfessorLayout;
