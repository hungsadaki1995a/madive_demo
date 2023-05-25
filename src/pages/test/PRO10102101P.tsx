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
import React, { useEffect, useState } from 'react';
import { Paper, Typography, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TestStyled } from './Test.Styled';

// Common Atoms
import { CmSelect } from '@/components/atoms/CmSelect';

// Templates
import { CmPageTselectVtc } from '@/components/templates/CmPageTitle';
import CmDataSearch from '@/components/atoms/CmDataSearch';

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
