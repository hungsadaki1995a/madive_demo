import axios, { AxiosError } from 'axios';

import { NodeType } from '@/types/typeBundle';

const { NODE_ENV, REACT_APP_BACKEND_URL } = process.env;
const BASE_URL = NODE_ENV === 'development' ? REACT_APP_BACKEND_URL : '/proobject-devserver';

const NodeApi = {
  getNodes: async (nodeType: string) => {
    try {
      const { data } = await axios.post(BASE_URL + '/nodeList', {
        nodeType,
      });
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  addNode: async (submitValue: NodeType) => {
    try {
      return await axios.post(BASE_URL + '/nodeCreate', submitValue);
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  editNode: async (submitValue: NodeType) => {
    try {
      return await axios.post(BASE_URL + '/nodeUpdate', submitValue);
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  deleteNodes: async (poDeployNodeDTOArray: Record<'serverHostName' | 'nodeName', string>[]) => {
    try {
      return await axios.post(BASE_URL + '/nodeDelete', {
        poDeployNodeDTOArray,
      });
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
};

export default NodeApi;
