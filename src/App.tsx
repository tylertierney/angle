import { useEffect, useRef, useState } from "react";
import "./index.css";
import Angle from "./components/Angle";
import Guesses from "./components/Guesses";
import useTheme from "./hooks/useTheme";

const GAME_LENGTH = 5;

const randomAngle = () => ~~(Math.random() * 350) + 6;

const randomRotation = () => ~~(Math.random() * 360);

export default function App() {
  const [rotation, setRotation] = useState<number>(randomRotation());
  const [guesses, setGuesses] = useState<Array<number>>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [angle, setAngle] = useState(randomAngle());
  const [gameOver, setGameOver] = useState(false);
  const [showGameOverAlert, setShowGameOverAlert] = useState(false);
  const restartButton = useRef<HTMLButtonElement>(null);
  const guessInput = useRef<HTMLInputElement>(null);
  const helpMenu = useRef<HTMLDialogElement>(null);
  const { darkMode, setDarkMode } = useTheme();

  const addGuess = (guess: string) => {
    if (!guess) return;
    if (gameOver) return;
    const value = parseInt(guess, 10);
    if (value < 0 || value > 360) return;
    setGuesses((prev) => [...prev, value]);
    setCurrentGuess("");
    if (guesses.length >= GAME_LENGTH - 1 || value === angle) {
      setGameOver(true);
      setShowGameOverAlert(true);
    }
  };

  const restartGame = () => {
    setAngle(randomAngle());
    setGuesses([]);
    setGameOver(false);
    setShowGameOverAlert(false);
  };

  const correct = guesses[guesses.length - 1] === angle;

  useEffect(() => {
    if (showGameOverAlert === true) {
      restartButton.current?.focus();
    } else {
      guessInput.current?.focus();
    }
  }, [showGameOverAlert]);

  useEffect(() => {
    setRotation(randomRotation());
    console.log(
      `%cThe answer is ${angle}!`,
      `
        font-size: 1.2rem;
        font-weight: bold;
        padding: 0.5rem;
        border: solid green 2px;
      `
    );
  }, [angle]);

  return (
    <>
      <nav>
        <h1>Angle</h1>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          <button onClick={() => helpMenu?.current?.show()}>
            <span role="img" aria-label="help">
              ❓
            </span>
          </button>
          <button onClick={() => setDarkMode((prev) => !prev)}>
            {darkMode ? "Light" : "Dark"} Theme&nbsp;
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button onClick={() => restartGame()}>
            <span role="img" aria-label="refresh">
              🔄
            </span>
          </button>
        </div>
      </nav>
      <Angle angle={angle} rotation={rotation} />
      <form
        className="guess-input"
        onSubmit={(e) => {
          e.preventDefault();
          addGuess(currentGuess);
        }}
      >
        <input
          autoFocus
          id="currentGuess"
          inputMode="numeric"
          type="number"
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
          disabled={gameOver}
          ref={guessInput}
        />
        <button type="submit" disabled={gameOver}>
          Guess!
        </button>
      </form>
      <p className="attempts">
        Attempts: {guesses.length}/{GAME_LENGTH}
      </p>
      <Guesses guesses={guesses} angle={angle} />
      <div
        style={{ display: showGameOverAlert ? "flex" : "none" }}
        className="alert"
      >
        <button
          onClick={() => setShowGameOverAlert(false)}
          className="close-button"
          style={{ alignSelf: "flex-end" }}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <span className="game-over-message">
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
          className="restart"
        >
          Restart?
        </button>
      </div>
      <dialog ref={helpMenu}>
        <div className="dialog-content">
          <button
            className="close-button"
            onClick={() => helpMenu?.current?.close()}
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
          <div className="example">
            <Angle angle={164} rotation={0} />
            <Guesses angle={164} guesses={[50, 120, 144, 168]} />
          </div>
          <p>
            The hint tells you how warm your guess was and the arrow tells you
            to guess higher or lower.
          </p>
          <p>The answer in this case was:</p>
          <div className="example">
            <Guesses angle={164} guesses={[164]} />
          </div>
        </div>
      </dialog>
    </>
  );
}
