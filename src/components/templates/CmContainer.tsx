import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';
import Cookies from 'universal-cookie';

import ApiAlert from '@/components/molecules/ApiAlert';

import { AUTHENTICATION_COOKIE, USER_INFO_COOKIE } from '@/constants';
import { defaultPageAccessPath } from '@/routes/routes';

// import DevelopmentRoutes from '@/routes/DevelopmentRoutes';
import CmBreadcrumbs from './CmBreadcrumbs';
import CmGnb from './CmGnb';
import CmLnb from './CmLnb';
import { CmContainerStyled } from './Templates.Styled';

const cookies = new Cookies();

const CmContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = cookies.get(AUTHENTICATION_COOKIE);
  const userInfo = cookies.get(USER_INFO_COOKIE);

  useEffect(() => {
    if (!auth || !auth.signed) {
      navigate('/login', { replace: true });
    } else {
      if (location.pathname === '/') {
        navigate(defaultPageAccessPath, { replace: true });
      }
    }
  }, []);

  useEffect(() => {
    if (!userInfo || !userInfo.id) {
      navigate('/login', { replace: true });
    }
  }, [location.pathname]);

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
