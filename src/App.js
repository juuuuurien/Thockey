import Game from "./Game";
import ThockeyLogo from "./Banner";
import { useState } from "react";
import { Provider } from "./context/context";
import StarryBackground from "./StarryBackground";

function App() {
  const [state, setState] = useState({
    started: false,
    capslock: false,
    wpm: 0,
    cps: 0,
    displayWpm: 0,
    msElapsed: 0,
  });

  return (
    <Provider value={[state, setState]}>
      <StarryBackground className="background" />
      <ThockeyLogo />
      <div className="capslock">{state.capslock && "CapsLock is on"}</div>
      {/* <Game /> */}
    </Provider>
  );
}

export default App;
