import randomWords from "random-words";

export const generateSentence = () => {
  const s = randomWords({ exactly: 25, maxLength: 4, join: " " });
  return s;
};
