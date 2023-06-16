import { SgListResponse } from '@/types/dtos/overviewDtos';
import { ServiceGroupDto } from '@/types/dtos/serviceGroupDtos';

import { ServiceGroupEndpoint } from '@/constants/apiEndpoint';

import apiClient from './apiClient';

type Response = {
  dto: { ServiceGroupDto: ServiceGroupDto[] };
};

const ServiceGroupApi = {
  getSgList: async (resourceId: string): Promise<Response> => {
    return await apiClient.get(ServiceGroupEndpoint.sg, {
      params: {
        [JSON.stringify({
          dto: {
            resource_id: resourceId,
          },
        })]: '',
        _: new Date().getTime(),
      },
    });
  },

  getServiceList: async (appId: string | undefined): Promise<SgListResponse> => {
    return await apiClient.get<SgListResponse>(ServiceGroupEndpoint.sg, {
      params: {
        [JSON.stringify({
          dto: {
            resource_id: appId,
          },
        })]: '',
        _: new Date().getTime(),
      },
    });
  },

  deleteSgData: async (sgDto: SgListResponse[]): Promise<SgListResponse> => {
    return await apiClient.delete<SgListResponse>(ServiceGroupEndpoint.sg, {
      data: {
        dto: {
          ServiceGroupDto: sgDto,
        },
      },
    });
  },

  editSgData: async (sgDto: SgListResponse[]): Promise<SgListResponse> => {
    return await apiClient.put<SgListResponse>(ServiceGroupEndpoint.sg, {
      dto: {
        ServiceGroupDto: sgDto,
      },
    });
  },

  addSgData: async (sgDto: SgListResponse[]): Promise<SgListResponse> => {
    return await apiClient.post<SgListResponse>(ServiceGroupEndpoint.sg, {
      dto: {
        ServiceGroupDto: sgDto,
      },
    });
  },
};

export default ServiceGroupApi;
