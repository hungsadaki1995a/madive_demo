import axios, { AxiosError } from 'axios';
import { DependencyType } from '@/types/typeBundle';

const { NODE_ENV, REACT_APP_BACKEND_URL } = process.env;
const BASE_URL =
  NODE_ENV === 'development' ? REACT_APP_BACKEND_URL : '/proobject-devserver';
const typeValues: Record<string, string> = {
  'Private Gitlab': 'PRIVATE_GITLAB',
  'Public Gitlab': 'PUBLIC_GITLAB',
  Github: 'GITHUB',
};

const DependencyApi = {
  getDependencies: async (submitValue: DependencyType) => {
    try {
      const serverParams = {
        name: submitValue.name,
        platform: {
          type: typeValues[submitValue.gitPlatformType],
          url: submitValue.gitUrl.split('/').slice(0, 3).join('/'),
        },
        token: submitValue.gitToken,
        url: submitValue.gitUrl,
        branchName: submitValue.gitBranch || null,
      };
      const { data } = await axios.post(
        BASE_URL + '/dependencies',
        serverParams
      );
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  getResources: async (params: Record<string, number | string>) => {
    try {
      const { data } = await axios.get(BASE_URL + '/resources', {
        params,
      });
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  getResourceDetails: async (index: number, dir: 'FORWARD' | 'BACKWARD') => {
    try {
      const { data } = await axios.get(BASE_URL + '/resources/' + index, {
        params: { direction: dir },
      });
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  refreshedDependency: async (id: number) => {
    try {
      const { data } = await axios.get(BASE_URL + `/dependencies/${id}`);
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
};

export default DependencyApi;
