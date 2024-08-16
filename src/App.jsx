import React from "react";
import useGuessesReducer from "./hooks/useGuessesReducer";
import useKeyEventListener from "./hooks/useKeyEventListener";
import "./App.css";

function App({ targetWord }) {
  const {
    state: { guesses, currentGuessIndex, guessedLettersStatus },
    actions,
  } = useGuessesReducer({ targetWord });

  useKeyEventListener({
    onBackspaceKeypress: actions.backspaceKeypress,
    onEnterKeypress: actions.enterKeypress,
    onLetterKeypress: actions.typeLetter,
  });

  handleWin(targetWord, guesses, currentGuessIndex);
  handleLose(targetWord, guesses, currentGuessIndex);

  return (
    <main id="board">
      <header>
        <h1>Wordle</h1>
      </header>
      <div id="guesses">
        {guesses.map((guess, i) => (
          <GuessTiles
            key={i}
            word={guess}
            isGuessed={i < currentGuessIndex}
            targetWord={targetWord}
          />
        ))}
      </div>
      <Keyboard
        guessedLettersStatus={guessedLettersStatus}
        typeLetter={actions.typeLetter}
      />
    </main>
  );
}

export default App;

function GuessTiles({ word, isGuessed, targetWord }) {
  function getGuessColor(targetWord, letter, index) {
    if (targetWord[index] === letter) return "green";
    if (targetWord.includes(letter)) return "yellow";
    else return "gray";
  }
  return (
    <div className="guess-tiles">
      {Array(5)
        .fill("")
        .map((_, i) => (
          <div
            key={i}
            className={[
              "tile",
              isGuessed && `bg-${getGuessColor(targetWord, word[i], i)}`,
            ].join(" ")}
          >
            {word[i]}
          </div>
        ))}
    </div>
  );
}

function Keyboard({ guessedLettersStatus, typeLetter }) {
  const keyRows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  return (
    <div id="Keyboard">
      {keyRows.map((row) => (
        <div key={row} className="row">
          {row.split("").map((letter) => (
            <button
              key={letter}
              className={[
                "letter-key",
                guessedLettersStatus[letter]
                  ? `bg-${guessedLettersStatus[letter]}`
                  : "bg-lightgray",
              ].join(" ")}
              onClick={() => {
                typeLetter(letter);
              }}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

function handleWin(targetWord, guesses, currentGuessIndex) {
  const lastGuess = guesses[currentGuessIndex - 1];
  if (targetWord === lastGuess) {
    setTimeout(() => {
      alert("You've won!");
      location.reload();
    }, 500);
  }
}

function handleLose(targetWord, guesses, currentGuessIndex) {
  if (currentGuessIndex < 6) return;
  const lastGuess = guesses[currentGuessIndex - 1];
  if (targetWord !== lastGuess) {
    setTimeout(() => {
      alert("You've lost!");
      location.reload();
    }, 500);
  }
}
