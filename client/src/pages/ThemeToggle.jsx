import React from "react";
import { Switch } from 'antd';
import useTheme from "../hooks/useTheme";

const ThemeToggle = () => {
  const [theme, toggleTheme] = useTheme();

  const onChange = (checked) => {
    console.log(`Switched to ${checked ? "dark" : "light"} mode`);
    toggleTheme();  
  };

  return (
    <div className="cursor-pointer">
      <Switch 
        checked={theme === "dark"} 
        onChange={onChange} 
        checkedChildren="Dark" 
        unCheckedChildren="Light"
      />
    </div>
  );
};

export default ThemeToggle;
