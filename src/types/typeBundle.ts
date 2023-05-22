import { type SvgIconTypeMap } from '@mui/material';
import { type OverridableComponent } from '@mui/material/OverridableComponent';

export interface subType {
  title: string;
  to: string;
}
export type subMenusType = Record<string, subType>;

// export interface SubMenusType {
//   title: string;
//   to: string;
// }

// export interface MenusType {
//   title: string;
//   icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>>;
//   subMenus: SubMenusType[];
// }

export interface LoginType {
  userId: string;
  userPasswd: string;
}

export interface UserType {
  accessDate?: string;
  deptCode?: string;
  description?: string;
  email: string;
  fromDate?: string;
  mobilePhone?: string;
  notAtWork?: string;
  teamLeader?: string;
  telNo: string;
  toDate?: string;
  userDiv: string;
  userId: string;
  userName: string;
  userPasswd?: string;
  roleName: string;
  devUserRoleDTO?: RoleType;
}

export interface UserSelectionType {
  selection: JSX.Element;
  email: string;
  telNo: string;
  userDiv: string;
  userId: string;
  userName: string;
  userPasswd?: string;
}

export interface NodeType {
  description: string;
  nodeKey: string;
  nodeType: string;
  nodeName: string;
  nodeIp: string;
  nodeBasePort: string;
  nodeHttpPort: string;
  masterNodeKey: string;
  nodeIsSsl: string | boolean;
  serverHostName: string;
}

export interface NodeSelectionType {
  selection: JSX.Element;
  description: string;
  nodeKey: string;
  nodeType: string;
  nodeName: string;
  nodeIp: string;
  nodeBasePort: string;
  nodeHttpPort: string;
  masterNodeKey: string;
  nodeIsSsl: string | boolean;
  serverHostName: string;
}

export type SelectedType = 'ALL' | 'TEST' | 'RUNTIME' | 'MASTER';

export interface MetaType {
  columnName: string;
  comments: string;
  decimalSize: string;
  defaultValue: string;
  encrypt: string;
  fieldType: string;
  isKey: string;
  length: string;
  logicalName: string;
  masking: string;
  maskingRange: string;
  metaId: string;
  metaType: string;
  physicalName: string;
  schemaName?: string;
  tableName: string;
  updateTime?: string;
}

export interface MetaSelectionType {
  selection: JSX.Element;
  physicalName: string;
  logicalName: string;
  comments: string;
  fieldType: string;
  length: string;
  metaType: string;
}

export interface PaginationType {
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface DependencyType {
  gitUrl: string;
  name: string;
  gitToken: string;
  gitPlatformType: string;
  gitBranch: string;
}

export interface DependencyResponseType {
  createdAt: string;
  id: number;
  projects: DependencyProjectType[];
  repository: {
    branchName: string;
    lastCommitId: string;
    name: string;
    platform: Record<'type' | 'url', string>;
    token: string;
    url: string;
  };
}

export interface ResourceResponseType {
  id: number;
  name: string;
  packageName: string;
  path: string;
  project: DependencyProjectType;
  type: string;
}

export interface DependencyOptionsType {
  project: number | '';
  type: string;
  direction: 'Forward' | 'Backward';
  name: string;
}

export interface ApiAlertType {
  severity: 'success' | 'error';
  message: string;
}

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type RoleType = Record<'roleName' | 'description', string> & Record<'privileges', string[] | null>;

export type RoleSelectionType = Exclude<RoleType, 'privileges'> & Record<'selection', JSX.Element>;

export type TableDataType = Partial<UserType & RoleType & MetaType & NodeType>;

export type TableDataSelectionType = UserSelectionType | RoleSelectionType | MetaSelectionType | NodeSelectionType;

export type DependencyProjectType = Record<'id', number> & Record<'name', string>;
