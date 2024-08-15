import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const words = [
  "apple",
  "grape",
  "mango",
  "peach",
  "berry",
  "lemon",
  "melon",
  "plums",
  "pearl",
  "beach",
];

const targetWord = words.at(Math.floor(Math.random() * words.length));

createRoot(document.getElementById("root")).render(
  <App targetWord={targetWord} />
);
