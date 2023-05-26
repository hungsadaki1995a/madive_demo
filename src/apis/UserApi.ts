import axios, { AxiosError } from 'axios';

import UserModel from '@/types/models/userModel';

const { NODE_ENV, REACT_APP_BACKEND_URL } = process.env;
const BASE_URL = NODE_ENV === 'development' ? REACT_APP_BACKEND_URL : '/proobject-devserver';

const UserApi = {
  getUsers: async () => {
    try {
      const { data } = await axios.get(
        'http://101.101.209.11:14000/proobject/proobject-manager/UserList?{"dto":{"user_id":"a"}}&_=1684811200090'
      );
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  addUser: async (submitValue: UserModel) => {
    try {
      return await axios.post('http://101.101.209.11:14000/proobject/proobject-manager/User', {
        dto: submitValue,
      });
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  editUser: async (submitValue: UserModel) => {
    try {
      return await axios.put('http://101.101.209.11:14000/proobject/proobject-manager/User', {
        dto: submitValue,
      });
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  deleteUser: async (user: UserModel) => {
    try {
      return await axios.delete('http://101.101.209.11:14000/proobject/proobject-manager/UserList', {
        data: {
          dto: {
            ConfigUserDto: [user],
          },
        },
      });
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
};

export default UserApi;
