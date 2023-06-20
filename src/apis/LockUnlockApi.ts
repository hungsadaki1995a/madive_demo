import { AxiosError } from 'axios';

import { TableDataResponseDto, TableViewState } from '@/components/organisms/CmCommonTable/types';

import { LockAndUnlockDto } from '@/types/dtos/lockUnlockDtos';
import { IOriginalResponse } from '@/types/http';

import { LockUnLockEndPoint } from '@/constants';

import apiClient from './apiClient';

const LockUnlockApi = {
  getLockList: async (tableState: TableViewState): Promise<TableDataResponseDto<LockAndUnlockDto> | unknown> => {
    try {
      const { filter, currentPage, sortBy } = tableState;
      let result = [];
      let totalNum = 0;

      if (filter.server.app_resource_id) {
        const data: IOriginalResponse = await apiClient.get(LockUnLockEndPoint.getLockList, {
          params: {
            [JSON.stringify({
              dto: {
                searchType: filter.server.sg_resource_id ? 'Sg' : 'App',
                app_resource_id: filter.server.app_resource_id,
                sg_resource_id: filter.server.sg_resource_id,
                pageInfoDto: {
                  pageNum: 1,
                  pageLength: -1,
                },
                sort: sortBy.field ? true : false,
                sortField: sortBy.field || 'resource_path',
                sortingType: sortBy.direction || 'desc',
              },
            })]: '',
            _: new Date().getTime(),
          },
        });
        result = data.dto.LockUnDto;
        totalNum = data.dto.pagingResultDto.totalNum;
      }

      return { data: result, total: totalNum };
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
  unlockResources: async (data: LockAndUnlockDto[]): Promise<TableDataResponseDto<LockAndUnlockDto> | unknown> => {
    try {
      if (data) {
        await apiClient.delete(LockUnLockEndPoint.unlockResources, {
          data: {
            dto: { LockUnDto: data },
          },
        });
      }
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
};

export default LockUnlockApi;
