import { Navigate, Route, Routes } from 'react-router-dom';

import Error from '@/pages/error';

import Dbio from './PRO20202201P';

const Model = () => (
  <Routes>
    <Route
      path="/dbio"
      element={<Dbio />}
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
