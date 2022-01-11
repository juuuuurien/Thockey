export const spanify = async (s) => {
  const spans = s.split("").map((c, i) => {
    return (
      <span key={i} className="character">
        {c}
      </span>
    );
  });

  return spans;
};
