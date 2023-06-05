import axios, { AxiosResponse } from 'axios';

import { IOriginalResponse } from '@/types/http';

const apiClient = axios.create();

const { REACT_APP_BACKEND_URL } = process.env;

apiClient.defaults.baseURL = REACT_APP_BACKEND_URL ?? 'http://101.101.209.11:14000/proobject/proobject-manager';

apiClient.interceptors.response.use(
  (response: AxiosResponse<IOriginalResponse>) => {
    if (!response?.data?.header?.responseCode?.includes('0200')) {
      // const errorWrapper: IHttpError = {
      //   code: response?.data?.header?.responseCode,
      //   description: ,
      //   message: ,
      // };
      // return Promise.reject(errorWrapper);
    }

    return response?.data || response;
  },
  (error) => {
    return Promise.reject(error?.response || error);
  }
);

export default apiClient;
