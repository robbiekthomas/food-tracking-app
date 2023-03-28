import React from "react";
import Chart from "react-apexcharts";

const Stacked = ({ data, name1, name2, name3 }) => {
  const convertYValues = (arr) => {
    const result = [];
    for (const n of arr) {
      result.push(n.y);
    }
    return result;
  };

  const convertXValues = (arr) => {
    const result = [];
    for (const n of arr) {
      result.push(n.x);
    }
    return result;
  };

  const name1Data =
    convertYValues(data[0]).slice(-7) || convertYValues(data[0]);
  const name2Data =
    convertYValues(data[1]).slice(-7) || convertYValues(data[0]);

  let name3Data = [];

  if (data.length === 3) {
    name3Data = convertYValues(data[2]).slice(-7) || convertYValues(data[0]);
  }

  let options = {
    colors: ["#ffb114", "#0dc955", '#48a1e6'],
    series: [
      {
        name: name1,
        data: name1Data,
      },
      {
        name: name2,
        data: name2Data,
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: false,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    // not sure why only one font colour is changing
    xaxis: {
      type: "datetime",
      categories: convertXValues(data[0]),
      labels: {
        style: {
          colors: "#fcfafc"
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fcfafc"
        },
      },
    },

    legend: {
      show: false,
      position: "bottom",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  };

  if (data.length === 3) {
    options.series.push({
      name: name3,
      data: name3Data,
    });
  }

  return (
    <Chart options={options} series={options.series} type="bar" height={200} />
  );
};

export default Stacked;
