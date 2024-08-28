import React from "react";
import { Route, BrowserRouter, Routes, Navigate,Outlet } from "react-router-dom";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Root from "./components/Root.jsx"
import Home from "./pages/Home/Home.jsx"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Root/>}>
            
              <Route path="home" element={<Outlet/>}/>
            </Route>
              <Route path="profile/edit" element={<ProfilePage />}>
                <Route index element={<Navigate replace to="overview" />} />
                <Route path="profile" element={<Profile />} />
                <Route path="overview" element={<Profile />} />
                <Route path="resume" element={<Profile />} />
              </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
