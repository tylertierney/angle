import { RefObject } from "react";
import Angle from "../Angle/Angle";
import Guesses from "../Guesses/Guesses";
import styles from "./HelpMenu.module.scss";
import { useTheme } from "../../context/ThemeContext";

export default function HelpMenu({
  helpMenuRef,
}: {
  helpMenuRef: RefObject<HTMLDialogElement>;
}) {
  const { darkMode } = useTheme();

  return (
    <dialog
      ref={helpMenuRef}
      className={styles.dialog}
      style={{
        color: darkMode ? "white" : "var(--text-color)",
        background: darkMode ? "var(--dark-bg)" : "",
      }}
    >
      <div className={styles.dialogContent}>
        <button
          className="close-button"
          onClick={() => helpMenuRef?.current?.close()}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2>How to play!</h2>
        <p>Guess the Angle in 5 guesses or less!</p>
        <p>
          Each time you make a guess it will tell you how close you are and
          which direction to go.
        </p>
        <h2>Example:</h2>
        <div className={styles.example}>
          <Angle angle={164} rotation={0} />
          <Guesses angle={164} guesses={[50, 120, 144, 168]} />
        </div>
        <p>
          The hint tells you how warm your guess was and the arrow tells you to
          guess higher or lower.
        </p>
        <p>The answer in this case was:</p>
        <div className={styles.example}>
          <Guesses angle={164} guesses={[164]} />
        </div>
      </div>
    </dialog>
  );
}
