export const spanify = async (s) => {
  let string = s;
  const spans = s.split("").map((c, i) => {
    return (
      <span key={i} className="character">
        {c}
      </span>
    );
  });

  return [spans, string];
};
