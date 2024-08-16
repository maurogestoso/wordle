import React from "react";
import Keyboard from "./Keyboard";
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
      <Keyboard guessedLettersStatus={guessedLettersStatus} {...actions} />
    </main>
  );
}

export default App;

function GuessTiles({ word, isGuessed, targetWord }) {
  function getGuessStatus(targetWord, letter, index) {
    if (targetWord[index] === letter) return "correct";
    if (targetWord.includes(letter)) return "present";
    else return "absent";
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
              isGuessed && `bg-${getGuessStatus(targetWord, word[i], i)}`,
            ].join(" ")}
          >
            {word[i]}
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
