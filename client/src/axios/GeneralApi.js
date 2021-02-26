import axios from 'axios';

export default axios.create({
  baseURL: `https://worldtravelerapi.herokuapp.com/`
});