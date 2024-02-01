import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://your-production-api.com' : 'http://localhost:3000';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducers = async () => {
  const response = await api.get('/producers');
  return response.data;
};

export const createProducer = async (producerData:any) => {
  const response = await api.post('/producers', producerData);
  return response.data;
};

export const getProducerById = async (producerId:number) => {
  const response = await api.get(`/producers/${producerId}`);
  return response.data;
};

export const updateProducer = async (producerId:number, producerData:any) => {
  const response = await api.put(`/producers/${producerId}`, producerData);
  return response.data;
};

export const deleteProducer = async (producerId:number) => {
  const response = await api.delete(`/producers/${producerId}`);
  return response.data;
};

export default api;
