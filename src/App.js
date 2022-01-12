import Game from "./Game";
import ThockeyLogo from "./Banner";
import { useState, useRef } from "react";
import { Provider } from "./context";
import { useEffect } from "react/cjs/react.development";
import Canvas from "./Canvas";

function App() {
  const [state, setState] = useState({
    started: false,
    capslock: false,
  });

  return (
    <Provider value={[state, setState]}>
      <Canvas className="background" />
      <ThockeyLogo />
      <div className="capslock">{state.capslock && "CapsLock is on"}</div>
      <Game />
    </Provider>
  );
}

export default App;
