import { useContext, useLayoutEffect } from "react";
import { context } from "../../context/context";

const Caret = ({ gameState }) => {
  const [state, setState] = useContext(context);

  useLayoutEffect(() => {
    if (!state.finished) {
      let caret = document.querySelector(".caret");
      let lastIndex = gameState.sentence.spans.length - 1;
      let char;
      if (gameState.currentIndex <= lastIndex) {
        char = Array.from(document.querySelectorAll(".character"))[
          gameState.currentIndex
        ];
        caret.style.top =
          char.getBoundingClientRect().top + window.scrollY + "px";
        caret.style.left = char.getBoundingClientRect().left.toString() + "px";
      } else {
        char = Array.from(document.querySelectorAll(".character"))[lastIndex];
        caret.style.top =
          char.getBoundingClientRect().top + window.scrollY + "px";
        caret.style.left =
          (
            char.getBoundingClientRect().left +
            char.getBoundingClientRect().width
          ).toString() + "px";
      }
    }
  });

  return <div className={state.caretHidden ? "caret fade-out" : "caret"} />;
};

export default Caret;
