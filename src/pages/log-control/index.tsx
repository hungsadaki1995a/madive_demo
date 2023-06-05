import { Navigate, Route, Routes } from 'react-router-dom';

import Error from '@/pages/error';

import LogManagement from './PRO20203201P';

const LogControl = () => (
  <Routes>
    <Route
      path="/management"
      element={<LogManagement />}
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
