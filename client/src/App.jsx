import React from "react";
import { Route, BrowserRouter, Routes, Navigate, Outlet } from "react-router-dom";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Root from "./components/Root.jsx";
import Admin from "./pages/Admin/admin.jsx";
import Home from "./pages/Home/Home.jsx"
import Prof from "./pages/Admin/professor.jsx"
import Student from "./pages/Admin/student.jsx"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route exact path='/' element={<Root />}>

            <Route path="home" element={<Outlet />} />

          </Route>


          <Route path="profile/edit" element={<ProfilePage />}>
            <Route index element={<Navigate replace to="overview" />} />
            <Route path="profile" element={<Profile />} />
            <Route path="overview" element={<Profile />} />
            <Route path="resume" element={<Profile />} />
          </Route>



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
