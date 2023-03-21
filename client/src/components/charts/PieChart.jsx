import React from 'react'
import Chart from "react-apexcharts";


const PieChart = ( { series, labels }) => {

  const options = {
    series: series,
    labels: labels,
    plotOptions: {
      pie: {
        donut: {
          size: '50%'
        }
      }
    }
  }

  return (
    <div id="pieChart">
      <Chart
        options={options}
        series={options.series}
        type="donut"
        width="100%"
      />
    </div>
  );
};


export default PieChart;