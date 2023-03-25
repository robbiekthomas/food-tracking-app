import React from 'react'
import HabitCard from '../components/charts/HabitCard'
import SideBar from './SideBar';
import ChartHeader from './charts/ChartsHeader';
import LineChart from './charts/LineChart';
import PieChart from '../components/charts/PieChart';
import Stacked from '../components/charts/Stacked';
import Card from './charts/Card';
import classNames from 'classnames';
import ViewSwitch from './ViewSwitch';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const DashboardIntuitive = ({
  currentHabits,
  inputs,
  setUserInputs,
  setCurrentHabits,
  date,
  protein,
  carbs,
  fat,
  lineChartData,
  maintenanceCalories,
  weelkyMacroDistribution,
  avgWeeklyHungerBefore,
  avgWeeklyHungerAfter,
  topThreeMoods,

}) => {


  return (
    <div className="flex">
      {/*Sidebar*/}
      {currentHabits.length > 0 && <SideBar
        inputs={inputs}
        setUserInputs={setUserInputs}
        currentHabits={currentHabits}
        setCurrentHabits={setCurrentHabits}
      />}

      {/*Nutrition Targets (top cards on dashboard)*/}
      <div className="w-3/4 ml-4 mr-4 pt-3">
        <ViewSwitch
          date={date}
          goal={inputs.main_goal}
          view1='All Time'
          view2='Last 30 Days'
          view3='Last 7 Days'
        />

        <div className={classNames('w-full', 'grid', 'grid-cols-3', 'grid-rows-1, gap-3')}>
          <Card
            title='Maintenance Calories'
            color='#666666'
            target={`${maintenanceCalories - 100} - ${maintenanceCalories + 100} kcal`}
          />

          <Card
            title='Hunger Before Eating'
            color='#666666'
            target={`Aim for a rating of ${3} - ${5}`}
            performance={avgWeeklyHungerBefore}
          />

          <Card
            title={'Hunger After Eating'}
            target={`Aim for a rating of ${5} - ${8}`}
            unit='grams'
            color='#CB4141'
            performance={avgWeeklyHungerAfter}
          />
        </div>



        <div className={classNames('mt-3', 'w-full', 'grid', 'grid-cols-2', 'grid-rows-1, gap-3')}>
          {/* HABIT GOALS*/}
          {currentHabits && currentHabits.length > 0 &&
            <div className="bg-white shadow-sm relative rounded-lg pl-2'">
              <HabitCard
                dataSource={currentHabits}
                title='Habit Goals'
              />
            </div>
          }

          {/* TOP THREE MOODS */}
          {(topThreeMoods && topThreeMoods.length > 0) &&
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
            </div>
          }
        </div>

        <div className="mt-3">
          <div className={classNames('w-full', 'grid', 'grid-cols-3', 'grid-rows-3 gap-3')}>

            {/* LINE CHART FOR WEIGHT AND BODY FAT */}
            {lineChartData && lineChartData.length > 0 &&
              < div className="h-72 col-span-3 shadow-sm relative rounded-lg bg-white align-center pb-2 pt-3 w-full">
                <LineChart datapoints={lineChartData} />
              </div>
            }

          </div>
        </div>
      </div>
    </div>

  );
};

export default DashboardIntuitive;






