import "./css/App.css";
import "./css/Game.css";
import "./css/mobile.css";
import { useContext, useEffect, useState, useRef } from "react";
import useKeyPress from "./hooks/useKeyPress";

import { generateSentence } from "./helpers/generateSentence";
import { spanify } from "./helpers/spanify";

import { context } from "./context/context";

import Words from "./components/game/WordsContainer";
import Button from "./components/global/Button";
import GameModeSelector from "./components/game/GameModeSelector";

import dayjs from "dayjs";

import { VscDebugRestart } from "react-icons/vsc";
import ResetLabel from "./components/game/ResetLabel";
import { finishAnimation } from "./helpers/finishAnimation";
import { generateQuotes } from "./helpers/generateQuotes";

const Game = () => {
  const [state, setState] = useContext(context);
  const [gameState, setGameState] = useState({
    gamemode: "default",
    sentence: undefined,
    currentIndex: 0
  });
  const timerRef = useRef();
  const stateRef = useRef();

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
    finishAnimation(state, setState, gameState.gamemode);
  };

  useEffect(() => {
    stateRef.current = state;
    let { sentence } = gameState;

    const init = async () => {
      let s;
      let a;
      if (gameState.gamemode === "quotes") {
        const [sentence, author] = generateQuotes();
        s = sentence;
        a = author;
      } else {
        s = generateSentence(state.wordCount, gameState.gamemode);
      }
      const [spans, string] = await spanify(s, gameState.gamemode);

      if (!sentence) {
        //set sentence state depending on gamemode
        if (gameState.gamemode === "quotes") {
          setGameState({
            ...gameState,
            sentence: { spans: spans, string: string, author: a }
          });
        } else {
          setGameState({
            ...gameState,
            sentence: { spans: spans, string: string }
          });
        }
      }
    };

    if (!sentence) init();
  });

  const startGame = () => {
    let { sentence } = gameState;
    let timeStart = dayjs();
    const frameRate = 500;
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

  const updateCharacterStyle = (type) => {
    let i = gameState.currentIndex;
    // grab all spans of character
    const spans = Array.from(document.querySelectorAll(".character"));
    switch (type) {
      case "correct": {
        spans[i].classList.add("right", "done");
        spans[i].classList.remove("wrong");
        setGameState({ ...gameState, currentIndex: i + 1 });
        break;
      }
      case "incorrect": {
        // remove the styles of the character before it, then decrement cursor
        if (i < spans.length) {
          spans[i].classList.add("wrong", "done");
          spans[i].classList.remove("right");

          setGameState({ ...gameState, currentIndex: i + 1 });
        }
        break;
      }
      case "Backspace": {
        if (i > 0) {
          spans[i - 1].classList.remove("right", "wrong", "done");
          setGameState({ ...gameState, currentIndex: i - 1 });
        }
        break;
      }
      default:
        return;
    }
  };

  useKeyPress(async (key) => {
    let { sentence, currentIndex } = gameState;
    const c = sentence.string[currentIndex];
    const i = currentIndex;

    // check key if it's an alpha or a control key
    if (key.length === 1 || key === "Backspace") {
      // if alpha -
      // start game if not started
      if (!state.started) {
        setState({ ...state, started: true });
        startGame();
      }

      //lets check wrong or right here.
      if (key !== "Backspace") {
        if (key === c) {
          updateCharacterStyle("correct");
        } else {
          updateCharacterStyle("incorrect");
        }
      } else {
        updateCharacterStyle("Backspace");
      }

      // if cursor is at the last letter and input is correct,
      //  finish the game
      if (i === sentence.spans.length - 1 && key === c) {
        handleFinished();
      }
    }
    if (key === "ResetMacro") {
      handleReset(state.wordCount);
    }
  });

  const handleReset = (words) => {
    // clear timer, reset all state to default.
    setGameState({ ...gameState, sentence: undefined, currentIndex: 0 });
    setState({
      started: false,
      finished: false,
      capslock: false,
      wpm: 0,
      msElapsed: 0,
      wordCount: words,
      accuracy: 0,
      settingStars: false,
      setting: false,
      caretHidden: false,
      quoteFinished: false,
      wpmData: [],
      msElapsedData: []
    });
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
              handleReset(state.wordCount);
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
              className={state.wordCount === 15 ? "selected" : "button"}
            >
              15
            </Button>
            <Button
              onClick={() => {
                handleReset(25);
              }}
              className={state.wordCount === 25 ? "selected" : "button"}
            >
              25
            </Button>
            <Button
              onClick={() => {
                handleReset(50);
              }}
              className={state.wordCount === 50 ? "selected" : "button"}
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
        {/* render sentence here VV*/}
        {gameState.sentence && <Words gameState={gameState} />}
        <GameModeSelector
          gameState={gameState}
          setGameState={setGameState}
          handleReset={handleReset}
        />
        <ResetLabel />
        <button
          onClick={() => {
            setState({ ...state, finished: !state.finished });
          }}
        >
          finish
        </button>
      </div>
      <div className="content-container" />
    </div>
  );
};

export default Game;
