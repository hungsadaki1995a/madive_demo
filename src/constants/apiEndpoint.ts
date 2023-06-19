export const AuthEndpoint = {
  checkEncryption: '/EncryptionInfoCheckService',
  login: '/UserInfoCheckService',
  getUserPermission: '/UserPermission',
};

export const ApplicationEndpoint = {
  getList: '/ApplicationList',
  app: '/Application',
};

export const ServiceGroupEndpoint = {
  sg: '/SgList',
};

export const MetaEndPoint = {
  metaList: 'MetaList',
  getTableList: '/TableList',
  getColumnList: '/ColumnList',
  meta: '/Meta',
  importExcel: '/MetaExcel',
  getExcelSample: '/MetaSampleFile',
};

export const MetaHistoryEndPoint = {
  metaHistory: '/MetaHistoryList',
};

export const DoInfoEndPoint = {
  doInfo: 'DoInfo',
};

export const NodeEndpoint = {
  getList: '/NodeList',
  node: '/Node',
};

export const ResourceEndpoint = {
  getList: '/ProminerResource',
};

export const MethodEndpoint = {
  getList: '/ProminerMethod',
  detail: '/ProminerMethodDetail',
};

export const FieldEndpoint = {
  getList: '/ProminerField',
};

export const VariableEndpoint = {
  getList: '/ProminerVariable',
};

export const SystemContextEndpoint = {
  getNodeList: '/NodeList',
  systemContextList: '/SystemContextList',
  deployStatList: 'DeployStatList',
  systemContextNameList: '/SystemContextNameList',
  ropertyList: '/PropertyList',
  systemContext: '/SystemContext',
  property: '/Property',
};

export const LockUnLockEndPoint = {
  getLockList: 'LockUnList',
  unlockResources: 'LockUnList',
};

export const UserEndpoint = {
  getList: 'UserList',
  historyList: '/UserHistoryList',
  getUser: 'User',
};

export const GroupManagementEndpoint = {
  groupList: '/GroupList',
  group: '/Group',
};

export const RoleEndpoint = {
  getRoleList: '/RoleList',
  getGroupList: '/GroupList',
  getGroupRole: '/GroupRole',
  groupRoleAssign: '/GroupRole?action=Assign',
  getGroupListByRole: '/GroupListByRole',
  role: '/Role',
  roleList: 'RoleList',
};

export const DbioEndpoint = {
  modelDbioList: '/ModelDbioList',
  modelDbio: '/ModelDbio',
};
