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
  getFieldList: '/ProminerField',
  getVariableList: '/ProminerVariable',
};

export const ResourceEndPoint = {
  getLockList: 'LockUnList',
  unlockResources: 'LockUnList',
};

export const DoInfoEndPoint = {
  getDoInfo: '/DoInfo',
};

export const UserEndpoint = {
  getUserList: '/UserList',
  getUserHistory: '/UserHistoryList',
  getUser: '/User',
};

export const MetaEndPoint = {
  getMetaList: '/MetaList',
  getTableList: '/TableList',
  getColumnList: '/ColumnList',
  createMeta: '/Meta',
  editMeta: '/Meta',
  deleteMetaList: '/MetaList',
  importExcel: '/MetaExcel',
  getExcelSample: '/MetaSampleFile',
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
};

export const MetaHistoryEndPoint = {
  getList: '/MetaHistoryList',
  deleteList: '/MetaHistoryList',
};

export const DbioEndpoint = {
  modelDbioList: '/ModelDbioList',
  modelDbio: '/ModelDbio',
};

export const NodeEndpoint = {
  getNodeList: '/NodeList',
  addNode: '/Node',
  editNode: '/Node',
  deleteNode: '/Node',
};
