import { Navigate, Route } from 'react-router-dom';

import { RouteItem } from '@/types/route';

export const generateRoute = (routes: RouteItem[]): React.ReactNode => {
  return routes.map((route) => {
    return (
      <Route
        path={route.path}
        element={route.element}
        key={route.path}
        id={route.id}
      >
        {route.child && generateRoute(route.child)}
        {route.child && (
          <Route
            path="*"
            element={
              <Navigate
                to={route.child[0].fullPath || '/login'}
                replace
              />
            }
          />
        )}
      </Route>
    );
  });
};
