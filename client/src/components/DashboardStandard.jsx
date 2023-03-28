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

const DashboardStandard = ({
  currentHabits,
  inputs,
  setUserInputs,
  setCurrentHabits,
  targetCalories,
  protein,
  barChartData,
  lineChartData,
  weelkyMacroDistribution,
  proteinWeeklyAverage,
  maintenanceCalories,
  calorieWeeklyAverage,
  proteinBarChartData,
  fat,
  carbs,
  date

}) => {

  const gradientStyling = "bg-gradient-to-r from-[#f8fafc]/[0.01] via-[#f8fafc]/[0.15] to-[#f8fafc]/[0.01] border-t-2 border-b-2 border-[#f8fafc]/[0.1]";

  return (
    <div className="flex bg-primary">
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
            title='Target Calories'
            color='#666666'
            target={`${targetCalories - 100} - ${targetCalories + 100} kcal`}
            performance={Math.round(calorieWeeklyAverage / targetCalories * 100)}
          />

          <Card
            title={'Protein'}
            target={`${protein - 10} - ${protein + 10} grams`}
            unit='grams'
            color='#ffb114'
            performance={Math.round(proteinWeeklyAverage / protein * 100)}
          />
        </div>



        <div className={classNames('mt-3', 'w-full', 'grid', 'grid-cols-2', 'grid-rows-1, gap-3')}>
          {/* HABIT GOALS*/}
          {currentHabits && currentHabits.length > 0 &&
            <div className={`shadow-sm relative rounded-lg pl-2 ${gradientStyling} z-10`}>
              <HabitCard
                dataSource={currentHabits}
                title='Habit Goals'
              />
            </div>
          }

           {/* MACROS*/}
            <div className={`shadow-sm relative rounded-lg align-center col-span-1 row-span-1 px-2 ${gradientStyling} z-10`}>
              <ChartHeader title={' Protein Percent of Total Calories'} />
              {/* Target Macro Distribution From Diet */}
              <div className="flex justify-around">
                <div className='w-5/12'>
                  <PieChart
                    title='Target'
                    series={[protein * 4, fat * 9 + carbs * 4]}
                    labels={["Protein", "Fat & Carbs"]}
                  />
                </div>
                {/* Actual Macro Distribution From Diet */}
                <div className='w-5/12'>
                  <PieChart
                    title='Actual'
                    series={[weelkyMacroDistribution[0] * 4, weelkyMacroDistribution[1] * 9 + weelkyMacroDistribution[2] * 4]}
                    labels={["Protein", "Fat & Carbs"]}
                  />
                </div>
              </div>
            </div>
        </div>



        <div className="mt-3">
          <div className={classNames('w-full', 'grid', 'grid-cols-2', 'grid-rows-1 gap-3')}>






            {/* LINE CHART FOR WEIGHT AND BODY FAT */}
            {lineChartData && lineChartData.length > 0 &&
              < div className={`h-full col-span-1 shadow-sm relative rounded-lg align-center pb-2 pt-3 w-full ${gradientStyling} z-10`}>
                <LineChart datapoints={lineChartData} />
              </div>
            }

           

            {/* MACRONUTRIENTS OVER TIME STACKED CHART */}
          {barChartData && barChartData.length > 0 &&
            <div className={`shadow-sm relative rounded-lg align-center pb-2 pt-2 ${gradientStyling} z-10`}>
              <ChartHeader title="Protein Distribution over Time (%)" />
              <Stacked
                data={proteinBarChartData}
                name1="protein"
                name2="calories"
              />
            </div>
          }

          </div>
        </div>
      </div>
    </div>

  );
};

export default DashboardStandard;






