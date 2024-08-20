import React, { useRef, useState } from "react";
import Keyboard from "./Keyboard";
import GuessTiles from "./GuessTiles";
import "./App.css";
import CurrentGuess from "./CurrentGuess";

export default function App({ targetWord }) {
  const winDialogRef = useRef();
  const loseDialogRef = useRef();
  const [guesses, setGuesses] = useState([]);

  const hasWon = guesses.at(-1) === targetWord;
  const hasLost = guesses.length === 6 && guesses.at(-1) !== targetWord;

  if (hasWon) {
    setTimeout(() => {
      winDialogRef.current.show();
    }, 1200);
  }

  if (hasLost) {
    setTimeout(() => {
      loseDialogRef.current.show();
    }, 1200);
  }

  return (
    <main id="board">
      <header>
        <h1>Wordle</h1>
      </header>
      <div id="guesses">
        {guesses.map((guess, i) => (
          <GuessTiles key={i} word={guess} targetWord={targetWord} isGuessed />
        ))}
        {guesses.length < 6 && (
          <CurrentGuess
            onEnterKeypress={(guess) => {
              setGuesses(guesses.concat(guess));
            }}
          />
        )}
        {guesses.length < 5 &&
          Array(5 - guesses.length)
            .fill("")
            .map((_, i) => <GuessTiles key={`empty-${i}`} />)}
      </div>

      <Keyboard guesses={guesses} targetWord={targetWord} />

      <dialog ref={winDialogRef}>
        You've won!
        <button
          onClick={() => {
            winDialogRef.current.close();
            location.reload();
          }}
        >
          Play again
        </button>
      </dialog>

      <dialog ref={loseDialogRef}>
        You've lost!
        <button
          onClick={() => {
            loseDialogRef.current.close();
            location.reload();
          }}
        >
          Play again
        </button>
      </dialog>
    </main>
  );
}

function onWin({ targetWord, guesses }, cb) {
  const lastGuess = guesses.at(-1);
  if (targetWord === lastGuess) {
    cb();
  }
}

function onLose({ targetWord, guesses }, cb) {
  if (guesses.length < 6) return;
  const lastGuess = guesses.at(-1);
  if (targetWord !== lastGuess) {
    cb();
  }
}
