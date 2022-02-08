import randomWords from "random-words";
import { words } from "./words";

export const generateSentence = (wordcount) => {
  //going to return a string
  let s = "";
  for (let i = 0; i < wordcount; i++) {
    let r = Math.floor(Math.random() * words.length + 1);

    if (!s.split(" ").includes(words[r])) {
      if (i < wordcount - 1) {
        s += words[r] + " ";
      } else {
        s += words[r];
      }
    }
  }
  console.log(s);
  return s;
};
