import { Button } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { IFilterConfig } from '../types';
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

  return (
    <>
      {filterConfig?.filters?.map((item) => {
        if (item.type === 'dropdown') {
          return (
            <DropdownFilterInput
              key={item.name}
              filterInfo={item}
              onChange={handleChange}
            />
          );
        } else if (item.type === 'simple') {
          return (
            <SimpleFilterInput
              key={item.name}
              filterInfo={item}
              onChange={handleChange}
              onTriggerQuery={filterConfig.submitBy === 'enter' ? handleTriggerQuery : undefined}
            />
          );
        } else if (item.type === 'action-selection') {
          return (
            <DropdownFilterInput
              key={item.name}
              filterInfo={item}
              onChange={handleChange}
              onTriggerQuery={handleTriggerQuery}
            />
          );
        } else return null;
      })}
      {filterConfig.submitBy === 'button' && (
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
