import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';
import Cookies from 'universal-cookie';

import { AUTHENTICATION_COOKIE } from '@/constants';

import CmBreadcrumbs from './CmBreadcrumbs';
import CmGnb from './CmGnb';
import CmLnb from './CmLnb';
import { CmContainerStyled } from './Templates.Styled';

const cookies = new Cookies();

const CmContainer = () => {
  const navigate = useNavigate();
  const userCookie = cookies.get(AUTHENTICATION_COOKIE);

  useEffect(() => {
    if (!userCookie || !userCookie.signed) {
      navigate('/login', { replace: true });
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
    </CmContainerStyled>
  );
};

export default CmContainer;
