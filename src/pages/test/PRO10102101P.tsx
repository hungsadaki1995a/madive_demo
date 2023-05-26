/******************************************************
 * Program ID : src/pages/test/TestManagement.tsx
 * Program Name : Test
 * Create On : 2023.05.23
 * 개 요 : TestManagement.tsx
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.23   김정아 차장   최초 작성
 ******************************************************/
import CmDataSearch from '@/components/atoms/CmDataSearch';
import { Box, Paper, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

// Common Atoms
import { CmButton } from '@/components/atoms/CmButton';

// Templates
import { CmPageTselectVtc } from '@/components/templates/CmPageTitle';

import { TestStyled } from './Test.Styled';

// img, icon
import StarsIcon from '@mui/icons-material/StarsOutlined';

type propsType = {
  title: string;
};

function Test(props: propsType) {
  const { title } = props;
  const [test, setTest] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setTest(event.target.value);
  };
  return (
    <TestStyled>
      {/* {title} */}
      <CmPageTselectVtc />

      <Paper className="selectBox">
        {/* Select For Test */}
        <Box className="formBox">
          <Typography>Select For Test</Typography>
          {/* FormBox */}
          <label className="labelFormArea">
            <span>Target Node</span>
            <CmDataSearch />
          </label>

          {/* FormBox */}
          <label className="labelFormArea">
            <span>Resource Name</span>
            <CmDataSearch />
          </label>
        </Box>
        {/* Test Information */}
        <Box className="formInfo">
          <Typography>Test Information</Typography>
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

      <Paper>
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
        Table Data Area <br />
      </Paper>
    </TestStyled>
  );
}
export default Test;
