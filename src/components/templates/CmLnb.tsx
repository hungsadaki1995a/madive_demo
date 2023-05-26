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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { Box, Typography } from '@mui/material';

// img, icon
import logoimg from '@/stylesheets/images/logo.png';

// List Data
import { LNB_LIST } from '@/example/GenaralCode';

import { CmLnbStyle } from './Templates.Styled';

// type lnbPropsType = {
//   data: string;
//   collapsible: string;
//   onClick: () => void;
// };

type treeChildType = {
  id: string;
  label: string;
  icon: React.JSX.Element;
  url: string;
};

// function CmLnb(props: lnbPropsType) {
//   const { data, collapsible, onClick } = props;
function CmLnb() {
  const navigate = useNavigate();

  const handleLink = (url: string) => {
    navigate(url, { replace: true });
  };

  const renderTreeChild = (child: treeChildType) => {
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
        onClick={() => handleLink(child.url)}
      />
    );
  };

  return (
    <CmLnbStyle>
      {/* logo */}
      <h1 className="logo">
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
      >
        {LNB_LIST.map((item, idx) => (
          <TreeItem
            key={item.id}
            nodeId={item.id}
            label={
              <Box>
                {item.icon} {item.label}
              </Box>
            }
          >
            {!!LNB_LIST &&
              LNB_LIST.length > 0 &&
              !!item?.children &&
              item?.children.map((child, idx) => renderTreeChild(child))}
          </TreeItem>
        ))}
      </TreeView>
    </CmLnbStyle>
  );
}
export default CmLnb;
