import React from 'react';
import Chart from 'react-apexcharts';







const Stacked = ({ data, name1, name2, name3 }) => {


  const convertYValues = (arr) => {
    const result = [];
    for (const n of arr) {
      result.push(n.y);
    };
    return result;
  };

  const convertXValues = (arr) => {
    const result = [];
    for (const n of arr) {
      result.push(n.x);
    };
    return result;
  };




  const options = {
    series: [{
      name: name1,
      data: convertYValues(data[0])
    }, {
      name: name2,
      data: convertYValues(data[1])
    }, {
      name: name3,
      data: convertYValues(data[2])
    }],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
    },
    xaxis: {
      type: 'datetime',
      categories: convertXValues(data[0]),
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
  };

  

  return (
    <Chart options={options} series={options.series} type="bar" height={200} />

  )
}

export default Stacked;