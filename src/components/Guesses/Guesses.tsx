const getDirectionIcon = (delta: number) => {
  if (delta < 0) return "⬇️";
  if (delta > 0) return "⬆️";
  return "🎉";
};

const getProximityIcon = (delta: number) => {
  const diff = Math.abs(delta);
  if (diff > 80) return "Freezing! 🥶";
  if (diff > 30) return "Cold! 🧊";
  if (diff > 10) return "Getting hot! ☀";
  if (diff > 0) return "Boiling! 🔥";
  return "Correct! 🥳";
};

interface GuessesProps {
  angle: number;
  guesses: number[];
}

export default function Guesses({ angle, guesses }: GuessesProps) {
  return (
    <div className="guesses">
      {guesses.map((value, i) => {
        const delta = angle - value;
        return (
          <div className={`guess ${delta === 0 ? "correct" : ""}`} key={i}>
            <span className="degree">{value}&deg;</span>
            <span className="direction">{getDirectionIcon(delta)}</span>
            <span className="proximity">{getProximityIcon(delta)}</span>
          </div>
        );
      })}
    </div>
  );
}
