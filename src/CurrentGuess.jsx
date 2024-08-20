import React, { useState } from "react";
import GuessTiles from "./GuessTiles";

export default function CurrentGuess({ onEnterKeypress }) {
  const [guess, setGuess] = useState("");

  React.useEffect(() => {
    function keyListener(event) {
      if (event.key === "Backspace") {
        return setGuess((guess) => guess.slice(0, -1));
      } else if (event.key === "Enter") {
        if (guess.length < 5) return;
        onEnterKeypress(guess);
        setGuess("");
        return;
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        if (guess.length === 5) return;
        const letter = event.key.toLowerCase();
        return setGuess((guess) => guess + letter);
      }
    }

    document.addEventListener("keyup", keyListener);

    return () => {
      document.removeEventListener("keyup", keyListener);
    };
  }, [guess]);

  return <GuessTiles word={guess} />;
}
