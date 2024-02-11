import axios from 'axios';

export const axiosAqiClient = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5/',
});
