import React, { useRef } from "react";
import Keyboard from "./Keyboard";
import GuessTiles from "./GuessTiles";
import useGuessesReducer from "./hooks/useGuessesReducer";
import useKeyEventListener from "./hooks/useKeyEventListener";
import "./App.css";

export default function App({ targetWord }) {
  const winDialogRef = useRef();
  const loseDialogRef = useRef();
  const {
    state: { guesses, currentGuessIndex, guessedLettersStatus },
    actions,
  } = useGuessesReducer({ targetWord });

  useKeyEventListener({
    onBackspaceKeypress: actions.backspaceKeypress,
    onEnterKeypress: actions.enterKeypress,
    onLetterKeypress: actions.typeLetter,
  });

  onWin({ targetWord, guesses, currentGuessIndex }, () => {
    setTimeout(() => {
      winDialogRef.current.show();
    }, 1200);
  });

  onLose({ targetWord, guesses, currentGuessIndex }, () => {
    setTimeout(() => {
      loseDialogRef.current.show();
    }, 1200);
  });

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

function onWin({ targetWord, guesses, currentGuessIndex }, cb) {
  const lastGuess = guesses[currentGuessIndex - 1];
  if (targetWord === lastGuess) {
    cb();
  }
}

function onLose({ targetWord, guesses, currentGuessIndex }, cb) {
  console.log({ targetWord, guesses, currentGuessIndex });
  if (currentGuessIndex < 6) return;
  const lastGuess = guesses[currentGuessIndex - 1];
  if (targetWord !== lastGuess) {
    cb();
  }
}
