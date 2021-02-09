import axios from "axios";
import { getToken } from './index';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = { ...config.headers, authorization: 'Bearer ' + getToken() };
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response) {
    console.log(error.response, 'error')
  } else if (error.request) {
    console.log(error,'request')
    return {
      error: 'Aucune connexion serveur'
    }
  } else if (error.message) {
    console.log(error.message, 'message')
  }
  
  return error;
  //return Promise.reject(error);
});