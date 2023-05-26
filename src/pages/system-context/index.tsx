import { Navigate, Route, Routes } from 'react-router-dom';

import { subMenusType } from '@/types/typeBundle';

import Error from '@/pages/error';

import SystemContextManagement from './PRO10104101P';
import Datasource from './PRO10104104P';

const SystemContext = ({ subMenus }: { subMenus: subMenusType }) => (
  <Routes>
    <Route
      path="/management"
      element={<SystemContextManagement title={subMenus['Management'].title} />}
    />
    <Route
      path="/datasource"
      element={<Datasource title={subMenus['Datasource'].title} />}
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
