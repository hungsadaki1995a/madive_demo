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
import { Paper, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TestStyled } from './Test.Styled';
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
      {/* <p>Select Application</p> */}
      <Paper className="selectBox">
        <Typography>Select For Test</Typography>

        {/* FormBox */}
        <label className="labelFormArea">
          <span>Target Node</span>
          <Select value={test} onChange={handleChange} displayEmpty size="small">
            <MenuItem value="">
              <em>DevServer</em>
            </MenuItem>
            <MenuItem value={10}>Test01</MenuItem>
          </Select>
        </label>

        {/* FormBox */}
        <label className="labelFormArea">
          <span>Resource Name</span>
          <Select value={test} onChange={handleChange} displayEmpty size="small">
            <MenuItem value="">
              <em>DevServer</em>
            </MenuItem>
            <MenuItem value={10}>Test01</MenuItem>
          </Select>
        </label>

        {/* FormBox */}
        <label className="labelFormArea">
          <span>Label</span>
          <Select value={test} onChange={handleChange} displayEmpty size="small">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Test01</MenuItem>
          </Select>
        </label>
      </Paper>

      <Paper>Table Data Area</Paper>
    </TestStyled>
  );
}
export default Test;
