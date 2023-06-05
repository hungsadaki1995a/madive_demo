/******************************************************
 * Program ID : src/pages/system-context/SystemContextManagement.tsx
 * Program Name : Management
 * Create On : 2023.05.27
 * 개 요 : SystemContextManagement.tsx
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.27   김정아 차장   최초 작성
 ******************************************************/
import { Box, Paper, Typography } from '@mui/material';

// Common Atoms
import { CmDataSelect } from '@/components/atoms/CmDataInput';
// Templates
import { CmPageTselectColum } from '@/components/templates/CmPageTitle';

import { SysContextStyled } from '../SysContext.Styled';
import SystemContextManagementDataTable from './DataTable';

function SystemContextManagement() {
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
            <CmDataSelect className="" />
          </label>

          {/* FormBox */}
          <label className="labelFormArea">
            <span>Application</span>
            <CmDataSelect className="" />
          </label>

          {/* FormBox */}
          <label className="labelFormArea">
            <span>Context</span>
            <CmDataSelect className="" />
          </label>
        </Box>
      </Paper>

      <Paper className="inputDataBox">
        <SystemContextManagementDataTable />
      </Paper>
    </SysContextStyled>
  );
}
export default SystemContextManagement;
