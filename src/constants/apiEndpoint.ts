export const AuthEndpoint = {
  checkEncryption: '/EncryptionInfoCheckService',
  login: '/UserInfoCheckService',
  getUserPermission: '/UserPermission',
};

export const ApplicationEndpoint = {
  getApplicationList: '/ApplicationList',
};

export const ServiceGroupEndpoint = {
  getServiceList: '/SgList',
};

export const ProminerEndpoint = {
  getResourceList: '/ProminerResource',
  getMethodList: '/ProminerMethod',
};

export const ResourceEndPoint = {
  getLockList: 'LockUnList',
  unlockResouces: 'LockUnList',
};

export const DoInfoEnpoint = {
  getDoInfo: '/DoInfo',
};

export const UserEndpoint = {
  getUserList: '/UserList',
  getUserHistory: '/UserHistoryList',
  getUser: '/User',
};

export const GroupManagementEndpoint = {
  groupList: '/GroupList',
  group: '/Group',
};

export const DbioEndpoint = {
  modelDbioList: '/ModelDbioList',
  modelDbio: '/ModelDbio',
};
