import { Routes, Route, Navigate } from 'react-router-dom';
import Dbio from './Dbio';
import { subMenusType } from '@/types/typeBundle';
import Error from '@/pages/error';

const Model = ({ subMenus }: { subMenus: subMenusType }) => (
  <Routes>
    <Route path="/dbio" element={<Dbio title={subMenus['DBIO'].title} />} />
    <Route path="/" element={<Navigate to="/configuration/model/dbio" />} />
    <Route path="/*" element={<Error />} />
  </Routes>
);

export default Model;
