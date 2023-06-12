import { AxiosError } from 'axios';

import { TableDataResponseDto } from '@/components/organisms/CmCommonTable/types';

import { configUserDto } from '@/types/dtos/userDto';

import { UserEndpoint } from '@/constants/apiEndpoint';

import apiClient from './apiClient';

const UserApi = {
  getList: async (): Promise<TableDataResponseDto<configUserDto> | unknown> => {
    try {
      const res = (await apiClient.get(UserEndpoint.getUserList)) as any;
      const result = res.dto.ConfigUserDto;
      return { data: result, total: result.length || 0 };
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  getHistoryList: async (): Promise<TableDataResponseDto<configUserDto> | unknown> => {
    try {
      const res = (await apiClient.get(UserEndpoint.getUserHistory)) as any;
      const result = res.dto.ConfigUserDto;
      return { data: result, total: result.length || 0 };
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  createUser: async (data: configUserDto) => {
    try {
      const res = await apiClient.post(UserEndpoint.getUser, {
        dto: data,
      });
      return res;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  editUser: async (data: configUserDto) => {
    try {
      const res = await apiClient.put(UserEndpoint.getUser, {
        dto: data,
      });
      return res;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  deleteUser: async (data: configUserDto[]) => {
    try {
      return await apiClient.delete(UserEndpoint.getUserList, {
        data: {
          dto: {
            ConfigUserDto: data,
          },
        },
      });
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  deleteHistory: async (data: configUserDto[]) => {
    try {
      return await apiClient.delete(UserEndpoint.getUserHistory, {
        data: {
          dto: {
            ConfigUserDto: data,
          },
        },
      });
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
};

export default UserApi;
