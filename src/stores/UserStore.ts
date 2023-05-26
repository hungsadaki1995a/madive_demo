import { makeAutoObservable } from 'mobx';

import UserModel from '@/types/models/userModel';

export class UserStore {
  users: UserModel[] = [];
  isFetching = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUsers = (userInfo: UserModel[]) => {
    this.users = userInfo;
  };

  setIsFetching = (val: boolean) => {
    this.isFetching = val;
  };

  addUser = (userInfo: UserModel) => {
    this.users = [...this.users, userInfo];
  };

  updateUser = (userInfo: UserModel) => {
    const storedUserIndex = this.users.findIndex((x) => x.user_id === userInfo.user_id);
    const temp = [...this.users];
    temp[storedUserIndex] = userInfo;
    this.users = temp;
  };

  deleteUser = (userId: string) => {
    this.users = this.users.filter((x) => x.user_id !== userId);
  };
}
