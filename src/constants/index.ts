export {
  ApplicationEndpoint,
  AuthEndpoint,
  DbioEndpoint,
  DoInfoEnpoint,
  GroupManagementEndpoint,
  ProminerEndpoint,
  ResourceEndPoint,
  ServiceGroupEndpoint,
} from './apiEndpoint';
export { AUTHENTICATION_COOKIE, PERMISSION_COOKIE, USER_INFO_COOKIE } from './authentication';
export { emptyUserInfo, initialUserValue } from './constantObjects';

export const COOKIE_EXPIRE_TIME = 604800000;
