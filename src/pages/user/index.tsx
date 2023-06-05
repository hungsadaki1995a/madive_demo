import { Navigate, Route, Routes } from 'react-router-dom';

import Error from '@/pages/error';

import UserManagement from './PRO20201201P';
import History from './PRO20201204P';
import GroupManagement from './PRO20201205P';
import RoleManagement from './PRO20201208P';
import UserGroupAssign from './PRO20201211P';
import GroupRoleAssign from './PRO20201212P';
import RolePermissionAssign from './PRO20201213P';

const User = () => (
  <Routes>
    <Route
      path="/management"
      element={<UserManagement />}
    />
    <Route
      path="/history"
      element={<History />}
    />
    <Route
      path="/group-management"
      element={<GroupManagement />}
    />
    <Route
      path="/role-management"
      element={<RoleManagement />}
    />
    <Route
      path="/user-group-assign"
      element={<UserGroupAssign />}
    />
    <Route
      path="/group-role-assign"
      element={<GroupRoleAssign />}
    />
    <Route
      path="/role-permission-assign"
      element={<RolePermissionAssign />}
    />
    <Route
      path="/"
      element={<Navigate to="/configuration/user/management" />}
    />
    <Route
      path="/*"
      element={<Error />}
    />
  </Routes>
);

export default User;
