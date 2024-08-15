import React from "react";
import "./App.css";

function App({ targetWord }) {
  const [{ guesses, currentGuessIndex }, dispatch] = React.useReducer(
    guessesReducer,
    {
      currentGuessIndex: 0,
      guesses: ["", "", "", "", "", ""],
    }
  );
  useKeyEventListener(dispatch);

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
              targetWord={targetWord}
              isGuessed={i < currentGuessIndex}
            />
          </li>
        ))}
      </ol>
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
      return {
        ...state,
        currentGuessIndex: state.currentGuessIndex + 1,
      };
  }
  return state;
}

function useKeyEventListener(dispatch) {
  React.useEffect(() => {
    const listener = (event) => {
      console.log("🚀 ~ document.addEventListener ~ event.key:", event.key);
      if (event.key === "Backspace") return dispatch({ type: "BACKSPACE" });
      if (event.key === "Enter") return dispatch({ type: "GUESS_WORD" });
      if (/^[a-zA-Z]$/.test(event.key))
        return dispatch({ type: "TYPE_LETTER", payload: event.key });
    };
    document.addEventListener("keyup", listener);

    return () => {
      document.removeEventListener("keyup", listener);
    };
  }, []);
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
