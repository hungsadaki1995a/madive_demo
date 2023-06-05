import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';
import Cookies from 'universal-cookie';

import { AuthApi } from '@/apis';

import { AUTHENTICATION_COOKIE, USER_INFO_COOKIE } from '@/constants';
import { LOCALSTORAGE_PERMISSION } from '@/constants/authentication';

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

  const getUserPermission = async (userId: string) => {
    const permission = await AuthApi.getUserPermission(userId);

    localStorage.setItem(LOCALSTORAGE_PERMISSION, JSON.stringify(permission?.dto?.ConfigPermissionDto));
  };

  useEffect(() => {
    if (!auth || !auth.signed) {
      navigate('/login', { replace: true });
    }
  }, []);

  useEffect(() => {
    if (!userInfo || !userInfo.id) {
      navigate('/login', { replace: true });
    }

    if (userInfo && userInfo.id) {
      getUserPermission(userInfo.id);
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
    </CmContainerStyled>
  );
};

export default CmContainer;
