import "./Keyboard.css";

export default function Keyboard({ guesses, targetWord }) {
  const keyRows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  const guessedLettersStatus = getLetterKeysStatus(guesses, targetWord);

  return (
    <div id="Keyboard">
      {keyRows.map((row, rowIdx) => (
        <div key={row} className="row">
          {rowIdx === 2 && <EnterKey />}
          {row.split("").map((letter) => (
            <LetterKey
              key={letter}
              letter={letter}
              status={guessedLettersStatus[letter]}
            />
          ))}
          {rowIdx === 2 && <BackspaceKey />}
        </div>
      ))}
    </div>
  );
}

function getLetterKeysStatus(guesses, targetWord) {
  return guesses.reduce((acc, guess) => {
    guess.split("").forEach((letter, i) => {
      if (!targetWord.includes(letter)) acc[letter] = "absent";
      else if (targetWord[i] === letter) acc[letter] = "correct";
      else acc[letter] = "present";
    });
    return acc;
  }, {});
}

function EnterKey() {
  return (
    <button
      className="key action-key"
      onClick={() => {
        const event = new KeyboardEvent("keyup", { key: "Enter" });
        document.dispatchEvent(event);
      }}
    >
      Enter
    </button>
  );
}

function BackspaceKey() {
  return (
    <button
      className="key action-key"
      onClick={() => {
        const event = new KeyboardEvent("keyup", { key: "Backspace" });
        document.dispatchEvent(event);
      }}
    >
      ⇤
    </button>
  );
}

function LetterKey({ letter, status }) {
  return (
    <button
      key={letter}
      className={["key letter-key", status ? `bg-${status}` : ""].join(" ")}
      onClick={() => {
        const event = new KeyboardEvent("keyup", { key: letter });
        document.dispatchEvent(event);
      }}
    >
      {letter}
    </button>
  );
}
