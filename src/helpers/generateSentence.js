import randomWords from "random-words";
import { words } from "./words";
import { gameQuotes } from "./quotes";
import { funfacts } from "./funfacts";

export const generateSentence = (wordcount, gamemode) => {
  //going to return a string
  let s = "";
  let a;

  switch (gamemode) {
    case "funfacts": {
      let r = Math.floor(Math.random() * funfacts.length);
      s = funfacts[r];
      break;
    }
    default: {
      for (let i = 0; i < wordcount + 1; i++) {
        let r = Math.floor(Math.random() * words.length);

        if (!s.split(" ").includes(words[r])) {
          if (i < wordcount) {
            s += words[r] + " ";
          } else {
            s += words[r];
          }
        }
      }
      break;
    }
  }

  return s;
};
