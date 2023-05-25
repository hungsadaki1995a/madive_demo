import { Routes, Route, Navigate } from 'react-router-dom';
import AppSG from './PRO10100101P';
import Meta from './meta/PRO10100106P';
import MetaHistory from './meta/PRO10100110P';
import { subMenusType } from '@/types/typeBundle';
import Error from '@/pages/error';

const Overview = ({ subMenus }: { subMenus: subMenusType }) => (
  <Routes>
    <Route
      path="/app-and-sg"
      element={<AppSG title={subMenus['AppAndSg'].title} />}
    />
    <Route
      path="/meta/management"
      element={<Meta title={subMenus['Meta'].title} />}
    />
    <Route
      path="/meta/history"
      element={<MetaHistory title={subMenus['MetaHistory'].title} />}
    />
    <Route
      path="/"
      element={<Navigate to="/development/overview/app-and-sg" />}
    />
    <Route
      path="/*"
      element={<Error />}
    />
  </Routes>
);

export default Overview;
