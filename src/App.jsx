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
    <main>
      <h1>Wordle</h1>
      <p>Target word: {targetWord}</p>
      <h2>Guesses:</h2>
      <ol>
        {guesses.map((guess, i) => (
          <li key={i}>
            <WordTiles
              word={guess}
              isGuessed={i < currentGuessIndex}
              targetWord={targetWord}
            />
          </li>
        ))}
      </ol>
      <Keyboard
        guessedLettersStatus={guessedLettersStatus}
        typeLetter={actions.typeLetter}
      />
    </main>
  );
}

export default App;

function WordTiles({ word, isGuessed, targetWord }) {
  function getGuessColor(targetWord, letter, index) {
    if (targetWord[index] === letter) return "green";
    if (targetWord.includes(letter)) return "yellow";
    else return "gray";
  }
  return (
    <div className="WordTiles">
      {Array(5)
        .fill("")
        .map((_, i) => (
          <div
            key={i}
            className={[
              "Tile",
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
              className={
                guessedLettersStatus[letter]
                  ? `bg-${guessedLettersStatus[letter]}`
                  : "bg-white"
              }
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
