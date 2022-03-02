export const spanify = async (s, gamemode) => {
  let string = s;
  const spans = s.split("").map((c, i) => {
    if (gamemode === "default") {
      return (
        <span key={i} className="big character">
          {c}
        </span>
      );
    } else {
      return (
        <span key={i} className="character">
          {c}
        </span>
      );
    }
  });

  return [spans, string];
};
