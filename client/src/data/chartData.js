export const stackedChartData = [
  [
    { x: 'Jan', y: 111.1 },
    { x: 'Feb', y: 127.3 },
    { x: 'Mar', y: 143.4 },
    { x: 'Apr', y: 159.9 },
    { x: 'May', y: 159.9 },
    { x: 'Jun', y: 159.9 },
    { x: 'July', y: 159.9 },
  ],
  [
    { x: 'Jan', y: 111.1 },
    { x: 'Feb', y: 127.3 },
    { x: 'Mar', y: 143.4 },
    { x: 'Apr', y: 159.9 },
    { x: 'May', y: 159.9 },
    { x: 'Jun', y: 159.9 },
    { x: 'July', y: 159.9 },
  ],
  [
    { x: 'Jan', y: 111.1 },
    { x: 'Feb', y: 127.3 },
    { x: 'Mar', y: 143.4 },
    { x: 'Apr', y: 159.9 },
    { x: 'May', y: 159.9 },
    { x: 'Jun', y: 159.9 },
    { x: 'July', y: 159.9 },
  ],
];



export const stackedCustomSeries = [

  {
    dataSource: stackedChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Protein',
    type: 'StackingColumn',
  },

  {
    dataSource: stackedChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Fat',
    type: 'StackingColumn',
  },

  {
    dataSource: stackedChartData[2],
    xName: 'x',
    yName: 'y',
    name: 'Carbs',
  },

];

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
  maximum: 400,
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

export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);

export const ordersGrid = [
  {
    headerText: 'Image',
    template: gridOrderImage,
    textAlign: 'Center',
    width: '120',
  },
  {
    field: 'OrderItems',
    headerText: 'Item',
    width: '150',
    editType: 'dropdownedit',
    textAlign: 'Center',
  },
  {
    field: 'CustomerName',
    headerText: 'Customer Name',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'TotalAmount',
    headerText: 'Total Amount',
    format: 'C2',
    textAlign: 'Center',
    editType: 'numericedit',
    width: '150',
  },
  {
    headerText: 'Status',
    template: gridOrderStatus,
    field: 'OrderItems',
    textAlign: 'Center',
    width: '120',
  },
  {
    field: 'OrderID',
    headerText: 'Order ID',
    width: '120',
    textAlign: 'Center',
  },

  {
    field: 'Location',
    headerText: 'Location',
    width: '150',
    textAlign: 'Center',
  },
];







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