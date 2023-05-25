import axios, { AxiosError } from 'axios';
import { RoleType } from '@/types/typeBundle';

const { NODE_ENV, REACT_APP_BACKEND_URL } = process.env;
const BASE_URL = NODE_ENV === 'development' ? REACT_APP_BACKEND_URL : '/proobject-devserver';

const RoleApi = {
  getRoles: async () => {
    try {
      return await axios.get(BASE_URL + '/role');
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  addRole: async (submitValue: RoleType) => {
    try {
      return await axios.post(BASE_URL + '/role', submitValue);
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  editRole: async (submitValue: RoleType) => {
    try {
      return await axios.patch(BASE_URL + '/role', submitValue);
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  deleteRoles: async (submitValue: string[]) => {
    try {
      return await axios.delete(BASE_URL + '/role', { data: submitValue });
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  getSpecificRole: async (roleName: string) => {
    try {
      return await axios.get(`${BASE_URL}/role/${roleName}`);
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
};

export default RoleApi;
