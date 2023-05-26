/******************************************************
 * Program ID : src/componetnts/templates/CmSearch.js
 * Program Name : Data 검색 영역 템플릿
 * Create On : 2023.05.19
 * 개 요 : Data 검색 영역 템플릿
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.19   김정아 차장   최초 작성
 ******************************************************/
// import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import makeStyles from '@mui/styles/makeStyles';

// import { CmSearchStyle } from './Templates.Styled';
import * as CmStyle from '@/stylesheets/common';
// icon
import { ReactComponent as SearchIcon } from '@/stylesheets/images/SearchIcon.svg';

// Styled
const useStyles = makeStyles(() => ({
  dataSearch: {
    '& .MuiOutlinedInput-input': {
      padding: '2.5px 14px',
      fontSize: '13px',
      fontFamily: CmStyle.notoSansDJKFont.regular,
    },
  },
}));

function CmDataSearch() {
  const classes = useStyles();
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <OutlinedInput
      className={classes.dataSearch}
      type="text"
      size="small"
      defaultValue="DevServer"
      endAdornment={
        <IconButton>
          <SearchIcon />
        </IconButton>
      }
    />
  );
}
export default CmDataSearch;
