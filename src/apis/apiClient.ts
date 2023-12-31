import axios, { AxiosResponse } from 'axios';

import { IPlainObject } from '@/types/common';
import { IOriginalResponse } from '@/types/http';

const apiClient = axios.create();

const { REACT_APP_BACKEND_URL } = process.env;

apiClient.defaults.baseURL = REACT_APP_BACKEND_URL || 'http://101.101.209.11:14000/proobject/proobject-manager';

apiClient.interceptors.response.use(
  (response: AxiosResponse<IOriginalResponse>): IOriginalResponse => {
    return response?.data || response;
  },
  (error) => {
    return Promise.reject(error?.response || error);
  }
);

export default apiClient;

export function getRequest(URL: string, payload?: IPlainObject): Promise<IOriginalResponse> {
  const params = payload ? JSON.stringify({ dto: payload }) : '';
  return apiClient
    .get(`/${URL}`, {
      params: {
        [params]: '',
        _: new Date().getTime(),
      },
    })
    .then((response) => response as unknown as IOriginalResponse);
}

export function postRequest(URL: string, payload: IPlainObject) {
  return apiClient.post(`/${URL}`, payload).then((response) => response);
}

export function putRequest(URL: string, payload: IPlainObject) {
  return apiClient.put(`/${URL}`, payload).then((response) => response);
}

export function patchRequest(URL: string, payload: IPlainObject) {
  return apiClient.patch(`/${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL: string, payload: IPlainObject) {
  return apiClient.delete(`/${URL}`, payload).then((response) => response);
}
