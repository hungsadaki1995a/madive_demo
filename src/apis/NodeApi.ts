import { AxiosError } from 'axios';

import { TableDataResponseDto } from '@/components/organisms/CmCommonTable/types';

import { NodeDto, NodeDtos } from '@/types/dtos/nodeDtos';

import { NodeEndpoint } from '@/constants/apiEndpoint';

import apiClient from './apiClient';

type Response = {
  dto: {
    NodeDto: NodeDto[];
    value: string;
  };
};

const NodeApi = {
  getNodes: async (): Promise<TableDataResponseDto<NodeDto> | unknown> => {
    try {
      const config_UserId = { dto: { user_id: 'admin' } };
      const results: any = await apiClient.get(NodeEndpoint.getList, {
        params: {
          [JSON.stringify(config_UserId)]: '',
        },
      });
      return { data: results?.dto?.NodeDto, total: results?.dto?.NodeDto.length };
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  addNode: async (submitValue: NodeDto): Promise<Response> => {
    return await apiClient.post(NodeEndpoint.node, { dto: submitValue });
  },

  editNode: async (submitValue: NodeDto): Promise<Response> => {
    return await apiClient.put(NodeEndpoint.node, { dto: submitValue });
  },

  deleteNode: async (submitValue: NodeDtos): Promise<Response> => {
    return await apiClient.delete(NodeEndpoint.node, {
      data: {
        dto: {
          node_id: submitValue.node_id,
        },
      },
    });
  },
};

export default NodeApi;
