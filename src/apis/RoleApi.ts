import { AxiosError } from 'axios';

import { ConfigGroupDtos } from '@/types/dtos/configGroupDto';
import { ConfigRoleDto, ConfigRoleDtos } from '@/types/dtos/configRoleDtos';
import { IOriginalResponse } from '@/types/http';

import { RoleEndpoint } from '@/constants/apiEndpoint';

import apiClient from './apiClient';

const RoleApi = {
  getRoles: async (): Promise<ConfigRoleDtos[] | any> => {
    try {
      const data = (await apiClient.get(RoleEndpoint.getRoleList)) as any;
      return { data: data?.dto?.ConfigRoleDto, totalNum: data?.dto?.ConfigRoleDto?.length };
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  addRole: async (submitValue: ConfigRoleDto): Promise<ConfigGroupDtos | any> => {
    const data = await apiClient.post(RoleEndpoint.role, {
      dto: submitValue,
    });
    return data;
  },

  editRole: async (submitValue: ConfigRoleDto): Promise<ConfigGroupDtos | any> => {
    const data = await apiClient.put(RoleEndpoint.role, {
      dto: submitValue,
    });
    return data;
  },

  deleteRoles: async (roles: ConfigRoleDto[]): Promise<ConfigGroupDtos | any> => {
    return await apiClient.delete(RoleEndpoint.roleList, {
      data: {
        dto: {
          ConfigRoleDto: roles,
        },
      },
    });
  },

  getDeleteConfigData: async (roles: ConfigRoleDto[]): Promise<ConfigGroupDtos | any> => {
    try {
      const data = (await apiClient.get(RoleEndpoint.getGroupListByRole, {
        params: {
          [JSON.stringify({
            dto: { ConfigGroupDto: roles },
          })]: '',
          _: new Date().getTime(),
        },
      })) as any;
      return data?.dto?.value;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  RoleListGet: async (): Promise<ConfigRoleDtos[] | any> => {
    try {
      const data: IOriginalResponse = await apiClient.get(RoleEndpoint.getRoleList, {
        params: {
          _: new Date().getTime(),
        },
      });

      return data?.dto;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  GroupListGet: async (): Promise<ConfigGroupDtos | any> => {
    try {
      const data: IOriginalResponse = await apiClient.get(RoleEndpoint.getGroupList, {
        params: {
          _: new Date().getTime(),
        },
      });
      return data?.dto;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  GroupRoleGet: async (groupName = 'Group Full Permission'): Promise<ConfigGroupDtos | any> => {
    try {
      const data: IOriginalResponse = await apiClient.get(RoleEndpoint.getGroupRole, {
        params: {
          [JSON.stringify({
            dto: {
              group_name: groupName,
            },
          })]: '',
          _: new Date().getTime(),
        },
      });
      return data?.dto;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  GroupRoleAssign: async ({
    newGroupData,
    groupName,
  }: {
    groupName: string;
    newGroupData: {
      group_name: string;
      role_id: string;
      role_name: string;
    }[];
  }): Promise<ConfigGroupDtos | any> => {
    try {
      const data: IOriginalResponse = await apiClient.post(RoleEndpoint.groupRoleAssign, {
        dto: {
          ConfigGroupDto: newGroupData,
          group_name: groupName,
        },
      });
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
};

export default RoleApi;
