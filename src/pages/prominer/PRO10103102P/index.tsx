/******************************************************
 * Program ID : src/pages/test/TestManagement.tsx
 * Program Name : Test
 * Create On : 2023.05.23
 * 개 요 : TestManagement.tsx
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.27   김정아 차장   최초 작성
 ******************************************************/
// img, icon
import { Box, Paper, Stack, Typography } from '@mui/material';

// Common Atoms
import { CmButton, CmIconButton } from '@/components/atoms/CmButton';

// Templates
import { ReactComponent as PagePrevIcon } from '@/stylesheets/images/PagePrevIcon.svg';

import { ProminerStyled } from '../Prominer.Styled';
import DataTable from './DataTable';

function ViewResourceDetail() {
  return (
    <ProminerStyled>
      {/* Title */}
      <Paper className="detailBox">
        <Box
          className="pageTitle"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <CmIconButton iconName={<PagePrevIcon />} />
          SHBO
        </Box>
        <Stack className="pageCon">
          <Box className="formInfo">
            {/* FormBox */}
            <Paper className="infoBox">
              <figure>
                <span>Logical Name</span>
                <figcaption>SHBO</figcaption>
              </figure>
              <figure>
                <span>Physical Name</span>
                <figcaption>SHBO</figcaption>
              </figure>
              <figure>
                <span>Resource Type</span>
                <figcaption>BIZ_OBJECT</figcaption>
              </figure>
              <figure>
                <span>Resource Path</span>
                <figcaption>com.tmax.bo</figcaption>
              </figure>
            </Paper>
            {/* FormBox */}
            <Paper className="infoBox">
              <figure>
                <span>Resource count</span>
                <figcaption>Recycled: 0</figcaption>
                <figcaption>SO Recycled: 0</figcaption>
                <figcaption>BO Recycled: 0</figcaption>
                <figcaption>Call - Depth: 3</figcaption>
              </figure>
            </Paper>
          </Box>
          <Box className="tableArea">
            <Typography>Relation</Typography>
            <Stack className="topBtn">
              <CmButton
                variant="text"
                className="tBtnBg"
                btnTitle="All"
              />
              <CmButton
                variant="text"
                className="tBtnBg"
                btnTitle="Backward"
              />
              <CmButton
                variant="outlined"
                btnTitle="Forward"
              />
            </Stack>
            <DataTable />
          </Box>
        </Stack>
      </Paper>
    </ProminerStyled>
  );
}
export default ViewResourceDetail;
