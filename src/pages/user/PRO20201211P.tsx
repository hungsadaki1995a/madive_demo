/******************************************************
 * Program ID : src/pages/user/PRO20201211P.tsx
 * Program Name : User-Group Assign
 * Create On : 2023.05.31
 * 개 요 : PRO20201211P.tsx
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.31   김정아 차장   최초 작성
 ******************************************************/
import { Box, Paper, Typography } from '@mui/material';

import { CmDataSearch } from '@/components/atoms/CmDataInput';
// Common Atoms
import { CmDataSelect } from '@/components/atoms/CmDataInput';
// Templates
import { CmPageTselectColum } from '@/components/templates/CmPageTitle';

import { UserStyled } from './User.Styled';

type propsType = {
  title: string;
};

function UserGroupAssign(props: propsType) {
  const { title } = props;
  return (
    <UserStyled>
      {/* {title} */}
      <CmPageTselectColum />

      <Paper className="selectBox">
        {/* Group List */}
        <Box className="formBox">
          <Typography>Group List</Typography>
          {/* FormBox */}
          <label className="labelFormArea">
            <span>Group</span>
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

      <Paper className="inputDataBox">Table</Paper>
    </UserStyled>
  );
}
export default UserGroupAssign;
