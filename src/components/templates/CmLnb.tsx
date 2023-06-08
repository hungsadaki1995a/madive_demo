/******************************************************
 * Program ID : src/componetnts/templates/CmLnb.js
 * Program Name : 왼쪽 메뉴 영역 템플릿
 * Create On : 2023.05.10
 * 개 요 : 왼쪽 메뉴 영역 템플릿
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.10   김정아 차장   최초 작성
 * ****************************************************/
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { Box } from '@mui/material';
import { observer } from 'mobx-react';

// img, icon
import logoimg from '@/stylesheets/images/logo.png';
import { RouteItem } from '@/types/route';
import { useStore } from '@/utils';

import { cmComponentRoutes, configRoutes, defaultPageAccessPath, devRoutes, rootRoutes } from '@/routes/routes';
import { filterRoutesBasePermission } from '@/routes/utils';

// List Data
import { CmLnbStyle } from './Templates.Styled';

function CmLnb() {
  const { pathname } = useLocation();
  const { MenuStore } = useStore();
  const [menu, setMenu] = useState<RouteItem[]>([]);
  const [expandedMenuId, setExpandedMenuId] = useState<string>('');
  const [selectedMenuId, setSelectedMenuId] = useState<string>('');
  const navigate = useNavigate();

  const handleClickChildMenu = (menu: RouteItem) => {
    setSelectedMenuId(menu.id);
    navigate(menu.fullPath || '', { replace: true });
  };

  const renderTreeChild = (child: RouteItem) => {
    return (
      <TreeItem
        key={child.id}
        nodeId={child.id}
        label={
          <Box>
            {child.icon} {child.label}
          </Box>
        }
        // icon={child.icon}
        onClick={() => handleClickChildMenu(child)}
      />
    );
  };

  const getMenuListBaseRootMenu = (): RouteItem[] => {
    switch (MenuStore.selectedRootMenu) {
      case rootRoutes.development.title:
        return filterRoutesBasePermission(devRoutes);
      case rootRoutes.configuration.title:
        return filterRoutesBasePermission(configRoutes);
      case rootRoutes.cmComponent.title:
        return cmComponentRoutes;
      default:
        return [];
    }
    return [];
  };

  const setMenuList = () => {
    const menu = getMenuListBaseRootMenu();
    setMenu(menu);
    const parentMenuSelected = menu.find((parentMenu) =>
      parentMenu.child?.find((childMenu) => childMenu.fullPath === pathname)
    );
    if (parentMenuSelected) {
      const childMenuSelected = parentMenuSelected?.child?.find((menu) => menu.fullPath === pathname);
      setExpandedMenuId(parentMenuSelected?.id || '');
      setSelectedMenuId(childMenuSelected?.id || '');
    } else {
      //Navigate to first page if not match current pathname
      const firstChildMenu: RouteItem = menu?.[0];
      setExpandedMenuId(firstChildMenu?.id || '');
      setSelectedMenuId(firstChildMenu.child?.[0].id || '');
      navigate(firstChildMenu.child?.[0].fullPath || '', { replace: true });
    }
  };

  const onMenuSelect = (menuId: string) => {
    setExpandedMenuId(menuId);
  };

  const navigateToDefaultPage = () => {
    navigate(defaultPageAccessPath, { replace: true });
  };

  useEffect(() => {
    if (MenuStore.selectedRootMenu) {
      setMenuList();
    }
  }, [MenuStore.selectedRootMenu]);

  return (
    <CmLnbStyle>
      {/* logo */}
      <h1
        className="logo"
        style={{
          cursor: 'pointer',
        }}
        onClick={navigateToDefaultPage}
      >
        <img
          src={logoimg}
          alt="logo"
        />
      </h1>

      {/* menu */}
      <TreeView
        className="lnbMenuBox"
        defaultCollapseIcon={<ArrowUpIcon />}
        defaultExpandIcon={<ArrowDownIcon />}
        expanded={[expandedMenuId]}
        selected={selectedMenuId}
      >
        {menu.map((item, idx) => (
          <TreeItem
            key={item.id}
            nodeId={item.id}
            label={
              <Box>
                {item.icon} {item.label}
              </Box>
            }
            onClick={() => onMenuSelect(item.id || '')}
          >
            {item.child && item.child.map((child, idx) => renderTreeChild(child))}
          </TreeItem>
        ))}
      </TreeView>
    </CmLnbStyle>
  );
}
export default observer(CmLnb);
