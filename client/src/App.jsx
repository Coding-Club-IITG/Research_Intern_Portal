import React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import Profile from "./pages/profile/Profile.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
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
