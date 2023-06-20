import { AxiosError } from 'axios';

import { TableDataResponseDto, TableViewState } from '@/components/organisms/CmCommonTable/types';

import { ProminerMethodDetailDto, ProminerMethodDto, ProminerResourceDto } from '@/types/dtos/prominerDtos';
import { IOriginalResponse } from '@/types/http';

import { FieldEndpoint, MethodEndpoint, ResourceEndpoint, VariableEndpoint } from '@/constants';

import apiClient from './apiClient';

type MethodDetailResponse = {
  dto: {
    DevMnrDto: ProminerMethodDetailDto[];
    rootClass: string;
  };
};

const ProminerApi = {
  getResourceList: async (tableState: TableViewState): Promise<TableDataResponseDto<ProminerResourceDto> | unknown> => {
    try {
      const { filter, currentPage, sortBy } = tableState;
      let result = [];
      let totalNum = 0;
      if (filter.server.app_resource_id) {
        const data: IOriginalResponse = await apiClient.get(ResourceEndpoint.getList, {
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
                sortField: sortBy.field || 'logical_name',
                sortingType: sortBy.direction || 'desc',
              },
            })]: '',
            _: new Date().getTime(),
          },
        });
        result = data.dto.ProminerRscDto;
        totalNum = data.dto.pagingResultDto.totalNum;
      }

      return { data: result, total: totalNum };
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
  getMethodList: async (tableState: TableViewState): Promise<TableDataResponseDto<ProminerMethodDto> | unknown> => {
    try {
      const { filter, currentPage, sortBy } = tableState;
      let result = [];
      let totalNum = 0;
      if (filter.server.app_resource_id) {
        const data: IOriginalResponse = await apiClient.get(MethodEndpoint.getList, {
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
                sortField: sortBy.field || 'logical_name',
                sortingType: sortBy.direction || 'desc',
              },
            })]: '',
            _: new Date().getTime(),
          },
        });
        result = data.dto.ProminerRscDto;
        totalNum = data.dto.pagingResultDto.totalNum;
      }

      return { data: result, total: totalNum };
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
  getFieldList: async (tableState: TableViewState): Promise<TableDataResponseDto<ProminerMethodDto> | unknown> => {
    try {
      const { filter, currentPage, sortBy } = tableState;
      let result = [];
      let totalNum = 0;
      if (filter.server.app_resource_id) {
        const data: IOriginalResponse = await apiClient.get(FieldEndpoint.getList, {
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
                sortField: sortBy.field || 'field_name',
                sortingType: sortBy.direction || 'desc',
              },
            })]: '',
            _: new Date().getTime(),
          },
        });
        result = data.dto.ProminerRscDto;
        totalNum = data.dto.pagingResultDto.totalNum;
      }

      return { data: result, total: totalNum };
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
  getVariableList: async (tableState: TableViewState): Promise<TableDataResponseDto<ProminerMethodDto> | unknown> => {
    try {
      const { filter, currentPage, sortBy } = tableState;
      let result = [];
      let totalNum = 0;
      if (filter.server.app_resource_id) {
        const data: IOriginalResponse = await apiClient.get(VariableEndpoint.getList, {
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
                sortField: sortBy.field || 'variable_name',
                sortingType: sortBy.direction || 'desc',
              },
            })]: '',
            _: new Date().getTime(),
          },
        });
        result = data.dto.ProminerRscDto;
        totalNum = data.dto.pagingResultDto.totalNum;
      }

      return { data: result, total: totalNum };
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
  getMethodDetail: async ({
    declaringClass,
    methodName,
    searchType = 'Forward',
  }: {
    declaringClass: string;
    methodName: string;
    searchType?: string;
  }): Promise<MethodDetailResponse> => {
    return await apiClient.get(MethodEndpoint.detail, {
      params: {
        [JSON.stringify({
          dto: {
            declaring_class: declaringClass,
            method_name: methodName,
            searchType: searchType,
          },
        })]: '',
        _: new Date().getTime(),
      },
    });
  },
};

export default ProminerApi;
