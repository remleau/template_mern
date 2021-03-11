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
    // return error.response;
  } else if (error.request) {
    // return error.request
  } else if (error.message) {
    // return error.message;
  }
  
  return error.response;
  //return Promise.reject(error);
});