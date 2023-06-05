import { Navigate, Route, Routes } from 'react-router-dom';

import Error from '@/pages/error';

import SystemContextManagement from './PRO10104101P';
import Datasource from './PRO10104104P';

const SystemContext = () => (
  <Routes>
    <Route
      path="/management"
      element={<SystemContextManagement />}
    />
    <Route
      path="/datasource"
      element={<Datasource />}
    />
    <Route
      path="/"
      element={<Navigate to="/development/system-context/management" />}
    />
    <Route
      path="/*"
      element={<Error />}
    />
  </Routes>
);

export default SystemContext;
