import { Button, Stack } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { FilterTypes, SubmitActionTypes } from '../const';
import { IFilterConfig, IFilterElementType } from '../types';
import DropdownFilterInput from './DropdownFilterInput';
import SimpleFilterInput from './SimpleFilterInput';

interface IFilterControlsProps {
  filterConfig: IFilterConfig;
  onTriggerQuery: (filterValues: { [key: string]: any }) => void;
}

const FilterControls = ({ filterConfig, onTriggerQuery }: IFilterControlsProps) => {
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
            onTriggerQuery={filterConfig.submitBy === SubmitActionTypes.ENTER ? handleTriggerQuery : undefined}
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

  return (
    <>
      <Stack
        direction="row"
        spacing={4}
      >
        {filterConfig?.filters?.map((filterItem) => {
          return renderFilterComponentBaseType(filterItem);
        })}
      </Stack>
      {filterConfig.submitBy === SubmitActionTypes.BUTTON && (
        <Button
          size="small"
          variant="contained"
          onClick={handleTriggerQuery}
        >
          {filterConfig.submitLabel}
        </Button>
      )}
    </>
  );
};

export default React.memo(FilterControls);
