import { ErrorBoundary } from 'react-error-boundary';
// import ArticleIcon from '@mui/icons-material/Article';
// import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
// import PersonIcon from '@mui/icons-material/Person';
// import TokenIcon from '@mui/icons-material/Token';
import { Navigate, Route, Routes } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Unstable_Grid2';

import CmBreadcrumbs from '@/components/templates/CmBreadcrumbs';
// Common Templates
import CmGnb from '@/components/templates/CmGnb';
import CmLnb from '@/components/templates/CmLnb';

import { RootStore } from '@/stores';
import CreateStore from '@/utils/useStore';

import { Button, Card, Modal, SnackBar, Table } from '@/pages/demo';
import Error from '@/pages/error';
import ErrorFallback from '@/pages/error/ErrorFallback';
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

import CmContainer from './App.Styled';

// 100vh - 스크롤 오류
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

export const MobxStore = new RootStore();

const App = () => (
  <CreateStore.Provider value={{ MobxStore }}>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CmContainer>
        <CssBaseline />
        <Grid
          container
          className="gridContainer"
        >
          {/* LNB */}
          <CmLnb />
          <Grid className="conArea">
            {/* topNav */}
            <CmGnb />
            {/* Breadcrumbs */}
            <CmBreadcrumbs />
            {/* Main */}
            <main>
              <Routes>
                {/* Login */}
                <Route
                  path="/login"
                  element={<Login />}
                />
                {/* Development */}
                <Route
                  path="/development/overview/*"
                  element={<Overview subMenus={menus['Overview'].subMenus} />}
                />
                <Route
                  path="/development/node/*"
                  element={<Node subMenus={menus['Node'].subMenus} />}
                />
                <Route
                  path="/development/test/*"
                  element={<Test subMenus={menus['Test'].subMenus} />}
                />
                <Route
                  path="/development/prominer/*"
                  element={<Prominer subMenus={menus['Prominer'].subMenus} />}
                />
                <Route
                  path="/development/system-context/*"
                  element={<SystemContext subMenus={menus['SystemContext'].subMenus} />}
                />
                <Route
                  path="/development/resource/*"
                  element={<Resource subMenus={menus['Resource'].subMenus} />}
                />
                <Route
                  path="/development"
                  element={<Navigate to="/development/overview" />}
                />

                {/* Configuration */}
                <Route
                  path="/configuration/user/*"
                  element={<User subMenus={menus['User'].subMenus} />}
                />
                <Route
                  path="/configuration/model/*"
                  element={<Model subMenus={menus['Model'].subMenus} />}
                />
                <Route
                  path="/configuration/log-control/*"
                  element={<LogControl subMenus={menus['LogControl'].subMenus} />}
                />
                <Route
                  path="/configuration"
                  element={<Navigate to="configuration/user" />}
                />

                {/* 공통 컴포넌트 구성 Sample Page (참고) */}
                <Route
                  path="/cm/button"
                  element={<Button />}
                />
                <Route
                  path="/cm/card"
                  element={<Card />}
                />
                <Route
                  path="/cm/modal"
                  element={<Modal />}
                />
                <Route
                  path="/cm/snackbar"
                  element={<SnackBar />}
                />
                <Route
                  path="/cm/table"
                  element={<Table />}
                />

                <Route
                  path="/"
                  element={<Navigate to="/login" />}
                />
                <Route
                  path="/*"
                  element={<Error />}
                />
              </Routes>
            </main>
          </Grid>
        </Grid>
      </CmContainer>
    </ErrorBoundary>
  </CreateStore.Provider>
);

const menus = {
  Overview: {
    title: 'Overview',
    subMenus: {
      AppAndSg: { title: 'APP&SG', to: '/development/overview/app-and-sg' },
      Meta: { title: 'Meta', to: '/development/overview/meta/management' },
      MetaHistory: { title: 'Meta History', to: '/development/overview/meta/history' },
      DoInfo: { title: 'Do Info', to: '/development/overview/do-info' },
    },
  },
  Node: {
    title: 'Node',
    subMenus: { Node: { title: 'Node', to: '/development/node/management' } },
  },
  Test: {
    title: 'Test',
    subMenus: {
      Test: { title: 'Test', to: '/development/test/management' },
      TestCase: { title: 'TestCase', to: '/development/test/test-case' },
      CreateTestCase: { title: 'Create TestCase', to: '/development/test/create-test-case' },
      EditTestCase: { title: 'Edit TestCase', to: '/development/test/edit-test-case' },
      History: { title: 'History', to: '/development/test/history' },
    },
  },
  Prominer: {
    title: 'Prominer',
    subMenus: {
      Resource: { title: 'Resource', to: '/development/prominer/resource' },
      ViewResourceDetail: { title: 'View Resource Detail', to: '/development/prominer/view-resource-detail' },
      Method: { title: 'Method', to: '/development/prominer/method' },
      Field: { title: 'Field', to: '/development/prominer/field' },
      Varible: { title: 'Varible', to: '/development/prominer/varible' },
    },
  },
  SystemContext: {
    title: 'System Context',
    subMenus: {
      Management: { title: 'Management', to: '/development/system-context/management' },
      Datasource: { title: 'Datasource', to: '/development/system-context/datasource' },
    },
  },
  Resource: {
    title: 'Resource',
    subMenus: {
      Resource: { title: 'Lock&Unlock', to: '/development/resource/lock-and-unlock' },
    },
  },
  User: {
    title: 'User',
    subMenus: {
      Management: { title: 'User Management', to: '/configuration/user/management' },
      History: { title: 'User History', to: '/configuration/user/history' },
      GroupManagement: { title: 'Group Management', to: '/configuration/user/group-management' },
      RoleManagement: { title: 'Role Management', to: '/configuration/user/role-management' },
      UserGroupAssign: { title: 'User Group Assign', to: '/configuration/user/user-group-assign' },
      GroupRoleAssign: { title: 'Group Role Assign', to: '/configuration/user/group-role-assign' },
      RolePermissionAssign: { title: 'Role Permission Assign', to: '/configuration/user/role-permission-assign' },
    },
  },
  Model: {
    title: 'Model',
    subMenus: {
      DBIO: { title: 'DBIO', to: '/configuration/model/dbio' },
    },
  },
  LogControl: {
    title: 'Log Control',
    subMenus: {
      Management: { title: 'Log Control Management', to: '/configuration/log-control/management' },
    },
  },
};

export default App;
