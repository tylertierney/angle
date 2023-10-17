import { useEffect, useState } from "react";

export default function useTheme() {
  const [darkMode, setDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem("darkMode") ?? "false")
  );
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("darkMode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("darkMode");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  // const toggleDarkMode = (darkMode: boolean) => {
  //   if (darkMode) {
  //     localStorage.setItem("darkMode", "false");
  //   } else {
  //     localStorage.setItem("darkMode", "true");
  //   }
  //   setDarkMode((prev) => !prev);
  // };

  return { darkMode, setDarkMode };
}
