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
    <div style={{ display: "flex", gap: "0.4rem" }}>
      <button
        className={styles.button}
        onClick={() => helpMenuRef?.current?.show()}
        style={{
          borderColor: darkMode ? "white" : "inherit",
          opacity: darkMode ? 0.8 : 1,
        }}
      >
        <span role="img" aria-label="help">
          ❓
        </span>
      </button>
      <button className={styles.button} onClick={() => toggleTheme()}>
        {darkMode ? "Light" : "Dark"} Theme&nbsp;
        {darkMode ? "☀️" : "🌙"}
      </button>
      <button className={styles.button} onClick={() => restartGame()}>
        <span role="img" aria-label="refresh">
          🔄
        </span>
      </button>
    </div>
  );
}
