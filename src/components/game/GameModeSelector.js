import { useContext } from "react";
import { context } from "../../context/context";

const GameModeSelector = ({ gameState, setGameState, handleReset }) => {
  const [state, setState] = useContext(context);

  const handleChange = (type) => {
    switch (type) {
      case "quotes": {
        handleReset(state.wordCount);
        setGameState({
          currentIndex: 0,
          sentence: undefined,
          gamemode: "quotes"
        });
        break;
      }
      case "funfacts": {
        handleReset(state.wordCount);
        setGameState({
          currentIndex: 0,
          sentence: undefined,
          gamemode: "funfacts"
        });
        break;
      }
      default: {
        handleReset(state.wordCount);
        setGameState({
          currentIndex: 0,
          sentence: undefined,
          gamemode: "default"
        });
      }
    }
    return;
  };

  return (
    <select
      id="select"
      onChange={(e) => {
        handleChange(e.target.value);
      }}
    >
      <option selected value={"default"}>
        Default
        {/* <span role="img" aria-label="Clock">
          ⏱
        </span> */} ⏱
      </option>
      <option value={"funfacts"}>
        Fun Facts
        {/* <span role="img" aria-label="Controller">
          🎮
        </span> */}{" "}
        🎮
      </option>
      <option value={"quotes"}>
        Quotes
        {/* <span role="img" aria-label="Pen">
          🖋️
        </span> */} 🖋️
      </option>
    </select>
  );
};

export default GameModeSelector;
