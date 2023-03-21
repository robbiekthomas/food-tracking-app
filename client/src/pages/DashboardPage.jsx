import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { getUserRow } from '../api-requests/dashboard';
import { getMaintenanceCalories, getTargetCalories, getProtein, getFat, getCarbs } from '../helper-functions/nutritionCalculations';
import { NavBar, SideBar } from '../components';
import Stacked from '../components/charts/Stacked';
import PieChart from '../components/charts/PieChart';
import ChartHeader from '../components/charts/ChartsHeader';
import LineChart from '../components/charts/LineChart';
import { habitsData, createHabitGridData } from '../data/chartData';


const DashboardPage = () => {
  //will store the users old data technically then get submitted as package for post request
  const [inputs, setUserInputs] = useState({
    id: 1,
    name: '',
    email: '',
    birthdate: '',
    sex: '',
    toggleBF: false,
    mainGoal: '',
    bodyFatPercentage: 0,
    waist: 0,
    hips: 0,
    neck: 0,
    height: 0,
    toggleWCC: false,
    weight_change_goal: 0
  });

  //store current habit goals
  const [currentHabits, setCurrentHabits] = useState([]);
  const [habitGoal1, setCurrentHabitGoal1] = useState({
    goal_id: 0,
    is_complete: false,
    goal_name: '',
    date: ''
  });

  const [habitGoal2, setCurrentHabitGoal2] = useState({
    goal_id: 0,
    is_complete: false,
    goal_name: '',
    date: ''
  });

  const [habitGoal3, setCurrentHabitGoal3] = useState({
    goal_id: 0,
    is_complete: false,
    goal_name: '',
    date: ''
  });

 
  
  //calculate nutrition targets
  const maintenanceCalories = getMaintenanceCalories(inputs.weight, inputs.body_fat_percentage);
  const targetCalories = getTargetCalories(inputs.weight_change_goal, maintenanceCalories);
  const protein = getProtein(inputs.weight, inputs.sex, inputs.body_fat_percentage);
  const fat = getFat(inputs.weight, inputs.sex, inputs.body_fat_percentage);
  const carbs = getCarbs(targetCalories, protein, fat);

  
  //gets user details and habit goals from the database
  useEffect(() => {
    getUserRow()
      .then((res) => {
        console.log(res[1]);
        setUserInputs(res[0]);
        setCurrentHabitGoal1(res[0]);
        setCurrentHabitGoal2(res[1]);
        setCurrentHabitGoal3(res[2]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
   const d = createHabitGridData(habitGoal1, habitGoal2, habitGoal3);
   setCurrentHabits(d);
  },[habitGoal1, habitGoal2, habitGoal3]);

  return (
    <div className='bg-slate-100' >
      <div className='mt-5 flex'>
        {/*Sidebar*/}
        {currentHabits.length > 0 && <SideBar
          inputs={inputs}
          setUserInputs={setUserInputs}
          currentHabits={currentHabits}
          setCurrentHabits={setCurrentHabits}
        />}
        {/*Nutrition Targets (top cards on dashboard)*/}
        <div className='w-3/4'>
          <div className='flex flex-wrap justify-around max-w-screen-lg'>

            <div className='h-32 w-57 bg-white flex flex-nowrap justify-center mr-2 ml-2'>
              <div className="rounded-xl p-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-400">Target Calories</p>
                    <p className="text-2xl">{targetCalories}</p>
                    <p className="text-xs">{`${targetCalories - 100} - ${targetCalories + 100} cal`}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='h-32 w-57 bg-white flex flex-nowrap justify-center mr-2 ml-2'>
              <div className="rounded-xl p-8">
                <div className="flex justify-between items-center">
                  <div >
                    <p className="font-bold text-gray-400">Protein</p>
                    <p className="text-2xl">{protein}</p>
                    <p className="text-xs">{`${protein - 10} - ${protein + 10} g`}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='h-32 w-57 bg-white flex flex-nowrap justify-center mr-2 ml-2'>
              <div className="rounded-xl p-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-400">Carbs</p>
                    <p className="text-2xl">{carbs}</p>
                    <p className="text-xs">{`${carbs - 10} - ${carbs + 10} g`}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className=' h-32 w-57 bg-white flex flex-nowrap justify-center'>
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
          <div className='flex justify-between mt-10 mb-10 ml-10 mr-10'>
            <div className='w-5/12 bg-white align-center pb-5'>
              <p className='mt-5 mb-5 w-full text-center font-bold text-gray-400 text-xl'>Macronutrient Distribution</p>
              <div className='flex justify-between'>

                <div className='flex-column w-6/12'>
                  <ChartHeader title='Target' />
                  < PieChart
                    series={[protein, fat, carbs]}
                    labels={["Protein", "Fat", "Carbohydrates"]}
                  />
                </div>

                {/* Actual Macro Distribution From Diet */}
                <div className='flex-column w-6/12'>
                  <ChartHeader title='Actual' />
                  < PieChart
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

          {/* Bottom dashboard*/}
          {/* <div className='flex justify-between mt-10 mb-10 ml-10 mr-10'>

            <div className='w-6/12 bg-white align-center pb-5 pt-5'>
              <ChartHeader title="Macronutrient Distribution over Time" />

              <Stacked
                width='auto'
                height='300px'
              />
            </div>

            <div className="w-5/12 bg-white align-center pb-5 pt-5">
              <ChartHeader title="Weight Change" />
              <LineChart
                width='auto'
                height='300px'
              />
            </div>

          </div> */}

        </div>




      </div>
    </div>
  );
};

export default DashboardPage;
