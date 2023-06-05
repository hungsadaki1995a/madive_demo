import { Navigate, Route, Routes } from 'react-router-dom';

import Error from '@/pages/error';

import TestManagement from './PRO10102101P';
import TestCase from './PRO10102106P';
import CreateTestCase from './PRO10102109P';
import EditTestCase from './PRO10102114P';
import History from './PRO10102119P';

const Test = () => (
  <Routes>
    <Route
      path="/management"
      element={<TestManagement />}
    />
    <Route
      path="/test-case"
      element={<TestCase />}
    />
    <Route
      path="/create-test-case"
      element={<CreateTestCase />}
    />
    <Route
      path="/edit-test-case"
      element={<EditTestCase />}
    />
    <Route
      path="/history"
      element={<History />}
    />
    <Route
      path="/"
      element={<Navigate to="/development/test/management" />}
    />
    <Route
      path="/*"
      element={<Error />}
    />
  </Routes>
);

export default Test;
