/******************************************************
 * Program ID : src/pages/demo/Table.tsx
 * Program Name : 공통 테이블 참고 페이지
 * Create On : 2023.05.21
 * 개 요 : 공통 테이블 참고 페이지
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.21   김정아 차장   최초 작성
 ******************************************************/
import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { TableStyled } from './CmCpst.Styled';

// Common Atoms
import { CmButton, CmIconButton } from '@/components/atoms/CmButton';

// Templates
import CmSearch from '@/components/templates/CmSearch';
import {CmPageTitle} from '@/components/templates/CmPageTitle';

// img, icon
import StarsIcon from '@mui/icons-material/StarsOutlined';
import UploadIcon from '@mui/icons-material/UploadOutlined';
import FilterAltIcon from '@mui/icons-material/FilterAltOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

function Table() {
  return (
    <TableStyled>
      {/* Search */}
      <CmSearch />

      {/* SubTitle */}
      <CmPageTitle />

      {/* ButtonComponent */}
      <Paper>테이블</Paper>
    </TableStyled>
  );
}
export default Table;
