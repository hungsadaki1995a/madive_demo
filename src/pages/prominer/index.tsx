import { Navigate, Route, Routes } from 'react-router-dom';

import Error from '@/pages/error';

import Resource from './PRO10103101P';
import ViewResourceDetail from './PRO10103102P';
import Method from './PRO10103103P';
import Field from './PRO10103105P';
import Varible from './PRO10103106P';

const Prominer = () => (
  <Routes>
    <Route
      path="/resource"
      element={<Resource />}
    />
    <Route
      path="/view-resource-detail"
      element={<ViewResourceDetail />}
    />
    <Route
      path="/method"
      element={<Method />}
    />
    <Route
      path="/field"
      element={<Field />}
    />
    <Route
      path="/varible"
      element={<Varible />}
    />
    <Route
      path="/"
      element={<Navigate to="/development/prominer/resource" />}
    />
    <Route
      path="/*"
      element={<Error />}
    />
  </Routes>
);

export default Prominer;
