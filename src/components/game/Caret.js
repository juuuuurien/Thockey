import { computeHeadingLevel } from "@testing-library/react";
import React, { useContext, useLayoutEffect, useState } from "react";
import { context } from "../../context/context";

const Caret = ({ gameState }) => {
  const [state, setState] = useContext(context);
  const [scrollY, setScrollY] = useState(window.scrollY);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setScrollY(scrollY);
  };

  useLayoutEffect(() => {
    let caret = document.querySelector(".caret");
    let lastIndex = gameState.sentence.spans.length - 1;
    let char;
    let caret_top;
    let caret_left;

    window.addEventListener("scroll", handleScroll);

    if (!state.finished) {
      if (gameState.currentIndex <= lastIndex) {
        char = Array.from(document.querySelectorAll(".character"))[
          gameState.currentIndex
        ];
        caret_left = char.getBoundingClientRect().left.toString() + "px";
        caret_top =
          (char.getBoundingClientRect().top + scrollY).toString() + "px";
        console.log(char.getBoundingClientRect().top + scrollY);
      } else {
        char = Array.from(document.querySelectorAll(".character"))[lastIndex];
        caret_top = char.getBoundingClientRect().top + scrollY + "px";
        caret_left =
          (
            char.getBoundingClientRect().left +
            char.getBoundingClientRect().width
          ).toString() + "px";
      }
    }

    return () => {
      caret.style.top = caret_top;
      caret.style.left = caret_left;
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return <div className={state.setting ? "caret fade-out" : "caret"} />;
};

export default Caret;
