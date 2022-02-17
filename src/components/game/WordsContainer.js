import { useContext, useEffect } from "react";
import { context } from "../../context/context";
import Results from "./Results";
import Words from "./Words";

const WordsContainer = ({ gameState }) => {
  const [state, setState] = useContext(context);

  useEffect(() => {
    if (!state.started) {
      let caret = document.querySelector(".caret");
      let char = Array.from(document.querySelectorAll(".character"))[
        gameState.currentIndex
      ];

      if (char !== undefined) {
        caret.style.top =
          char.getBoundingClientRect().top + window.scrollY + "px";
        caret.style.left = char.getBoundingClientRect().left.toString() + "px";
      }
    }
  });

  // when should component use fade-out animation? -> when resetting & when the game is finished

  return (
    <div className="words-container">
      <div className={state.caretHidden ? "caret fade-out" : "caret"} />
      {!state.finished ? <Words gameState={gameState} /> : <Results />}
    </div>
  );
};

export default WordsContainer;
