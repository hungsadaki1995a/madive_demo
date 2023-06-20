import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';

import ApiAlert from '@/components/molecules/ApiAlert';

import { defaultPageAccessPath } from '@/routes/routes';

// import DevelopmentRoutes from '@/routes/DevelopmentRoutes';
import CmBreadcrumbs from './CmBreadcrumbs';
import CmGnb from './CmGnb';
import CmLnb from './CmLnb';
import { CmContainerStyled } from './Templates.Styled';

const CmContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate(defaultPageAccessPath, { replace: true });
    }
  }, []);

  return (
    <CmContainerStyled>
      <Grid
        container
        className="gridContainer"
      >
        <CmLnb />
        <Grid className="conArea">
          <CmGnb />
          <CmBreadcrumbs />
          <main>
            <Outlet />
          </main>
        </Grid>
      </Grid>
      <ApiAlert />
    </CmContainerStyled>
  );
};

export default CmContainer;
