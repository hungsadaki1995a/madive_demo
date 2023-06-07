import React, { useState } from 'react';

// Icon
import { Button, Divider, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

import * as CmStyle from '@/stylesheets/common';
import { ReactComponent as Arrow } from '@/stylesheets/images/keyboardArrow.svg';

// import { ReactComponent as SearchIcon } from '@/stylesheets/images/SearchIcon.svg'; - 돋보기
// import { ReactComponent as SuccessIcon } from '@/stylesheets/images/SuccessIcon.svg'; - Success
// import { ReactComponent as FailIcon } from '@/stylesheets/images/FailIcon.svg'; - Fail
// import { ReactComponent as UploadIcon } from '@/stylesheets/images/UploadIcon.svg'; - Add Excel
// import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg'; - Delete
import { IPlainObject, ITopAction } from '../types';

const useStyles = makeStyles(() => ({
  button: {
    cursor: 'pointer',
    fontFamily: CmStyle.notoSansDJKFont.light,
    // fontFamily: notoSansDJKFont.light,
    fontSize: '13px',
    lineHeight: '20px',
    minWidth: '20px',
    minHeight: '28px',
    padding: '2.5px 8px',
    marginRight: '4px',
    color: CmStyle.color.colorT01,
    background: CmStyle.color.colorBtnSecondaryBg01,
    '&:hover': {
      background: CmStyle.color.colorBtnSecondaryBg02,
    },
    '&:active': {
      background: CmStyle.color.colorBtnSecondaryBg03,
    },
  },
  divider: {
    width: '1px',
    height: '24px',
    borderColor: CmStyle.color.colorBtnSecondaryBg02,
    display: 'inline',
    verticalAlign: 'middle',
    margin: 'auto 8px',
  },

  select: {
    minWidth: '160px',
    fontFamily: CmStyle.notoSansDJKFont.regular,
    fontSize: '13px',
    color: CmStyle.color.colorT01,
    '& .MuiSelect-select': {
      padding: '5px 32px 5px 8px',
    },

    '& em': {
      fontStyle: 'normal',
    },

    '& svg': {
      top: 'calc(50% - 0.3em)',
      '&.MuiSelect-iconOpen path': {
        fill: CmStyle.color.colorBtnPrimary,
      },
    },
  },
}));

const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 8 + ITEM_PADDING_TOP,
      // width: 250,
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

const names = ['TEST', 'RUNTIME', 'MASTER'];

const TopButton = <TRowDataType extends IPlainObject>({
  topAction,
  showTopSelect,
  selectedRows,
}: {
  topAction: ITopAction<TRowDataType>[];
  showTopSelect?: boolean;
  selectedRows?: TRowDataType[];
}) => {
  const classes = useStyles();
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
    <>
      {topAction?.map((action, index) => {
        return (
          <Button
            key={index}
            className={classes.button}
            onClick={action.onClick}
            variant="text"
            startIcon={action.icon ?? null}
            disabled={selectedRows?.length === 0}
          >
            {action.label}
          </Button>
        );
      })}
      {topAction.length > 0 && showTopSelect && (
        <Divider
          className={classes.divider}
          orientation="vertical"
          flexItem
        />
      )}
      {showTopSelect && (
        <Select
          className={classes.select}
          size="small"
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          IconComponent={Arrow}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>All</em>;
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
      )}
    </>
  );
};

export default React.memo(TopButton);
