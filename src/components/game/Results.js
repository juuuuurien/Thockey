import React, { useContext } from "react";
import { context } from "../../context/context";
import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";

const Results = ({ gameState }) => {
  const [state, setState] = useContext(context);

  return (
    <div className={state.setting ? "results fade-in" : "results fade-in"}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div className="results_container">
            <div className="results_section">
              <h1 className="header">{state.wpm}</h1>
              <h2 className="subheader">wpm</h2>
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
            <li>
              <span>Missed Characters</span>
              <span id="missed-characters">{`${state.wrongCharacters}`}</span>
            </li>
          </ul>
        </div>
        <div
          style={{
            flex: 1.25,
            display: "flex",
            alignItems: "center",
            margin: "1rem",
          }}
        >
          <BarGraph />
        </div>
      </div>
      <LineGraph />
    </div>
  );
};

export default Results;
