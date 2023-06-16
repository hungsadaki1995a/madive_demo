import { AxiosError } from 'axios';

import { AplicationFilterDto, ApplicationDto, ApplicationListResponseDto } from '@/types/dtos/applicationDtos';
import { addNewApplicationDto, DeleteApplicationDto, editApplicationDto } from '@/types/dtos/overviewDtos';
import { IOriginalResponse } from '@/types/http';

import { ApplicationEndpoint } from '@/constants';

import apiClient from './apiClient';

const ApplicationApi = {
  getList: async (): Promise<ApplicationDto[]> => {
    const response: IOriginalResponse = await apiClient.get(ApplicationEndpoint.getList, {
      params: {
        _: new Date().getTime(),
      },
    });

    return response?.dto?.ApplicationDto || [];
  },
  getAppAndSGAPI: async (filterDto: AplicationFilterDto): Promise<ApplicationListResponseDto | any> => {
    return await apiClient.get<ApplicationListResponseDto>(ApplicationEndpoint.getList, {
      params: JSON.stringify({
        dto: filterDto,
      }),
    });
  },
  addNewApplication: async (applicationDto: addNewApplicationDto): Promise<any> => {
    return await apiClient.post<addNewApplicationDto>(ApplicationEndpoint.app, {
      dto: applicationDto,
    });
  },
  editApplication: async (applicationDto: editApplicationDto): Promise<any> => {
    try {
      return await apiClient.put<editApplicationDto>(ApplicationEndpoint.app, {
        dto: applicationDto,
      });
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
  deleteApplication: async (applicationDto: DeleteApplicationDto): Promise<DeleteApplicationDto | any> => {
    try {
      return await apiClient.delete<DeleteApplicationDto>(ApplicationEndpoint.app, {
        data: {
          dto: applicationDto,
        },
      });
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
};

export default ApplicationApi;
