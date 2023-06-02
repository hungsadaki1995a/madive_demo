import { ILogin } from '@/types/typeBundle';

import { AuthEndpoint } from '@/constants';

import apiClient from './apiClient';

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
};

export default AuthApi;
