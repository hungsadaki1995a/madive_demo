import axios, { AxiosError } from 'axios';

import { TableDataResponseDto } from '@/components/organisms/CmCommonTable/types';

import { ProminerResourceDto } from '@/types/dtos/prominerDtos';
import UserModel from '@/types/models/userModel';

const { NODE_ENV, REACT_APP_BACKEND_URL } = process.env;
const BASE_URL = NODE_ENV === 'development' ? REACT_APP_BACKEND_URL : '/proobject-devserver';

const UserApi = {
  getUsers: async (): Promise<TableDataResponseDto<ProminerResourceDto> | unknown> => {
    try {
      const { data } = await axios.get(
        'http://101.101.209.11:14000/proobject/proobject-manager/UserList?{"dto":{"user_id":"a"}}&_=1684811200090'
      );
      return { data: data?.dto?.ConfigUserDto, total: data?.dto?.ConfigUserDto?.length || 0 };
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
