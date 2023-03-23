import React from 'react'
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import SideBar from './SideBar';
import ChartHeader from './charts/ChartsHeader';
import LineChart from './charts/LineChart';
import PieChart from '../components/charts/PieChart';
import Stacked from '../components/charts/Stacked';



const DashboardPrecise = ({
  currentHabits,
  inputs,
  setUserInputs,
  setCurrentHabits,
  targetCalories,
  protein,
  carbs,
  fat,
  barChartData,
  lineChartData
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
        <div className="flex flex-wrap justify-around max-w-screen-lg">
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
                </div>
              </div>
            </div>
          </div>

          <div className="h-32 w-57 bg-white flex flex-nowrap justify-center mr-2 ml-2">
            <div className="rounded-xl p-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-400">Carbs</p>
                  <p className="text-2xl">{carbs}</p>
                  <p className="text-xs">{`${carbs - 10} - ${carbs + 10
                    } g`}</p>
                </div>
              </div>
            </div>
          </div>

          <div className=" h-32 w-57 bg-white flex flex-nowrap justify-center">
            <div className="w-57 rounded-xl p-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-400">Fat</p>
                  <p className="text-2xl">{fat}</p>
                  <p className="text-xs">{`${fat - 10} - ${fat + 10} g`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* middle dashboard*/}
        <div className="flex justify-between mt-10 mb-10 ml-10 mr-10">
          <div className="w-5/12 bg-white align-center pb-5">
            <p className="mt-5 mb-5 w-full text-center font-bold text-gray-400 text-xl">
              Macronutrient Distribution
            </p>
            <div className="flex justify-between">
              <div className="flex-column w-6/12">
                <ChartHeader title="Target" />
                <PieChart
                  series={[protein, fat, carbs]}
                  labels={["Protein", "Fat", "Carbohydrates"]}
                />
              </div>

              {/* Actual Macro Distribution From Diet */}
              <div className="flex-column w-6/12">
                <ChartHeader title="Actual" />
                <PieChart
                  series={[protein, fat, carbs]}
                  labels={["Protein", "Fat", "Carbohydrates"]}
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
          {barChartData && barChartData.length > 0 &&
            <div className="w-6/12 bg-white align-center pb-5 pt-5">
              <ChartHeader title="Macronutrient Distribution over Time" />
              <Stacked width="auto" data={barChartData} height="300px" />
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

export default DashboardPrecise;



