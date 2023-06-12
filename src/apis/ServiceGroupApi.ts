import axios, { AxiosError } from 'axios';

import { AplicationFilterDto, ApplicationListResponseDto } from '@/types/dtos/applicationDtos';
import {
  addNewApplicationDto,
  DeleteApplicationDto,
  editApplicationDto,
  SgListResponse,
} from '@/types/dtos/overviewDtos';

import apiClient from './apiClient';

const AppAndSGAPI = {
  getAppAndSGAPI: async (filterDto: AplicationFilterDto): Promise<ApplicationListResponseDto | any> => {
    return await apiClient.get<ApplicationListResponseDto>('/ApplicationList', {
      params: JSON.stringify({
        dto: filterDto,
      }),
    });
  },
  addNewApplication: async (applicationDto: addNewApplicationDto): Promise<any> => {
    return await apiClient.post<addNewApplicationDto>('/Application', {
      dto: applicationDto,
    });
  },
  editApplication: async (applicationDto: editApplicationDto): Promise<any> => {
    try {
      const { data } = await axios.put<editApplicationDto>(
        'http://101.101.209.11:14000/proobject/proobject-manager/Application',
        {
          dto: applicationDto,
        }
      );
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
  deleteApplication: async (applicationDto: DeleteApplicationDto): Promise<DeleteApplicationDto | any> => {
    try {
      const response = await axios.delete<DeleteApplicationDto>(
        'http://101.101.209.11:14000/proobject/proobject-manager/Application',
        {
          data: {
            dto: applicationDto,
          },
        }
      );

      return response.data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
  getSglist: async (appId: string | undefined): Promise<SgListResponse | any> => {
    try {
      const { data } = await axios.get<SgListResponse>(
        'http://101.101.209.11:14000/proobject/proobject-manager/SgList',
        {
          params: {
            [JSON.stringify({
              dto: {
                resource_id: appId,
              },
            })]: '',
            _: new Date().getTime(),
          },
        }
      );
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  deleteSgData: async (sgDto: SgListResponse[]): Promise<any> => {
    try {
      const { data } = await axios.delete<SgListResponse>(
        'http://101.101.209.11:14000/proobject/proobject-manager/SgList',
        {
          data: {
            dto: {
              ServiceGroupDto: sgDto,
            },
          },
        }
      );
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
  editSgData: async (sgDto: SgListResponse[]): Promise<any> => {
    try {
      const { data } = await axios.put<SgListResponse>(
        'http://101.101.209.11:14000/proobject/proobject-manager/SgList',
        {
          dto: {
            ServiceGroupDto: sgDto,
          },
        }
      );
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
  addSgData: async (sgDto: SgListResponse[]): Promise<any> => {
    try {
      const { data } = await axios.post<SgListResponse>(
        'http://101.101.209.11:14000/proobject/proobject-manager/SgList',
        {
          ServiceGroupDto: sgDto,
        }
      );
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
};

export default AppAndSGAPI;
