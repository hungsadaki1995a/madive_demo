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
// icon
import SearchIcon from '@mui/icons-material/SearchOutlined';
import { Chip, InputBase, Paper, Stack } from '@mui/material';

import { CmSearchStyle } from './Templates.Styled';

function CmSearch() {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <CmSearchStyle>
      {/* Search */}
      <Paper title="search">
        <SearchIcon />
        <Stack
          direction="row"
          spacing={1}
        >
          <Chip
            label="Deletable"
            onDelete={handleDelete}
          />
          <Chip
            label="Deletable"
            variant="outlined"
            onDelete={handleDelete}
          />
        </Stack>
        <InputBase placeholder="검색할 항목을 입력해 주세요." />
      </Paper>
    </CmSearchStyle>
  );
}
export default CmSearch;
