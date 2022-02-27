import { useContext } from "react";
import { context } from "../context/context";

export const finishAnimation = (state, setState, gamemode) => {
  const defaultFinish = () => {
    const timer1 = setTimeout(() => {
      setState({ ...state, setting: true, caretHidden: true });
      const timer2 = setTimeout(() => {
        // set as finished to show results page
        setState({
          ...state,
          setting: false,
          finished: true,
          caretHidden: true,
        });
        return clearTimeout(timer2);
      }, 150);
      return clearTimeout(timer1);
    }, 600);
  };

  const quoteFinish = () => {
    const timer1 = setTimeout(() => {
      setState({ ...state, quoteFinished: true, caretHidden: true });
      const timer2 = setTimeout(() => {
        defaultFinish();
        return clearTimeout(timer2);
      }, 800);
      return clearTimeout(timer1);
    }, 400);
  };

  switch (gamemode) {
    case "quotes": {
      quoteFinish();
      break;
    }
    default:
      defaultFinish();
  }
};
