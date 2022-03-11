import { useContext, useEffect, useState } from "react";
import { context } from "../../context/context";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
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
    datalabels: {
      display: false,
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        color: "rgb(227, 237, 255)",
      },
      display: true,
      title: {
        display: true,
        text: "Time in milliseconds",
        color: "rgb(227, 237, 255)",
      },
    },
    y: {
      ticks: {
        color: "rgb(227, 237, 255)",
      },
      display: true,
      title: {
        display: true,
        text: "Words per Minute",
        color: "rgb(227, 237, 255)",
      },
    },
  },
};

const LineGraph = () => {
  const [state] = useContext(context);

  const labels = state.msElapsedData;

  const data = {
    labels,
    datasets: [
      {
        data: state.wpmData,
        borderColor: "#2654b8",
        backgroundColor: "rgb(227, 237, 255)",
      },
    ],
  };

  return (
    <Line
      style={{
        backgroundColor: "#1323b810",
        borderRadius: 10,
        padding: "1rem",
      }}
      options={options}
      data={data}
    />
  );
};

export default LineGraph;
