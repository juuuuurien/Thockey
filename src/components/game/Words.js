import React, { useContext } from "react";
import { context } from "../../context/context";
import Button from "../global/Button";
import Caret from "./Caret";

const Words = ({ gameState }) => {
  const [state, setState] = useContext(context);

  // when should component use fade-out animation? -> when resetting & when the game is finished
  // maybe make a helper function that sets state to setting and then sets it back after a while
  // as a reusable animation function

  return (
    <div>
      <div className={state.setting ? "sentence fade-out" : "sentence fade-in"}>
        {gameState.gamemode === "funfacts" && (
          <div className="fact-prefix">Did you know -</div>
        )}
        {gameState.gamemode === "quotes" && (
          <span className="quote-wrapper">{`“ `}</span>
        )}
        {/* -- ACTUAL SPANS -- */}
        {gameState.sentence && gameState.sentence.spans}
        {/* -- ACTUAL SPANS -- */}
        {gameState.gamemode === "quotes" && (
          <span className="quote-wrapper">{` ”`}</span>
        )}
        {
          <div
            className={
              state.quoteFinished
                ? "quote-wrapper author author-fade-in"
                : "quote-wrapper author fade-out"
            }
          >
            {gameState.sentence &&
              gameState.gamemode === "quotes" &&
              ` - ${gameState.sentence.author}`}
          </div>
        }
      </div>
    </div>
  );
};

export default Words;
