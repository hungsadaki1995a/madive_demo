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
import StarsIcon from '@mui/icons-material/StarsOutlined';
import { Box, Paper, Typography } from '@mui/material';

// Common Atoms
import { CmButton } from '@/components/atoms/CmButton';

// Templates
import { ReactComponent as PagePrevIcon } from '@/stylesheets/images/PagePrevIcon.svg';

import { ProminerStyled } from './Prominer.Styled';

type propsType = {
  title: string;
};

function ViewResourceDetail(props: propsType) {
  const { title } = props;

  return (
    <ProminerStyled>
      {/* Title */}
      {/* <Typography>SHBO</Typography> */}
      <Paper className="detailBox">
        <CmButton
          variant="text"
          startIcon={<PagePrevIcon />}
          btnTitle="SHBO"
        />
        {/* Test Information */}
        <Box className="formInfo">
          {/* FormBox */}
          <Paper className="infoBox">
            <figure>
              <span>Node Name</span>
              <figcaption>DevServer</figcaption>
            </figure>
            <figure>
              <span>Node ID</span>
              <figcaption>ca0726f809bae66f33fb36c12a3596fc</figcaption>
            </figure>
            <figure>
              <span>IP</span>
              <figcaption>101.101.209.11</figcaption>
            </figure>
            <figure>
              <span>Http Port</span>
              <figcaption>14000</figcaption>
            </figure>
            <figure>
              <span>Resource Name</span>
              <figcaption>SHDO</figcaption>
            </figure>
            <figure>
              <span>Input</span>
              <figcaption>com.tmax.dto.SHDO</figcaption>
            </figure>
            <figure>
              <span>Super DO</span>
              <figcaption>-</figcaption>
            </figure>
            <figure>
              <span>Custom Header</span>
              <figcaption>-</figcaption>
            </figure>
          </Paper>
        </Box>
        <Box className="flexEnd">
          <CmButton
            variant="contained"
            startIcon={<StarsIcon />}
            btnTitle="Test"
          />
        </Box>
      </Paper>

      <Paper className="inputDataBox">
        <Typography>Input Data</Typography>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>Button</Box>
          Table
        </Box>
      </Paper>
    </ProminerStyled>
  );
}
export default ViewResourceDetail;
