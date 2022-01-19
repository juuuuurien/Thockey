import "./App.css";
import { useContext, useEffect, useState, useRef } from "react";
import useKeyPress from "./hooks/useKeyPress";
import { generateSentence } from "./helpers/generateSentence";
import { spanify } from "./helpers/spanify";
import { context } from "./context/context";
import { VscDebugRestart } from "react-icons/vsc";
import dayjs from "dayjs";

const Game = () => {
  const [state, setState] = useContext(context);
  const [sentence, setSentence] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  // const timerRef = useRef();

  const handleResize = () => {
    // fix caret depending on window
    let caret = document.querySelector(".caret");
    let charWinPosition = Array.from(document.querySelectorAll(".character"))[
      currentIndex
    ].getBoundingClientRect();
    caret.style.top = charWinPosition.top.toString() + "px";
    caret.style.left = charWinPosition.left.toString() + "px";
  };

  useEffect(() => {
    const init = async () => {
      //set sentence into state
      const s = generateSentence();
      const [spans, string] = await spanify(s);
      if (!sentence) setSentence({ spans: spans, string: string });
      if (sentence && !state.started) {
        let caret = document.querySelector(".caret");
        caret.classList.add("blink");
      }
    };

    init();
    window.onresize = handleResize;
  });

  const startGame = () => {
    let timeStart = dayjs();
    let cstart = 0;
    const timer = setInterval(() => {
      let wordArr = sentence.string.split(" ");
      let arr = Array.from(document.querySelectorAll(".done"));
      let timeNow = dayjs();
      let msElapsed = timeNow.diff(timeStart, "ms");
      let cnow = arr.length;
      let cdiff = cnow - cstart;

      if (arr.length > 0) {
        let str = "";
        let right = 0;
        let words = [];
        for (let i = 0; i < arr.length; i++ && str.length > 0) {
          if (arr[i].classList.contains("right")) {
            str += sentence.string[i];
          }
          words = str.split(" ");
        }
        words.forEach((word) => {
          if (wordArr.includes(word.trim())) right++;
        });

        let _wpm = (right * 60 * 1000) / msElapsed;
        let cps = (arr.length / msElapsed) * 1000;

        cstart = cnow;
        console.log(cstart);
        setState({
          ...state,
          started: true,
          wpm: _wpm,
          cps: cps,
          msElapsed: msElapsed,
        });
        // setState({ ...state, started: true, cps: cps });
      }
    }, 500);
  };

  const updateCaret = (type) => {
    let caret = document.querySelector(".caret");
    let sent = Array.from(document.querySelectorAll(".character"));
    switch (type) {
      case "forward": {
        //get correct node, move position accordingly
        if (currentIndex < sentence.spans.length) {
          let char = sent[currentIndex].getBoundingClientRect();
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
    // console.log(key);
    let sent = Array.from(document.querySelectorAll(".character"));

    let char = sent[currentIndex];
    const prevChar = sent[currentIndex - 1];
    let type;

    if (key === currentChar && key !== "Backspace") {
      // console.log(
      //   "RIGHT Key was " + key + " and currentChar was " + currentChar
      // );
      updateCaret("forward");
      type = "right";
    } else {
      // console.log(
      //   "WRONG Key was " + key + " and currentChar was " + currentChar
      // );
      updateCaret("forward");
      type = "wrong";
    }

    if (key === "Backspace") {
      updateCaret("back");
      type = "delete";
    }

    switch (type) {
      case "right": {
        // console.log("updating right for key " + key);
        if (currentIndex !== sentence.spans.length)
          if (char) {
            char.classList.remove("wrong");
            char.classList.add("right", "done");
            setCurrentIndex(currentIndex + 1);
          }
        return;
      }
      case "wrong": {
        // console.log("updating wrong for key " + key);
        if (char) {
          char.classList.remove("right");
          char.classList.add("wrong", "done");
          setCurrentIndex(currentIndex + 1);
        }
        return;
      }
      case "delete": {
        if (prevChar) {
          prevChar.classList.remove("right", "wrong", "done");
          setCurrentIndex(currentIndex - 1);
        }
        return;
      }

      default:
        return;
    }
  };

  useKeyPress(async (key) => {
    if (!state.started) {
      setState({ ...state, started: true });
      startGame();
    }
    updateCaret();
    let currentChar = sentence.spans[0].props.children;
    if (currentIndex < sentence.spans.length)
      currentChar = sentence.spans[currentIndex].props.children;
    await updateCharacterStyle(key, currentChar);

    if (currentIndex === sentence.spans.length - 1 && key === currentChar) {
      alert("DONE");
    }
  });

  return (
    <div>
      <div className="game_container">
        <div style={{ color: "white", fontSize: "1rem" }}>
          WPM: {Math.ceil(state.wpm)}
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
        <div className="words">
          <div className="caret" />
          <div>{sentence && sentence.spans}</div>
        </div>
      </div>
    </div>
  );
};

export default Game;
