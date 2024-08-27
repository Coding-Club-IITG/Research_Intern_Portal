import { Outlet } from "react-router-dom";
import ProfileNav from "./ProfileNav";

function ProfilePage() {
  return (
    <>
      <ProfileNav />
      <div className="border">
        <Outlet />
      </div>
    </>
  );
}

export default ProfilePage;
