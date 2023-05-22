import axios, { AxiosError } from 'axios';
import { UserType } from '@/types/typeBundle';

const { NODE_ENV, REACT_APP_BACKEND_URL } = process.env;
const BASE_URL =
  NODE_ENV === 'development' ? REACT_APP_BACKEND_URL : '/proobject-devserver';

const UserApi = {
  getUsers: async () => {
    try {
      const { data } = await axios.get(BASE_URL + '/user');
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  addUser: async (submitValue: UserType) => {
    try {
      return await axios.post(BASE_URL + '/user', submitValue);
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  editUser: async (submitValue: UserType) => {
    try {
      return await axios.patch(BASE_URL + '/user', submitValue);
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  deleteUsers: async (submitValue: string[]) => {
    try {
      return await axios.delete(BASE_URL + '/user', {
        data: { deleteUserList: submitValue },
      });
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
};

export default UserApi;
