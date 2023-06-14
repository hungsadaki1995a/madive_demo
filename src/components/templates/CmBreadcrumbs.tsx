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
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Breadcrumbs, Typography } from '@mui/material';
import { observer } from 'mobx-react';

import { CmBreadcrumbsStyle } from './Templates.Styled';

interface IBreadcrumb {
  key: number;
  name: string;
  url?: string;
}

const formatText = (text: string) => {
  if (!text) return '';

  if (text.includes('-')) {
    const textArr = text.split('-');
    const newText: string[] = [];

    textArr.map((item) => {
      newText.push(item.charAt(0).toUpperCase() + item.slice(1));
    });

    return newText.join(' ');
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
};

const CmBreadcrumbs = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState<string>('App & SG');
  const [breadcrumbsData, setBreadcrumbsData] = useState<IBreadcrumb[]>([]);

  useEffect(() => {
    const data = location.pathname.split('/').filter((item) => item !== '');

    const breadcrumb: IBreadcrumb[] = [];

    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        breadcrumb.push({ name: formatText(data[i]), url: '/' + data[i], key: i });
        continue;
      }

      if (i === data.length - 1) {
        breadcrumb.push({ name: 'Current Page', key: i });
        continue;
      }

      breadcrumb.push({ name: formatText(data[i]), url: '/' + data[i - 1] + '/' + data[i], key: i });
    }

    setBreadcrumbsData(breadcrumb);
    setPageTitle(formatText(data[data.length - 1]));
  }, [location.pathname]);

  return (
    <CmBreadcrumbsStyle>
      {/* <Box label="breadcrumbs"> */}
      <Box title="breadcrumbs">
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumbs"
        >
          {!!breadcrumbsData &&
            breadcrumbsData.map((item) => (
              <a
                key={item.key}
                onClick={() => {
                  navigate(item.url || '#');
                }}
              >
                {item.name}
              </a>
            ))}
        </Breadcrumbs>
        <Typography
          variant="subtitle1"
          gutterBottom
        >
          {pageTitle}
        </Typography>
      </Box>
    </CmBreadcrumbsStyle>
  );
});

export default CmBreadcrumbs;
