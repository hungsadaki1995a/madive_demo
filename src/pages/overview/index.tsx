import { Route, Routes } from 'react-router-dom';

import Error from '@/pages/error';

import Meta from './meta/PRO10100106P';
import MetaHistory from './meta/PRO10100110P';
import AppSG from './PRO10100101P';
import DoInfo from './PRO10100111P';

const Overview = () => (
  <Routes>
    <Route
      path="/app-and-sg"
      element={<AppSG />}
    />
    <Route
      path="/meta/management"
      element={<Meta />}
    />
    <Route
      path="/meta/history"
      element={<MetaHistory />}
    />
    <Route
      path="/do-info"
      element={<DoInfo />}
    />
    <Route
      path="/*"
      element={<Error />}
    />
  </Routes>
);

export default Overview;
