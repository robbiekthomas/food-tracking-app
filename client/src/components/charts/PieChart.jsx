import React from 'react'

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip
)


const PieChart = ({ series, labels, title }) => {

  const options = {
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      }
    },
  }

  const data = {
    labels: labels,
    datasets: [{
      data: [series[0], series[1], series[2]],
      backgroundColor: ['#CB4141', '#48b2c1', '#cbcb41']
    }]
  }

  const plugins = [{
    beforeDraw: function(chart) {
      var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;
      ctx.restore();
      var fontSize = (height / 160).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "top";
      var text = title,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2.2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  }]

  return (

    <Doughnut
      plugins={plugins}
      options={options}
      data={data}
    >
    </Doughnut>


  );
};


export default PieChart;