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
import { ReactNode } from 'react';

import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, FormHelperText, MenuItem, OutlinedInput, Select } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import makeStyles from '@mui/styles/makeStyles';

// import { CmSearchStyle } from './Templates.Styled';
import * as CmStyle from '@/stylesheets/common';
// icon
import { ReactComponent as SearchIcon } from '@/stylesheets/images/SearchIcon.svg';
import { DropdownType } from '@/types/common';

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

const DEFAULT_DATA = [
  { value: 'Test01', label: 'Recent' },
  { value: 'Test02', label: 'Alphanumeric' },
];

type CmDataSelectProps = {
  optionsData?: DropdownType[];
  isMultipleSelect?: boolean;
  errorMessage?: string;
  className?: string;
  value?: any;
  disabled?: boolean;
  onChange?: (event: any, child: ReactNode) => void;
};

// Styled
const useStyles = makeStyles(() => ({
  dataForm: {
    '& .MuiOutlinedInput-input': {
      padding: '2.5px 14px',
      // padding: '2.5px 14px',
      fontSize: '13px',
      fontFamily: CmStyle.notoSansDJKFont.regular,
      background: '#fff',
      '& em': {
        fontStyle: 'normal',
      },
    },

    //disable color
    '& .Mui-disabled': {
      backgroundColor: '#f1f1f1',
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

function CmDataSelect({
  optionsData = DEFAULT_DATA,
  disabled = false,
  isMultipleSelect = false,
  errorMessage,
  className = '',
  onChange,
  value,
}: CmDataSelectProps) {
  const classes = useStyles();

  return (
    <FormControl
      error={!!errorMessage}
      size="small"
      className={classes.dataForm}
    >
      <Select
        className={className}
        displayEmpty
        input={<OutlinedInput />}
        IconComponent={ArrowDownIcon}
        value={value ? value : isMultipleSelect ? [] : ''}
        onChange={onChange}
        multiple={isMultipleSelect}
        disabled={disabled}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {!!optionsData?.length &&
          optionsData?.map((item, index) => {
            return (
              <MenuItem
                key={item?.value?.toString() + index}
                value={item?.value || ''}
              >
                {item?.label}
              </MenuItem>
            );
          })}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
}
export { CmDataSearch, CmDataSelect, CmTextInput };
