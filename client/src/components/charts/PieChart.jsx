import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const PieChart = ({ series, labels, title }) => {
  const options = {
    cutout: "85%",
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 1, // <-- Set this to derired value
        borderColor:'#333'
      }
    }
  };

  const data = {
    labels: labels,
    datasets: [
      {
        data: [series[0], series[1], series[2]],
        backgroundColor: ["#ffb114", "#0dc955", '#48a1e6'],
      },
    ],
  };

  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 120).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "top";
        var text = title,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2.2;
        ctx.fillText(text, textX, textY);
        ctx.fillStyle = "white";
        ctx.save();
      },
    },
  ];

  return <Doughnut plugins={plugins} options={options} data={data}></Doughnut>;
};

export default PieChart;
