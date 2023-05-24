/******************************************************
 * Program ID : src/pages/overview/AppSG.tsx
 * Program Name : App & SG
 * Create On : 2023.05.23
 * 개 요 : AppSG.tsx
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.23   김정아 차장   최초 작성
 ******************************************************/
import { Box } from '@mui/material';
import { OverviewStyled } from './Overview.Styled';

// Common Atoms
import { CmCard, CmCardAdd } from '@/components/atoms/CmCard';

// Templates
import CmSearch from '@/components/templates/CmSearch';
import CmPageTitle from '@/components/templates/CmPageTitle';

type propsType = {
  title: string;
};

function AppSG(props: propsType) {
  const { title } = props;
  return (
    <OverviewStyled>
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
    </OverviewStyled>
  );
}
export default AppSG;
