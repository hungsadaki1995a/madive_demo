import { AxiosError } from 'axios';

import DbioModel from '@/types/models/dbioModel';

import { DbioEndpoint } from '@/constants';

import apiClient from './apiClient';

const DbioApi = {
  getDbios: async () => {
    try {
      const data = (await apiClient.get<any>(DbioEndpoint.modelDbioList, {
        params: {
          _: new Date().getTime(),
        },
      })) as any;
      return { data: data.dto.ModelDbioDto, total: data.dto.ModelDbioDto?.length };
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  getDbio: async (alias: string): Promise<any> => {
    const data = await apiClient.get(DbioEndpoint.modelDbio, {
      params: {
        [JSON.stringify({
          dto: { alias },
        })]: '',
        _: new Date().getTime(),
      },
    });
    return data;
  },

  addDbio: async (submitValue: DbioModel) => {
    try {
      const data = await apiClient.post(DbioEndpoint.modelDbio, {
        dto: submitValue,
      });
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  editDbio: async (submitValue: DbioModel) => {
    try {
      const data = await apiClient.put(DbioEndpoint.modelDbio, {
        dto: submitValue,
      });
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  deleteDbio: async (Dbios: DbioModel[]) => {
    try {
      const data = await apiClient.delete(DbioEndpoint.modelDbioList, {
        data: {
          dto: {
            ModelDbioDto: Dbios,
          },
        },
      });
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
};

export default DbioApi;
