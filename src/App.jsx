import React, { useRef } from "react";
import Keyboard from "./Keyboard";
import GuessTiles from "./GuessTiles";
import useGuessesReducer, { selectors } from "./hooks/useGuessesReducer";
import useKeyEventListener from "./hooks/useKeyEventListener";
import "./App.css";

export default function App({ targetWord }) {
  const winDialogRef = useRef();
  const loseDialogRef = useRef();
  const { state, actions } = useGuessesReducer();

  useKeyEventListener({
    onBackspaceKeypress: actions.pressBackspace,
    onEnterKeypress: actions.enterGuess,
    onLetterKeypress: actions.typeLetter,
  });

  onWin({ targetWord, guesses: state.guesses }, () => {
    setTimeout(() => {
      winDialogRef.current.show();
    }, 1200);
  });

  onLose({ targetWord, guesses: state.guesses }, () => {
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
        {state.guesses.map((guess, i) => (
          <GuessTiles key={i} word={guess} targetWord={targetWord} isGuessed />
        ))}
        {state.guesses.length < 6 && (
          <GuessTiles
            key={"current-guess"}
            word={state.currentGuess}
            targetWord={targetWord}
          />
        )}
        {state.guesses.length < 5 &&
          Array(5 - state.guesses.length)
            .fill("")
            .map((_, i) => <GuessTiles key={`empty-${i}`} />)}
      </div>
      <Keyboard guesses={state.guesses} targetWord={targetWord} {...actions} />

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
