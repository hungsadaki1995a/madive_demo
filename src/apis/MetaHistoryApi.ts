import { AxiosError } from 'axios';

import { TableDataResponseDto, TableViewState } from '@/components/organisms/CmCommonTable/types';

import { MetaHistoryDto } from '@/types/dtos/metaHistoryDtos';

import { MetaHistoryEndPoint } from '@/constants/apiEndpoint';

import apiClient from './apiClient';

const MetaHistoryApi = {
  getList: async (tableState: TableViewState): Promise<TableDataResponseDto<MetaHistoryDto> | unknown> => {
    try {
      const { currentPage, sortBy } = tableState;
      let result = sortBy.field;
      let totalNum = 0;
      const data = (await apiClient.get(MetaHistoryEndPoint.getList, {
        params: {
          [JSON.stringify({
            dto: {
              pageInfoDto: {
                pageNum: currentPage + 1,
                pageLength: -1,
                sort: sortBy.field ? true : false,
                sortField: 'physical_name',
                sortingType: sortBy.direction || 'DESC',
              },
              conditionDto: [],
            },
          })]: '',
          _: new Date().getTime(),
        },
      })) as any;

      result = data.dto.MetaDto;
      totalNum = data.dto.pagingResultDto.totalNum;

      return { data: result, total: totalNum };
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
  deleteList: async (metaHistory: MetaHistoryDto) => {
    try {
      const response = await apiClient.delete(MetaHistoryEndPoint.deleteList, {
        data: {
          dto: {
            MetaDto: [metaHistory],
          },
        },
      });
      return response;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
};
export default MetaHistoryApi;
