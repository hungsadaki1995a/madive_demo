/******************************************************
 * Program ID : src/componetnts/templates/CmGnb.js
 * Program Name : 상위 메뉴 영역 템플릿
 * Create On : 2023.05.10
 * 개 요 : 상위 메뉴 영역 템플릿
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.10   김정아 차장   최초 작성
 ******************************************************/
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

// import { rootRoutes } from '@/routes/routes';
import { AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { observer } from 'mobx-react';

// Common Atoms
import { CmButton } from '@/components/atoms/CmButton';

import { AuthApi } from '@/apis';
import * as CmStyle from '@/stylesheets/common';
// img, icon
import { ReactComponent as LogoutIcon } from '@/stylesheets/images/logout.svg';
import { useStore } from '@/utils';

import { rootRoutes } from '@/routes/routes';

import { CmGnbStyle } from './Templates.Styled';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const rootMenus = [
  {
    title: rootRoutes.development.title,
    path: rootRoutes.development.path,
  },
  {
    title: rootRoutes.configuration.title,
    path: rootRoutes.configuration.path,
  },
  {
    title: rootRoutes.cmComponent.title,
    path: rootRoutes.cmComponent.path,
  },
];

function CmGnb() {
  const { MenuStore } = useStore();
  // topNav
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickRootMenu = (menuTitle: string) => {
    MenuStore.setSelectedRootMenu(menuTitle);
  };

  return (
    <CmGnbStyle>
      <AppBar
        position="static"
        className="header"
      >
        <Toolbar disableGutters>
          <Box>
            {rootMenus.map((route) => (
              <NavLink
                to={route.path}
                key={route.title}
                style={{ textDecoration: 'none' }}
              >
                {({ isActive, isPending }) => (
                  <Button
                    sx={{
                      backgroundColor: isActive ? CmStyle.color.colorBtnPrimary : CmStyle.color.colorBg03,
                    }}
                  >
                    {route.title}
                  </Button>
                )}
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <CmButton
              id="menu-appbar-btn"
              className=""
              variant="outlined"
              startIcon={<LogoutIcon />}
              btnTitle="Logout"
              onClick={AuthApi.logout}
            />
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </CmGnbStyle>
  );
}
export default observer(CmGnb);
