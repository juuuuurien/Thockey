import { useContext } from "react";
import { context } from "../../context/context";

const GameModeSelector = ({ gameState, setGameState, handleReset }) => {
  const [state, setState] = useContext(context);

  const handleClick = (type) => {
    let count = state.wordCount;
    handleReset(count);
    setGameState({
      currentIndex: 0,
      sentence: undefined,
      gamemode: type
    });
  };

  return (
    //  change state based on which is selected

    <div style={{ float: "right", fontSize: "1.4rem" }}>
      <span
        className={
          gameState.gamemode === "default" ? "emoji selected" : "emoji"
        }
        role="img"
        aria-label="emoji"
        onClick={() => {
          handleClick("default");
        }}
      >
        ⌨️
      </span>
      <span
        className={
          gameState.gamemode === "funfacts" ? "emoji selected" : "emoji"
        }
        role="img"
        aria-label="emoji"
        onClick={() => {
          handleClick("funfacts");
        }}
      >
        💡
      </span>
      <span
        className={gameState.gamemode === "quotes" ? "emoji selected" : "emoji"}
        role="img"
        aria-label="emoji"
        onClick={() => {
          handleClick("quotes");
        }}
      >
        🗣
      </span>
    </div>
  );
};

export default GameModeSelector;
