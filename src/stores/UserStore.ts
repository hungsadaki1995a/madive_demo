import { makeAutoObservable } from 'mobx';
import { UserType, UserSelectionType } from '@/types/typeBundle';

type UserOrderPropertyType = Exclude<
  keyof UserSelectionType,
  'userPasswd' | 'selection'
>;

export class UserStore {
  userInfo: UserType[] = [];
  selectedUsers: string[] = [];
  userOrder: 'asc' | 'desc' = 'asc';
  userOrderProperty: UserOrderPropertyType = 'userId';
  searchType = 'User ID';

  constructor() {
    makeAutoObservable(this);
  }

  initProperties = () => {
    this.userInfo = [];
    this.selectedUsers = [];
    this.userOrder = 'asc';
    this.userOrderProperty = 'userId';
    this.searchType = 'User ID';
  };

  setUsers = (userInfo: UserType[]) => {
    this.userInfo = userInfo.map((user: UserType) => ({
      ...user,
      roleName: user?.devUserRoleDTO?.roleName ?? '',
    }));
  };

  setSelectedUsers = (selectedData: string[]) => {
    this.selectedUsers = selectedData;
  };

  setUserOrder = (order: 'asc' | 'desc') => {
    this.userOrder = order;
  };

  setUserOrderProperty = (property: UserOrderPropertyType) => {
    this.userOrderProperty = property;
  };

  setSearchType = (type: string) => {
    this.searchType = type;
  };
}
