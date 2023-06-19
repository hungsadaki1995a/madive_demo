import React from 'react';

import { MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { CmButton } from '@/components/atoms/CmButton';

import { FilterTypes } from '../const';
import { ActionType, FilterFormType } from '../types';
import SearchInputBaseDropdownControl from './SearchInputBaseDropdownControl';

interface IFilterPanelProps {
  filterConfig: any;
  onChangeFilterClient?: (filterData: FilterFormType) => void;
  onChangeFilterServer?: (filterData: FilterFormType) => void;
  selectedRows: any[];
  dispatch: (type: ActionType) => void;
  filterState: { client: FilterFormType; server: FilterFormType };
}

// Styled
const useStyles = makeStyles(({ palette, typography }) => ({
  filterPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiSelect-select': {
      marginLeft: '10px',
      padding: '0 32px 0 8px',
      minHeight: 'unset',
      height: '28px',
      fontSize: '13px',
      lineHeight: 2,
    },
    '& .MuiSelect-nativeInput': {
      top: '0',
      height: '28px',
    },
    '& .MuiSvgIcon-root': {
      top: '7px',
    },
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      height: '33px',
      top: '-0',
    },

    '& label[class*="makeStyles-button"]': {
      display: 'flex',
      alignItems: 'center',
    },
  },
}));

const FilterPanel = ({
  filterConfig,
  onChangeFilterClient,
  onChangeFilterServer,
  selectedRows = [],
  dispatch,
  filterState,
}: IFilterPanelProps) => {
  const classes = useStyles();
  const onClick = (callback: (selectedRows: any[]) => void) => {
    callback(selectedRows);
  };

  const renderActionControl = (control: any, actionIndex: number) => {
    switch (control.type) {
      case FilterTypes.DROPDOWN: {
        if (control.component) {
          const DropdownComponent = control.component;
          if (DropdownComponent) {
            return (
              <DropdownComponent
                key={actionIndex}
                onChangeFilterClient={onChangeFilterClient}
                onChangeFilterServer={onChangeFilterServer}
                {...control}
              />
            );
          }
        }
        return (
          <Select
            key={actionIndex}
            onChange={(e: SelectChangeEvent) => {
              const value = e.target.value;
              onChangeFilterClient?.({ ...filterState.client, [control.name]: value === 'ALL' ? '' : value });
            }}
            value={''} // value={fieldNameSelected}
            size="small"
            sx={{ width: '180px' }}
          >
            {control?.options?.map((item: any, index: number) => {
              return (
                <MenuItem
                  key={index}
                  value={item.value}
                >
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        );
      }
      case 'filter': {
        return (
          <SearchInputBaseDropdownControl
            key={actionIndex}
            options={control.options}
            defaultValue={control.defaultValue}
            onSearchChange={onChangeFilterClient}
            filterState={filterState.client}
          />
        );
      }
      case 'button': {
        const ButtonComponent = CmButton;
        // const ButtonComponent = control.component ? control.component : Button;
        const { handleClick, checkDisabled } = control;
        const isDisabled = checkDisabled ? checkDisabled(selectedRows) : false;
        return (
          <ButtonComponent
            onClick={() => onClick(handleClick)}
            key={actionIndex}
            disabled={isDisabled}
            {...control?.config}
            btnTitle={control?.config?.label}
          />
          // <ButtonComponent
          //   onClick={() => onClick(handleClick)}
          //   key={actionIndex}
          //   disabled={isDisabled}
          //   {...control?.config}
          // >
          //   {control?.config?.label}
          // </ButtonComponent>
        );
      }
      default:
        return null;
    }
  };
  return (
    <Stack
      className={classes.filterPanel}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={4}
    >
      <Stack
        direction="row"
        spacing={2}
      >
        {filterConfig.primaryActions?.map((action: any, index: number) => {
          return renderActionControl(action, index);
        })}
      </Stack>
      <Stack
        direction="row"
        spacing={2}
      >
        {filterConfig.advanceActions?.map((action: any, index: number) => {
          return renderActionControl(action, index);
        })}
      </Stack>
    </Stack>
  );
};

export default React.memo(FilterPanel);
