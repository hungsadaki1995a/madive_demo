import { Navigate, Route, Routes } from 'react-router-dom';

import Error from '@/pages/error';

import NodeManagement from './PRO10101101P';

const Node = () => (
  <Routes>
    <Route
      path="/management"
      element={<NodeManagement />}
    />
    <Route
      path="/"
      element={<Navigate to="/development/node/management" />}
    />
    <Route
      path="/*"
      element={<Error />}
    />
  </Routes>
);

export default Node;
