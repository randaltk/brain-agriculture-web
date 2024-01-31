import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'http://your-api-base-url';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',

  },
});

export default api;
