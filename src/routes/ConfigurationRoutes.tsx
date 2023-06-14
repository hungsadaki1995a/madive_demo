import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useStore } from '@/utils';

import { rootRoutes } from './routes';

const ConfigurationRoutes = () => {
  const { MenuStore } = useStore();

  useEffect(() => {
    MenuStore.setSelectedRootMenu(rootRoutes.configuration.title);
  }, []);

  return <Outlet />;
};

export default ConfigurationRoutes;
