import axios from 'axios';

const getUserRow = () => {

    return axios.get('http://localhost:8000/api/dashboard')
      .then((response) => {
        return response.data;
      });

}



export { getUserRow };