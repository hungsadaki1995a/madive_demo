import axios, { AxiosError } from 'axios';
import { MetaType } from '@/types/typeBundle';

const { NODE_ENV, REACT_APP_BACKEND_URL } = process.env;
const BASE_URL =
  NODE_ENV === 'development' ? REACT_APP_BACKEND_URL : '/proobject-devserver';

type MetaGetType = {
  page: number;
  pageRowNum: number;
  physicalName: string;
  logicalName: string;
};

const MetaApi = {
  get: async (body: Partial<MetaGetType>) => {
    try {
      const { data } = await axios.post(BASE_URL + '/metaList', {
        ...body,
        contains: 'TRUE',
        startWith: 'FALSE',
      });
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  add: async (submitValue: MetaType) => {
    try {
      return await axios.post(BASE_URL + '/metaCreate', submitValue);
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  edit: async (submitValue: MetaType) => {
    try {
      return await axios.post(BASE_URL + '/metaUpdate', submitValue);
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  delete: async (submitValue: Record<'metaId', string>[]) => {
    try {
      return await axios.post(BASE_URL + '/metaDelete', {
        metaInfoDTOArray: submitValue,
      });
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
};

export default MetaApi;
