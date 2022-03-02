import { words } from "../static/words";
import { funfacts } from "../static/funfacts";

// should be 25 words, but same characters...
//

const pattern_25 = [
  3,
  4,
  4,
  2,
  4,
  2,
  4,
  4,
  2,
  3,
  1,
  2,
  3,
  2,
  2,
  1,
  4,
  1,
  3,
  1,
  4,
  1,
  4,
  3,
  2,
  2
];

//returns a word with the amount of n characters
const getWord = (n) => {
  let word;
  switch (n) {
    case 2: {
      word = words.filter((v) => v.length === 2);
      break;
    }
    case 3: {
      word = words.filter((v) => v.length === 3);
      break;
    }
    case 4: {
      word = words.filter((v) => v.length === 4);
      break;
    }
    default:
      return "I";
  }

  return word[Math.floor(Math.random() * word.length)];
};

// iterate through pattern and return an array of words

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
        if (!s.split(" ").includes(words[r])) {
          s += words[r] + " ";
        } else {
          r = Math.floor(Math.random() * words.length);
          s += words[r] + " ";
        }
      }
      break;
    }
  }

  return s.trim();
};
