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
import CmPageTitle from '@/components/templates/CmPageTitle';

// img, icon
import StarsIcon from '@mui/icons-material/StarsOutlined';
import UploadIcon from '@mui/icons-material/UploadOutlined';
import FilterAltIcon from '@mui/icons-material/FilterAltOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

// DATA
// const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'firstName', headerName: 'First name', width: 130 },
//   { field: 'lastName', headerName: 'Last name', width: 130 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

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
