import "./App.css";
import "./Game.css";
import { useContext, useEffect, useState, useRef } from "react";
import useKeyPress from "./hooks/useKeyPress";

import { generateSentence } from "./helpers/generateSentence";
import { spanify } from "./helpers/spanify";
import { handleResize } from "./helpers/handleResize";

import { context } from "./context/context";

import Words from "./components/game/WordsContainer";
import Button from "./components/global/Button";
import GameModeSelector from "./components/game/GameModeSelector";

import dayjs from "dayjs";

import { VscDebugRestart } from "react-icons/vsc";

const Game = () => {
  const [state, setState] = useContext(context);

  const [gameState, setGameState] = useState({
    gamemode: "default",
    sentence: undefined,
    currentIndex: 0
  });
  const timerRef = useRef();
  const stateRef = useRef();

  const calculateAccuracy = () => {
    const wrongCount = Array.from(document.querySelectorAll(".wrong")).length;
    const charCount = Array.from(document.querySelectorAll(".character"))
      .length;

    return Math.ceil(((charCount - wrongCount) / charCount) * 100 * 10) / 10;
  };

  const handleFinished = () => {
    clearInterval(timerRef.current);
    let { sentence } = gameState;
    let wordArr = sentence.string.split(" ");
    let arr = Array.from(document.querySelectorAll(".done"));
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

      let _wpm = Math.ceil((right * 60 * 1000) / state.msElapsed);

      setState({
        ...state,
        wpm: _wpm
      });
    }
    //trigger fade animations
    const timer1 = setTimeout(() => {
      setState({ ...state, setting: true, caretHidden: true });
      const timer2 = setTimeout(() => {
        setState({
          ...state,
          setting: false,
          finished: true,
          caretHidden: true,
          accuracy: calculateAccuracy()
        });
        return clearTimeout(timer2);
      }, 150);
      return clearTimeout(timer1);
    }, 600);
  };

  useEffect(() => {
    console.log(gameState);
    stateRef.current = state;
    let { sentence } = gameState;

    const init = async () => {
      const s = generateSentence(state.numWords, gameState.gamemode);
      const [spans, string] = await spanify(s);

      if (!sentence)
        setGameState({
          ...gameState,
          sentence: { spans: spans, string: string }
        });

      if (sentence && !state.started) {
        let caret = document.querySelector(".caret");
        caret.classList.add("blink");
      }
    };

    if (!sentence) init();

    window.onresize = handleResize(gameState);
  }, [gameState.sentence, gameState.gamemode]);

  const startGame = () => {
    let { sentence } = gameState;
    let timeStart = dayjs();
    const frameRate = 1000;
    let wpmData = [];
    let msElapsedData = [];

    const timer = setInterval(() => {
      let wordArr = sentence.string.split(" ");

      let timeNow = dayjs();
      let msElapsed = timeNow.diff(timeStart, "ms");
      let arr = Array.from(document.querySelectorAll(".done"));
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

        let _wpm = Math.ceil((right * 60 * 1000) / msElapsed);

        if (msElapsed > 1000) {
          wpmData.push(_wpm);
          msElapsedData.push(Math.floor(msElapsed / 10) * 10);
        }

        setState({
          ...stateRef.current,
          started: true,
          wpm: _wpm,
          msElapsed: msElapsed,
          wpmData: wpmData,
          msElapsedData: msElapsedData
        });
      }
    }, frameRate);

    timerRef.current = timer;
  };

  const updateCaret = (type) => {
    let { sentence, currentIndex } = gameState;
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
    updateCaret();
    let { sentence, currentIndex } = gameState;
    let sent = Array.from(document.querySelectorAll(".character"));

    let char = sent[currentIndex];
    const prevChar = sent[currentIndex - 1];
    let type;

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
        if (currentIndex !== sentence.spans.length)
          if (char) {
            char.classList.remove("wrong");
            char.classList.add("right", "done");
            setGameState({ ...gameState, currentIndex: currentIndex + 1 });
          }
        return;
      }
      case "wrong": {
        if (char) {
          char.classList.remove("right");
          char.classList.add("wrong", "done");
          setGameState({ ...gameState, currentIndex: currentIndex + 1 });
        }
        return;
      }
      case "delete": {
        if (prevChar) {
          prevChar.classList.remove("right", "wrong", "done");
          setGameState({ ...gameState, currentIndex: currentIndex - 1 });
        }
        return;
      }

      default:
        return;
    }
  };

  useKeyPress(async (key) => {
    let { sentence, currentIndex } = gameState;

    if (key.length === 1 || key === "Backspace") {
      if (!state.started) {
        setState({ ...state, started: true });
        startGame();
      }
      let currentChar = sentence.spans[0].props.children;
      if (currentIndex < sentence.spans.length)
        currentChar = sentence.spans[currentIndex].props.children;
      await updateCharacterStyle(key, currentChar);

      if (currentIndex === sentence.spans.length - 1 && key === currentChar) {
        handleFinished();
      }
    }
    if (key === "ResetMacro") {
      handleReset(state.numWords);
    }
  });

  const handleReset = (words) => {
    // fade animation to reset canvas.
    // clear timer, reset all state to default.

    setGameState({ ...gameState, sentence: undefined, currentIndex: 0 });

    setState({
      started: false,
      finished: false,
      capslock: false,
      wpm: 0,
      cps: 0,
      msElapsed: 0,
      numWords: words,
      accuracy: 0,
      setting: false,
      caretHidden: false,
      wpmData: [],
      msElapsedData: []
    });

    document.querySelector(".caret").classList.remove("hidden");
    document.querySelector(".caret").style.left = null;
    document.querySelector(".caret").style.top = null;
    clearInterval(timerRef.current);
  };

  return (
    <div className="game-container">
      <div className="content-container">
        <div className="button-container">
          <Button
            round
            icon={<VscDebugRestart color="#f5ef7a" />}
            className="restart"
            onClick={() => {
              handleReset(state.numWords);
            }}
          />
          <div
            className={
              gameState.gamemode === "default"
                ? "button-container"
                : "button-container disabled"
            }
          >
            <Button
              onClick={() => {
                handleReset(15);
              }}
              className={state.numWords === 15 ? "selected" : "button"}
            >
              15
            </Button>
            <Button
              onClick={() => {
                handleReset(25);
              }}
              className={state.numWords === 25 ? "selected" : "button"}
            >
              25
            </Button>
            <Button
              onClick={() => {
                handleReset(50);
              }}
              className={state.numWords === 50 ? "selected" : "button"}
            >
              50
            </Button>
          </div>
        </div>
      </div>
      <div className="words-content-container">
        {!state.finished && (
          <div style={{ color: "rgb(227, 237, 255)", fontSize: "1rem" }}>
            WPM: {state.wpm}
            <span className="capslock">
              {state.capslock === true && "CapsLock is on"}
            </span>
          </div>
        )}
        <Words gameState={gameState} />
        <div id="reset-label">
          <GameModeSelector gameState={gameState} setGameState={setGameState} />
          <span id="key">alt</span> + <span id="key">enter</span> to reset
        </div>
      </div>
      <div className="content-container" />
    </div>
  );
};

export default Game;
