import { Navigate, Route, Routes } from 'react-router-dom';

import Error from '@/pages/error';

import LockAndUnlock from './PRO10105101P';

const Resource = () => (
  <Routes>
    <Route
      path="/lock-and-unlock"
      element={<LockAndUnlock />}
    />
    <Route
      path="/"
      element={<Navigate to="/development/resource/lock-and-unlock" />}
    />
    <Route
      path="/*"
      element={<Error />}
    />
  </Routes>
);

export default Resource;
