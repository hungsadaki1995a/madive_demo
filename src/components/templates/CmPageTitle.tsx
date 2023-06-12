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
import makeStyles from '@mui/styles/makeStyles';

// Common Atoms
import { CmDataSelect } from '@/components/atoms/CmDataInput';

import * as CmStyle from '@/stylesheets/common';

// Styled
const useStyles = makeStyles(() => ({
  tSelectBtw: {
    // width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    '& .MuiTypography-root': {
      fontSize: '15px',
      fontFamily: CmStyle.notoSansDJKFont.bold,
      color: '#1c293e',
      '& span.naviSubConut': {
        color: '#1898F5',
      },
      '& span.naviSubText': {
        paddingLeft: '20px',
        fontFamily: CmStyle.notoSansDJKFont.light,
        fontSize: '13px',
      },
    },
    '&.MuiPaper-root ~ .tSelectBtw': {
      paddingTop: '12px',
    },
  },
  tSelectColum: {
    width: '100%',
    marginBottom: '22px',
    '& .MuiFormControl-root': {
      width: '500px',
    },
    '& .MuiTypography-root': {
      display: 'block',
      fontSize: '15px',
      fontFamily: CmStyle.notoSansDJKFont.bold,
      marginBottom: '10px',
    },
  },
}));

// Overview - App&SG
function CmPageTselectBtw({ total = 0 }: { total?: number }) {
  const classes = useStyles();
  const naviSubTitle = '';
  const naviSubText = '(Dev Server 101.101.209.11 /14000 )';

  return (
    <Box className={classes.tSelectBtw}>
      <Typography>
        {total ? (
          <>
            <span className="naviSubConut">{total}</span> Application(s)
          </>
        ) : (
          naviSubTitle
        )}
        <span className="naviSubText">{naviSubText}</span>
      </Typography>

      {/* Select */}
      <CmDataSelect className="" />
    </Box>
  );
}

// Test - Test
function CmPageTselectColum() {
  const classes = useStyles();

  return (
    <Box className={classes.tSelectColum}>
      <Typography>Select Application</Typography>

      {/* Select */}
      <CmDataSelect className="" />
    </Box>
  );
}
export { CmPageTselectBtw, CmPageTselectColum };
