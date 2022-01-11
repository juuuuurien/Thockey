export const generateStars = () => {
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const STAR_COUNT = 100;
  let result = "";
  for (let i = 0; i < STAR_COUNT; i++) {
    result += `${randomNumber(-50, 50)}vw ${randomNumber(
      -50,
      50
    )}vh ${randomNumber(1, 1)}px ${randomNumber(1, 1)}px #fff,`;
  }
  return result.substring(0, result.length - 1);
};
