import { Routes, Route, Navigate } from 'react-router-dom';
import UserManagement from './PRO20201201P';
import History from './PRO20201204P';
import GroupManagement from './PRO20201205P';
import RoleManagement from './PRO20201208P';
import UserGroupAssign from './PRO20201211P';
import GroupRoleAssign from './PRO20201212P';
import RolePermissionAssign from './PRO20201213P';
import { subMenusType } from '@/types/typeBundle';
import Error from '@/pages/error';

const User = ({ subMenus }: { subMenus: subMenusType }) => (
  <Routes>
    <Route path="/management" element={<UserManagement title={subMenus['Management'].title} />} />
    <Route path="/history" element={<History title={subMenus['History'].title} />} />
    <Route path="/group-management" element={<GroupManagement title={subMenus['GroupManagement'].title} />} />
    <Route path="/role-management" element={<RoleManagement title={subMenus['RoleManagement'].title} />} />
    <Route path="/user-group-assign" element={<UserGroupAssign title={subMenus['UserGroupAssign'].title} />} />
    <Route path="/group-role-assign" element={<GroupRoleAssign title={subMenus['GroupRoleAssign'].title} />} />
    <Route
      path="/role-permission-assign"
      element={<RolePermissionAssign title={subMenus['RolePermissionAssign'].title} />}
    />
    <Route path="/" element={<Navigate to="/configuration/user/management" />} />
    <Route path="/*" element={<Error />} />
  </Routes>
);

export default User;
