import React from 'react'
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import SideBar from './SideBar';
import ChartHeader from './charts/ChartsHeader';
import LineChart from './charts/LineChart';
import PieChart from '../components/charts/PieChart';
import Stacked from '../components/charts/Stacked';



const DashboardStandard = ({
  currentHabits,
  inputs,
  setUserInputs,
  setCurrentHabits,
  targetCalories,
  protein,
  carbs,
  fat,
  barChartData,
  lineChartData,
  maintenanceCalories,
  proteinBarChartData,
  weelkyMacroDistribution,
  proteinWeeklyAverage,
}) => {

  return (
    <div className="mt-5 flex">
      {/*Sidebar*/}
      {currentHabits.length > 0 && <SideBar
        inputs={inputs}
        setUserInputs={setUserInputs}
        currentHabits={currentHabits}
        setCurrentHabits={setCurrentHabits}
      />}
      {/*Nutrition Targets (top cards on dashboard)*/}
      <div className="w-3/4">
      <h1 className='h-16 w-12/12 text-center text-gray-600 text-2xl'><strong>Main Goal:</strong> {inputs.main_goal}</h1>
        <div className="flex flex-wrap justify-around max-w-screen-lg">

        <div className="h-32 w-57 bg-white flex flex-nowrap justify-center mr-2 ml-2">
            <div className="rounded-xl p-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-400">Maintenance Calories</p>
                  <p className="text-2xl">{maintenanceCalories}</p>
                  <p className="text-xs">{`${targetCalories - 100} - ${targetCalories + 100
                    } cal`}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-32 w-57 bg-white flex flex-nowrap justify-center mr-2 ml-2">
            <div className="rounded-xl p-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-400">Target Calories</p>
                  <p className="text-2xl">{targetCalories}</p>
                  <p className="text-xs">{`${targetCalories - 100} - ${targetCalories + 100
                    } cal`}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-32 w-57 bg-white flex flex-nowrap justify-center mr-2 ml-2">
            <div className="rounded-xl p-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-400">Protein</p>
                  <p className="text-2xl">{protein}</p>
                  <p className="text-xs">{`${protein - 10} - ${protein + 10
                    } g`}</p>
                    <p className="text-xs">{ Math.round(proteinWeeklyAverage / protein * 100) }%</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* middle dashboard*/}
        <div className="flex justify-between mt-10 mb-10 ml-10 mr-10">
          <div className="w-5/12 bg-white align-center pb-5">
            <p className="mt-5 mb-5 w-full text-center font-bold text-gray-400 text-xl">
              Protein Percent of Total Calories
            </p>
            <div className="flex justify-between">
              <div className="flex-column w-6/12">
                <ChartHeader title="Target" />
                <PieChart
                  series={[protein * 4, fat * 9 + carbs * 4]}
                  labels={["Protein", "Fat & Carbs"]}
                />
              </div>

              {/* Actual Macro Distribution From Diet */}
              <div className="flex-column w-6/12">
                <ChartHeader title="Actual" />
                <PieChart
                  series={[weelkyMacroDistribution[0] * 4, weelkyMacroDistribution[1] * 9 + weelkyMacroDistribution[2] * 4]}
                  labels={["Protein", "Fat & Carbs"]}
                />
              </div>
            </div>

            {/* Habit goals */}
          </div>
          <div className='bg-white w-6/12'>
            <p className='mt-5 mb-5 w-full text-center font-bold text-gray-400 text-xl'>Habit Goals</p>
            <div className='m-5 bg-white'>
              <GridComponent dataSource={currentHabits}>
                <ColumnsDirective>
                  <ColumnDirective headerText='Status' field='is_complete' width='20' textAlign="Center" />
                  <ColumnDirective headerText='Goal' field='goal_name' width='80' />
                  <ColumnDirective field='goal_number' width='0' />
                  <ColumnDirective field='goal_id' width='0' />
                </ColumnsDirective>
              </GridComponent>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-10 mb-10 ml-10 mr-10">
          {proteinBarChartData && proteinBarChartData.length > 0 &&
            <div className="w-6/12 bg-white align-center pb-5 pt-5">
              <ChartHeader title="Protein Distribution over Time" />
              <Stacked width="auto" data={proteinBarChartData} height="300px" />
            </div>
          }
          {lineChartData && lineChartData.length > 0 &&
            < div className="w-5/12 text-black bg-white align-center pb-5 pt-5">
              <ChartHeader title="Weight Change" />
              <LineChart datapoints={lineChartData} />
            </div>
          }

        </div>
      </div>
    </div>
  );
};

export default DashboardStandard;



