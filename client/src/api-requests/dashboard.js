import axios from 'axios';

//api call for nutrition cards, macro distribution target pie chart, and habit goal grid initial values
const getUserRow = () => {

    return axios.get('http://localhost:8000/api/dashboard')
      .then((response) => {
        return response.data;
      });

};

//api call for line chart data
const getUserDetails = () => {

  return axios.get('http://localhost:8000/api/dashboard/weightGraph')
    .then((response) => {
      return response.data;
    });

};


//api call for stacked macro chart data
const getUserMacros = () => {

  return axios.get('http://localhost:8000/api/dashboard/stackedMacroGraph')
    .then((response) => {
      return response.data;
    });

};


const getProteinProportion = () => {

  return axios.get('http://localhost:8000/api/dashboard/stackedProteinGraph')
  .then((response) => {
    return response.data;
  });
  
};

const getConsistencyStreak = (goal) => {

  return axios.get('http://localhost:8000/api/dashboard/goal', {params: {goal}})
  .then((response) => {
    console.log('getConsistencyStreakResponse', response.data)
    return response.data;
  });
  
};


const getHungerScore = () => {

  return axios.get('http://localhost:8000/api/dashboard/foodReflection')
  .then((response) => {
    return response.data;
  });
  
}

const getMood = () => {

  return axios.get('http://localhost:8000/api/dashboard/mood')

  .then((response) => {
    return response.data;
  });
  
}




export { 
  getUserRow, 
  getUserDetails, 
  getUserMacros, 
  getProteinProportion, 
  getHungerScore, 
  getMood,
  getConsistencyStreak
};