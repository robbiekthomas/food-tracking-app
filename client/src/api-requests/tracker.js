import axios from 'axios';

function getFoodRow() {

    return axios.get('http://localhost:8000/api/tracker')
      .then((response) => {
        return response.data;
      });

}

export default getFoodRow;