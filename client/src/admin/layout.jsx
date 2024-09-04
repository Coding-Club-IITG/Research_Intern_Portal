import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <header>Admin Header</header>
      <main>{children}</main>
      <footer>Admin Footer</footer>
    </div>
  );
};

export default AdminLayout;
