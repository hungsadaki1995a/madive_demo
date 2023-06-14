import { TableDataResponseDto, TableViewState } from '@/components/organisms/CmCommonTable/types';

import {
  AddSystemContext,
  CreateDatasourceResquest,
  DeleteDatasourceResquest,
  DeleteSystemContext,
  DeployStatList,
  EditDatasourceResquest,
  PropertyList,
  SystemContextInfoDto,
  SystemContextList,
} from '@/types/dtos/systemContextDtos';
import { IOriginalResponse } from '@/types/http';
import { notify } from '@/utils/notify';

import { NodeEndpoint, SystemContextEndpoint } from '@/constants';

import apiClient from './apiClient';

const SystemContextApi = {
  getApplication: async (payload: DeployStatList) => {
    try {
      const data = (await apiClient.get(SystemContextEndpoint.deployStatList, {
        params: {
          [JSON.stringify({
            dto: {
              node_id: payload.node_id,
              resource_type: payload.resource_type,
            },
          })]: '',
          _: new Date().getTime(),
        },
      })) as any;
      return data;
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    }
  },

  getNodeForSystemContext: async () => {
    try {
      const data = (await apiClient.get(NodeEndpoint.getNodeList, {
        params: {
          [JSON.stringify({
            dto: {
              node_type: 'TEST',
            },
          })]: '',
          _: new Date().getTime(),
        },
      })) as any;
      return data;
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    }
  },

  getDataContext: async (payload: SystemContextInfoDto) => {
    try {
      const data = (await apiClient.get(SystemContextEndpoint.systemContextNameList, {
        params: {
          [JSON.stringify({
            dto: {
              node_id: payload.node_id,
              resource_id: payload.resource_id,
            },
          })]: '',
          _: new Date().getTime(),
        },
      })) as any;
      return data;
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    }
  },

  getTableDataManagement: async (
    tableState: TableViewState
  ): Promise<TableDataResponseDto<SystemContextList> | unknown> => {
    try {
      const { filter, currentPage, sortBy } = tableState;
      let result = [];
      let totalNum = 0;

      if (filter.server.node_id && filter.server.resource_id && filter.server.systemContextName) {
        const data = (await apiClient.get(SystemContextEndpoint.systemContextList, {
          params: {
            [JSON.stringify({
              dto: {
                node_id: filter.server.node_id,
                resource_id: filter.server.resource_id,
                systemContextName: [filter.server.systemContextName],
                pageInfoDto: {
                  pageNum: currentPage + 1,
                  pageLength: -1,
                  sort: sortBy.field ? true : false,
                  sortingType: sortBy.direction || 'DESC',
                  sortField: sortBy.field || 'key',
                },
                conditionDto: [],
              },
            })]: '',
            _: new Date().getTime(),
          },
        })) as any;
        result = data?.dto?.SystemContextDto || [];
        totalNum = data?.dto?.pagingResultDto.totalNum || 0;
      } else {
        result = [];
        totalNum = 0;
      }

      return { data: result, total: totalNum };
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
      return { data: [], total: 0 };
    }
  },

  getTableDataDatasource: async (tableState: TableViewState): Promise<TableDataResponseDto<PropertyList> | unknown> => {
    try {
      const { filter, currentPage, sortBy } = tableState;
      let result = [];
      let totalNum = 0;

      if (filter.server.node_id && filter.server.resource_id) {
        const data = (await apiClient.get(SystemContextEndpoint.ropertyList, {
          params: {
            [JSON.stringify({
              dto: {
                resource_type: filter.server.resource_type,
                node_id: filter.server.node_id,
                resource_id: filter.server.resource_id,
                property_key: 'APPLICATION_SYSTEM_CONTEXT_{0}_DATASOURCE',
                pageInfoDto: {
                  pageNum: currentPage + 1,
                  pageLength: -1,
                  sort: sortBy.field ? true : false,
                  sortingType: sortBy.direction || 'DESC',
                  sortField: sortBy.field || 'key',
                },
                conditionDto: [],
              },
            })]: '',
            _: new Date().getTime(),
          },
        })) as any;
        result = data.dto.ConfigDto;
        totalNum = data.dto.pagingResultDto.totalNum;
      } else {
        result = [];
        totalNum = 0;
      }

      return { data: result, total: totalNum };
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
      return { data: [], total: 0 };
    }
  },

  addSystemContext: async (payload: AddSystemContext) => {
    try {
      const serverParams = {
        appName: payload.appName,
        key: payload.key,
        node_id: payload.node_id,
        resource_id: payload.resource_id,
        systemContextName: payload.systemContextName,
        value: payload.value,
      };
      const res: IOriginalResponse = await apiClient.post(SystemContextEndpoint.systemContext, {
        dto: serverParams,
      });

      return res;
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    }
  },

  editSystemContext: async (payload: AddSystemContext) => {
    try {
      const serverParams = {
        appName: payload.appName,
        key: payload.key,
        node_id: payload.node_id,
        resource_id: payload.resource_id,
        systemContextName: payload.systemContextName,
        value: payload.value,
      };
      const res: IOriginalResponse = await apiClient.put(SystemContextEndpoint.systemContext, {
        dto: serverParams,
      });

      return res;
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    }
  },

  deleteSystemContext: async (payload: DeleteSystemContext) => {
    try {
      const serverParams = {
        appName: payload.appName,
        key: payload.key,
        node_id: payload.node_id,
        resource_id: payload.resource_id,
        systemContextName: payload.systemContextName,
      };
      const res: IOriginalResponse = await apiClient.delete(SystemContextEndpoint.systemContext, {
        data: {
          dto: serverParams,
        },
      });
      return res;
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    }
  },

  addDatasource: async (payload: CreateDatasourceResquest) => {
    try {
      const serverParams = {
        key_parameter: payload.key_parameter,
        logical_name: payload.logical_name,
        node_id: payload.node_id,
        physical_name: payload.physical_name,
        property_key: payload.property_key,
        property_value: payload.property_value,
        resource_id: payload.resource_id,
        resource_type: payload.resource_type,
      };
      const res: IOriginalResponse = await apiClient.post(SystemContextEndpoint.property, {
        dto: serverParams,
      });

      return res;
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    }
  },

  editDataResource: async (payload: EditDatasourceResquest) => {
    try {
      const serverParams = {
        key_parameter: payload.key_parameter,
        node_id: payload.node_id,
        physical_name: payload.physical_name,
        property_value: payload.property_value,
        property_key: payload.property_key,
        resource_id: payload.resource_id,
        resource_type: payload.resource_type,
      };
      const res: IOriginalResponse = await apiClient.put(SystemContextEndpoint.property, {
        dto: serverParams,
      });

      return res;
    } catch (error) {
      // return error instanceof AxiosError ? error.response : error;
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    }
  },

  deleteDataSource: async (payload: DeleteDatasourceResquest) => {
    try {
      const serverParams = {
        key_parameter: payload.key_parameter,
        node_id: payload.node_id,
        physical_name: payload.physical_name,
        property_key: payload.property_key,
        resource_id: payload.resource_id,
        resource_type: payload.resource_type,
      };
      const res: IOriginalResponse = await apiClient.delete(SystemContextEndpoint.property, {
        data: {
          dto: serverParams,
        },
      });
      return res;
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    }
  },
};

export default SystemContextApi;
