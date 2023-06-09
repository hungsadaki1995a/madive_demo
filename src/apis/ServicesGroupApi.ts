import { ServiceGroupDto } from '@/types/dtos/serviceGroupDtos';

import { ServiceGroupEndpoint } from '@/constants';

import apiClient from './apiClient';

type Response = {
  dto: { ServiceGroupDto: ServiceGroupDto[] };
};

const ServiceGroupApi = {
  getSgList: async (resourceId: string): Promise<Response> => {
    return await apiClient.get(ServiceGroupEndpoint.getServiceList, {
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
};

export default ServiceGroupApi;
