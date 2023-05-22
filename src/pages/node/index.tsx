import { Routes, Route, Navigate } from 'react-router-dom';
import NodeManagement from './NodeManagement';
import { subMenusType } from '@/types/typeBundle';
import Error from '@/pages/error';

const Node = ({ subMenus }: { subMenus: subMenusType }) => (
  <Routes>
    <Route path="/management" element={<NodeManagement title={subMenus['Node'].title} />} />
    <Route path="/" element={<Navigate to="/development/node/management" />} />
    <Route path="/*" element={<Error />} />
  </Routes>
);

export default Node;
