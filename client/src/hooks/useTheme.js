import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

function useTheme() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return [theme, toggleTheme];
}

export default useTheme;
