import { Outlet } from 'react-router-dom';

import { ReactComponent as OverviewIcon } from '@/stylesheets/images/lnbOverview.svg';
import { ReactComponent as SubIcon } from '@/stylesheets/images/lnbTwoDepthIcon.svg';
import { RouteItem } from '@/types/route';

import { Button, Card, Dialog, DropDown, Modal, RadioGroup, SnackBar, Table, TextFieldDemo } from '@/pages/demo';
import Overview from '@/pages/overview';
import Meta from '@/pages/overview/meta/PRO10100106P';
import MetaHistory from '@/pages/overview/meta/PRO10100110P';

const devRoutes: RouteItem[] = [
  {
    path: 'overview',
    label: 'Overview',
    element: <Overview />,
    icon: <OverviewIcon />,
    id: 'overview',
    child: [
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

export { cmComponentRoutes, defaultPageAccessPath, devRoutes, rootRoutes, routes };
