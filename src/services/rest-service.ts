import dataProvider from '@refinedev/simple-rest';
import axios from 'axios';

export const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('axiosInstance.interceptors.response success');
    return response;
  },
  (error) => {
    console.log('axiosInstance.interceptors.response error');
    let customError = {
      ...error,
      message: error.response?.data?.error?.message,
      statusCode: error.response?.status,
    };

    if (error.response?.status === 429) {
      customError = {
        ...customError,
        message: error.response?.data.message,
        statusCode: error.response?.status,
      };
    }

    if (error.response?.status === 403) {
      customError = {
        ...customError,
        message: error.response?.data?.error?.message,
        statusCode: error.response?.status,
      };
    }

    return Promise.reject(customError);
  },
);

export const restDataProvider = dataProvider(import.meta.env.VITE_APP_BE_API_URL as string, axiosInstance);
