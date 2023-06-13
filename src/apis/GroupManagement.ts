import Cookies from 'universal-cookie';

import { TableDataResponseDto } from '@/components/organisms/CmCommonTable/types';

import { ConfigGroupDto, DataConfigGroupDto, GroupManagementDto } from '@/types/dtos/groupManagementDtos';
import { IOriginalResponse } from '@/types/http';
import { notify } from '@/utils/notify';

import { GroupManagementEndpoint, USER_INFO_COOKIE } from '@/constants';

import apiClient from './apiClient';

const GroupManagement = {
  groupManagement: async (): Promise<TableDataResponseDto<DataConfigGroupDto> | unknown> => {
    const cookies = new Cookies();
    const userInfo = cookies.get(USER_INFO_COOKIE);
    try {
      let result = [];
      let totalNum = 0;

      if (userInfo.id) {
        const data = (await apiClient.get(GroupManagementEndpoint.groupList, {
          params: {
            [JSON.stringify({
              dto: {
                user_id: userInfo.id,
              },
            })]: '',
            _: new Date().getTime(),
          },
        })) as any;

        result = data.dto.ConfigGroupDto;
        totalNum = data.dto.ConfigGroupDto.length;
      }

      return { data: result, total: totalNum };
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    }
  },

  createNewGroup: async (payload: GroupManagementDto) => {
    try {
      const serverParams = {
        description: payload.description,
        group_id: payload.group_id,
        group_name: payload.group_name,
      };
      const res: IOriginalResponse = await apiClient.post(GroupManagementEndpoint.group, {
        dto: serverParams,
      });

      return res;
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    }
  },

  editGroupManagement: async (payload: GroupManagementDto) => {
    try {
      const serverParams = {
        description: payload.description,
        group_id: payload.group_id,
        group_name: payload.group_name,
      };
      const res: IOriginalResponse = await apiClient.put(GroupManagementEndpoint.group, {
        dto: serverParams,
      });

      return res;
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    }
  },

  deleteGroupList: async (payload: ConfigGroupDto[]) => {
    try {
      const serverParams = {
        ConfigGroupDto: [...payload],
      };
      const res: IOriginalResponse = await apiClient.delete(GroupManagementEndpoint.groupList, {
        data: { dto: serverParams },
      });

      return res;
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    }
  },
};

export default GroupManagement;
