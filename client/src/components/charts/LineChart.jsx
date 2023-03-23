import React from 'react';
import { strictLineOptions, strictLinedata, buildLineXAxis, makeBodyFatLine, lineChartOptions, compileLineData, buildLineYAxis } from '../../data/chartData';
import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale, //xaxis related
//   LinearScale, //yaxis
//   PointElement
// } from 'chart.js'

// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement
// )

const LineChart = ({ datapoints }) => {

  const xAxis = buildLineXAxis(datapoints);
  const bodyFat = makeBodyFatLine(datapoints);
  const weight = buildLineYAxis(datapoints);
  const data = compileLineData(xAxis, bodyFat, weight)
  const options = lineChartOptions;

  return (
    <div className='chart' >
      <Line data={data} options={options}></Line>
    </div >
  )
}

export default LineChart;