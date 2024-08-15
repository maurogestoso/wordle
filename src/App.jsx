import React from "react";
import "./App.css";

function App() {
  const targetWord = "apple";
  const [{ guesses, currentGuessIndex }, dispatch] = React.useReducer(
    guessesReducer,
    {
      currentGuessIndex: 0,
      guesses: [""],
    }
  );
  useKeyEventListener(dispatch);

  return (
    <>
      <div>
        <h1>Wordle</h1>
        <h2>Guesses:</h2>
        <ol>
          {guesses.map((guess, i) => (
            <li key={i}>
              <WordTiles
                word={guess}
                targetWord={targetWord}
                isGuessed={i !== currentGuessIndex}
              />
            </li>
          ))}
        </ol>
      </div>
    </>
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
      {word.split("").map((letter, i) => (
        <div
          key={i}
          className={[
            "Tile",
            isGuessed && `bg-${getGuessColor(targetWord, letter, i)}`,
          ].join(" ")}
        >
          {letter}
        </div>
      ))}
    </div>
  );
}

function guessesReducer(state, action) {
  let newGuesses;
  const currentGuess = state.guesses[state.currentGuessIndex];
  switch (action.type) {
    case "TYPE_LETTER":
      if (currentGuess.length === 5) return state;
      newGuesses = state.guesses.slice();
      newGuesses[state.currentGuessIndex] += action.payload;
      return { ...state, guesses: newGuesses };
    case "BACKSPACE":
      if (currentGuess.length === 0) return state;
      newGuesses = state.guesses.slice();
      newGuesses[state.currentGuessIndex] = currentGuess.slice(0, -1);
      return { ...state, guesses: newGuesses };
    case "GUESS_WORD":
      if (currentGuess.length !== 5) return state;
      newGuesses = state.guesses.slice();
      newGuesses.push("");
      return {
        ...state,
        currentGuessIndex: state.currentGuessIndex + 1,
        guesses: newGuesses,
      };
  }
  return state;
}

function useKeyEventListener(dispatch) {
  React.useEffect(() => {
    document.addEventListener("keyup", (event) => {
      console.log("🚀 ~ document.addEventListener ~ event.key:", event.key);
      if (event.key === "Backspace") return dispatch({ type: "BACKSPACE" });
      if (event.key === "Enter") return dispatch({ type: "GUESS_WORD" });
      if (/^[a-zA-Z]$/.test(event.key))
        return dispatch({ type: "TYPE_LETTER", payload: event.key });
    });
  }, []);
}
