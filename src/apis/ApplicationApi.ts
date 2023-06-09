import { ApplicationDto } from '@/types/dtos/applicationDtos';
import { IOriginalResponse } from '@/types/http';

import { ApplicationEndpoint } from '@/constants';

import apiClient from './apiClient';

const ApplicationApi = {
  getList: async (): Promise<ApplicationDto[]> => {
    const response: IOriginalResponse = await apiClient.get(ApplicationEndpoint.getApplicationList, {
      params: {
        _: new Date().getTime(),
      },
    });

    return response?.dto?.ApplicationDto || [];
  },
};

export default ApplicationApi;
