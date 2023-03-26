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
    console.log(12, response.data);
   return response.data;
  })
  .catch((err) => {
    console.log(err);
  });

}

export { getFoodRow, getDailyMacroStats, getFoodList, upDateTrackerItems };