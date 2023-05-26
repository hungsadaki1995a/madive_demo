import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

import { UserType } from '@/types/typeBundle';

import { MobxStore } from '@/App';
import { emptyUserInfo } from '@/constants/';

export class AuthStore {
  userInfo: UserType = _.cloneDeep(emptyUserInfo);
  privileges: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  initializeAuth = () => {
    this.userInfo = _.cloneDeep(emptyUserInfo);
    this.privileges = [];
    sessionStorage.removeItem('privileges');
    const { UserStore, RoleStore, MetaStore, NodeStore } = MobxStore;
    // UserStore.initProperties();
    RoleStore.initProperties();
    MetaStore.initProperties();
    NodeStore.initProperties();
  };

  setUser = (userInfo: UserType) => {
    this.userInfo = {
      ...userInfo,
      roleName: userInfo.devUserRoleDTO?.roleName ?? '',
    };
  };

  setPrivileges = (privileges: string[] | undefined) => {
    const defaultPrivilege = this.userInfo.userId === 'admin' ? ['ADMIN'] : [];
    this.privileges = privileges ?? defaultPrivilege;
    sessionStorage.setItem('privileges', JSON.stringify(this.privileges));
  };
}
