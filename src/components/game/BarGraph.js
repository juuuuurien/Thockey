import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        color: "rgb(227, 237, 255)"
      },
      max: 200,
      min: 0
    },
    x: {
      ticks: {
        color: "rgb(227, 237, 255)"
      }
    }
  },
  plugins: {
    datalabels: {
      anchor: "end",
      align: "top",
      color: "rgb(227, 237, 255)",
      formatter: Math.round,
      font: {
        weight: "bold"
      }
    },
    legend: {
      display: false
    },
    title: {
      display: true,
      text: "Recent Attempts",
      color: "rgb(227, 237, 255)"
    }
  }
};

const BarGraph = () => {
  const [graphData, setGraphData] = useState(null);
  let labels;
  let data;

  useEffect(() => {
    if (window.localStorage.getItem("data") !== null) {
      setGraphData(JSON.parse(window.localStorage.getItem("data")));
    }
  }, []);

  if (graphData !== null) {
    labels = graphData.data.past_dates;

    data = {
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: graphData.data.past_wpms,
          barThickness: 25,
          backgroundColor: "#2654b8"
        }
      ]
    };
  } else {
    data = {
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: [],
          barThickness: 25,
          backgroundColor: "rgba(255, 99, 132, 0.5)"
        }
      ]
    };
  }

  return (
    <Bar
      options={options}
      data={data}
      style={{
        backgroundColor: "#1323b810",
        borderRadius: 10,
        padding: "1rem"
      }}
    />
  );
};

export default BarGraph;
