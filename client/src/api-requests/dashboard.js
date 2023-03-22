import axios from 'axios';

const getUserRow = () => {

    return axios.get('http://localhost:8000/api/dashboard')
      .then((response) => {
        return response.data;
      });

}

const getUserDetails = () => {

  return axios.get('http://localhost:8000/api/dashboard/weightGraph')
    .then((response) => {
      return response.data;
    });

}




export { getUserRow, getUserDetails };