import { IPermission } from '@/types/dtos/permissionDto';
import { RouteItem } from '@/types/route';
import { tryCatch } from '@/utils/tryCatch';

import { LOCALSTORAGE_PERMISSION } from '@/constants/authentication';

export const filterRoutesBasePermission = (routes: RouteItem[]): RouteItem[] => {
  const permissions: IPermission[] =
    tryCatch(JSON.parse, [], localStorage.getItem(LOCALSTORAGE_PERMISSION || '[]')) || [];
  const menuListAccessDenied = permissions.map((permission) => {
    return permission.menu_name;
  });
  const filteredRoutes: RouteItem[] = routes
    .map((route) => {
      route.child =
        route?.child?.filter((childRoute) => {
          const isDeniedRoute = childRoute.menuName && menuListAccessDenied.includes(childRoute.menuName);
          return !isDeniedRoute;
        }) || [];
      return route;
    })
    .filter((route) => route.child?.length);
  return filteredRoutes;
};
