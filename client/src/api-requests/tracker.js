import axios from 'axios';

const getFoodRow = () => {

  return axios.get('http://localhost:8000/api/tracker')
    .then((res) => {
      return res.data;
    });

}

//get quantitative information for the cards on the tracker dashboard
const getDailyMacroStats = () => {

  return axios.get('http://localhost:8000/api/tracker/trackerDashboardMacros')
    .then((res) => {
      return res.data;
    })
}

//get qualitative information for the cards on the dashboard
const getQualitativeStats = (day) => {

  return axios.get('http://localhost:8000/api/tracker/qualitativeTrackerDashboard', {
    params: { day }
  })
    .then((res) => {
      console.log('qualitativeTrackerDashboard', res.data)
      return res.data;
    })

}


const getFoodList = (day) => {

  return axios.get('http://localhost:8000/api/tracker/foodLogOfSelectedDay', {
    params: { day }
  })
    .then((res) => {
      return res.data;
    });

}


const upDateTrackerItems = (meal, date) => {

  return axios.get('http://localhost:8000/api/tracker/upDateTrackerItems', {
    params: { meal, date }
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });

}

const deleteFoodFromDB = (food, meal, date) => {
  return axios.delete(`http://localhost:8000/api/tracker/food-log`, { params: {food, meal, date }})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
}

const addFoodToLogs = (food, meal, date) => {
  return
}

const getIntuitiveLogHistory = (meal, date) => {
  return axios.get(`http://localhost:8000/api/tracker/hungerHistory`, { params: {meal, date }})
  .then((response) => {
    console.log('getIntuitiveLogHistory',response.data)
    return response.data;
  })
  .catch((error) => {
    console.log("error", error);
  });
}



export { 
  getFoodRow, 
  getDailyMacroStats, 
  getFoodList, 
  upDateTrackerItems, 
  deleteFoodFromDB, 
  addFoodToLogs, 
  getQualitativeStats,
  getIntuitiveLogHistory };