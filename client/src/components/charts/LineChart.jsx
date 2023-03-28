import React, { useState } from "react";
import {
  buildLineXAxis,
  makeBodyFatLine,
  lineChartOptions,
  compileLineData,
  buildLineYAxis,
} from "../../data/chartData";
import { Line } from "react-chartjs-2";
import ChartHeader from "./ChartsHeader";

const LineChart = ({ datapoints }) => {
  const [hiddenData, setHiddenData] = useState([]);

  const handleClick = (e, legendItem) => {
    const datasetIndex = legendItem.datasetIndex;
    const currentIndex = hiddenData.indexOf(datasetIndex);

    if (currentIndex === -1) {
      setHiddenData([...hiddenData, datasetIndex]);
    } else {
      setHiddenData([
        ...hiddenData.slice(0, currentIndex),
        ...hiddenData.slice(currentIndex + 1),
      ]);
    }
  };

  const xAxis = buildLineXAxis(datapoints); //display labels as strings
  const bodyFat = makeBodyFatLine(datapoints);
  const weight = buildLineYAxis(datapoints);
  // const min = xAxis.length - 7;
  // const max = xAxis.length - 1
  // console.log(typeof(xAxis[0]), min, max)

  const data = {
    labels: xAxis,
    datasets: [
      {
        label: "Body Fat",
        yAxisID: "left",
        spanGaps: true,
        data: bodyFat,
        backgroundColor: "rgb(45, 149, 147, 1)",
        borderColor: "rgb(45, 149, 147, 1)",
        pointBorderColor: "rgb(45, 149, 147, 1)",
        borderWidth: 4,
        tension: 0.4,
      },
      {
        label: "Weight",
        yAxisID: "right",
        spanGaps: true,
        data: weight,
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        borderColor: "rgba(0, 0, 255, 0.1)",
        pointBorderColor: "rgba(0, 0, 255, 0.1)",
        borderWidth: 4,
        tension: 0.2,
      },
    ],
  };

  const options = {
    onClick: handleClick,

    // responsive: true,
    // maintainAspectRatio: false,
    // height: 400,

    plugins: {
      legend: {
        display: true,
        position: "bottom",
        legend: {
          onClick: (legendItem) => {
            const chartInstance = legendItem.chart;
            const meta = chartInstance.getDatasetMeta(legendItem.datasetIndex);

            // toggle the hidden property of the corresponding dataset
            meta.hidden =
              meta.hidden === null
                ? !chartInstance.data.datasets[legendItem.datasetIndex].hidden
                : null;

            // update the chart to reflect the changes
            chartInstance.update();
          },
        },
      },
    },
    scales: {
      // xAxes: [{
      //   ticks: {
      //     min: min, // set the minimum value to display
      //     max: max // set the maximum value to display
      //   }
      // }],
      left: {
        id: "left",
        type: "linear",
        position: "left",
        beginAtZero: false,

        scaleLabel: {
          display: true,
          labelString: "My X-Axis Label",
        },
      },
      right: {
        id: "right",
        type: "linear",
        position: "right",
        beginAtZero: false,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value) {
            return `${value} %`;
          },
        },
      },
    },
  };

  return (
    <>
      <ChartHeader title="Weight Change" />
      <Line data={data} options={options}></Line>
    </>
  );
};

export default LineChart;
