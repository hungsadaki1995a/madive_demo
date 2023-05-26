import { Navigate, Route, Routes } from 'react-router-dom';

import { subMenusType } from '@/types/typeBundle';

import Error from '@/pages/error';

import LockAndUnlock from './PRO10105101P';

const Resource = ({ subMenus }: { subMenus: subMenusType }) => (
  <Routes>
    <Route
      path="/lock-and-unlock"
      element={<LockAndUnlock title={subMenus['Resource'].title} />}
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
