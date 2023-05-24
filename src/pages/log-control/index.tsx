import { Routes, Route, Navigate } from 'react-router-dom';
import LogManagement from './PRO20203201P';
import { subMenusType } from '@/types/typeBundle';
import Error from '@/pages/error';

const LogControl = ({ subMenus }: { subMenus: subMenusType }) => (
  <Routes>
    <Route path="/management" element={<LogManagement title={subMenus['Management'].title} />} />
    <Route path="/" element={<Navigate to="/configuration/log-control/management" />} />
    <Route path="/*" element={<Error />} />
  </Routes>
);

export default LogControl;
