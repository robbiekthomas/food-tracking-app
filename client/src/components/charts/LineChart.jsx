import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, //xaxis related
  LinearScale, //yaxis
  PointElement
} from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const LineChart = ({ datapoints }) => {

  //get x-axiis values and format dates
  let xAxis = []
  datapoints[0].forEach(element => {
    xAxis.push(element.x.slice(0, 10));
  });

  //get yaxis values
  let bodyFat = []
  datapoints[1].forEach(element => {
    bodyFat.push(element.y);
  });

  //get yaxis values
  let weight = []
  datapoints[0].forEach(element => {
    weight.push(element.y);
  });

  const data = {

    labels: xAxis,
    datasets: [{
      label: 'Body Fat',
      yAxisID: 'left',
      spanGaps: true,
      data: bodyFat,
      backgroundColor: 'aqua',
      borderColor: 'aqua',
      pointBorderColor: 'aqua',
      tension: 0.1
    },
    {
      label: 'Weight',
      yAxisID: 'right',
      spanGaps: true,
      data: weight,
      backgroundColor: 'blue',
      borderColor: 'blue',
      pointBorderColor: 'blue',
      tension: 0.2
    },

    ]
  }

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      }
    },
    scales: {

      left: {
        id: 'left',
        type: 'linear',
        position: 'left',
        beginAtZero: true,


      },
      right: {
        id: 'right',
        type: 'linear',
        position: 'right',
        beginAtZero: true,
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          callback: function(value, index, values) {
            return `${value} %`;
          }
        }
      }
    }
  }

  return (
    <div className='chart' >
      <Line data={data} options={options}></Line>
    </div >
  )
}

export default LineChart;