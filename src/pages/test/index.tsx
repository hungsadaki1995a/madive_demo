import { Navigate, Route, Routes } from 'react-router-dom';

import { subMenusType } from '@/types/typeBundle';

import Error from '@/pages/error';

import TestManagement from './PRO10102101P';
import TestCase from './PRO10102106P';
import CreateTestCase from './PRO10102109P';
import History from './PRO10102119P';

const Test = ({ subMenus }: { subMenus: subMenusType }) => (
  <Routes>
    <Route
      path="/management"
      element={<TestManagement title={subMenus['Test'].title} />}
    />
    <Route
      path="/test-case"
      element={<TestCase title={subMenus['TestCase'].title} />}
    />
    <Route
      path="/create-test-case"
      element={<CreateTestCase title={subMenus['CreateTestCase'].title} />}
    />
    <Route
      path="/history"
      element={<History title={subMenus['History'].title} />}
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
