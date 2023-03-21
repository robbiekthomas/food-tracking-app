import axios from 'axios';

const getFoodRow = () => {

    return axios.get('http://localhost:8000/api/tracker')
      .then((response) => {
        return response.data;
      });

}

export { getFoodRow };