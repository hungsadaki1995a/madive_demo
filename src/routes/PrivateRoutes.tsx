import { Navigate, Route, Routes } from 'react-router-dom';

import { RouteItem } from '@/types/route';

import Error from '@/pages/error';

import CmCompositionRoutes from './CmCompositionRoutes';
import ConfigurationRoutes from './ConfigurationRoutes';
import DevelopmentRoutes from './DevelopmentRoutes';
import { generateRoute } from './generateRoute';
import { cmComponentRoutes, configRoutes, devRoutes } from './routes';
import { filterRoutesBasePermission } from './utils';

const PrivateRoutes = () => {
  const filteredDevRoutes: RouteItem[] = filterRoutesBasePermission(devRoutes);
  const filteredConfigRoutes: RouteItem[] = filterRoutesBasePermission(configRoutes);

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
              to={filteredDevRoutes?.[0]?.child?.[0]?.fullPath || ''}
              replace
            />
          }
        />
        {generateRoute(filteredDevRoutes)}
        <Route
          path="*"
          element={<Error />}
        />
      </Route>
      <Route
        path="configuration/*"
        element={<ConfigurationRoutes />}
      >
        <Route
          path=""
          element={
            <Navigate
              to={filteredConfigRoutes?.[0]?.child?.[0]?.fullPath || ''}
              replace
            />
          }
        />
        {generateRoute(filteredConfigRoutes)}
        <Route
          path="*"
          element={<Error />}
        />
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
        <Route
          path="*"
          element={<Error />}
        />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
