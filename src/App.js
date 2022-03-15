import Game from "./Game";
import ThockeyLogo from "./Banner";
import { useState, useEffect } from "react";
import { Provider } from "./context/context";
import StarryBackground from "./StarryBackground";
import { initialState } from "./static/initialAppState";
import ResetLabel from "./components/game/ResetLabel";

function App() {
  const [state, setState] = useState(initialState);

  const handleResize = () => {
    setState({ ...state, settingStars: false });
  };

  useEffect(() => {
    // handle resizing of window;
    let timeout;

    window.onresize = () => {
      setState({ ...state, settingStars: true });
      timeout = setTimeout(() => {
        handleResize();
      }, 50);
    };

    clearTimeout(timeout);
  });

  return (
    <Provider value={[state, setState]}>
      <StarryBackground className="background" />
      <ThockeyLogo />
      <Game />
      {/* chore: create a footer component */}
      <ResetLabel />
    </Provider>
  );
}

export default App;
