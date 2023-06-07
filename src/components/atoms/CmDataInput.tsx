/******************************************************
 * Program ID : src/componetnts/templates/CmSearch.js
 * Program Name : Data 검색 영역 템플릿
 * Create On : 2023.05.19
 * 개 요 : Data 검색 영역 템플릿
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.19   김정아 차장   최초 작성
 ******************************************************/
import { useState } from 'react';

import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

// import { CmSearchStyle } from './Templates.Styled';
import * as CmStyle from '@/stylesheets/common';
// icon
import { ReactComponent as SearchIcon } from '@/stylesheets/images/SearchIcon.svg';

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

function getStyles(name: string, personName: string, theme: any) {
  return {
    fontFamily: 'NotoSansCJKRegular',
    fontSize: 13,
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

const names = ['Test01', 'Test02', 'Test03', 'Test04', 'Test05', 'Test06', 'Test07'];
type propsType = {
  className: string;
};

// Styled
const useStyles = makeStyles(() => ({
  dataForm: {
    '& .MuiOutlinedInput-input': {
      padding: '5px 14px',
      // padding: '2.5px 14px',
      fontSize: '13px',
      fontFamily: CmStyle.notoSansDJKFont.regular,
      background: '#fff',
      '& em': {
        fontStyle: 'normal',
      },
    },
  },
  topSelBox: {
    width: '500px',
  },
}));

type CmDataSearchProps = {
  onClick?: () => void;
};
function CmDataSearch({ onClick }: CmDataSearchProps) {
  const classes = useStyles();
  return (
    <OutlinedInput
      className={classes.dataForm}
      type="text"
      size="small"
      defaultValue="DevServer"
      endAdornment={
        <IconButton>
          <SearchIcon />
        </IconButton>
      }
      onClick={onClick}
    />
  );
}

function CmTextInput() {
  const classes = useStyles();
  return (
    <OutlinedInput
      className={classes.dataForm}
      type="text"
      size="small"
      defaultValue="DevServer"
    />
  );
}

function CmDataSelect(props: propsType) {
  const classes = useStyles();
  const { className } = props;
  const theme = useTheme();
  const [personName, setPersonName] = useState<any>([]);

  const handleChange = (e: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = e;
    // setPersonName(typeof value === 'string' ? value.split(',') : value);
    //setPersonName(value);
  };
  return (
    <FormControl className={classes.dataForm}>
      <Select
        className={className}
        displayEmpty
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput />}
        IconComponent={ArrowDownIcon}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Select For Menu</em>;
          }

          //return selected.join(', ');
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
export { CmDataSearch, CmTextInput, CmDataSelect };
