import { useState } from 'react';

import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

type FilterDropdownControlProps = {
  options: any[];
  // defaultValue: string;
  onChange?: (value: any) => void;
};

const FilterDropdownControl = ({ options = [], onChange }: FilterDropdownControlProps) => {
  const [valueSelected, setValueSelected] = useState<string>();

  const handleChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setValueSelected(value);
    onChange?.(value);
  };

  return (
    <Select
      onChange={handleChange}
      value={valueSelected}
      size="small"
      sx={{ width: '180px' }}
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
  );
};

export default FilterDropdownControl;
