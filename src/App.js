import Game from "./Game";
import ThockeyLogo from "./Banner";
import { useState, useEffect } from "react";
import { Provider } from "./context/context";
import StarryBackground from "./StarryBackground";
import { initialState } from "./static/initialAppState";

function App() {
  const [state, setState] = useState(initialState);

  return (
    <Provider value={[state, setState]}>
      <StarryBackground className="background" />
      <ThockeyLogo />
      <Game />
    </Provider>
  );
}

export default App;
