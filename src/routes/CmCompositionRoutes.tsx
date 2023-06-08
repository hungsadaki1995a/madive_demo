import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useStore } from '@/utils';

import { rootRoutes } from './routes';

const CmCompositionRoutes = () => {
  const { MenuStore } = useStore();
  useEffect(() => {
    MenuStore.setSelectedRootMenu(rootRoutes.cmComponent.title);
  }, []);
  return <Outlet />;
};

export default CmCompositionRoutes;
