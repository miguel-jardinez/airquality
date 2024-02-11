import axios from 'axios';

export const axiosAqiClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});
