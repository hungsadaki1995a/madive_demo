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
// img, icon
import { Paper } from '@mui/material';

// Common Atoms
import { CmPageTselectBtw } from '@/components/templates/CmPageTitle';
// Templates
import CmSearch from '@/components/templates/CmSearch';

import { TableStyled } from './CmCpst.Styled';

function Table() {
  return (
    <TableStyled>
      {/* Search */}
      <CmSearch />

      {/* SubTitle */}
      <CmPageTselectBtw />

      {/* ButtonComponent */}
      <Paper>테이블</Paper>
    </TableStyled>
  );
}
export default Table;
