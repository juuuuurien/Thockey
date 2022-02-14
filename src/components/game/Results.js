import { useContext } from "react";
import { context } from "../../context/context";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: false
    }
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "Time in milliseconds"
      }
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Words per Minute"
      }
    }
  }
};

const Results = ({ gameState }) => {
  const [state, setState] = useContext(context);

  const labels = state.msElapsedData;

  const data = {
    labels,
    datasets: [
      {
        label: "Avaerage Words per Minute vs Time",
        data: state.wpmData,
        borderColor: "rgb(227, 237, 255, 0.5)",
        backgroundColor: "rgb(227, 237, 255)"
      }
    ]
  };

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
      <Line options={options} data={data} />
    </div>
  );
};

export default Results;
