import { Routes, Route, Navigate } from 'react-router-dom';
import TestManagement from './TestManagement';
import TestCase from './TestCase';
import CreateTestCase from './CreateTestCase';
import History from './History';
import { subMenusType } from '@/types/typeBundle';
import Error from '@/pages/error';

const Test = ({ subMenus }: { subMenus: subMenusType }) => (
  <Routes>
    <Route path="/management" element={<TestManagement title={subMenus['Test'].title} />} />
    <Route path="/test-case" element={<TestCase title={subMenus['TestCase'].title} />} />
    <Route path="/create-test-case" element={<CreateTestCase title={subMenus['CreateTestCase'].title} />} />
    <Route path="/history" element={<History title={subMenus['History'].title} />} />
    <Route path="/" element={<Navigate to="/development/test/management" />} />
    <Route path="/*" element={<Error />} />
  </Routes>
);

export default Test;
