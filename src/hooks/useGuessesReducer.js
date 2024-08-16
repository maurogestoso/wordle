import React from "react";

export default function useGuessesReducer({ targetWord }) {
  const [state, dispatch] = React.useReducer(reducer, {
    currentGuessIndex: 0,
    guesses: ["", "", "", "", "", ""],
    guessedLettersStatus: {},
    targetWord,
  });

  return {
    state,
    actions: {
      typeLetter: (letter) =>
        dispatch({ type: "TYPE_LETTER", payload: letter }),
      enterKeypress: () => dispatch({ type: "GUESS_WORD" }),
      backspaceKeypress: () => dispatch({ type: "BACKSPACE" }),
    },
    dispatch,
  };
}

export function reducer(state, action) {
  let newGuesses;
  let newGuessedLettersStatus;
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
      const { targetWord } = state;
      newGuessedLettersStatus = { ...state.guessedLettersStatus };
      currentGuess.split("").forEach((letter, i) => {
        if (targetWord[i] === letter) newGuessedLettersStatus[letter] = "green";
        else if (targetWord.includes(letter))
          newGuessedLettersStatus[letter] = "yellow";
        else newGuessedLettersStatus[letter] = "gray";
      });
      return {
        ...state,
        currentGuessIndex: state.currentGuessIndex + 1,
        guessedLettersStatus: newGuessedLettersStatus,
      };
  }
  return state;
}
