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
      console.log('hikinh',res.data)
      return res.data;
    })
}

//get qualitative information for the cards on the dashboard
const getQualitativeStats = (day) => {

  return axios.get('http://localhost:8000/api/tracker/qualitativeTrackerDashboard', {
    params: { day }
  })
    .then((res) => {
      let counts = {};
      res.data.rows.forEach((item) => {
        const feeling = item.feeling_after_eating;
        if (feeling) {
          if (counts[feeling]) {
            counts[feeling]++;
          } else {
            counts[feeling] = 1;
          }
        }
      });

      const countsArray = Object.keys(counts).map(feeling => ({ feeling, count: counts[feeling] }));
      countsArray.sort((a, b) => b.count - a.count);
      
      return countsArray;
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
  return axios.delete(`http://localhost:8000/api/tracker/food-log`, { params: { food, meal, date } })
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
  return axios.get(`http://localhost:8000/api/tracker/hungerHistory`, { params: { meal, date } })
    .then((response) => {

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
  getIntuitiveLogHistory
};