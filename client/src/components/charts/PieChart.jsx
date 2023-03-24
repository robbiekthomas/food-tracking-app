import React from 'react'
import Chart from "react-apexcharts";


const PieChart = ( { series, labels }) => {

  const options = {
    colors: ['#f00', '#48b2c1', '#cbcb41'],
    series: series,
    labels: labels,
    legend: {
      show: false,
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        }
      }
    }],
    plotOptions: {
      pie: {
        donut: {
          size: '68%'
        },
        labels: {
          show: true,
          total: {
          show: true,
          label: '',
          formatter: () => 'Text you want'
          }
          }
      }
    }
  }

  return (
      <Chart
        options={options}
        series={options.series}
        type="donut"
        width="100%"
      />
  );
};


export default PieChart;