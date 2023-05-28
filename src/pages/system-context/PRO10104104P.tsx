/******************************************************
 * Program ID : src/pages/system-context/Datasource.tsx
 * Program Name : Datasource
 * Create On : 2023.05.29
 * 개 요 : Datasource.tsx
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.29   김정아 차장   최초 작성
 ******************************************************/
import { CmDataSearch } from '@/components/atoms/CmDataInput';
import { Box, Paper, Typography } from '@mui/material';

// Common Atoms
import { CmDataSelect } from '@/components/atoms/CmDataInput';

// Templates
import { CmPageTselectColum } from '@/components/templates/CmPageTitle';

import { SysContextStyled } from './SysContext.Styled';

// img, icon

type propsType = {
  title: string;
};
function Datasource(props: propsType) {
  return (
    <SysContextStyled>
      {/* {title} */}
      <CmPageTselectColum />

      <Paper className="selectBox">
        {/* Select For Test */}
        <Box className="formBox">
          <Typography>Select For Test</Typography>
          {/* FormBox */}
          <label className="labelFormArea">
            <span>Node</span>
            <CmDataSelect />
            {/* <CmSelect className="alignR" /> */}
          </label>

          {/* FormBox */}
          <label className="labelFormArea">
            <span>Application</span>
            <CmDataSearch />
          </label>
        </Box>
      </Paper>

      <Paper className="inputDataBox">DataTeble Area</Paper>
    </SysContextStyled>
  );
}
export default Datasource;
