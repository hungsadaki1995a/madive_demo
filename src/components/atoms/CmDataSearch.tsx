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
import { Paper, InputBase, Stack, Chip } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// import { CmSearchStyle } from './Templates.Styled';
import * as CmStyle from '@/stylesheets/common';
import makeStyles from '@mui/styles/makeStyles';

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
          <IconButton >
            <SearchIcon />
          </IconButton>
        }
      />
  );
}
export default CmDataSearch;
