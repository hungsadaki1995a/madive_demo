import { Navigate, Route, Routes } from 'react-router-dom';

import { subMenusType } from '@/types/typeBundle';

import Error from '@/pages/error';

import Dbio from './PRO20202201P';

const Model = ({ subMenus }: { subMenus: subMenusType }) => (
  <Routes>
    <Route
      path="/dbio"
      element={<Dbio title={subMenus['DBIO'].title} />}
    />
    <Route
      path="/"
      element={<Navigate to="/configuration/model/dbio" />}
    />
    <Route
      path="/*"
      element={<Error />}
    />
  </Routes>
);

export default Model;
