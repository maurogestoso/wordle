import React from "react";
import Keyboard from "./Keyboard";
import GuessTiles from "./GuessTiles";
import useGuessesReducer from "./hooks/useGuessesReducer";
import useKeyEventListener from "./hooks/useKeyEventListener";
import "./App.css";

export default function App({ targetWord }) {
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
            targetWord={targetWord}
            isGuessed={i < currentGuessIndex}
          />
        ))}
      </div>
      <Keyboard guessedLettersStatus={guessedLettersStatus} {...actions} />
    </main>
  );
}

function handleWin(targetWord, guesses, currentGuessIndex) {
  const lastGuess = guesses[currentGuessIndex - 1];
  if (targetWord === lastGuess) {
    setTimeout(() => {
      alert("You've won!");
      location.reload();
    }, 1500);
  }
}

function handleLose(targetWord, guesses, currentGuessIndex) {
  if (currentGuessIndex < 6) return;
  const lastGuess = guesses[currentGuessIndex - 1];
  if (targetWord !== lastGuess) {
    setTimeout(() => {
      alert("You've lost!");
      location.reload();
    }, 1500);
  }
}
