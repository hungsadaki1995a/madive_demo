import { Navigate } from 'react-router-dom';

import { RouteItem } from '@/types/route';

import { Button, Card, Dialog, DropDown, Modal, RadioGroup, SnackBar, Table, TextFieldDemo } from '@/pages/demo';
import Error from '@/pages/error';
import LogControl from '@/pages/log-control';
import LogManagement from '@/pages/log-control/PRO20203201P';
import Login from '@/pages/login/PRO20204201P';
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
import ViewResourceDetail from '@/pages/prominer/PRO10103102P';
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
import CreateTestCase from '@/pages/test/PRO10102109P';
import EditTestCase from '@/pages/test/PRO10102114P';
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
    path: '/login',
    element: <Login />,
  },
];

const devRoutes: RouteItem[] = [
  {
    path: '/',
    element: <Navigate to="/development/overview/app-and-sg" />,
  },
  {
    path: '/development/overview',
    element: <Overview />,
    child: [
      {
        path: 'app-and-sg',
        element: <AppSG />,
        menuName: 'Overview/APP&SG',
      },
      {
        path: 'meta/management',
        element: <Meta />,
        menuName: 'Overview/Meta',
      },
      {
        path: 'meta/history',
        element: <MetaHistory />,
      },
      {
        path: 'do-info',
        element: <DoInfo />,
        menuName: 'Overview/Do Info',
      },
      {
        path: '*',
        element: <Navigate to="/development/overview/app-and-sg" />,
      },
    ],
  },
  {
    path: '/development/node',
    element: <Node />,
    child: [
      {
        path: 'management',
        element: <NodeManagement />,
        menuName: 'Node/Node Management',
      },
      {
        path: '*',
        element: <Navigate to="/development/node/management" />,
      },
    ],
  },
  {
    path: '/development/test',
    element: <Test />,
    child: [
      {
        path: 'management',
        element: <TestManagement />,
        menuName: 'Test/Test',
      },
      {
        path: 'test-case',
        element: <TestCase />,
        menuName: 'Test/TestCase',
      },
      {
        path: 'create-test-case',
        element: <CreateTestCase />,
      },
      {
        path: 'edit-test-case',
        element: <EditTestCase />,
      },
      {
        path: 'history',
        element: <TestHistory />,
      },
      {
        path: '*',
        element: <Navigate to="/development/test/management" />,
      },
    ],
  },
  {
    path: '/development/prominer',
    element: <Prominer />,
    child: [
      {
        path: 'resource',
        element: <ProminerResource />,
        menuName: 'ProMiner/Resource',
      },
      {
        path: 'view-resource-detail',
        element: <ViewResourceDetail />,
      },
      {
        path: 'method',
        element: <Method />,
        menuName: 'ProMiner/Method',
      },
      {
        path: 'field',
        element: <Field />,
        menuName: 'ProMiner/Field',
      },
      {
        path: 'varible',
        element: <Varible />,
        menuName: 'ProMiner/Variable',
      },
      {
        path: '*',
        element: <Navigate to="/development/prominer/resource" />,
      },
    ],
  },
  {
    path: '/development/system-context',
    element: <SystemContext />,
    child: [
      {
        path: 'management',
        element: <SystemContextManagement />,
        menuName: 'System Context/Management',
      },
      {
        path: 'datasource',
        element: <Datasource />,
        menuName: 'System Context/DataSource',
      },
      {
        path: '*',
        element: <Navigate to="/development/system-context/management" />,
      },
    ],
  },
  {
    path: '/development/resource',
    element: <Resource />,
    child: [
      {
        path: 'lock-and-unlock',
        element: <LockAndUnlock />,
        menuName: 'Resource/Lock&Unlock',
      },
      {
        path: '*',
        element: <Navigate to="/development/resource/lock-and-unlock" />,
      },
    ],
  },
  {
    path: '/development',
    element: <Navigate to="/development/overview/app-and-sg" />,
  },
];

const configRoutes: RouteItem[] = [
  {
    path: '/configuration/user',
    element: <User />,
    child: [
      {
        path: 'management',
        element: <UserManagement />,
        menuName: 'User/User Management',
      },
      {
        path: 'history',
        element: <UserHistory />,
      },
      {
        path: 'group-management',
        element: <GroupManagement />,
        menuName: 'User/Group Management',
      },
      {
        path: 'role-management',
        element: <RoleManagement />,
        menuName: 'User/Role Management',
      },
      {
        path: 'user-group-assign',
        element: <UserGroupAssign />,
        menuName: 'User/User-Group Assign',
      },
      {
        path: 'group-role-assign',
        element: <GroupRoleAssign />,
        menuName: 'User/Group-Role Assign',
      },
      {
        path: 'role-permission-assign',
        element: <RolePermissionAssign />,
        menuName: 'User/Role-Permission Assign',
      },
      {
        path: '*',
        element: <Navigate to="/configuration/user/management" />,
      },
    ],
  },
  {
    path: '/configuration/model',
    element: <Model />,
    child: [
      {
        path: 'dbio',
        element: <Dbio />,
        menuName: 'Model/DBIO',
      },
      {
        path: '*',
        element: <Navigate to="/configuration/model/dbio" />,
      },
    ],
  },
  {
    path: '/configuration/log-control',
    element: <LogControl />,
    child: [
      {
        path: 'management',
        element: <LogManagement />,
        menuName: 'Log Control/Log Control',
      },
      {
        path: '*',
        element: <Navigate to="/configuration/log-control/management" />,
      },
    ],
  },
  {
    path: '/configuration',
    element: <Navigate to="/configuration/user/management" />,
  },
];

const sampleRoutes: RouteItem[] = [
  {
    path: '/cm/button',
    element: <Button />,
  },
  {
    path: '/cm/card',
    element: <Card />,
  },
  {
    path: '/cm/modal',
    element: <Modal />,
  },
  {
    path: '/cm/snackbar',
    element: <SnackBar />,
  },
  {
    path: '/cm/table',
    element: <Table />,
  },
  {
    path: '/cm/radio-group',
    element: <RadioGroup />,
  },
  {
    path: '/cm/textfield',
    element: <TextFieldDemo />,
  },
  {
    path: '/cm/dialog',
    element: <Dialog />,
  },
  {
    path: '/cm/dropdown',
    element: <DropDown />,
  },
];

const otherRoutes: RouteItem[] = [
  {
    path: '*',
    element: <Error />,
  },
];

export { authRoutes, devRoutes, configRoutes, sampleRoutes, otherRoutes };
