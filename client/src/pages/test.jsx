import React, { useState, useEffect } from 'react';
import { getUserRow } from '../api-requests/dashboard';

import { NavBar, SideBar } from '../components';

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
    lengthUnits: '',
    weightUnits: ''
  });

  console.log(inputs, 'inputs')

  //gets user details from the database
  useEffect(() => {
    getUserRow()
      .then((res) => {
        //console.log(1, res);
        setUserInputs(res);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log('2', inputs);

  return (
    <div className='mt-5 flex'>
      <div className="w-72 h-screen fixed Sidebar">
        <SideBar
          inputs={inputs}
          change={setUserInputs}
        />
      </div>
      <div className='bg-red flex flex-wrap lg:flex-nowrap justify-center'>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">$63,448.78</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default DashboardPage
