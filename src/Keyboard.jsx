import { selectors } from "./hooks/useGuessesReducer";
import "./Keyboard.css";

export default function Keyboard({
  guesses,
  targetWord,
  enterKeypress,
  typeLetter,
  backspaceKeypress,
}) {
  const keyRows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  const guessedLettersStatus = selectors.getLetterKeysStatus(
    guesses,
    targetWord
  );
  return (
    <div id="Keyboard">
      {keyRows.map((row, rowIdx) => (
        <div key={row} className="row">
          {rowIdx === 2 && (
            <button className="key action-key" onClick={() => enterKeypress()}>
              Enter
            </button>
          )}
          {row.split("").map((letter) => (
            <button
              key={letter}
              className={[
                "key letter-key",
                guessedLettersStatus[letter] &&
                  `bg-${guessedLettersStatus[letter]}`,
              ].join(" ")}
              onClick={() => {
                typeLetter(letter);
              }}
            >
              {letter}
            </button>
          ))}
          {rowIdx === 2 && (
            <button
              className="key action-key"
              onClick={() => backspaceKeypress()}
            >
              ⇤
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
