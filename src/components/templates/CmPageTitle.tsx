/******************************************************
 * Program ID : src/componetnts/templates/CmPageTitle.js
 * Program Name : 현재 페이지 타이틀 영역 템플릿
 * Create On : 2023.05.19
 * 개 요 : 현재 페이지 타이틀 영역 템플릿
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.19   김정아 차장   최초 작성
 ******************************************************/
// import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { CmPageTitleStyle } from './Templates.Styled';
import * as CmStyle from '@/stylesheets/common';
import makeStyles from '@mui/styles/makeStyles';

// Common Atoms
import { CmSelect } from '@/components/atoms/CmSelect';


// Styled
const useStyles = makeStyles(() => ({
  tSelect: {
    width: '100%',
    marginBottom: '22px',
    '& .MuiTypography-root': {
      fontSize: '15px',
      fontFamily: CmStyle.notoSansDJKFont.bold,
      marginBottom: '10px',

    },
  },
}));

// Overview - App&SG
function CmPageTitle() {
  const naviSubConut = 5;
  const naviSubTitle = ['subTitleText'];
  const naviSubText = ['(Dev Server​101.101.209.11​ /​14000​ )'];

  return (
    <CmPageTitleStyle>
      <Box className="subTitle">
        <Typography variant="subtitle1">
          {naviSubConut > 0 && !!naviSubConut !== undefined ? (
            <>
              <span className="naviSubConut">{naviSubConut}</span> Application(s)
            </>
          ) : (
            naviSubTitle
          )}
          <span className="naviSubText">{naviSubText}</span>
        </Typography>

        {/* Select */}
        <CmSelect className="subTselect" /* value="test" */ />
      </Box>
    </CmPageTitleStyle>
  );
}

// Test - Test
function CmPageTselectVtc() {
  const classes = useStyles();

  return (
    <Box className={classes.tSelect}>
      <Typography>
        Select Application
      </Typography>

      {/* Select */}
      <CmSelect className='' /* value="test" */ />
    </Box>
  );
}
export  {CmPageTitle, CmPageTselectVtc};
