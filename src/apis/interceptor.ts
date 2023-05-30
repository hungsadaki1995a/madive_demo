import axios from 'axios';
import { camelCase, isArray, isObject, transform } from 'lodash';

interface IResponseType {
  [key: string]: any;
}

const fromSnakeToCamel = (responseData: IResponseType): IResponseType => {
  return transform(responseData, (acc: IResponseType, value, key, target) => {
    const camelKey = isArray(target) ? key : camelCase(key);
    acc[camelKey] = isObject(value) ? fromSnakeToCamel(value) : value;
  });
};

axios.interceptors.response.use(
  (response) => {
    if (response?.data) {
      response.data = fromSnakeToCamel(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axios as ApiClient };
