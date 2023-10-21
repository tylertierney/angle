import { RefObject } from "react";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Toolbar.module.scss";

interface ToolbarProps {
  helpMenuRef: RefObject<HTMLDialogElement>;
  restartGame: () => void;
}

export default function Toolbar({ helpMenuRef, restartGame }: ToolbarProps) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div
      className={styles.toolbar}
      style={{
        color: darkMode ? "white" : "var(--text-color)",
      }}
    >
      <button
        className={styles.button}
        onClick={() => helpMenuRef?.current?.show()}
        style={{
          opacity: darkMode ? 0.8 : 1,
        }}
      >
        <span className="material-symbols-outlined">question_mark</span>
      </button>
      <button className={styles.button} onClick={() => toggleTheme()}>
        <span>{darkMode ? "Light" : "Dark"} Theme&nbsp;</span>
        <span className="material-symbols-outlined">
          {darkMode ? "light_mode" : "dark_mode"}
        </span>
      </button>
      <button className={styles.button} onClick={() => restartGame()}>
        <span className="material-symbols-outlined">refresh</span>
      </button>
    </div>
  );
}
