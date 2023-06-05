import Cookies from 'universal-cookie';

import { ILogin } from '@/types/typeBundle';

import { AuthEndpoint, AUTHENTICATION_COOKIE, PERMISSION_COOKIE } from '@/constants';

import apiClient from './apiClient';

const cookies = new Cookies();

const AuthApi = {
  checkUserEncryption: async (userId: string) => {
    const dto = { dto: { user_id: userId } };

    const res = await apiClient.get(AuthEndpoint.checkEncryption + '?' + JSON.stringify(dto));

    return res?.data || res;
  },
  login: async (submitValues: ILogin) => {
    const dto = { dto: { user_id: submitValues.id, user_passwd: submitValues.pw } };

    const res = await apiClient.get(AuthEndpoint.login + '?' + JSON.stringify(dto));

    return res?.data || res;
  },
  logout: () => {
    cookies.remove(AUTHENTICATION_COOKIE);
    cookies.remove(PERMISSION_COOKIE);
    window.location.href = '/';
  },
};

export default AuthApi;
