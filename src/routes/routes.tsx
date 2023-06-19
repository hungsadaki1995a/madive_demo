import { Outlet } from 'react-router-dom';

import { ReactComponent as NodeIcon } from '@/stylesheets/images/lnbNode.svg';
import { ReactComponent as OverviewIcon } from '@/stylesheets/images/lnbOverview.svg';
import { ReactComponent as ProminerIcon } from '@/stylesheets/images/lnbProminer.svg';
import { ReactComponent as ResourceIcon } from '@/stylesheets/images/lnbResource.svg';
import { ReactComponent as SystemContextIcon } from '@/stylesheets/images/lnbSystemcontext.svg';
import { ReactComponent as TestIcon } from '@/stylesheets/images/lnbTest.svg';
import { ReactComponent as SubIcon } from '@/stylesheets/images/lnbTwoDepthIcon.svg';
import { RouteItem } from '@/types/route';

import { Button, Card, Dialog, DropDown, Modal, RadioGroup, SnackBar, Table, TextFieldDemo } from '@/pages/demo';
import Error from '@/pages/error';
import LogControl from '@/pages/log-control';
import LogManagement from '@/pages/log-control/PRO20203201P';
import Login from '@/pages/login/PRO20204201P.new';
import Model from '@/pages/model';
import Dbio from '@/pages/model/PRO20202201P';
import Node from '@/pages/node';
import NodeManagement from '@/pages/node/PRO10101101P';
import Overview from '@/pages/overview';
import Meta from '@/pages/overview/meta/PRO10100106P';
import MetaHistory from '@/pages/overview/meta/PRO10100110P';
import AppSG from '@/pages/overview/PRO10100101P';
import DoInfo from '@/pages/overview/PRO10100111P';
import Prominer from '@/pages/prominer';
import ProminerResource from '@/pages/prominer/PRO10103101P';
import Method from '@/pages/prominer/PRO10103103P';
import Field from '@/pages/prominer/PRO10103105P';
import Varible from '@/pages/prominer/PRO10103106P';
import Resource from '@/pages/resource';
import LockAndUnlock from '@/pages/resource/PRO10105101P';
import SystemContext from '@/pages/system-context';
import SystemContextManagement from '@/pages/system-context/PRO10104101P';
import Datasource from '@/pages/system-context/PRO10104104P';
import Test from '@/pages/test';
import TestManagement from '@/pages/test/PRO10102101P';
import TestCase from '@/pages/test/PRO10102106P';
import TestHistory from '@/pages/test/PRO10102119P';
import User from '@/pages/user';
import UserManagement from '@/pages/user/PRO20201201P';
import UserHistory from '@/pages/user/PRO20201204P';
import GroupManagement from '@/pages/user/PRO20201205P';
import RoleManagement from '@/pages/user/PRO20201208P';
import UserGroupAssign from '@/pages/user/PRO20201211P';
import GroupRoleAssign from '@/pages/user/PRO20201212P';
import RolePermissionAssign from '@/pages/user/PRO20201213P';

const authRoutes: RouteItem[] = [
  {
    id: 'login',
    path: '/login',
    element: <Login />,
  },
];

