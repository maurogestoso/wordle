import React, { useReducer } from "react";

export default function useGuessesReducer() {
  const [state, dispatch] = useReducer(guessesReducer, {
    currentGuess: "",
    guesses: [],
  });

  return {
    state,
    actions: {
      typeLetter: (letter) =>
        dispatch({ type: "TYPE_LETTER", payload: letter }),
      enterGuess: () => dispatch({ type: "ENTER_GUESS" }),
      pressBackspace: () => dispatch({ type: "BACKSPACE" }),
    },
  };
}

export function guessesReducer(state, action = { type: "UNKNOWN" }) {
  switch (action.type) {
    case "TYPE_LETTER":
      if (state.currentGuess.length === 5) return state;
      return { ...state, currentGuess: state.currentGuess + action.payload };
    case "BACKSPACE":
      return { ...state, currentGuess: state.currentGuess.slice(0, -1) };
    case "ENTER_GUESS":
      if (state.currentGuess.length < 5) return state;
      return {
        ...state,
        guesses: [...state.guesses, state.currentGuess],
        currentGuess: "",
      };
    default:
      return state;
  }
  return state;
}

export const selectors = {
  getLetterKeysStatus,
};

function getLetterKeysStatus(guesses, targetWord) {
  return guesses.reduce((acc, guess) => {
    guess.split("").forEach((letter, i) => {
      if (!targetWord.includes(letter)) acc[letter] = "absent";
      else if (targetWord[i] === letter) acc[letter] = "correct";
      else acc[letter] = "present";
    });
    return acc;
  }, {});
}
