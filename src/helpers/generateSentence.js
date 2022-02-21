import { words } from "./words";
import { funfacts } from "./funfacts";

export const generateSentence = (wordcount, gamemode) => {
  //going to return a string
  let s = "";

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
          s += words[r] + " ";
        }
      }
      break;
    }
  }

  return s.trim();
};
