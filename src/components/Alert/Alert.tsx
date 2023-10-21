import { Dispatch, RefObject, SetStateAction } from "react";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Alert.module.scss";

interface AlertProps {
  showGameOverAlert: boolean;
  setShowGameOverAlert: Dispatch<SetStateAction<boolean>>;
  correct: boolean;
  angle: number;
  restartButton: RefObject<HTMLButtonElement>;
  restartGame: () => void;
}

export default function Alert({
  showGameOverAlert,
  setShowGameOverAlert,
  correct,
  angle,
  restartButton,
  restartGame,
}: AlertProps) {
  const { darkMode } = useTheme();
  return (
    <div
      style={{
        display: showGameOverAlert ? "flex" : "none",
        background: darkMode ? "var(--dark-bg)" : "white",
        color: darkMode ? "white" : "var(--text-color)",
      }}
      className={styles.alert}
    >
      <button
        onClick={() => setShowGameOverAlert(false)}
        className="close-button"
        style={{ alignSelf: "flex-end" }}
      >
        <span className="material-symbols-outlined">close</span>
      </button>
      <span className={styles.gameOverMsg}>
        {correct && "🎉🎉"}
        {!correct && "🤔🤔"}
        &nbsp; &nbsp;
        {angle}&deg; &nbsp; &nbsp;
        {!correct && "🤔🤔"}
        {correct && "🎉🎉"}
      </span>
      <button
        ref={restartButton}
        onClick={() => restartGame()}
        className={styles.restartBtn}
      >
        Restart?
      </button>
    </div>
  );
}
