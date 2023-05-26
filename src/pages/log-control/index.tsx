import { Navigate, Route, Routes } from 'react-router-dom';

import { subMenusType } from '@/types/typeBundle';

import Error from '@/pages/error';

import LogManagement from './PRO20203201P';

const LogControl = ({ subMenus }: { subMenus: subMenusType }) => (
  <Routes>
    <Route
      path="/management"
      element={<LogManagement title={subMenus['Management'].title} />}
    />
    <Route
      path="/"
      element={<Navigate to="/configuration/log-control/management" />}
    />
    <Route
      path="/*"
      element={<Error />}
    />
  </Routes>
);

export default LogControl;
