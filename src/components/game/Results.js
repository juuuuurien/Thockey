import { useContext } from "react";
import { context } from "../../context/context";

const Results = ({ gameState }) => {
  const [state, setState] = useContext(context);

  return (
    <div className={state.setting ? "results fade-in" : "results fade-in"}>
      <div className="results_container">
        <div className="results_section">
          <h1 className="header">{state.wpm}</h1>
          <h2 className="subheader">wpm</h2>
          <br />
        </div>
      </div>
      <ul id="results_list">
        <li>
          <span>Accuracy</span>
          <span>{`${state.accuracy}%`}</span>
        </li>
        <li>
          <span>Time</span>
          <span>{Math.ceil(state.msElapsed / 1000)} sec</span>
        </li>
      </ul>
    </div>
  );
};

export default Results;
