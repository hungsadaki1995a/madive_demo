import React from 'react';

import { Box, Button, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';

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

const FilterPanel = ({
  filterConfig,
  onChangeFilterClient,
  onChangeFilterServer,
  selectedRows = [],
  dispatch,
  filterState,
}: IFilterPanelProps) => {
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
        const ButtonComponent = control.component ? control.component : Button;
        const { handleClick, checkDisabled } = control;
        const isDisabled = checkDisabled ? checkDisabled(selectedRows) : false;
        return (
          <ButtonComponent
            onClick={() => onClick(handleClick)}
            key={actionIndex}
            disabled={isDisabled}
            {...control?.config}
          >
            {control?.config?.label}
          </ButtonComponent>
        );
      }
      default:
        return null;
    }
  };
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={4}
      >
        <Box>
          <Stack
            direction="row"
            spacing={2}
          >
            {filterConfig.primaryActions?.map((action: any, index: number) => {
              return renderActionControl(action, index);
            })}
          </Stack>
        </Box>
        <Box>
          <Stack
            direction="row"
            spacing={2}
          >
            {filterConfig.advanceActions?.map((action: any, index: number) => {
              return renderActionControl(action, index);
            })}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default React.memo(FilterPanel);
