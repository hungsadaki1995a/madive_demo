/******************************************************
 * Program ID : src/componetnts/templates/CmSearch.js
 * Program Name : 상단 페이지 검색 영역 템플릿
 * Create On : 2023.05.19
 * 개 요 : 상단 페이지 검색 영역 템플릿
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.19   김정아 차장   최초 작성
 ******************************************************/
// import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import { Button, Chip, Paper, Stack, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { notoSansDJKFont } from '@/stylesheets/common';

// Styled
const useStyles = makeStyles(() => ({
  topSearchBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '4px 8px',
    marginBottom: '20px !important',
    '& *:not(svg)': {
      fontFamily: notoSansDJKFont.regular,
      fontSize: '13px',
    },
    '& svg': {
      marginRight: '.4em',
    },
    '& .MuiStack-root': {
      // marginLeft: 'auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      '& >:not(style)+:not(style)': {
        marginTop: 0,
        marginLeft: '10px',
      },
    },
    // Chip
    '& .MuiChip-root': {
      height: '24px',
      '& .MuiChip-label': {
        lineHeight: 1,
      },
      '& .MuiSvgIcon-root': {
        opacity: 0,
        transition: 'opacity 250ms',
      },
      '&:hover .MuiSvgIcon-root': {
        opacity: 1,
      },
    },
    // TextField
    '& .MuiTextField-root': {
      display: 'contents',
      '& .MuiOutlinedInput-root': {
        width: '100%',
        padding: '0 10px',
        '& .MuiInputBase-input': {
          padding: 0,
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 0,
        },
      },
    },
  },
  // RightBtn
  rBtn: {
    width: '270px',
    // marginLeft: 'auto',
    justifyContent: 'flex-end',
    '& .MuiButton-text': {
      padding: 0,
      color: '#1898F5',
    },
  },
}));

function CmSearch() {
  const classes = useStyles();
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Paper className={classes.topSearchBar}>
      <SearchIcon />
      <Stack spacing={1}>
        <Chip
          label="Property 1 : Value 2"
          onDelete={handleDelete}
        />
        <Chip
          label="Property 2 : Value 3"
          onDelete={handleDelete}
        />
      </Stack>
      <TextField
        // fullWidth
        hiddenLabel
        placeholder="검색할 항목을 입력해 주세요."
      />
      <Stack
        className={classes.rBtn}
        spacing={1}
      >
        <Button variant="text">검색조건 저장</Button>
        <Button variant="text">전체 삭제</Button>
      </Stack>
    </Paper>
  );
}
export default CmSearch;
