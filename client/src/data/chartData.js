//imports for line chart configuration
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
  minimum: 100,

  interval: 100,
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


//line chart data
//get x-axiis values and format dates
export const buildLineXAxis = (datapoints) => {
  let xAxis = [];
  datapoints[0].forEach(element => {
    xAxis.push(element.x.slice(0, 10));
  });

  return xAxis;
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



export const compileLineData = (xAxis, bodyFat, weight) => {
  return {
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
    }
    ]
  }
}

export const lineChartOptions = {
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
          callback: function(value) {
            return `${value} %`;
          }
        }
      }
   }
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
        callback: function(value) {
          return `${value} %`;
        }
      }
    }
  }
}