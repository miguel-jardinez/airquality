import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://api.openaq.org/v3/',
  headers: {
    'X-API-Key': process.env.API_KEY,
  },
});
