/******************************************************
 * Program ID : src/componetnts/atoms/CmSelect.js
 * Program Name : 공통 검색 영역 컴포넌트
 * Create On : 2023.05.09
 * 개 요 : 공통 검색 영역 컴포넌트
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.09   김정아 차장   최초 작성
 ******************************************************/
import { useState } from 'react';

import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

import * as CmStyle from '@/stylesheets/common';

const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 8 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
// Styled
const useStyles = makeStyles(() => ({
  topSelBox: {
    width: '500px',
    '& .MuiOutlinedInput-input': {
      padding: '2.5px 14px',
      fontSize: '13px',
      fontFamily: CmStyle.notoSansDJKFont.regular,
      '& em': {
        fontStyle: 'normal',
      },
    },
  },
}));

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name: string, personName: string, theme: any) {
  return {
    fontFamily: 'NotoSansCJKRegular',
    fontSize: 13,
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

type propsType = {
  className: string;
};

function CmSelect(props: propsType) {
  const classes = useStyles();
  const theme = useTheme();
  const { className } = props;
  const [personName, setPersonName] = useState<any>([]);

  const handleChange = (e: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = e;
    // setPersonName(typeof value === 'string' ? value.split(',') : value);
    setPersonName(value);
  };

  return (
    <FormControl className={classes.topSelBox}>
      <Select
        className={className}
        displayEmpty
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput />}
        IconComponent={ArrowDownIcon}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Placeholder</em>;
          }

          return selected.join(', ');
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, personName, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export { CmSelect };
