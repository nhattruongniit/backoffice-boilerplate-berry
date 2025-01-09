import { DataProvider } from '@refinedev/core/dist/contexts/data/types';
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

export const CustomRestDataProvider = (apiUrl: string, httpClient: any = axiosInstance): DataProvider => ({
  ...dataProvider(apiUrl, httpClient),
  getList: async ({ resource, pagination }) => {
    const url = `${apiUrl}/${resource}?page=${pagination?.current}&limit=${pagination?.pageSize}`;
    const { data } = await httpClient.get(`${url}`);
    console.log('CustomRestDataProvider getList: ', data);
    return {
      data,
      total: data?.data?.length,
    };
  },
  // getOne: async ({ resource, id }) => {},
  // create: async ({ resource, values }) => {},
  // ...
});

export const restDataProvider = CustomRestDataProvider(
  'https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api',
  axiosInstance,
);
