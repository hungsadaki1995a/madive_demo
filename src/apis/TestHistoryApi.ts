import { AxiosError } from 'axios';

import { TableDataResponseDto, TableViewState } from '@/components/organisms/CmCommonTable/types';

import { ProminerResourceDto } from '@/types/dtos/prominerDtos';
import { TestHistoryDto } from '@/types/dtos/TestHistoryDtos';
import { IOriginalResponse } from '@/types/http';

import apiClient from './apiClient';

const TestHistoryApi = {
  getListHistory: async (tableState: TableViewState): Promise<TableDataResponseDto<TestHistoryDto> | unknown> => {
    try {
      const { filter, currentPage, sortBy } = tableState;

      let result = [];
      let totalNum = 0;
      if (filter.server.app_resource_id) {
        const data: IOriginalResponse = await apiClient.get('/TestHistoryList', {
          params: {
            [JSON.stringify({
              dto: {
                searchType: filter.server.sg_resource_id ? 'Sg' : 'App',
                app_resource_id: filter.server.app_resource_id,
                sg_resource_id: filter.server.sg_resource_id,
                pageInfoDto: {
                  pageNum: currentPage + 1,
                  pageLength: -1,
                },
                sort: sortBy.field ? true : false,
                sortField: sortBy.field || 'logical_name',
                sortingType: sortBy.direction || 'desc',
              },
            })]: '',
            _: new Date().getTime(),
          },
        });

        result = data.dto.TestCaseDto;
        totalNum = data.dto.pagingResultDto.totalNum;
      }

      return { data: result, total: totalNum };
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
};

export default TestHistoryApi;
