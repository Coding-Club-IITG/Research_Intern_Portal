import React from "react";
import { Route, BrowserRouter, Routes, Navigate,Outlet } from "react-router-dom";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Root from "./components/Root.jsx"
import Home from "./pages/Home/Home.jsx"
import Applied from "./pages/Applied/Applied.jsx";
import Ongoing from "./pages/Applied/Ongoing.jsx";
import Archived from "./pages/Applied/Archived.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Root/>}>
            
              <Route path="home" element={<Home/>}/>

              <Route path="applied" element={<Applied/>}>

                <Route path='ongoing' element={<Ongoing/>}/>
                <Route path='archived' element={<Archived/>}/>
                <Route index element={<Navigate replace to="ongoing" />} />

              </Route>


              <Route path="profile/edit" element={<ProfilePage />}>
                <Route index element={<Navigate replace to="overview" />} />
                <Route path="profile" element={<Profile />} />
                <Route path="overview" element={<Profile />} />
                <Route path="resume" element={<Profile />} />
              </Route>
              
            </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
