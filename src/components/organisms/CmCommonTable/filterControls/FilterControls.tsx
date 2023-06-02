import React, { useCallback, useState } from 'react';

import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItem, OutlinedInput, Select, SelectChangeEvent, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

import { CmButton } from '@/components/atoms/CmButton';
import { CmTextInput } from '@/components/atoms/CmDataInput';

import * as CmStyle from '@/stylesheets/common';
import { ReactComponent as AddIcon } from '@/stylesheets/images/AddIcon.svg';
import { ReactComponent as SearchIcon } from '@/stylesheets/images/SearchIcon.svg';
import { ReactComponent as UploadIcon } from '@/stylesheets/images/UploadIcon.svg';

import { FilterTypes, SubmitActionTypes } from '../const';
import { IAddAction, IFilterConfig, IFilterElementType, IUploadAction } from '../types';
import DropdownFilterInput from './DropdownFilterInput';
import SimpleFilterInput from './SimpleFilterInput';

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
// type propsType = {
//   className: string;
// };
// Styled
const useStyles = makeStyles(() => ({
  toggleBtn: {
    '& button': {
      padding: 0,
      '& svg:not([class*="MuiSvgIcon"])': {
        margin: 'auto 10px',
      },
      '& .MuiFormControl': {
        margin: 0,
      },
      '& .MuiInputBase-root': {
        padding: 0,
        lineHeight: 2,
        boxShadow: 'none',
        '& .MuiOutlinedInput-notchedOutline': {
          border: 0,
        },
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '1px 35px 1px 14px !important',
      fontSize: '13px',
      fontFamily: CmStyle.notoSansDJKFont.regular,
      background: '#fff',
      '& em': {
        fontStyle: 'normal',
      },
    },
  },
}));

const FilterControls = ({
  excelBtnConfig,
  addBtnConfig,
  filterConfig,
  onTriggerQuery,
}: {
  excelBtnConfig?: IUploadAction;
  addBtnConfig?: IAddAction;
  filterConfig?: IFilterConfig;
  onTriggerQuery: (filterValues: { [key: string]: any }) => void;
}) => {
  const [filterValues, setFilterValues] = useState<{
    [key: string]: any;
  }>({});

  const handleChange = useCallback(({ name, value }: { name: string; value: any }) => {
    setFilterValues((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  }, []);

  const handleTriggerQuery = useCallback(() => {
    onTriggerQuery(filterValues);
  }, [onTriggerQuery, filterValues]);

  const renderFilterComponentBaseType = (filterItemConfig: IFilterElementType) => {
    switch (filterItemConfig.type) {
      case FilterTypes.DROPDOWN:
        return (
          <DropdownFilterInput
            key={filterItemConfig.name}
            filterInfo={filterItemConfig}
            onChange={handleChange}
          />
        );
      case FilterTypes.SIMPLE:
        return (
          <SimpleFilterInput
            key={filterItemConfig.name}
            filterInfo={filterItemConfig}
            onChange={handleChange}
            onTriggerQuery={filterConfig?.submitBy === SubmitActionTypes.ENTER ? handleTriggerQuery : undefined}
          />
        );
      case FilterTypes.ACTION_SELECTION:
        return (
          <DropdownFilterInput
            key={filterItemConfig.name}
            filterInfo={filterItemConfig}
            onChange={handleChange}
            onTriggerQuery={handleTriggerQuery}
          />
        );
      default:
        return null;
    }
  };

  const [alignment, setAlignment] = useState('left');

  // const handleAlignment = (event, newAlignment) => {
  const handleAlignment = () => {
    // setAlignment(newAlignment);
  };
  const classes = useStyles();
  // const { className } = props;
  const theme = useTheme();
  const [personName, setPersonName] = useState<any>([]);

  const handleTgSelChange = (e: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = e;
    // setPersonName(typeof value === 'string' ? value.split(',') : value);
    setPersonName(value);
  };

  return (
    <>
      {excelBtnConfig && (
        <CmButton
          variant="text"
          startIcon={<UploadIcon />}
          btnTitle={excelBtnConfig.label}
          onClick={excelBtnConfig.onClick}
        />
      )}
      {addBtnConfig && (
        <CmButton
          variant="contained"
          startIcon={<AddIcon />}
          btnTitle={addBtnConfig.label}
          onClick={addBtnConfig.onClick}
        />
      )}
      {filterConfig && (
        <ToggleButtonGroup
          className={classes.toggleBtn}
          value={alignment}
          exclusive
          onChange={handleAlignment}
        >
          <ToggleButton value="left">
            <SearchIcon />
          </ToggleButton>
          <ToggleButton value="center">
            <Select
              // className={className}
              displayEmpty
              value={personName}
              onChange={handleTgSelChange}
              input={<OutlinedInput />}
              IconComponent={ArrowDownIcon}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Select For Menu</em>;
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
          </ToggleButton>
          <ToggleButton value="right">
            <CmTextInput />
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    </>
  );
};

export default React.memo(FilterControls);
