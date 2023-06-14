import axios, { AxiosError } from 'axios';

import { ConfigGroupDtos } from '@/types/dtos/configGroupDto';
import { ConfigRoleDtos } from '@/types/dtos/configRoleDtos';
import { IOriginalResponse } from '@/types/http';
import { RoleType } from '@/types/typeBundle';

import { RoleEndpoint } from '@/constants/apiEndpoint';

import apiClient from './apiClient';

const { NODE_ENV, REACT_APP_BACKEND_URL } = process.env;
const BASE_URL = NODE_ENV === 'development' ? REACT_APP_BACKEND_URL : '/proobject-devserver';

const RoleApi = {
  getRoles: async () => {
    try {
      return await axios.get(BASE_URL + '/role');
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  addRole: async (submitValue: RoleType) => {
    try {
      return await axios.post(BASE_URL + '/role', submitValue);
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  editRole: async (submitValue: RoleType) => {
    try {
      return await axios.patch(BASE_URL + '/role', submitValue);
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  deleteRoles: async (submitValue: string[]) => {
    try {
      return await axios.delete(BASE_URL + '/role', { data: submitValue });
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  getSpecificRole: async (roleName: string) => {
    try {
      return await axios.get(`${BASE_URL}/role/${roleName}`);
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
