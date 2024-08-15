import React from "react";
import "./App.css";

function App() {
  React.useEffect(() => {
    document.addEventListener("keyup", (event) => {
      console.log("🚀 ~ document.addEventListener ~ event.key:", event.key);
      if (event.key === "Backspace") return dispatch({ type: "BACKSPACE" });
      if (event.key === "Enter") return dispatch({ type: "GUESS_WORD" });
      if (/^[a-zA-Z]$/.test(event.key))
        return dispatch({ type: "TYPE_LETTER", payload: event.key });
    });
  }, []);

  const targetWord = "apple";

  const [{ guesses }, dispatch] = React.useReducer(guessesReducer, {
    currentGuessIndex: 0,
    guesses: [""],
  });

  // state: guesses = string[]
  return (
    <>
      <div>
        <h1>Wordle</h1>
        <h2>Guesses:</h2>
        <ol>
          {guesses.map((guess, i) => (
            <li key={i}>{guess}</li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;

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
