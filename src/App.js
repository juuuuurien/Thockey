import Game from "./Game";
import ThockeyLogo from "./Banner";
import { useState, useRef } from "react";
import { Provider } from "./context";
import { useEffect } from "react/cjs/react.development";
import StarryBackground from "./StarryBackground";
import Canvas from "./Canvas";
import Background from "./Background";

function App() {
  const [state, setState] = useState({
    started: false,
    capslock: false,
  });

  useEffect(() => {
    console.log("render");
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
