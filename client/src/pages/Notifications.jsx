import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

const NotificationBell = () => {
  const [notificationCount, setNotificationCount] = useState(5); 


  return (
    <div className="relative inline-block cursor-pointer">
      <Bell size={24} />
      {notificationCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center p-0.5 text-xs font-bold leading-none text-white bg-blue-400 rounded-full">
          {notificationCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
