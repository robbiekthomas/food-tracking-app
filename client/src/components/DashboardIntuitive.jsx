import React from 'react'
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import SideBar from './SideBar';
import ChartHeader from './charts/ChartsHeader';
import LineChart from './charts/LineChart';
import PieChart from '../components/charts/PieChart';
import Stacked from '../components/charts/Stacked';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';




const DashboardIntuitive = ({
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
  avgWeeklyHungerBefore,
  avgWeeklyHungerAfter,
  topThreeMoods
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
                  <p className="font-bold text-gray-400">Average Hunger Before Meals</p>
                  <p className="text-2xl">{avgWeeklyHungerBefore}</p>
                  { avgWeeklyHungerBefore < 3 && 
                    <p className="text-xs"> hunger too low </p>
                  }
                  { avgWeeklyHungerBefore > 8 && 
                    <p className="text-xs"> not hungry enough </p>
                  }
                  { avgWeeklyHungerBefore <=8 && avgWeeklyHungerBefore >= 3 && 
                    <p className="text-xs"> just right </p>
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="h-32 w-57 bg-white flex flex-nowrap justify-center mr-2 ml-2">
            <div className="rounded-xl p-8">
              <div className="flex justify-between items-center">
              <div>
                  <p className="font-bold text-gray-400">Average Hunger Before Meals</p>
                  <p className="text-2xl">{avgWeeklyHungerAfter}</p>
                  { avgWeeklyHungerAfter < 3 && 
                    <p className="text-xs"> not full enough </p>
                  }
                  { avgWeeklyHungerAfter > 8 && 
                    <p className="text-xs"> too full </p>
                  }
                  { avgWeeklyHungerAfter <=8 && avgWeeklyHungerAfter >= 3 && 
                    <p className="text-xs"> just right </p>
                  }
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* middle dashboard*/}
        <div className="flex justify-between mt-10 mb-10 ml-10 mr-10">
          <div className="w-5/12 bg-white align-center pb-5">
            <p className="mt-5 mb-5 w-full text-center font-bold text-gray-400 text-xl">
              Top 3 Feelings After Eating
            </p>
            <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Count</TableCell>
            <TableCell>Feeling</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow>
              <TableCell>{JSON.stringify(Object.entries(topThreeMoods)[0]).replace(/\D/g, '')}</TableCell>
              <TableCell>{JSON.stringify(Object.entries(topThreeMoods)[0]).replace(/[^a-zA-Z\s]/g, '')}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>{JSON.stringify(Object.entries(topThreeMoods)[1]).replace(/\D/g, '')}</TableCell>
              <TableCell>{JSON.stringify(Object.entries(topThreeMoods)[1]).replace(/[^a-zA-Z\s]/g, '')}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>{JSON.stringify(Object.entries(topThreeMoods)[2]).replace(/\D/g, '')}</TableCell>
              <TableCell>{JSON.stringify(Object.entries(topThreeMoods)[2]).replace(/[^a-zA-Z\s]/g, '')}</TableCell>
            </TableRow>
    
        </TableBody>
      </Table>
    </TableContainer>
        
  
           

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

        
          {lineChartData && lineChartData.length > 0 &&
            < div className="w-12/12 text-black bg-white align-center mt-10 mb-10 ml-10 mr-10 pb-5 pt-5">
              <ChartHeader title="Weight Change" />
              <LineChart datapoints={lineChartData} />
            </div>
          }

   
      </div>
    </div>
  );
};

export default DashboardIntuitive;



