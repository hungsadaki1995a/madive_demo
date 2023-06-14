import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useStore } from '@/utils';

import { rootRoutes } from './routes';

const DevelopmentRoutes = () => {
  const { MenuStore } = useStore();

  useEffect(() => {
    MenuStore.setSelectedRootMenu(rootRoutes.development.title);
  }, []);

  return <Outlet />;
};

export default DevelopmentRoutes;
