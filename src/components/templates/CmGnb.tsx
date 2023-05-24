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
import React, { useState } from 'react';

import { AppBar, Box, Toolbar, Typography, Menu, Button, MenuItem } from '@mui/material';
import { CmGnbStyle } from './Templates.Styled';
// Common Atoms
import { CmButton } from '@/components/atoms/CmButton';

// img, icon
import { ReactComponent as LogoutIcon } from '@/stylesheets/images/logout.svg';

const pages = ['Development', 'Configuration'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function CmGnb() {
  // topNav
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <CmButton
              id="menu-appbar-btn"
              className=""
              variant="outlined"
              startIcon={<LogoutIcon />}
              btnTitle="Logout"
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
export default CmGnb;
