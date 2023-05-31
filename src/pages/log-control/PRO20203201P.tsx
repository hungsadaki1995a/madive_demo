/******************************************************
 * Program ID : src/pages/system-context/PRO20203201P.tsx
 * Program Name : Log Control
 * Create On : 2023.05.27
 * 개 요 : PRO20203201P.tsx
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.27   김정아 차장   최초 작성
 ******************************************************/
import { Box, Paper, Typography } from '@mui/material';

import { CmDataSearch } from '@/components/atoms/CmDataInput';
// Common Atoms
import { CmDataSelect } from '@/components/atoms/CmDataInput';
// Templates
import { CmPageTselectColum } from '@/components/templates/CmPageTitle';

import { LogControlStyled } from './LogControl.Styled';

type propsType = {
  title: string;
};

function LogManagement(props: propsType) {
  const { title } = props;
  return (
    <LogControlStyled>
      {/* {title} */}
      <CmPageTselectColum />

      <Paper className="selectBox">
        {/* Select For Test */}
        <Box className="formBox">
          <Typography>Select For Test</Typography>
          {/* FormBox */}
          <label className="labelFormArea">
            <span>Node</span>
            <CmDataSelect className="" />
          </label>

          {/* FormBox */}
          <label className="labelFormArea">
            <span>Application</span>
            <CmDataSearch />
          </label>

          {/* FormBox */}
          <label className="labelFormArea">
            <span>Context</span>
            <CmDataSearch />
          </label>
        </Box>
      </Paper>

      <Paper className="inputDataBox">Table List Area</Paper>
    </LogControlStyled>
  );
}
export default LogManagement;
