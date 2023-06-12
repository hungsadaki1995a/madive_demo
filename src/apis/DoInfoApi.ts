import { DoInfoInput } from '@/types/dtos/doInfoDto';

import { DoInfoEnpoint } from '@/constants/apiEndpoint';

import { FieldInfoDto } from './../types/dtos/doInfoDto';
import apiClient from './apiClient';

type Response = {
  dto: {
    FieldInfo: FieldInfoDto[];
    result: string;
  };
};
const DoInfoApi = {
  getDoInfo: async (filterDoInfo: DoInfoInput): Promise<Response> => {
    return await apiClient.get(DoInfoEnpoint.getDoInfo, {
      params: {
        [JSON.stringify({ dto: filterDoInfo })]: '',
      },
    });
  },
};

export default DoInfoApi;
