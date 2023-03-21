import React, { useState, useEffect } from 'react';
import { getUserRow } from '../api-requests/dashboard';
import { getMaintenanceCalories, getTargetCalories, getProtein, getFat, getCarbs } from '../helper-functions/nutritionCalculations';
import { NavBar, SideBar } from '../components';
import Stacked from '../components/charts/Stacked';
import PieChart from '../components/charts/PieChart';



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

  const maintenanceCalories = getMaintenanceCalories(inputs.weight, inputs.body_fat_percentage);
  const targetCalories = getTargetCalories(inputs.weight_change_goal, maintenanceCalories);
  const protein = getProtein(inputs.weight, inputs.sex, inputs.body_fat_percentage);
  const fat = getFat(inputs.weight, inputs.sex, inputs.body_fat_percentage);
  const carbs = getCarbs(targetCalories, protein, fat);

  //gets user details from the database
  useEffect(() => {
    getUserRow()
      .then((res) => {
        setUserInputs(res);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className='mt-5 flex'>
        <div className="w-72 h-screen fixed Sidebar">
          <SideBar
            inputs={inputs}
            setUserInputs={setUserInputs}
          />
        </div>

        <div className='ml-64'>
          <h1 className='ml-5 mt-5 text-2xl'>Nutrition Targets</h1>

          <div className='flex flex-wrap'>
            <div className='ml-5 flex flex-nowrap justify-center'>
              <div className="h-44 rounded-xl w-50 p-8 pt-9 m-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-400">Maintenance Calories</p>
                    <p className="text-2xl">{maintenanceCalories}</p>
                    <p className="text-xs">range</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='ml-5 flex flex-nowrap justify-center'>
              <div className="h-44 rounded-xl w-50 p-8 pt-9 m-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-400">Target Calories</p>
                    <p className="text-2xl">{targetCalories}</p>
                    <p className="text-xs">range</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='ml-5 flex flex-nowrap justify-center'>
              <div className="h-44 rounded-xl w-50 p-8 pt-9 m-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-400">Protein</p>
                    <p className="text-2xl">{protein}</p>
                    <p className="text-xs">range</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='ml-5 flex flex-nowrap justify-center'>
              <div className="h-44 rounded-xl w-50 p-8 pt-9 m-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-400">Carbs</p>
                    <p className="text-2xl">{carbs}</p>
                    <p className="text-xs">range</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='ml-5 flex flex-nowrap justify-center'>
              <div className="h-44 rounded-xl w-50 p-8 pt-9 m-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-400">Fat</p>
                    <p className="text-2xl">{fat}</p>
                    <p className="text-xs">range</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* Macro Distribution From Targets */}
            < PieChart
              series={[protein, fat, carbs]}
              labels={["Protein", "Fat", "Carbohydrates"]}
            />
          </div>

          {/* Actual Macro Distribution From Diet */}
          <div>
            < PieChart
              series={[protein, fat, carbs]}
              labels={["Protein", "Fat", "Carbohydrates"]}
            />
          </div>
          <div>

            <Stacked
              width='320px'
              height='360px'
            />
          </div>
        </div>



      </div>
    </div>
  );
};

export default DashboardPage;
