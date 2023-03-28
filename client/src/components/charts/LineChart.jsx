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
        backgroundColor: "#23ccc8",
        borderColor: "#23ccc8",
        pointBorderColor: "#23ccc8",
        borderWidth: 4,
        tension: 0.4,
      },
      {
        label: "Weight",
        yAxisID: "right",
        spanGaps: true,
        data: weight,
        backgroundColor: "#695cfb",
        borderColor: "#695cfb",
        pointBorderColor: "#695cfb",
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
        labels: {color:'#fff'},
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
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255,255,255,1)'
        }
      },
      left: {
        grid: {
          color: 'rgba(255,255,255,0.75)'
        },
        title: {
          display: true,
          // text: 'Weight (lbs)',
          color:'rgba(255,255,255,1)'
        },
        id: "left",
        type: "linear",
        position: "left",
        beginAtZero: false,

        scaleLabel: {
          display: true,
          labelString: "My X-Axis Label",
        },
        ticks: {
          color: 'rgba(255,255,255,1)'}
      },
      right: {
        id: "right",
        type: "linear",
        position: "right",
        beginAtZero: false,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          // text: 'Body Fat (%)',
          color:'rgba(255,255,255,1)'
        },
        ticks: {
         color: 'rgba(255,255,255,1)',
          callback: function(value) {
            return `${value} %`;
          },
        },
      },
    },
  };

  return (
    <>
      <ChartHeader title="Body Composition" />
      <Line data={data} options={options}></Line>
    </>
  );
};

export default LineChart;
