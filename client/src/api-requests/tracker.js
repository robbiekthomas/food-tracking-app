import axios from 'axios';

const getFoodRow = () => {

  return axios.get('http://localhost:8000/api/tracker')
    .then((res) => {
      return res.data;
    });

}


const getDailyMacroStats = () => {

  return axios.get('http://localhost:8000/api/tracker/trackerDashboardMacros')
    .then((res) => {
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
      console.log(12, response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
}

const addFoodToLogs = (food, meal, date) => {
  return
}

export { getFoodRow, getDailyMacroStats, getFoodList, upDateTrackerItems, deleteFoodFromDB, addFoodToLogs };