import React from "react";
import { Route, BrowserRouter, Routes, Navigate, Outlet } from "react-router-dom";
import Admin from "./pages/Admin/admin.jsx";
import Prof from "./pages/Admin/professor.jsx"
import Student from "./pages/Admin/student.jsx"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/admin" element={<Admin />}></Route>
          <Route path="/admin/professor" element={<Prof />}></Route>
          <Route path="/admin/student" element={<Student />}></Route>
          <Route path="/admin/jobs" element={<Student />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
