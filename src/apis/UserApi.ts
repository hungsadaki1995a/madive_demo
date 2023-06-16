import { AxiosError } from 'axios';

import { TableDataResponseDto } from '@/components/organisms/CmCommonTable/types';

import { configUserDto } from '@/types/dtos/userDto';

import { UserEndpoint } from '@/constants/apiEndpoint';

import apiClient from './apiClient';

const UserApi = {
  getList: async (): Promise<TableDataResponseDto<configUserDto> | unknown> => {
    try {
      const res = (await apiClient.get(UserEndpoint.getList)) as any;
      const result = res.dto.ConfigUserDto;
      return { data: result, total: result.length || 0 };
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  getHistoryList: async (): Promise<TableDataResponseDto<configUserDto> | unknown> => {
    try {
      const res = (await apiClient.get(UserEndpoint.historyList)) as any;
      const result = res.dto.ConfigUserDto;
      return { data: result, total: result.length || 0 };
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  deleteHistory: async (data: configUserDto[]) => {
    try {
      return await apiClient.delete(UserEndpoint.historyList, {
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
