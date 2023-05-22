import { Routes, Route, Navigate } from 'react-router-dom';
import Resource from './Resource';
import ViewResourceDetail from './ViewResourceDetail';
import Method from './Method';
import Field from './Field';
import Varible from './Varible';
import { subMenusType } from '@/types/typeBundle';
import Error from '@/pages/error';

const Prominer = ({ subMenus }: { subMenus: subMenusType }) => (
  <Routes>
    <Route path="/resource" element={<Resource title={subMenus['Resource'].title} />} />
    <Route path="/view-resource-detail" element={<ViewResourceDetail title={subMenus['ViewResourceDetail'].title} />} />
    <Route path="/method" element={<Method title={subMenus['Method'].title} />} />
    <Route path="/field" element={<Field title={subMenus['Field'].title} />} />
    <Route path="/varible" element={<Varible title={subMenus['Varible'].title} />} />
    <Route path="/" element={<Navigate to="/development/prominer/resource" />} />
    <Route path="/*" element={<Error />} />
  </Routes>
);

export default Prominer;
