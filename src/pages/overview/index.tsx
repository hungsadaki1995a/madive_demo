import { Routes, Route, Navigate } from 'react-router-dom';
import AppSG from './AppSG';
import Meta from './meta/Meta';
import MetaHistory from './meta/MetaHistory';
import { subMenusType } from '@/types/typeBundle';
import Error from '@/pages/error';

const Overview = ({ subMenus }: { subMenus: subMenusType }) => (
  <Routes>
    <Route path="/app-and-sg" element={<AppSG title={subMenus['AppAndSg'].title} />} />
    <Route path="/meta/management" element={<Meta title={subMenus['Meta'].title} />} />
    <Route path="/meta/history" element={<MetaHistory title={subMenus['MetaHistory'].title} />} />
    <Route path="/" element={<Navigate to="/development/overview/app-and-sg" />} />
    <Route path="/*" element={<Error />} />
  </Routes>
);

export default Overview;
