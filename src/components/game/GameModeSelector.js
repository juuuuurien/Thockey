const GameModeSelector = ({ gameState, setGameState }) => {
  const handleChange = (type) => {
    switch (type) {
      case "quotes": {
        setGameState({ ...gameState, sentence: undefined, gamemode: "quotes" });
        break;
      }
      case "funfacts": {
        setGameState({
          ...gameState,
          sentence: undefined,
          gamemode: "funfacts"
        });
        break;
      }
      default: {
        setGameState({
          ...gameState,
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
