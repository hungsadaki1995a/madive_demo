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

import { AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { observer } from 'mobx-react';

import * as CmStyle from '@/stylesheets/common';

import { rootRoutes } from '@/routes/routes';

import { CmGnbStyle } from './Templates.Styled';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const rootMenus = [
  {
    title: rootRoutes.development.title,
    path: rootRoutes.development.path,
  },
  {
    title: rootRoutes.cmComponent.title,
    path: rootRoutes.cmComponent.path,
  },
];

const CmGnb = observer(() => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
                {({ isActive }) => (
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
});

export default CmGnb;
