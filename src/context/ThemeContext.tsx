import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IThemeContext {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext>({
  darkMode: false,
  toggleTheme: () => {},
});

const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);
