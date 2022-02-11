const GameModeSelect = () => {
  const handleChange = () => {
    return;
  };

  return (
    <select id="select" onChange={handleChange}>
      <option selected value={"default"}>
        Default
        {/* <span role="img" aria-label="Clock">
          ⏱
        </span> */} ⏱
      </option>
      <option value={"funFacts"}>
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

export default GameModeSelect;
