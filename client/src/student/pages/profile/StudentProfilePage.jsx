import { Outlet } from "react-router-dom";
import ProfileNav from "./ProfileNav";

function ProfilePage() {
  return (
    <div className="flex-col w-full pt-4">
      <ProfileNav />
      <Outlet />
    </div>
  );
}

export default ProfilePage;
