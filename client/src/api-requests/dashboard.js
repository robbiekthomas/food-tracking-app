import axios from 'axios';

function getUserRow() {

    return axios.get('http://localhost:8000/api/dashboard')
      .then((response) => {
        return response.data;
      });

}

export default getUserRow;