/******************************************************
 * Program ID : src/pages/demo/Card.tsx
 * Program Name : 공통 카드 참고 페이지
 * Create On : 2023.05.12
 * 개 요 : 공통 카드 참고 페이지
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.12   김정아 차장   최초 작성
 ******************************************************/
import { Box } from '@mui/material';

// Common Atoms
import { CmCard, CmCardAdd } from '@/components/atoms/CmCard';
import { CmPageTitle } from '@/components/templates/CmPageTitle';
// Templates
import CmSearch from '@/components/templates/CmSearch';

import { CardStyled } from './CmCpst.Styled';

function Card() {
  return (
    <CardStyled>
      {/* Search */}
      <CmSearch />

      {/* SubTitle */}
      <CmPageTitle />

      {/* Card */}
      <Box className="cardArea">
        <CmCard />
        <CmCard />
        <CmCard />
        <CmCard />
        <CmCardAdd />
      </Box>
    </CardStyled>
  );
}
export default Card;
