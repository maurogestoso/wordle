import React from "react";

export default function useKeyEventListener({
  onBackspaceKeypress,
  onEnterKeypress,
  onLetterKeypress,
}) {
  React.useEffect(() => {
    const listener = (event) => {
      if (event.key === "Backspace") return onBackspaceKeypress();
      if (event.key === "Enter") return onEnterKeypress();
      if (/^[a-zA-Z]$/.test(event.key)) return onLetterKeypress(event.key);
    };
    document.addEventListener("keyup", listener);

    return () => {
      document.removeEventListener("keyup", listener);
    };
  }, []);
}
