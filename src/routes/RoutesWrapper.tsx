import { HashRouter, Route, Routes } from 'react-router-dom';

import CmContainer from '@/components/templates/CmContainer';

import Error from '@/pages/error';
import Login from '@/pages/login/PRO20204201P';

import PrivateRoutes from './PrivateRoutes';
import { routes } from './routes';

const RoutesWrapper = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path={routes.login}
          element={<Login />}
        />
        <Route
          path="/"
          element={<CmContainer />}
        >
          <Route
            path="/*"
            element={<PrivateRoutes />}
          />
        </Route>
        <Route
          path="*"
          element={<Error />}
        />
      </Routes>
    </HashRouter>
  );
};

export default RoutesWrapper;
