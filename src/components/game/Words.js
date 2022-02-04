import { useContext } from "react";
import { context } from "../../context/context";
import Results from "./Results";

const Words = ({ gameState }) => {
  const [state, setState] = useContext(context);

  // when should component use fade-out animation? -> when resetting & when the game is finished
  return (
    <div>
      <div className={state.setting ? "sentence fade-out" : "sentence fade-in"}>
        {gameState.sentence && gameState.sentence.spans}
      </div>
    </div>
  );
};

export default Words;
