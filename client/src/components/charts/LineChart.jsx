import React from 'react';
import { buildLineXAxis, makeBodyFatLine, lineChartOptions, compileLineData, buildLineYAxis } from '../../data/chartData';
import { Line } from 'react-chartjs-2';
import ChartHeader from './ChartsHeader';


const LineChart = ({ datapoints }) => {

  const xAxis = buildLineXAxis(datapoints);
  const bodyFat = makeBodyFatLine(datapoints);
  const weight = buildLineYAxis(datapoints);
  const data = compileLineData(xAxis, bodyFat, weight)
  const options = lineChartOptions;

  return (
    <div>
      <ChartHeader title="Weight Change" />
      <Line data={data} options={options}></Line>
    </div>


  )
}

export default LineChart;