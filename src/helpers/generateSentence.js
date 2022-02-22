import { words } from "../static/words";
import { funfacts } from "../static/funfacts";

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
      for (let i = 0; i < wordcount; i++) {
        let r = Math.floor(Math.random() * words.length);
        s += words[r] + " ";
      }
      break;
    }
  }

  return s.trim();
};
