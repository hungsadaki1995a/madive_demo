import axios, { AxiosError } from 'axios';
import { LoginType } from '@/types/typeBundle';

const { NODE_ENV, REACT_APP_BACKEND_URL } = process.env;
const BASE_URL =
  NODE_ENV === 'development' ? REACT_APP_BACKEND_URL : '/proobject-devserver';

const AuthApi = {
  login: async (submitValue: LoginType) => {
    try {
      const { data } = await axios.post(BASE_URL + '/user/login', submitValue);
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
};

export default AuthApi;
