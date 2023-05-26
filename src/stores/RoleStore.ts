import { makeAutoObservable } from 'mobx';

import { RoleSelectionType, RoleType } from '@/types/typeBundle';

type RoleOrderPropertyType = Exclude<keyof RoleSelectionType, 'selection'>;

export class RoleStore {
  roleInfo: RoleType[] = [];
  selectedRoles: string[] = [];
  roleOrder: 'asc' | 'desc' = 'asc';
  roleOrderProperty: RoleOrderPropertyType = 'roleName';
  searchText = '';
  searchType = 'Role Name';

  constructor() {
    makeAutoObservable(this);
  }

  initProperties = () => {
    this.roleInfo = [];
    this.selectedRoles = [];
    this.roleOrder = 'asc';
    this.roleOrderProperty = 'roleName';
    this.searchText = '';
    this.searchType = 'Role Name';
  };

  setRoles = (roleInfo: RoleType[]) => {
    this.roleInfo = roleInfo;
  };

  setSelectedRoles = (selectedRoles: string[]) => {
    this.selectedRoles = selectedRoles;
  };

  setRoleOrder = (order: 'asc' | 'desc') => {
    this.roleOrder = order;
  };

  setRoleOrderProperty = (property: RoleOrderPropertyType) => {
    this.roleOrderProperty = property;
  };

  setSearchText = (text: string) => {
    this.searchText = text;
  };

  setSearchType = (type: string) => {
    this.searchType = type;
  };
}
