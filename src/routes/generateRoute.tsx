import { Route } from 'react-router-dom';

import { RouteItem } from '@/types/route';

export const generateRoute = (routes: RouteItem[]): React.ReactNode => {
  return routes.map((route) => {
    // if (route.menuName && permissionList.length) {
    //   for (let i = 0; i < permissionList.length; i++) {
    //     if (route.menuName !== permissionList[i].menu_name) {
    //       <Route
    //         path={route.path}
    //         element={route.element}
    //         key={route.path}
    //       >
    //         {route.child && generateRoute(route.child, permissionList)}
    //       </Route>;
    //     } else {
    //       return null;
    //     }
    //   }
    // } else {
    return (
      <Route
        path={route.path}
        element={route.element}
        key={route.path}
      >
        {route.child && generateRoute(route.child)}
      </Route>
    );
    // }
  });
};
