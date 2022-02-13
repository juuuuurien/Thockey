import { useContext } from "react";
import { context } from "../../context/context";
import Results from "./Results";

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
          <span className="quote-wrapper">{`" `}</span>
        )}
        {gameState.sentence && gameState.sentence.spans}

        {gameState.gamemode === "quotes" && (
          <span className="quote-wrapper">{` "`}</span>
        )}
      </div>
    </div>
  );
};

export default Words;
