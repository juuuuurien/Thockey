import { useContext } from "react";
import { context } from "../../context/context";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
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

const LineGraph = () => {
  const [state] = useContext(context);

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
    <Line
      style={{
        backgroundColor: "#00000030",
        borderRadius: 10,
        padding: "1rem"
      }}
      options={options}
      data={data}
    />
  );
};

export default LineGraph;
