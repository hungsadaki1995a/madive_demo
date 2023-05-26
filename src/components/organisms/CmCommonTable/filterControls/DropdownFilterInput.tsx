import React, { useCallback, useEffect, useState } from 'react';

import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { FilterOnChangeType, IFilterActionSelection, IFilterDropdown } from '../types';

// Filter type: Simple Input
const DropdownFilterInput = ({
  filterInfo: { options, name, className },
  onChange,
  onTriggerQuery,
}: {
  filterInfo: IFilterDropdown | IFilterActionSelection;
  onChange: FilterOnChangeType;
  onTriggerQuery?: () => void;
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(options[0]?.value);

  // Set default selected option (option index at 0);
  useEffect(() => {
    onChange?.({
      name,
      value: selectedValue,
    });
  }, []); // empty dependency => component did mount

  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      setSelectedValue(event.target.value as string);
      onChange?.({
        name,
        value: event.target.value,
      });
      if (typeof onTriggerQuery === 'function') {
        setTimeout(() => {
          onTriggerQuery();
        }, 0);
      }
    },
    [onChange, onTriggerQuery]
  );

  return (
    <FormControl
      sx={{
        width: '10rem',
      }}
      size="small"
      className={className ?? ''}
    >
      <Select
        onChange={handleChange}
        value={selectedValue}
      >
        {options.map((item, index) => {
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
    </FormControl>
  );
};

export default React.memo(DropdownFilterInput);
