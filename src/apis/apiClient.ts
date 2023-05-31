import axios, { AxiosError } from 'axios';

const apiClient = axios.create();

const { REACT_APP_BACKEND_URL } = process.env;

apiClient.defaults.baseURL = REACT_APP_BACKEND_URL ?? 'http://101.101.209.11:14000/proobject/proobject-manager';

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error instanceof AxiosError ? error.response : error);
  }
);

export default apiClient;
