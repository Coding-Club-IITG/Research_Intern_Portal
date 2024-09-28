import React from "react";
import useTheme from "../hooks/useTheme";

const ThemeToggle = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className="cursor-pointer fixed bottom-4 right-4"
    >
      {theme === "light" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-yellow-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-8.364l-1.414 1.414M6.636 17.364l-1.414 1.414M17.364 17.364l1.414 1.414M6.636 6.636l-1.414-1.414"
          />
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth={2} />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2a10 10 0 00-7.473 16.473A10 10 0 0022 12a10 10 0 00-10-10z"
          />
        </svg>
      )}
    </div>
  );
};

export default ThemeToggle;
