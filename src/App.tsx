import { useEffect, useRef, useState } from "react";
import "./index.scss";
import Angle from "./components/Angle/Angle";
import Guesses from "./components/Guesses/Guesses";
import HelpMenu from "./components/HelpMenu/HelpMenu";
import Toolbar from "./components/Toolbar/Toolbar";
import Alert from "./components/Alert/Alert";

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
  const helpMenuRef = useRef<HTMLDialogElement>(null);

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
        <Toolbar helpMenuRef={helpMenuRef} restartGame={restartGame} />
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
      <Alert
        showGameOverAlert={showGameOverAlert}
        setShowGameOverAlert={setShowGameOverAlert}
        correct={correct}
        angle={angle}
        restartButton={restartButton}
        restartGame={restartGame}
      />
      <HelpMenu helpMenuRef={helpMenuRef} />
    </>
  );
}
