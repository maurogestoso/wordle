import "./GuessTiles.css";

export default function GuessTiles({ word = "", targetWord, isGuessed }) {
  const tiles = Array(5)
    .fill("")
    .map((_, i) => (
      <Tile
        key={i}
        guessStatus={isGuessed && getGuessStatus(targetWord, word[i], i)}
      >
        {word[i]}
      </Tile>
    ));
  return <div className="guess-tiles">{tiles}</div>;
}

function Tile({ children, guessStatus }) {
  return (
    <div
      className={["tile", guessStatus && `flip-tile-${guessStatus}`].join(" ")}
    >
      {children}
    </div>
  );
}

function getGuessStatus(targetWord, letter, index) {
  if (targetWord[index] === letter) return "correct";
  if (targetWord.includes(letter)) return "present";
  else return "absent";
}
