/** @format */
import { ReactComponent as Node } from '@/stylesheets/images/lnbNode.svg';
import { ReactComponent as Overview } from '@/stylesheets/images/lnbOverview.svg';
import { ReactComponent as Prominer } from '@/stylesheets/images/lnbProminer.svg';
import { ReactComponent as Resource } from '@/stylesheets/images/lnbResource.svg';
import { ReactComponent as SystemContext } from '@/stylesheets/images/lnbSystemcontext.svg';
import { ReactComponent as Test } from '@/stylesheets/images/lnbTest.svg';
import { ReactComponent as SubIcon } from '@/stylesheets/images/lnbTwoDepthIcon.svg';

export const LNB_LIST = [
  {
    id: '1',
    label: 'Overview',
    icon: <Overview />,
    children: [
      {
        id: '1-1',
        label: 'App & SG',
        icon: <SubIcon />,
        url: '/development/overview/app-and-sg',
      },
      {
        id: '1-2',
        label: 'Meta',
        icon: <SubIcon />,
        url: '/development/overview/meta/management',
      },
      {
        id: '1-3',
        label: 'Meta History',
        icon: <SubIcon />,
        url: '/development/overview/meta/history',
      },
    ],
  },
  {
    id: '2',
    label: 'Node',
    icon: <Node />,
    children: [
      {
        id: '2-1',
        label: 'Node Management',
        icon: <SubIcon />,
        url: '/development/node/management',
      },
    ],
  },
  {
    id: '3',
    label: 'Test',
    icon: <Test />,
    children: [
      {
        id: '3-1',
        label: 'Test',
        icon: <SubIcon />,
        url: '/development/test/management',
      },
      {
        id: '3-2',
        label: 'TestCase',
        icon: <SubIcon />,
        url: '/development/test/test-case',
      },
      {
        id: '3-3',
        label: 'Create TestCase',
        icon: <SubIcon />,
        url: '/development/test/create-test-case',
      },
      {
        id: '3-4',
        label: 'History',
        icon: <SubIcon />,
        url: '/development/test/history',
      },
    ],
  },
  {
    id: '4',
    label: 'Prominer',
    icon: <Prominer />,
    children: [
      {
        id: '4-1',
        label: 'Resource',
        icon: <SubIcon />,
        url: '/development/prominer/resource',
      },
      {
        id: '4-2',
        label: 'View Resource Detail',
        icon: <SubIcon />,
        url: '/development/prominer/view-resource-detail',
      },
      {
        id: '4-3',
        label: 'Method',
        icon: <SubIcon />,
        url: '/development/prominer/method',
      },
      {
        id: '4-4',
        label: 'Field',
        icon: <SubIcon />,
        url: '/development/prominer/field',
      },
      {
        id: '4-5',
        label: 'Varible',
        icon: <SubIcon />,
        url: '/development/prominer/varible',
      },
    ],
  },
  {
    id: '5',
    label: 'System Context',
    icon: <SystemContext />,
    children: [
      {
        id: '5-1',
        label: 'Management',
        icon: <SubIcon />,
        url: '/development/system-context/management',
      },
      {
        id: '5-2',
        label: 'Datasource',
        icon: <SubIcon />,
        url: '/development/system-context/datasource',
      },
    ],
  },
  {
    id: '6',
    label: 'Resource',
    icon: <Resource />,
    children: [
      {
        id: '6-1',
        label: 'Lock & Unlock',
        icon: <SubIcon />,
        url: '/development/resource/lock-and-unlock',
      },
    ],
  },
  {
    id: '7',
    label: 'User',
    icon: <Prominer />,
    children: [
      {
        id: '7-1',
        label: 'User Management',
        icon: <SubIcon />,
        url: '/configuration/user/management',
      },
      {
        id: '7-2',
        label: 'User History',
        icon: <SubIcon />,
        url: '/configuration/user/history',
      },
      {
        id: '7-3',
        label: 'Group Management',
        icon: <SubIcon />,
        url: '/configuration/user/group-management',
      },
      {
        id: '7-4',
        label: 'Role Management',
        icon: <SubIcon />,
        url: '/configuration/user/role-management',
      },
      {
        id: '7-5',
        label: 'User Group Assign',
        icon: <SubIcon />,
        url: '/configuration/user/user-group-assign',
      },
      {
        id: '7-6',
        label: 'Group Role Assign',
        icon: <SubIcon />,
        url: '/configuration/user/group-role-assign',
      },
      {
        id: '7-7',
        label: 'Role Permission Assign',
        icon: <SubIcon />,
        url: '/configuration/user/role-permission-assign',
      },
    ],
  },
  {
    id: '8',
    label: 'Model',
    icon: <Resource />,
    children: [
      {
        id: '8-1',
        label: 'DBIO',
        icon: <SubIcon />,
        url: '/configuration/model/dbio',
      },
    ],
  },
  {
    id: '9',
    label: 'Log Control',
    icon: <Resource />,
    children: [
      {
        id: '9-1',
        label: 'Management',
        icon: <SubIcon />,
        url: '/configuration/log-control/management',
      },
    ],
  },
  {
    id: '10',
    label: 'CM Composition',
    icon: <SubIcon />,
    children: [
      {
        id: '10-1',
        label: 'CM Button',
        icon: <SubIcon />,
        url: '/cm/button',
      },
      {
        id: '10-2',
        label: 'CM Card',
        icon: <SubIcon />,
        url: '/cm/card',
      },
      {
        id: '10-3',
        label: 'CM Modal',
        icon: <SubIcon />,
        url: '/cm/modal',
      },
      {
        id: '10-4',
        label: 'CM Snackbar',
        icon: <SubIcon />,
        url: '/cm/snackbar',
      },
      {
        id: '10-5',
        label: 'CM Table',
        icon: <SubIcon />,
        url: '/cm/table',
      },
    ],
  },
];

export const CARD_DATA = [
  {
    key: 1,
    list: 'Service Group',
    num: 54,
  },
  {
    key: 2,
    list: 'Service Object',
    num: 23,
  },
  {
    key: 3,
    list: 'Biz Object',
    num: 2,
  },
  {
    key: 4,
    list: 'Data Object',
    num: 9,
  },
];

export const TABLE_COLUMNS = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Create Date',
    dataIndex: 'cdate',
    key: 'cdate',
  },
  {
    title: 'View Count',
    dataIndex: 'vcount',
    key: 'vcount',
  },
];
