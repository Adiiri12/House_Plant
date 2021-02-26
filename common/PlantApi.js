import axios from 'axios';


export default axios.create({


    baseURL : 'https://trefle.io/api/v1/species/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      },
});