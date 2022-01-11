import Game from "./Game";
import Banner from "./Banner";
import { useState } from "react";
import { context, Provider } from "./context";
import { useEffect } from "react/cjs/react.development";

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
      <div className="wrapper">
        <Banner />
        <div className="capslock">{state.capslock && "CapsLock is on"}</div>
        <div className="words">
          <Game />
        </div>
      </div>
    </Provider>
  );
}

export default App;
