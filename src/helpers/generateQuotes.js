import { gameQuotes } from "./quotes";

export const generateQuotes = () => {
  //going to return a string
  let s = "";
  let a;

  let r = Math.floor(Math.random() * gameQuotes.length);
  let q = gameQuotes[r];
  s = q.quotes[Math.floor(Math.random() * q.quotes.length)];
  a = q.author;

  console.log(a);
  return [s, a];
};
