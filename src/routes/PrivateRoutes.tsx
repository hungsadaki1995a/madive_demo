import { Navigate, Route, Routes } from 'react-router-dom';

import { RouteItem } from '@/types/route';

import CmCompositionRoutes from './CmCompositionRoutes';
import DevelopmentRoutes from './DevelopmentRoutes';
import { generateRoute } from './generateRoute';
import { cmComponentRoutes, devRoutes } from './routes';
import { filterRoutesBasePermission } from './utils';

const PrivateRoutes = () => {
  const filteredDevRoutes: RouteItem[] = filterRoutesBasePermission(devRoutes);

  return (
    <Routes>
      <Route
        path="development/*"
        element={<DevelopmentRoutes />}
      >
        <Route
          path=""
          element={
            <Navigate
              to="overview/meta"
              replace
            />
          }
        />
        {generateRoute(filteredDevRoutes)}
      </Route>
      <Route
        path="composition/*"
        element={<CmCompositionRoutes />}
      >
        <Route
          path=""
          element={
            <Navigate
              to={cmComponentRoutes?.[0]?.child?.[0]?.fullPath || ''}
              replace
            />
          }
        />
        {generateRoute(cmComponentRoutes)}
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
