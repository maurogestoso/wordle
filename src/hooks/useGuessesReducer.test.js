import { test, expect, describe } from "vitest";
import { guessesReducer, selectors } from "./useGuessesReducer";

describe("action = TYPE_LETTER", () => {
  test("adds letter to current guess", () => {
    const state = guessesReducer(
      {
        currentGuess: "app",
        guesses: [],
      },
      { type: "TYPE_LETTER", payload: "l" }
    );

    expect(state.currentGuess).toBe("appl");
  });

  test("doesn't add letter when guess is full", () => {
    const state = guessesReducer(
      {
        currentGuess: "apple",
        guesses: [],
      },
      { type: "TYPE_LETTER", payload: "a" }
    );

    expect(state.currentGuess).toBe("apple");
  });
});

describe("action = BACKSPACE", () => {
  test("removes the last letter from the current guess", () => {
    const state = guessesReducer(
      {
        currentGuess: "apple",
        guesses: [],
      },
      { type: "BACKSPACE" }
    );

    expect(state.currentGuess).toBe("appl");
  });
});

describe("action = ENTER_GUESS", () => {
  test("adds the current guess to the list of guesses and clears it", () => {
    const state = guessesReducer(
      {
        currentGuess: "apple",
        guesses: [],
      },
      { type: "ENTER_GUESS" }
    );

    expect(state.guesses).toEqual(["apple"]);
    expect(state.currentGuess).toBe("");
  });

  test("doesn't add the current guess when it's not long enough", () => {
    const state = guessesReducer(
      {
        currentGuess: "lem",
        guesses: ["apple"],
      },
      { type: "ENTER_GUESS" }
    );

    expect(state.guesses).toEqual(["apple"]);
  });
});

describe("selector = getLetterKeysStatus", () => {
  test("returns a map of the status of each guessed letter compared to the target word", () => {
    const state = guessesReducer({
      currentGuess: "",
      guesses: ["aaaaf", "bcggg"],
    });

    const letterKeysStatus = selectors.getLetterKeysStatus(
      state.guesses,
      "abcde"
    );

    expect(letterKeysStatus).toEqual({
      f: "absent",
      a: "present",
      b: "present",
      c: "present",
      g: "absent",
    });
  });
});
