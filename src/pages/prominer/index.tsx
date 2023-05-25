import { Routes, Route, Navigate } from 'react-router-dom';
import Resource from './PRO10103101P';
import ViewResourceDetail from './PRO10103102P';
import Method from './PRO10103103P';
import Field from './PRO10103105P';
import Varible from './PRO10103106P';
import { subMenusType } from '@/types/typeBundle';
import Error from '@/pages/error';

const Prominer = ({ subMenus }: { subMenus: subMenusType }) => (
  <Routes>
    <Route
      path="/resource"
      element={<Resource title={subMenus['Resource'].title} />}
    />
    <Route
      path="/view-resource-detail"
      element={<ViewResourceDetail title={subMenus['ViewResourceDetail'].title} />}
    />
    <Route
      path="/method"
      element={<Method title={subMenus['Method'].title} />}
    />
    <Route
      path="/field"
      element={<Field title={subMenus['Field'].title} />}
    />
    <Route
      path="/varible"
      element={<Varible title={subMenus['Varible'].title} />}
    />
    <Route
      path="/"
      element={<Navigate to="/development/prominer/resource" />}
    />
    <Route
      path="/*"
      element={<Error />}
    />
  </Routes>
);

export default Prominer;