const devRoutes: RouteItem[] = [
  {
    path: 'overview',
    label: 'Overview',
    element: <Overview />,
    icon: <OverviewIcon />,
    id: 'overview',
    child: [
      {
        id: 'appSg',
        path: 'app-and-sg',
        label: 'App & SG',
        element: <AppSG />,
        icon: <SubIcon />,
        menuName: 'Overview/APP&SG',
        fullPath: '/development/overview/app-and-sg',
      },
      {
        id: 'metaManagement',
        path: 'meta',
        label: 'Meta',
        element: <Meta />,
        icon: <SubIcon />,
        menuName: 'Overview/Meta',
        fullPath: '/development/overview/meta',
      },
      {
        id: 'metaHistory',
        path: 'meta-history',
        label: 'Meta History',
        element: <MetaHistory />,
        icon: <SubIcon />,
        fullPath: '/development/overview/meta-history',
      },
      {
        id: 'doInfo',
        path: 'do-info',
        label: 'Do Info',
        element: <DoInfo />,
        icon: <SubIcon />,
        menuName: 'Overview/Do Info',
        fullPath: '/development/overview/do-info',
      },
    ],
  },
  {
    id: 'nodeParent',
    path: 'node',
    label: 'Node',
    element: <Node />,
    icon: <NodeIcon />,
    child: [
      {
        id: 'nodeManagement',
        path: 'node-management',
        label: 'Node Management',
        element: <NodeManagement />,
        icon: <SubIcon />,
        menuName: 'Node/Node Management',
        fullPath: '/development/node/node-management',
      },
    ],
  },
  {
    id: 'testParent',
    path: 'test',
    label: 'Test',
    element: <Test />,
    icon: <TestIcon />,
    child: [
      {
        id: 'testManagement',
        label: 'Test',
        path: 'test',
        element: <TestManagement />,
        icon: <SubIcon />,
        menuName: 'Test/Test',
        fullPath: '/development/test/test',
      },
      {
        id: 'testCaseManagement',
        label: 'TestCase',
        path: 'test-case',
        element: <TestCase />,
        icon: <SubIcon />,
        menuName: 'Test/TestCase',
        fullPath: '/development/test/test-case',
      },
      {
        id: 'testHistory',
        label: 'History',
        path: 'history',
        element: <TestHistory />,
        icon: <SubIcon />,
        fullPath: '/development/test/history',
      },
    ],
  },
  {
    id: 'prominerParent',
    path: 'prominer',
    label: 'Prominer',
    element: <Prominer />,
    icon: <ProminerIcon />,
    child: [
      {
        id: 'resourceManagement',
        label: 'Resource',
        path: 'resource',
        element: <ProminerResource />,
        icon: <SubIcon />,
        menuName: 'ProMiner/Resource',
        fullPath: '/development/prominer/resource',
      },
      {
        id: 'prominerMethod',
        label: 'Method',
        path: 'method',
        element: <Method />,
        icon: <SubIcon />,
        menuName: 'ProMiner/Method',
        fullPath: '/development/prominer/method',
      },
      {
        id: 'prominerField',
        label: 'Field',
        path: 'field',
        element: <Field />,
        icon: <SubIcon />,
        menuName: 'ProMiner/Field',
        fullPath: '/development/prominer/field',
      },
      {
        id: 'prominerVariable',
        label: 'Variable',
        path: 'variable',
        element: <Varible />,
        icon: <SubIcon />,
        menuName: 'ProMiner/Variable',
        fullPath: '/development/prominer/variable',
      },
    ],
  },
  {
    id: 'systemContextParent',
    label: 'System Context',
    path: 'system-context',
    element: <SystemContext />,
    icon: <SystemContextIcon />,
    child: [
      {
        id: 'systemContextManagement',
        label: 'Management',
        path: 'management',
        element: <SystemContextManagement />,
        icon: <SubIcon />,
        menuName: 'System Context/Management',
        fullPath: '/development/system-context/management',
      },
      {
        id: 'systemContextDataSource',
        label: 'Datasource',
        path: 'datasource',
        element: <Datasource />,
        icon: <SubIcon />,
        menuName: 'System Context/DataSource',
        fullPath: '/development/system-context/datasource',
      },
    ],
  },
  {
    id: 'resourceParent',
    label: 'Resource',
    path: 'resource',
    element: <Resource />,
    icon: <ResourceIcon />,
    child: [
      {
        id: 'lockAndUnlock',
        label: 'Lock & Unlock',
        path: 'lock-and-unlock',
        element: <LockAndUnlock />,
        icon: <SubIcon />,
        menuName: 'Resource/Lock&Unlock',
        fullPath: '/development/resource/lock-and-unlock',
      },
    ],
  },
];

