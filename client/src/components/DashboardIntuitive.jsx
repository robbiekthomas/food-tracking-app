import React, { useEffect, useState } from 'react'
import HabitCard from '../components/charts/HabitCard'
import SideBar from './SideBar';
import LineChart from './charts/LineChart';
import Card from './charts/Card';
import classNames from 'classnames';
import ViewSwitch from './ViewSwitch';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getTopThreeMoods, getEntryCount } from '../helper-functions/nutritionCalculations';


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
  mood


}) => {
  const [topThreeMoods, setTopThreeMoods] = useState([])
  const [mood1, setMood1] = useState({})
  const [mood2, setMood2] = useState({})
  const [mood3, setMood3] = useState({})
  const [totalMoodEntries, setTotalMoodEntries] = useState(0);
  console.log(avgWeeklyHungerBefore,
    avgWeeklyHungerAfter)

  useEffect(() => {
    let d = [{}, {}, {}]
    let e = 0;
    if (mood.length > 0) {
      d = getTopThreeMoods(mood)
      e = getEntryCount(mood)
    }
    setTopThreeMoods(d)
    setMood1(d[0])
    setMood2(d[1])
    setMood3(d[2])
    setTotalMoodEntries(e);
  }, [mood]);



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
          {avgWeeklyHungerBefore &&
            <Card
              title='Hunger Before Eating'
              color='#666666'
              target={`Aim for a rating of ${3} - ${5}`}
              performance={avgWeeklyHungerBefore}
            />
          }

          {avgWeeklyHungerAfter &&
            <Card
              title={'Hunger After Eating'}
              target={`Aim for a rating of ${5} - ${8}`}
              unit='grams'
              color='#CB4141'
              performance={avgWeeklyHungerAfter}
            />
          }

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
          {(mood && mood.length > 0) &&
            <div className="w-5/12 bg-white align-center pb-5">
              <p className="mt-5 mb-5 w-full text-center font-bold text-gray-400 text-xl">
                Top 3 Feelings After Eating
              </p>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Percent of Entries</TableCell>
                      <TableCell>Feeling</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    <TableRow>
                      <TableCell>{Math.round(mood1.count / totalMoodEntries * 100)}%</TableCell>
                      <TableCell>{mood1.mood}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>{Math.round(mood2.count / totalMoodEntries * 100)}%</TableCell>
                      <TableCell>{mood2.mood}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>{Math.round(mood3.count / totalMoodEntries * 100)}%</TableCell>
                      <TableCell>{mood3.mood}</TableCell>
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






