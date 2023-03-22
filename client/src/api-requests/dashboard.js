import axios from 'axios';

//api call for nutrition cards, macro distribution target pie chart, and habit goal grid initial values
const getUserRow = () => {

    return axios.get('http://localhost:8000/api/dashboard')
      .then((response) => {
        return response.data;
      });

}

//api call for line chart data
const getUserDetails = () => {

  return axios.get('http://localhost:8000/api/dashboard/weightGraph')
    .then((response) => {
      return response.data;
    });

}


//api call for stacked macro chart data
const getUserMacros = () => {

  return axios.get('http://localhost:8000/api/dashboard/stackedMacroGraph')
    .then((response) => {
      console.log('res', response.data);
      return response.data;
    });

}




export { getUserRow, getUserDetails, getUserMacros };