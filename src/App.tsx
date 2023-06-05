import { ErrorBoundary } from 'react-error-boundary';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';

import { RootStore } from '@/stores';
import CreateStore from '@/utils/useStore';

import ErrorFallback from '@/pages/error/ErrorFallback';

import CmContainer from './components/templates/CmContainer';
import { generateRoute } from './routes/generateRoute';
import { authRoutes, configRoutes, devRoutes, otherRoutes, sampleRoutes } from './routes/path';
import theme from './styles/theme';

// 100vh - 스크롤 오류
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

export const MobxStore = new RootStore();

const App = () => (
  <CreateStore.Provider value={{ MobxStore }}>
    <ThemeProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HashRouter>
          <Routes>
            {generateRoute(authRoutes)}
            <Route
              path="/"
              element={<CmContainer />}
            >
              {generateRoute(devRoutes)}
              {generateRoute(configRoutes)}
              {generateRoute(sampleRoutes)}
            </Route>
            {generateRoute(otherRoutes)}
          </Routes>
        </HashRouter>
      </ErrorBoundary>
    </ThemeProvider>
  </CreateStore.Provider>
);

// const menus = {
//   Overview: {
//     title: 'Overview',
//     subMenus: {
//       AppAndSg: { title: 'APP&SG', to: '/development/overview/app-and-sg' },
//       Meta: { title: 'Meta', to: '/development/overview/meta/management' },
//       MetaHistory: { title: 'Meta History', to: '/development/overview/meta/history' },
//       DoInfo: { title: 'Do Info', to: '/development/overview/do-info' },
//     },
//   },
//   Node: {
//     title: 'Node',
//     subMenus: { Node: { title: 'Node', to: '/development/node/management' } },
//   },
//   Test: {
//     title: 'Test',
//     subMenus: {
//       Test: { title: 'Test', to: '/development/test/management' },
//       TestCase: { title: 'TestCase', to: '/development/test/test-case' },
//       CreateTestCase: { title: 'Create TestCase', to: '/development/test/create-test-case' },
//       EditTestCase: { title: 'Edit TestCase', to: '/development/test/edit-test-case' },
//       History: { title: 'History', to: '/development/test/history' },
//     },
//   },
//   Prominer: {
//     title: 'Prominer',
//     subMenus: {
//       Resource: { title: 'Resource', to: '/development/prominer/resource' },
//       ViewResourceDetail: { title: 'View Resource Detail', to: '/development/prominer/view-resource-detail' },
//       Method: { title: 'Method', to: '/development/prominer/method' },
//       Field: { title: 'Field', to: '/development/prominer/field' },
//       Varible: { title: 'Varible', to: '/development/prominer/varible' },
//     },
//   },
//   SystemContext: {
//     title: 'System Context',
//     subMenus: {
//       Management: { title: 'Management', to: '/development/system-context/management' },
//       Datasource: { title: 'Datasource', to: '/development/system-context/datasource' },
//     },
//   },
//   Resource: {
//     title: 'Resource',
//     subMenus: {
//       Resource: { title: 'Lock&Unlock', to: '/development/resource/lock-and-unlock' },
//     },
//   },
//   User: {
//     title: 'User',
//     subMenus: {
//       Management: { title: 'User Management', to: '/configuration/user/management' },
//       History: { title: 'User History', to: '/configuration/user/history' },
//       GroupManagement: { title: 'Group Management', to: '/configuration/user/group-management' },
//       RoleManagement: { title: 'Role Management', to: '/configuration/user/role-management' },
//       UserGroupAssign: { title: 'User Group Assign', to: '/configuration/user/user-group-assign' },
//       GroupRoleAssign: { title: 'Group Role Assign', to: '/configuration/user/group-role-assign' },
//       RolePermissionAssign: { title: 'Role Permission Assign', to: '/configuration/user/role-permission-assign' },
//     },
//   },
//   Model: {
//     title: 'Model',
//     subMenus: {
//       DBIO: { title: 'DBIO', to: '/configuration/model/dbio' },
//     },
//   },
//   LogControl: {
//     title: 'Log Control',
//     subMenus: {
//       Management: { title: 'Log Control Management', to: '/configuration/log-control/management' },
//     },
//   },
// };

export default App;
