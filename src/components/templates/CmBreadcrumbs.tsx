/******************************************************
 * Program ID : src/componetnts/templates/CmBreadcrumbs.js
 * Program Name : 현재 경로 영역 템플릿
 * Create On : 2023.05.11
 * 개 요 : 현재 경로 영역 템플릿
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.11   김정아 차장   최초 작성
 ******************************************************/
// import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { CmBreadcrumbsStyle } from './Templates.Styled';

function CmBreadcrumbs() {
  // const location = useLocation();
  // console.log('breadcrumbs > > ', location);

  const naviData = [
    {
      key: 1,
      naviUrl: '/',
      naviName: 'Development',
    },
    {
      key: 2,
      naviUrl: '/',
      naviName: 'Overview',
    },
    {
      key: 3,
      naviName: 'Current Page',
    },
  ];
  const naviTitle = ['App&SG'];

  return (
    <CmBreadcrumbsStyle>
      {/* <Box label="breadcrumbs"> */}
      <Box title="breadcrumbs">
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumbs"
        >
          {!!naviData &&
            naviData.map((item, idx) => (
              <Link
                key={idx}
                href={item.naviUrl}
              >
                {item.naviName}
              </Link>
            ))}
        </Breadcrumbs>
        <Typography
          variant="subtitle1"
          gutterBottom
        >
          {naviTitle}
        </Typography>
      </Box>
    </CmBreadcrumbsStyle>
  );
}
export default CmBreadcrumbs;
