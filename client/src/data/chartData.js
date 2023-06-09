//imports for line chart configuration

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, //xaxis related
  LinearScale, //yaxis
  PointElement,
  Legend,
} from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
)

const { parse, format } = require('date-fns');


export const stackedPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: 'Rotate45',
  valueType: 'Category',
};

export const stackedPrimaryYAxis = {
  lineStyle: { width: 0 },
  minimum: 0,
  interval: 500,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}',
};

export const contextMenuItems = [
  'AutoFit',
  'AutoFitAll',
  'SortAscending',
  'SortDescending',
  'Copy',
  'Edit',
  'Delete',
  'Save',
  'Cancel',
  'PdfExport',
  'ExcelExport',
  'CsvExport',
  'FirstPage',
  'PrevPage',
  'LastPage',
  'NextPage',
];

export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);



// export const habitsData = [

export const createHabitGridData = (goal1, goal2, goal3) => {
  let habitsData = [];

  if (goal1.goal_name !== '') {
    habitsData.push(
      {
        goal_name: goal1.goal_name,
        is_complete: goal1.is_complete,
        goal_number: goal1.goal_number,
        goal_id: goal1.goal_id
      }
    );
  };

  if (goal2.goal_name !== '') {
    habitsData.push(
      {
        goal_name: goal2.goal_name,
        is_complete: goal2.is_complete,
        goal_number: goal2.goal_number,
        goal_id: goal2.goal_id
      }
    );
  }

  if (goal3.goal_name !== '') {
    habitsData.push(
      {
        goal_name: goal3.goal_name || goal3.Goal,
        is_complete: goal3.is_complete,
        goal_number: goal3.goal_number,
        goal_id: goal3.goal_id
      }
    );
  }

  return (habitsData);
};

export const habitsList =
  [
    'Eat at least 20g of protein per meal',
    'Eat one green vegetable per meal',
    'Have three different fruits throughout the day',
    'Eat all meals without distractions',
    'Plan your meals the night before',
    'Eat whole grains instead of white',
    'Have one salad today',
    'Have a smoothie with one green vegetable today',
    'Stick to scheduled meal times',
    'Put your food/utensils down between bites'
  ];

//format day to weekday from a string
export const formatDateToWeekday = (dateString) => {
  const date = new Date(dateString);

  let formattedDate = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short' }).format(date);
  const day = formattedDate.substring(formattedDate.length-2);
  const month = formattedDate.substring(0,3);
  
  formattedDate= `${day} ${month}`;


  return formattedDate;
}

//get x-axis values and format dates
export const buildLineXAxis = (datapoints) => {
  let xAxis = [];
  console.log('weekdays', datapoints)
  datapoints[0].forEach(element => {
    xAxis.push(element.x.slice(0, 10));
  });

  //function to convert date strings to weekday string
  const weekdays = xAxis.map((i) => formatDateToWeekday(i));

  return weekdays;
};



export const makeBodyFatLine = (datapoints) => {

  let bodyFat = []
  datapoints[1].forEach(element => {
    bodyFat.push(element.y);

  });
  return bodyFat;
};


//get yaxis values
export const buildLineYAxis = (datapoints) => {
  let weight = []
  datapoints[0].forEach(element => {
    weight.push(element.y);
  });

  return weight;
}



export const strictLineOptions = {
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
      gridLines: {
        display: false, // set display to false to remove gridlines
      }

    },
    right: {
      id: 'right',
      type: 'linear',
      position: 'right',
      beginAtZero: true,
      grid: {
        drawOnChartArea: false
      },
      gridLines: {
        display: false, // set display to false to remove gridlines
      },
      ticks: {
        callback: function(value) {
          return `${value} %`;
        }
      }
    }
  }
}