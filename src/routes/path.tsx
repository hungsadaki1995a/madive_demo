import { Navigate } from 'react-router-dom';

import { RouteItem } from '@/types/route';

import { Button, Card, Dialog, DropDown, Modal, RadioGroup, SnackBar, Table, TextFieldDemo } from '@/pages/demo';
import Error from '@/pages/error';
import LogControl from '@/pages/log-control';
import Login from '@/pages/login/PRO20204201P';
import Model from '@/pages/model';
import Node from '@/pages/node';
import Overview from '@/pages/overview';
import Prominer from '@/pages/prominer';
import Resource from '@/pages/resource';
import SystemContext from '@/pages/system-context';
import Test from '@/pages/test';
import User from '@/pages/user';

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
    path: '/development/overview/*',
    element: <Overview />,
  },
  {
    path: '/development/node/*',
    element: <Node />,
  },
  {
    path: '/development/test/*',
    element: <Test />,
  },
  {
    path: '/development/prominer/*',
    element: <Prominer />,
  },
  {
    path: '/development/system-context/*',
    element: <SystemContext />,
  },
  {
    path: '/development/resource/*',
    element: <Resource />,
  },
  {
    path: '/development',
    element: <Navigate to="/development/overview" />,
  },
];

const configRoutes: RouteItem[] = [
  {
    path: '/configuration/user/*',
    element: <User />,
  },
  {
    path: '/configuration/model/*',
    element: <Model />,
  },
  {
    path: '/configuration/log-control/*',
    element: <LogControl />,
  },
  {
    path: '/configuration',
    element: <Navigate to="configuration/user" />,
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
