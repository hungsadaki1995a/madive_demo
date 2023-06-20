import { HashRouter, Route, Routes } from 'react-router-dom';

import CmContainer from '@/components/templates/CmContainer';

import PrivateRoutes from './PrivateRoutes';

const RoutesWrapper = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<CmContainer />}
        >
          <Route
            path="/*"
            element={<PrivateRoutes />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default RoutesWrapper;
