import "./App.css";
import { useContext, useEffect, useState } from "react";
import useKeyPress from "./hooks/useKeyPress";
import { generateSentence } from "./helpers/generateSentence";
import { spanify } from "./helpers/spanify";
import { context } from "./context";
import { VscDebugRestart } from "react-icons/vsc";

const Game = () => {
  const [state, setState] = useContext(context);
  const [sentence, setSentence] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleResize = () => {
    // fix caret depending on window
    let caret = document.querySelector(".caret");
    let char = Array.from(document.querySelectorAll(".character"))[
      currentIndex
    ].getBoundingClientRect();
    caret.style.top = char.top.toString() + "px";
    caret.style.left = (char.left + char.width).toString() + "px";
  };

  useEffect(async () => {
    //set sentence into state
    const s = generateSentence();
    const spans = await spanify(s);
    if (!sentence) setSentence(spans);
    if (sentence && !state.started) {
      let char = Array.from(document.querySelectorAll(".caret"))[0];
      char.classList.add("blink");
    }
    window.addEventListener("resize", handleResize);
  }, [sentence]);

  const updateCaret = (type) => {
    let caret = document.querySelector(".caret");
    let sent = Array.from(document.querySelectorAll(".character"));
    switch (type) {
      case "forward": {
        //get correct node, move position accordingly
        if (currentIndex < sentence.length) {
          let char = sent[currentIndex].getBoundingClientRect();
          // caret.style.transform = `translateX(${char.left + char.width}px)`;
          caret.style.top = char.top.toString() + "px";
          caret.style.left = (char.left + char.width).toString() + "px";
        }

        return;
      }
      case "back": {
        if (sent[currentIndex - 2]) {
          let char = sent[currentIndex - 2].getBoundingClientRect();
          caret.style.top = char.top.toString() + "px";
          caret.style.left = (char.left + char.width).toString() + "px";
        } else {
          let char = sent[0].getBoundingClientRect();
          caret.style.top = char.top.toString() + "px";
          caret.style.left = char.left.toString() + "px";
        }

        return;
      }
      default:
        return;
    }
  };

  const updateCharacterStyle = async (key, currentChar) => {
    let sent = Array.from(document.querySelectorAll(".character"));

    let char = sent[currentIndex];
    const prevChar = sent[currentIndex - 1];
    let type;

    if (!state.started) {
      setState({ ...state, started: true });
      document.querySelector(".caret").classList.remove("blink");
    }

    if (key === currentChar && key !== "Backspace") {
      updateCaret("forward");
      type = "right";
    } else {
      updateCaret("forward");

      type = "wrong";
    }

    if (key === "Backspace") {
      updateCaret("back");
      type = "delete";
    }

    switch (type) {
      case "right": {
        if (currentIndex !== sentence.length) setCurrentIndex(currentIndex + 1);
        if (char) char.classList.add("right");
        return;
      }
      case "wrong": {
        if (currentIndex !== sentence.length) setCurrentIndex(currentIndex + 1);
        if (char) char.classList.add("wrong");
        return;
      }
      case "delete": {
        if (prevChar) {
          prevChar.classList.remove("right", "wrong");
          setCurrentIndex(currentIndex - 1);
        }
        return;
      }

      default:
        return;
    }
  };

  useKeyPress(async (key) => {
    updateCaret();
    let currentChar = sentence[0].props.children;
    if (currentIndex < sentence.length)
      currentChar = sentence[currentIndex].props.children;
    await updateCharacterStyle(key, currentChar);

    if (currentIndex === sentence.length - 1 && key === currentChar) {
      alert("DONE");
    }
  });

  return (
    <div>
      <div className="game_container">
        <div className="words">
          <div className="caret" />
          <div>{sentence && sentence}</div>
        </div>
        <div
          className="restart"
          onClick={() => {
            setCurrentIndex(0);
            setSentence("");
            setState({ ...state, started: false });
            document.querySelector(".caret").style.left = null;
            document.querySelector(".caret").style.top = null;
          }}
        >
          <VscDebugRestart color="#82b0be" />
        </div>
      </div>
    </div>
  );
};

export default Game;
