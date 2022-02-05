import Game from "./Game";
import ThockeyLogo from "./Banner";
import { useState, useEffect } from "react";
import { Provider } from "./context/context";
import StarryBackground from "./StarryBackground";

function App() {
  const [state, setState] = useState({
    started: false,
    finished: false,
    capslock: false,
    wpm: 0,
    cps: 0,
    msElapsed: 0,
    numWords: 25,
    accuracy: 0,
    setting: false,
    caretHidden: false,
  });

  return (
    <Provider value={[state, setState]}>
      <StarryBackground className="background" />
      <ThockeyLogo />
      <Game />
    </Provider>
  );
}

export default App;
