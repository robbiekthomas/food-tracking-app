import React from 'react'
import Chart from "react-apexcharts";


const PieChart = ( { series, labels }) => {

  const options = {
    series: series,
    labels: labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '50%'
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