const configRoutes: RouteItem[] = [
  {
    id: 'userManagement',
    label: 'User',
    path: 'user',
    element: <User />,
    icon: <ProminerIcon />,
    child: [
      {
        id: 'userList',
        label: 'User Management',
        path: 'user-management',
        element: <UserManagement />,
        icon: <SubIcon />,
        menuName: 'User/User Management',
        fullPath: '/configuration/user/user-management',
      },
      {
        id: 'userHistory',
        label: 'User History',
        path: 'user-history',
        element: <UserHistory />,
        icon: <SubIcon />,
        fullPath: '/configuration/user/user-history',
      },
      {
        id: 'groupList',
        label: 'Group Management',
        path: 'group-management',
        element: <GroupManagement />,
        icon: <SubIcon />,
        menuName: 'User/Group Management',
        fullPath: '/configuration/user/group-management',
      },
      {
        id: 'roleList',
        label: 'Role Management',
        path: 'role-management',
        element: <RoleManagement />,
        icon: <SubIcon />,
        menuName: 'User/Role Management',
        fullPath: '/configuration/user/role-management',
      },
      {
        id: 'userGroupAssign',
        label: 'User Group Assign',
        path: 'user-group-assign',
        element: <UserGroupAssign />,
        icon: <SubIcon />,
        menuName: 'User/User-Group Assign',
        fullPath: '/configuration/user/user-group-assign',
      },
      {
        id: 'groupRoleAssign',
        label: 'Group Role Assign',
        path: 'group-role-assign',
        element: <GroupRoleAssign />,
        icon: <SubIcon />,
        menuName: 'User/Group-Role Assign',
        fullPath: '/configuration/user/group-role-assign',
      },
      {
        id: 'rolePermissionAssign',
        label: 'Role Permission Assign',
        path: 'role-permission-assign',
        element: <RolePermissionAssign />,
        icon: <SubIcon />,
        menuName: 'User/Role-Permission Assign',
        fullPath: '/configuration/user/role-permission-assign',
      },
    ],
  },
  {
    id: 'modelManagement',
    label: 'Model',
    path: 'model',
    element: <Model />,
    icon: <ResourceIcon />,
    child: [
      {
        id: 'dbio',
        label: 'DBIO',
        path: 'dbio',
        element: <Dbio />,
        icon: <SubIcon />,
        menuName: 'Model/DBIO',
        fullPath: '/configuration/model/dbio',
      },
    ],
  },
  {
    id: 'logControlManagement',
    label: 'Log Control',
    path: 'log-control',
    element: <LogControl />,
    icon: <ResourceIcon />,
    child: [
      {
        id: 'logControlList',
        label: 'Management',
        path: 'management',
        element: <LogManagement />,
        icon: <SubIcon />,
        menuName: 'Log Control/Log Control',
        fullPath: '/configuration/log-control/management',
      },
    ],
  },
];

const cmComponentRoutes: RouteItem[] = [
  {
    id: 'compositionManagement',
    label: 'CM Composition',
    path: 'cm',
    icon: <SubIcon />,
    element: <Outlet />,
    child: [
      {
        id: 'cmButton',
        path: 'button',
        fullPath: '/composition/cm/button',
        element: <Button />,
        label: 'CM Button',
        icon: <SubIcon />,
      },
      {
        id: 'cmCard',
        path: 'card',
        fullPath: '/composition/cm/card',
        element: <Card />,
        label: 'CM Card',
        icon: <SubIcon />,
      },
      {
        id: 'cmModal',
        path: 'modal',
        fullPath: '/composition/cm/modal',
        element: <Modal />,
        label: 'CM Modal',
        icon: <SubIcon />,
      },
      {
        id: 'cmSnackbar',
        path: 'snackbar',
        fullPath: '/composition/cm/snackbar',
        element: <SnackBar />,
        label: 'CM Snackbar',
        icon: <SubIcon />,
      },
      {
        id: 'cmTable',
        path: 'table',
        fullPath: '/composition/cm/table',
        element: <Table />,
        label: 'CM Table',
        icon: <SubIcon />,
      },
      {
        id: 'cmRadioGroup',
        path: 'radio-group',
        fullPath: '/composition/cm/radio-group',
        element: <RadioGroup />,
        label: 'CM Radio Group',
        icon: <SubIcon />,
      },
      {
        id: 'cmTextField',
        path: 'textfield',
        fullPath: '/composition/cm/textfield',
        element: <TextFieldDemo />,
        label: 'CM Text Field',
        icon: <SubIcon />,
      },
      {
        id: 'cmDialog',
        path: 'dialog',
        fullPath: '/composition/cm/dialog',
        element: <Dialog />,
        label: 'CM Dialog',
        icon: <SubIcon />,
      },
      {
        id: 'cmDropdown',
        path: 'dropdown',
        fullPath: '/composition/cm/dropdown',
        element: <DropDown />,
        label: 'CM Drop Down',
        icon: <SubIcon />,
      },
    ],
  },
];

const otherRoutes: RouteItem[] = [
  {
    id: 'pageNotFound',
    path: '*',
    element: <Error />,
  },
];

const routes = {
  development: '/development',
  configuration: '/configuration',
  login: '/login',
};

const rootRoutes = {
  development: {
    title: 'Development',
    path: '/development',
  },
  configuration: {
    title: 'Configuration',
    path: '/configuration',
  },
  cmComponent: {
    title: 'CM Composition',
    path: '/composition',
  },
};

const defaultPageAccessPath = '/development';

export {
  authRoutes,
  cmComponentRoutes,
  configRoutes,
  defaultPageAccessPath,
  devRoutes,
  otherRoutes,
  rootRoutes,
  routes,
};
