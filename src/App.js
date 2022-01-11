import Game from "./Game";
import Banner from "./Banner";
import { useState } from "react";
import { Provider } from "./context";
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
        <div className="stars"></div>
        <Banner />
        <div className="capslock">{state.capslock && "CapsLock is on"}</div>
        <Game />
      </div>
    </Provider>
  );
}

export default App;
