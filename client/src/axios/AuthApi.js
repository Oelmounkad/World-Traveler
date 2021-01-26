import axios from 'axios';

export default axios.create({
  baseURL: `https://world-traveler-authentication.herokuapp.com/`
});